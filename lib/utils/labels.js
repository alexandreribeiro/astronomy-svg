export function getAzimuthZoneLabel(azimuth) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalized = ((azimuth % 360) + 360) % 360;
  const index = Math.floor((normalized + 22.5) / 45) % 8;
  return directions[index];
}

export function getAltitudeLabel(altitude, oldAltitude) {
  return `${altitude.toFixed(1)} ${altitude > oldAltitude ? "▲" : altitude < oldAltitude ? "▼" : ""}`;
}

export function getAzimuthWithZoneLabel(azimuth) {
  return `${azimuth.toFixed(1)} ${getAzimuthZoneLabel(azimuth)}`;
}

export function drawFirstRowText(firstRowText) {
  return `<text x="500" y="660" font-size="139" text-anchor="middle"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${firstRowText}
        </text>`;
}

export function drawSecondRowText(secondRowText) {
  return `<text x="500" y="833" font-size="139" text-anchor="middle"
                fill="white" font-family="Verdana" dominant-baseline="middle">
          ${secondRowText}
          </text>`;
}
