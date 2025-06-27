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

export function drawText(text, x, y, textAnchor = "middle", fontSize = 139) {
  return `<text x="${x}" y="${y}" font-size="${fontSize}" text-anchor="${textAnchor}"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${text}
        </text>`;
}

export function drawFirstRowText(text) {
  return drawText(text, 500, 660);
}

export function drawSecondRowText(text) {
  return drawText(text, 500, 833);
}

export function drawTopLeftText(text) {
  return drawText(text, 50, 150, "start");
}
