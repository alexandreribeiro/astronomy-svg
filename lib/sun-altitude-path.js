import { endSvg, startRectangularSvg, startSquareSvg } from "./svg.js";
import {
  brighterSkyGradientForAltitude,
  defineSkyLinearGradient,
} from "./utils/sky-gradient.js";
import {
  interpolateColor,
  inverseLinearInterpolation,
} from "./utils/interpolation.js";

export function drawSunAltitudePath(astronomyJS, widthInPixels, isRectangular) {
  const now = astronomyJS.getDate();
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  const maxWidth = isRectangular ? 2000 : 1000;
  const intervals = getToday30MinIntervals(astronomyJS.getDate());
  const results = intervals
    .map((date, i) => {
      const intervalLength = (i / (intervals.length - 1)) * maxWidth;
      const altitude = astronomyJS.getAltAzCoordinatesForObject(
        "Sun",
        date,
      ).latitude;
      return [intervalLength, mapRange(altitude, -90, 90, 950, 50).toFixed(0)];
    })
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const currentAltitude =
    astronomyJS.getAltAzCoordinatesForObject("Sun").latitude;
  const cy = mapRange(currentAltitude, -90, 90, 950, 50).toFixed(0);
  const brighterSkyGradient = brighterSkyGradientForAltitude(currentAltitude);
  const sunGlowGradient = sunGlowGradientForAltitude(currentAltitude);
  const sunGlowLinearGradient = inverseLinearInterpolation(
    sunGlowGradient.limit,
    brighterSkyGradient.limit,
    currentAltitude,
  );
  const sunGlowColor = interpolateColor(
    brighterSkyGradient.bottom,
    sunGlowGradient.bottom,
    sunGlowLinearGradient,
  );
  const altitudeFadeGradient =
    currentAltitude > 0
      ? 1
      : currentAltitude < -9
        ? 0
        : inverseLinearInterpolation(-9, 0, currentAltitude);
  const lineFadeGradient =
    currentAltitude > -3
      ? 1
      : currentAltitude < -9
        ? 0
        : inverseLinearInterpolation(-9, -3, currentAltitude);
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
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * altitudeFadeGradient}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * altitudeFadeGradient}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${0.1 * altitudeFadeGradient}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${sunGlowColor}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${sunGlowColor}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${sunGlowColor}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${sunGlowColor}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${brightLineColor}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${maxWidth}" height="500" fill="url(#sky)" />
        <ellipse cx="${timeToPoints(minutesSinceMidnight, maxWidth)}" cy="${cy}" rx="${1.2 * maxWidth}" ry="125" fill="url(#twilight-glow)" />
        <rect x="0" y="500" width="${maxWidth}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${results}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${results}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${maxWidth}" y2="500" stroke="${brightLineColor}" stroke-width="15" />
        <circle cx="${timeToPoints(minutesSinceMidnight, maxWidth)}"
            cy="${cy}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${timeToPoints(minutesSinceMidnight, maxWidth)}"
            cy="${cy}" r="150" fill="url(#sun-glow)" clip-path="url(#bottom-half-clip)" />
           `;
  svg += defineSkyLinearGradient(astronomyJS);
  svg += endSvg();
  console.log();
  return svg;
}

function getToday30MinIntervals(referenceDate) {
  const intervals = [];
  const midnight = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  for (let i = 0; i < 48; i++) {
    const interval = new Date(midnight.getTime() + i * 30 * 60 * 1000);
    intervals.push(interval);
  }

  return intervals;
}

function mapRange(value, minIn, maxIn, minOut, maxOut) {
  return minOut + ((value - minIn) * (maxOut - minOut)) / (maxIn - minIn);
}

function timeToPoints(minutesSinceMidnight, maxPoints) {
  const fractionOfDay = minutesSinceMidnight / 1440;
  return fractionOfDay * maxPoints;
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
