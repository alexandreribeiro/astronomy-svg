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

export function drawMoonAltitudePath(
  applicationContext,
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

  const moonResults = intervals
      .map((date) => {
        const coords = astronomyJS.getAltitudeAzimuthCoordinatesForObject(
            "Moon",
            date,
        );
        const x = azimuthToPoints(coords.azimuth, maxWidth);
        const y = mapRange(coords.altitude, -90, 90, 950, 50).toFixed(0);
        return {x, y, azimuth: coords.azimuth};
      })
      .sort((a, b) => a.x - b.x)
      .map((point) => `${point.x},${point.y}`)
      .join(" ");

  const sunCoords = astronomyJS.getAltitudeAzimuthCoordinatesForObject("Sun");
  const sunAltitude = sunCoords.altitude;
  const sunAzimuth = sunCoords.azimuth;
  const moonCoords = astronomyJS.getAltitudeAzimuthCoordinatesForObject("Moon");
  const moonAltitude = moonCoords.altitude;
  const moonAzimuth = moonCoords.azimuth;

  const illuminatedFraction = astronomyJS.getIlluminatedFractionForObject("Moon");
  const isWaxing =
      astronomyJS.getIlluminatedFractionForObject(
          "Moon",
          new Date(now.getTime() + 5 * 60 * 1000),
      ) > illuminatedFraction;

  const sunCy = mapRange(sunAltitude, -90, 90, 950, 50).toFixed(0);
  const moonCy = mapRange(moonAltitude, -90, 90, 950, 50).toFixed(0);
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
        <ellipse cx="${azimuthToPoints(sunAzimuth, maxWidth)}" cy="${sunCy}" rx="${1.2 * maxWidth}" ry="125" fill="url(#twilight-glow-${sunAltitude})" />
        <rect x="0" y="500" width="${maxWidth}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient-${sunAltitude})" stroke-width="35" points="${moonResults}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient-${sunAltitude})" stroke-width="35" points="${moonResults}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${maxWidth}" y2="500" stroke="${brightLineColor}" stroke-width="15" />
        <circle cx="${azimuthToPoints(sunAzimuth, maxWidth)}"
            cy="${sunCy}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${azimuthToPoints(sunAzimuth, maxWidth)}"
            cy="${sunCy}" r="150" fill="url(#sun-glow-${sunAltitude})" clip-path="url(#bottom-half-clip)" />
        <g transform="translate(${azimuthToPoints(moonAzimuth, maxWidth) - 500}, ${moonCy - 278})
                translate(500, 278) scale(0.5) translate(-500, -278)">
            ${drawCelestialBody("Moon", {
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

function azimuthToPoints(azimuth, maxWidth) {
  // South is 180. We want 180 to be in the center (0.5 * maxWidth).
  // If azimuth is 0-360, mapping it linearly puts 180 at center.
  // 0 -> 0 (North)
  // 90 -> 0.25 (East)
  // 180 -> 0.5 (South)
  // 270 -> 0.75 (West)
  // 360 -> 1.0 (North)
  return (azimuth / 360) * maxWidth;
}

function sunGlowGradientForAltitude(altitude) {
  if (altitude <= -18) return { top: "#0b0c1a", bottom: "#101734", limit: -90 };
  if (altitude <= -15) return { top: "#171c27", bottom: "#282e3c", limit: -18 };
  if (altitude <= -12) return { top: "#171c29", bottom: "#525662", limit: -15 };
  if (altitude <= -9) return { top: "#4e545f", bottom: "#b9a76c", limit: -12 };
  if (altitude <= -6) return { top: "#909798", bottom: "#f9d92b", limit: -9 };
  if (altitude <= -3) return { top: "#b6d8ed", bottom: "#f6da3f", limit: -6 };
  if (altitude <= 0) return { top: "#bcd6fc", bottom: "#98d5fc", limit: -3 };
  return { top: "#cce8fd", bottom: "#98d5fc", limit: 0 };
}
