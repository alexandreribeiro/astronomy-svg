import { endSvg, startRectangularSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import {
  brighterSkyGradientForAltitude,
  defineSkyLinearGradient,
} from "./utils/sky-gradient.js";
import {
  interpolateColor,
  inverseLinearInterpolation,
} from "./utils/interpolation.js";
import { DateTime } from "luxon";
import { drawTopLeftText } from "./utils/labels.js";

export function drawCelestialBodyAltitudePath(
  applicationContext,
  celestialBody,
  widthInPixels,
  isRectangular,
  shouldDrawTime,
) {
  let astronomyJS = applicationContext.astronomyJS;
  const now = astronomyJS.getDate();

  let midnight;
  if (applicationContext.timezone) {
    let referenceDateInTimezone = DateTime.fromJSDate(now).setZone(
      applicationContext.timezone,
    );
    midnight = referenceDateInTimezone.startOf("day").toJSDate();
  } else {
    midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  const maxWidth = isRectangular ? 2000 : 1000;
  const intervals = getToday30MinIntervals(midnight);

  // Find the azimuth for the highest altitude of the day
  let maxAltitude = -100;
  let peakAzimuth = 180;
  for (const date of intervals) {
    const coordinates = astronomyJS.getAltitudeAzimuthCoordinatesForObject(
      celestialBody,
      date,
    );
    if (coordinates.altitude > maxAltitude) {
      maxAltitude = coordinates.altitude;
      peakAzimuth = coordinates.azimuth;
    }
  }

  // Determine which cardinal point (N or S) is closer to peakAzimuth
  // Normalize peakAzimuth to [0, 360)
  const normalizedPeak = ((peakAzimuth % 360) + 360) % 360;
  // Distance to North (0 or 360)
  const distanceToNorth = Math.min(normalizedPeak, 360 - normalizedPeak);
  // Distance to South (180)
  const distanceToSouth = Math.abs(normalizedPeak - 180);
  const azimuthReference = distanceToNorth < distanceToSouth ? 0 : 180;

  const celestialBodyResults = [];
  let currentSegment = [];

  for (let i = 0; i < intervals.length; i++) {
    const date = intervals[i];
    const coordinates = astronomyJS.getAltitudeAzimuthCoordinatesForObject(
      celestialBody,
      date,
    );
    const x = parseFloat(
      azimuthToPoints(coordinates.azimuth, maxWidth, azimuthReference).toFixed(
        2,
      ),
    );
    const y = parseFloat(
      mapRange(coordinates.altitude, -90, 90, 950, 50).toFixed(2),
    );

    if (currentSegment.length > 0) {
      const previousX = currentSegment[currentSegment.length - 1].x;
      // If there's a big jump in X (more than half the width), it's a wrap-around
      if (Math.abs(x - previousX) > maxWidth / 2) {
        celestialBodyResults.push(
          currentSegment.map((p) => `${p.x},${p.y}`).join(" "),
        );
        currentSegment = [];
      }
    }
    currentSegment.push({ x, y });
  }

  if (currentSegment.length > 0) {
    celestialBodyResults.push(
      currentSegment.map((p) => `${p.x},${p.y}`).join(" "),
    );
  }

  const sunCoordinates =
    astronomyJS.getAltitudeAzimuthCoordinatesForObject("Sun");
  const sunAltitude = sunCoordinates.altitude;
  const sunAzimuth = sunCoordinates.azimuth;
  const celestialBodyCoordinates =
    astronomyJS.getAltitudeAzimuthCoordinatesForObject(celestialBody);

  const illuminatedFraction =
    astronomyJS.getIlluminatedFractionForObject(celestialBody);
  const isWaxing =
    astronomyJS.getIlluminatedFractionForObject(
      celestialBody,
      new Date(now.getTime() + 5 * 60 * 1000),
    ) > illuminatedFraction;

  const sunCenterY = mapRange(sunAltitude, -90, 90, 950, 50).toFixed(0);
  const celestialBodyCenterY = mapRange(
    celestialBodyCoordinates.altitude,
    -90,
    90,
    950,
    50,
  ).toFixed(0);
  const brighterSkyGradient = brighterSkyGradientForAltitude(sunAltitude);
  const sunGlowGradient = sunGlowGradientForAltitude(sunAltitude);
  const sunGlowLinearGradient = inverseLinearInterpolation(
    sunGlowGradient.limit,
    brighterSkyGradient.limit,
    sunAltitude,
  );
  const sunGlowColor = interpolateColor(
    brighterSkyGradient.bottom,
    sunGlowGradient.bottom,
    sunGlowLinearGradient,
  );
  const altitudeFadeGradient =
    sunAltitude > 0
      ? 1
      : sunAltitude < -9
        ? 0
        : inverseLinearInterpolation(-9, 0, sunAltitude);
  const lineFadeGradient =
    sunAltitude > -3
      ? 1
      : sunAltitude < -9
        ? 0
        : inverseLinearInterpolation(-9, -3, sunAltitude);
  const brightLineColor = interpolateColor(
    "#808080",
    "#ffffff",
    lineFadeGradient,
  );

  let svg = isRectangular
    ? startRectangularSvg(widthInPixels, "black")
    : startSquareSvg(widthInPixels, "black");
  svg += `
        <rect x="0" y="500" width="${maxWidth}" height="500" fill="black" />
        <defs>
            <clipPath id="top-half-clip">
                <rect x="0" y="500" width="${maxWidth * 2}" height="500" />
            </clipPath>
            <clipPath id="bottom-half-clip">
                <rect x="0" y="0" width="${maxWidth * 2}" height="500" />
            </clipPath>
            <radialGradient id="sun-glow-${sunAltitude}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * altitudeFadeGradient}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * altitudeFadeGradient}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${0.1 * altitudeFadeGradient}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow-${sunAltitude}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${sunGlowColor}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${sunGlowColor}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${sunGlowColor}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${sunGlowColor}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient-${sunAltitude}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${brightLineColor}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${maxWidth}" height="500" fill="url(#sky-${sunAltitude})" />
        <ellipse cx="${azimuthToPoints(sunAzimuth, maxWidth, azimuthReference)}" cy="${sunCenterY}" rx="${1.2 * maxWidth}" ry="125" fill="url(#twilight-glow-${sunAltitude})" />
        ${celestialBodyResults
          .map(
            (segment) => `
            <polyline fill="none" stroke="url(#sun-line-gradient-${sunAltitude})" stroke-width="35" points="${segment}" clip-path="url(#top-half-clip)"/>
            <polyline fill="none" stroke="url(#sun-line-gradient-${sunAltitude})" stroke-width="35" points="${segment}" clip-path="url(#bottom-half-clip)"/>
        `,
          )
          .join("")}
        <line x1="0" y1="500" x2="${maxWidth}" y2="500" stroke="${brightLineColor}" stroke-width="15" />
        <g fill="white" font-size="60" font-family="Verdana" text-anchor="middle" dominant-baseline="middle">
            <text x="${azimuthToPoints(0, maxWidth, azimuthReference)}" y="550">N</text>
            <text x="${azimuthToPoints(90, maxWidth, azimuthReference)}" y="550">E</text>
            <text x="${azimuthToPoints(180, maxWidth, azimuthReference)}" y="550">S</text>
            <text x="${azimuthToPoints(270, maxWidth, azimuthReference)}" y="550">W</text>
        </g>
        <circle cx="${azimuthToPoints(sunAzimuth, maxWidth, azimuthReference)}"
            cy="${sunCenterY}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${azimuthToPoints(sunAzimuth, maxWidth, azimuthReference)}"
            cy="${sunCenterY}" r="150" fill="url(#sun-glow-${sunAltitude})" clip-path="url(#bottom-half-clip)" />
        <g transform="translate(${azimuthToPoints(celestialBodyCoordinates.azimuth, maxWidth, azimuthReference) - 500}, ${celestialBodyCenterY - 278})
                translate(500, 278) scale(0.5) translate(-500, -278)">
            ${drawCelestialBody(celestialBody, {
              isGrayScale: false,
              illuminatedFraction: illuminatedFraction,
              isWaxing: isWaxing,
            })}
        </g>
           `;
  svg += defineSkyLinearGradient(sunAltitude);
  if (shouldDrawTime) {
    svg += drawTopLeftText(
      now.toLocaleTimeString(applicationContext.locale ?? undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        ...(applicationContext.timezone
          ? { timeZone: applicationContext.timezone }
          : {}),
      }),
    );
  }
  svg += endSvg();
  return svg;
}

function getToday30MinIntervals(midnight) {
  const intervals = [];

  for (let i = 0; i < 48; i++) {
    const interval = new Date(midnight.getTime() + i * 30 * 60 * 1000);
    intervals.push(interval);
  }

  return intervals;
}

function mapRange(value, minIn, maxIn, minOut, maxOut) {
  return minOut + ((value - minIn) * (maxOut - minOut)) / (maxIn - minIn);
}

function azimuthToPoints(azimuth, maxWidth, azimuthReference = 180) {
  // We want azimuthReference to be in the center (0.5 * maxWidth).
  // Standard is South (180) in the center.
  // If azimuthReference is North (0), we still want East to be to the left of South
  // and West to be to the right of South to maintain temporal travel direction.
  // TEMPORAL TRAVEL: East (90) -> South (180) -> West (270) -> North (0/360)
  // To have object travel from left to right, East must have smaller X than West.

  let shiftedAzimuth;
  if (azimuthReference === 0) {
    // North is at the center (0.5 * maxWidth)
    // To have temporal travel from left to right (East -> North -> West):
    // East(90) should be at 90, North(0) at 180, West(270) at 270.
    shiftedAzimuth = (180 - azimuth + 360) % 360;
  } else {
    // South is at center (180)
    // East(90) -> 90, South(180) -> 180, West(270) -> 270.
    shiftedAzimuth = (azimuth - (azimuthReference - 180) + 360) % 360;
  }
  return (shiftedAzimuth / 360) * maxWidth;
}

function sunGlowGradientForAltitude(altitude) {
  if (altitude <= -18)
    return { top: "#0b0c1a", bottom: "#101734", limit: -90 };
  if (altitude <= -15)
    return { top: "#171c27", bottom: "#282e3c", limit: -18 };
  if (altitude <= -12)
    return { top: "#171c29", bottom: "#525662", limit: -15 };
  if (altitude <= -9) return { top: "#4e545f", bottom: "#b9a76c", limit: -12 };
  if (altitude <= -6) return { top: "#909798", bottom: "#f9d92b", limit: -9 };
  if (altitude <= -3) return { top: "#b6d8ed", bottom: "#f6da3f", limit: -6 };
  if (altitude <= 0) return { top: "#bcd6fc", bottom: "#98d5fc", limit: -3 };
  return { top: "#cce8fd", bottom: "#98d5fc", limit: 0 };
}
