import {
  interpolateColor,
  inverseLinearInterpolation,
} from "./interpolation.js";

export function defineSkyLinearGradient(currentAltitude) {
  const darkerSkyGradient = darkerSkyGradientForAltitude(currentAltitude);
  const brighterSkyGradient = brighterSkyGradientForAltitude(currentAltitude);
  const linearGradient = inverseLinearInterpolation(
    darkerSkyGradient.limit,
    brighterSkyGradient.limit,
    currentAltitude,
  );
  const topSkyGradient = interpolateColor(
    darkerSkyGradient.top,
    brighterSkyGradient.top,
    linearGradient,
  );
  const bottomSkyGradient = interpolateColor(
    darkerSkyGradient.bottom,
    brighterSkyGradient.bottom,
    linearGradient,
  );

  return `<defs>
            <linearGradient id="sky-${currentAltitude}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${topSkyGradient}" />
                <stop offset="55%" stop-color="${topSkyGradient}" />
                <stop offset="100%" stop-color="${bottomSkyGradient}" />
            </linearGradient></defs>`;
}

export function brighterSkyGradientForAltitude(altitude) {
  if (altitude <= -18) return { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 };
  if (altitude <= -15) return { top: "#0b0c1a", bottom: "#101734", limit: -15 };
  if (altitude <= -12) return { top: "#171c27", bottom: "#282e3c", limit: -12 };
  if (altitude <= -9) return { top: "#171c29", bottom: "#525662", limit: -9 };
  if (altitude <= -6) return { top: "#4e545f", bottom: "#b9a76c", limit: -6 };
  if (altitude <= -3) return { top: "#909798", bottom: "#f9d92b", limit: -3 };
  if (altitude <= 0) return { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 };
  if (altitude <= 10) return { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 };
  return { top: "#cce8fd", bottom: "#98d5fc", limit: 90 };
}

function darkerSkyGradientForAltitude(altitude) {
  if (altitude <= -18) return { top: "#0b0c1a", bottom: "#0b0c1a", limit: -90 };
  if (altitude <= -15) return { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 };
  if (altitude <= -12) return { top: "#0b0c1a", bottom: "#101734", limit: -15 };
  if (altitude <= -9) return { top: "#171c27", bottom: "#282e3c", limit: -12 };
  if (altitude <= -6) return { top: "#171c29", bottom: "#525662", limit: -9 };
  if (altitude <= -3) return { top: "#4e545f", bottom: "#b9a76c", limit: -6 };
  if (altitude <= 0) return { top: "#909798", bottom: "#f9d92b", limit: -3 };
  if (altitude <= 10) return { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 };
  return { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 };
}
