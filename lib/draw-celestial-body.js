export function drawCelestialBody(celestialBody, isGrayscale) {
  let svg = isGrayscale ? startGrayscaleFilter() : "";
  if (celestialBody === "Sun") {
    svg += drawSun(isGrayscale);
  } else if (celestialBody === "Mars") {
    svg += drawMars(isGrayscale);
  }
  svg += isGrayscale ? endGrayscaleFilter() : "";
  return svg;
}

function drawSun() {
  return `
        <!-- Sun body -->
        <circle cx="500" cy="278" r="139" fill="#f4a300" />
        <!-- Sun rays -->
        <g stroke="#e69500" stroke-width="21" stroke-linecap="round">
            <line x1="500" y1="111" x2="500" y2="69" />
            <line x1="500" y1="445" x2="500" y2="486" />
            <line x1="333" y1="278" x2="292" y2="278" />
            <line x1="667" y1="278" x2="708" y2="278" />
            <line x1="403" y1="181" x2="375" y2="153" />
            <line x1="597" y1="181" x2="625" y2="153" />
            <line x1="403" y1="375" x2="375" y2="403" />
            <line x1="597" y1="375" x2="625" y2="403" />
        </g>`;
}

function drawMars() {
  return `<circle cx="500" cy="278" r="139" fill="#d2691e" />
          <!-- Ice cap (ellipse) -->
          <ellipse cx="500" cy="167" rx="42" ry="21" fill="white" opacity="0.9" />
          <!-- Surface features -->
          <circle cx="458" cy="236" r="21" fill="#a0522d" />
          <circle cx="542" cy="319" r="17.35" fill="#a0522d" />
          <circle cx="514" cy="250" r="13.9" fill="#cd853f" />
          <circle cx="472" cy="306" r="10.4" fill="#cd853f" />`;
}

function startGrayscaleFilter() {
  return `<defs>
    <filter id="grayscale">
        <feColorMatrix type="saturate" values="0" />
    </filter>
    </defs>
    <g filter="url(#grayscale)">`;
}

function endGrayscaleFilter() {
  return `</g>`;
}
