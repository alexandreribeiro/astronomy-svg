export function startSquareSvg(sizeInPixels, backgroundColor) {
  return `<svg viewBox="0 0 1000 1000" width="${sizeInPixels}" height="${sizeInPixels}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />`;
}

export function startRectangularSvg(widthInPixels, backgroundColor) {
  return `<svg viewBox="0 0 2000 1000" width="${widthInPixels}" height="${widthInPixels / 2}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />`;
}

export function endSvg() {
  return `</svg>`;
}
