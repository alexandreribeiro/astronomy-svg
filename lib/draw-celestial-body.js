export function drawCelestialBody(celestialBody, properties) {
  let svg = "";

  let bodySvg = "";
  if (celestialBody === "Sun") {
    bodySvg += drawSun(properties);
  } else if (celestialBody === "Moon") {
    bodySvg += drawMoon(properties);
  } else if (celestialBody === "Mercury") {
    bodySvg += drawMercury(properties);
  } else if (celestialBody === "Venus") {
    bodySvg += drawVenus(properties);
  } else if (celestialBody === "Mars") {
    bodySvg += drawMars(properties);
  } else if (celestialBody === "Jupiter") {
    bodySvg += drawJupiter(properties);
  } else if (celestialBody === "Saturn") {
    bodySvg += drawSaturn(properties);
  } else if (celestialBody === "Uranus") {
    bodySvg += drawUranus(properties);
  } else if (celestialBody === "Neptune") {
    bodySvg += drawNeptune(properties);
  } else if (celestialBody === "Pluto") {
    bodySvg += drawPluto(properties);
  }

  svg += bodySvg;

  if (properties.drawNotVisibleSymbol) {
    svg += `
    <defs>
      <clipPath id="phase-shadow-disk">
        <circle cx="500" cy="278" r="139" />
      </clipPath>
    </defs>

    <g clip-path="url(#phase-shadow-disk)">
      <polygon points="0,0 1000,0 0,556" fill="#24304f" opacity="1" />
      <line x1="0" y1="556" x2="1000" y2="0" stroke="black" stroke-width="12" opacity="0.9" />
    </g>

    <g transform="translate(380 180)">
      <circle cx="0" cy="0" r="74" fill="#d8d8d8" opacity="0.95" />
      <circle cx="0" cy="0" r="61" fill="#242424" opacity="0.9" />
    
      <path d="M -38 0 C -19 -22, 19 -22, 38 0 C 19 22, -19 22, -38 0 Z" fill="none" stroke="#d8d8d8" stroke-width="9" />
      <line x1="-35" y1="35" x2="35" y2="-35" stroke="#d8d8d8" stroke-width="11" stroke-linecap="round" />
    </g>
  `;
  }

  return svg;
}

function drawSun() {
  return `
    <!-- Simple cartoon sun rays -->
    <g stroke="#e69500" stroke-width="18" stroke-linecap="round">
      <line x1="500" y1="139" x2="500" y2="92" />
      <line x1="500" y1="417" x2="500" y2="464" />
      <line x1="361" y1="278" x2="314" y2="278" />
      <line x1="639" y1="278" x2="686" y2="278" />

      <line x1="402" y1="180" x2="369" y2="147" />
      <line x1="598" y1="180" x2="631" y2="147" />
      <line x1="402" y1="376" x2="369" y2="409" />
      <line x1="598" y1="376" x2="631" y2="409" />
    </g>

    <!-- Sun base -->
    <circle cx="500" cy="278" r="139" fill="#f4a300" />
  `;
}

function drawMercury() {
  return `
    <!-- Mercury base -->
    <circle cx="500" cy="278" r="139" fill="#b0a59f" />

    <!-- Slightly darker polar / edge shading -->
    <ellipse cx="500" cy="160" rx="62" ry="22" fill="#8d827c" opacity="0.32" />
    <ellipse cx="500" cy="398" rx="68" ry="24" fill="#766b66" opacity="0.28" />

    <!-- Main cartoon craters -->
    <circle cx="455" cy="235" r="18" fill="#72655f" opacity="0.72" />
    <circle cx="455" cy="235" r="9" fill="#9a8f89" opacity="0.45" />

    <circle cx="535" cy="255" r="14" fill="#5e524e" opacity="0.7" />
    <circle cx="535" cy="255" r="6" fill="#9a8f89" opacity="0.4" />

    <circle cx="485" cy="320" r="16" fill="#6a5c58" opacity="0.68" />
    <circle cx="485" cy="320" r="7" fill="#9a8f89" opacity="0.38" />

    <circle cx="565" cy="335" r="11" fill="#645954" opacity="0.68" />
    <circle cx="420" cy="300" r="10" fill="#4f4541" opacity="0.55" />

    <!-- Small surface spots -->
    <circle cx="515" cy="210" r="7" fill="#6c615c" opacity="0.55" />
    <circle cx="590" cy="275" r="8" fill="#5e524e" opacity="0.5" />
    <circle cx="445" cy="365" r="7" fill="#72655f" opacity="0.48" />
  `;
}

function drawVenus() {
  return `
    <!-- Venus base -->
    <circle cx="500" cy="278" r="139" fill="#e5c07b" />

    <!-- Simple cartoon cloud bands -->
    <ellipse cx="500" cy="225" rx="118" ry="18" fill="#f2d796" opacity="0.7" />
    <ellipse cx="500" cy="265" rx="139" ry="20" fill="#d4a85f" opacity="0.45" />
    <ellipse cx="500" cy="305" rx="130" ry="18" fill="#f0c982" opacity="0.55" />
    <ellipse cx="500" cy="342" rx="96" ry="14" fill="#b98545" opacity="0.35" />

    <!-- Soft cartoon swirl features -->
    <circle cx="455" cy="250" r="18" fill="#b88e3b" opacity="0.32" />
    <circle cx="545" cy="315" r="16" fill="#c9954e" opacity="0.3" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="160" rx="58" ry="20" fill="white" opacity="0.32" />
    <ellipse cx="500" cy="398" rx="58" ry="18" fill="#b98545" opacity="0.18" />
  `;
}

function drawMars() {
  return `
    <!-- Mars base -->
    <circle cx="500" cy="278" r="139" fill="#d2691e" />

    <!-- Slightly darker polar / edge shading -->
    <ellipse cx="500" cy="395" rx="72" ry="24" fill="#8f3f1f" opacity="0.28" />
    <ellipse cx="500" cy="160" rx="58" ry="20" fill="#e48a45" opacity="0.28" />

    <!-- Ice cap -->
    <ellipse cx="500" cy="167" rx="42" ry="21" fill="white" opacity="0.9" />

    <!-- Main cartoon surface patches -->
    <circle cx="458" cy="236" r="22" fill="#a0522d" opacity="0.85" />
    <circle cx="542" cy="319" r="18" fill="#a0522d" opacity="0.85" />

    <!-- Smaller warm terrain details -->
    <circle cx="514" cy="250" r="14" fill="#cd853f" opacity="0.75" />
    <circle cx="472" cy="306" r="11" fill="#cd853f" opacity="0.75" />
    <circle cx="590" cy="275" r="10" fill="#8f3f1f" opacity="0.5" />
    <circle cx="420" cy="330" r="9" fill="#b75a2a" opacity="0.55" />

    <!-- Soft highlight spots -->
    <circle cx="440" cy="205" r="8" fill="#e99655" opacity="0.45" />
    <circle cx="535" cy="365" r="7" fill="#e99655" opacity="0.35" />
  `;
}

function drawJupiter() {
  return `
    <!-- Jupiter base -->
    <circle cx="500" cy="278" r="139" fill="#d2b48c" />

    <!-- Two simple cartoon cloud bands -->
    <ellipse cx="500" cy="252" rx="139" ry="17" fill="#c89b76" opacity="0.8" />
    <ellipse cx="500" cy="305" rx="139" ry="18" fill="#ba8c6e" opacity="0.75" />

    <!-- Small soft cloud details -->
    <ellipse cx="440" cy="235" rx="28" ry="8" fill="#ead2aa" opacity="0.55" />
    <ellipse cx="535" cy="270" rx="34" ry="9" fill="#e6c79b" opacity="0.45" />
    <ellipse cx="455" cy="325" rx="32" ry="9" fill="#a97658" opacity="0.32" />

    <!-- Slightly darker poles -->
    <ellipse cx="500" cy="166" rx="66" ry="24" fill="#a97658" opacity="0.35" />
    <ellipse cx="500" cy="390" rx="70" ry="24" fill="#a97658" opacity="0.28" />

    <!-- Great Red Spot -->
    <ellipse cx="570" cy="305" rx="24" ry="14" fill="#cc543a" />
    <ellipse cx="570" cy="305" rx="12" ry="7" fill="#e27a55" opacity="0.65" />
  `;
}

function drawSaturn() {
  return `
    <!-- Rings behind Saturn -->
    <g transform="rotate(-25 500 278)">
      <ellipse cx="500" cy="278" rx="250" ry="58" fill="none" stroke="#d9c28a" stroke-width="22" opacity="0.75" />
      <ellipse cx="500" cy="278" rx="215" ry="48" fill="none" stroke="#f1dfaa" stroke-width="12" opacity="0.9" />
      <ellipse cx="500" cy="278" rx="175" ry="38" fill="none" stroke="#8f7446" stroke-width="7" opacity="0.45" />
    </g>

    <!-- Saturn base -->
    <circle cx="500" cy="278" r="139" fill="#d8c48f" />

    <!-- Simple cartoon atmospheric bands -->
    <ellipse cx="500" cy="230" rx="130" ry="17" fill="#ead8a6" opacity="0.65" />
    <ellipse cx="500" cy="268" rx="139" ry="16" fill="#bfa369" opacity="0.6" />
    <ellipse cx="500" cy="305" rx="137" ry="18" fill="#e6d09a" opacity="0.55" />
    <ellipse cx="500" cy="340" rx="110" ry="13" fill="#ad8f58" opacity="0.45" />

    <!-- Soft polar highlights -->
    <ellipse cx="500" cy="160" rx="62" ry="20" fill="white" opacity="0.22" />
    <ellipse cx="500" cy="398" rx="60" ry="18" fill="#8f7446" opacity="0.16" />

    <!-- Rings front, kept simple and bold like the other cartoon planets -->
    <g transform="rotate(-25 500 278)">
      <path d="M 250 278 A 250 58 0 0 0 750 278" fill="none" stroke="#ead39b" stroke-width="18" opacity="0.95" />
      <path d="M 285 278 A 215 48 0 0 0 715 278" fill="none" stroke="#fff0bd" stroke-width="9" opacity="0.9" />
      <path d="M 325 278 A 175 38 0 0 0 675 278" fill="none" stroke="#8f7446" stroke-width="6" opacity="0.45" />
    </g>
  `;
}

function drawUranus() {
  return `
    <!-- Uranus base -->
    <circle cx="500" cy="278" r="139" fill="#7fdbff" />

    <!-- Slightly darker polar / edge shading -->
    <ellipse cx="500" cy="160" rx="66" ry="22" fill="#54a3b9" opacity="0.22" />
    <ellipse cx="500" cy="398" rx="72" ry="24" fill="#3f91aa" opacity="0.2" />

    <!-- Simple cartoon atmospheric bands -->
    <ellipse cx="500" cy="248" rx="132" ry="14" fill="#6ec8e9" opacity="0.42" />
    <ellipse cx="500" cy="292" rx="139" ry="15" fill="#62b4d8" opacity="0.36" />

    <!-- Soft cloud details -->
    <ellipse cx="455" cy="225" rx="30" ry="9" fill="#a7efff" opacity="0.38" />
    <ellipse cx="550" cy="318" rx="36" ry="10" fill="#54a3b9" opacity="0.28" />
    <circle cx="430" cy="305" r="14" fill="#6dc3e3" opacity="0.35" />

    <!-- Gentle highlight -->
    <ellipse cx="455" cy="205" rx="36" ry="18" fill="white" opacity="0.18" />
  `;
}

function drawNeptune() {
  return `
    <!-- Neptune base -->
    <circle cx="500" cy="278" r="139" fill="#3b5ca8" />

    <!-- Slightly darker polar / edge shading -->
    <ellipse cx="500" cy="160" rx="66" ry="22" fill="#223b78" opacity="0.28" />
    <ellipse cx="500" cy="398" rx="72" ry="24" fill="#1f3266" opacity="0.24" />

    <!-- Simple cartoon atmospheric bands -->
    <ellipse cx="500" cy="250" rx="136" ry="14" fill="#4a71d2" opacity="0.45" />
    <ellipse cx="500" cy="296" rx="139" ry="15" fill="#2f4b7f" opacity="0.42" />

    <!-- Soft storm / cloud details -->
    <ellipse cx="545" cy="235" rx="34" ry="10" fill="#6f93e8" opacity="0.35" />
    <ellipse cx="590" cy="330" rx="28" ry="8" fill="#4a71d2" opacity="0.32" />

    <!-- Gentle highlight -->
    <ellipse cx="455" cy="205" rx="34" ry="17" fill="white" opacity="0.12" />
  `;
}

function drawPluto() {
  return `
    <!-- Pluto base -->
    <circle cx="500" cy="278" r="139" fill="#c8a178" />

    <!-- Slightly darker polar / edge shading -->
    <ellipse cx="500" cy="160" rx="64" ry="22" fill="#a87955" opacity="0.28" />
    <ellipse cx="500" cy="398" rx="72" ry="24" fill="#8f6648" opacity="0.24" />

    <!-- Soft icy heart region, shifted slightly right -->
    <path
      d="
        M 520 302
        C 520 258, 465 255, 465 300
        C 465 342, 512 360, 520 386
        C 528 360, 575 342, 575 300
        C 575 255, 520 258, 520 302
        Z
      "
      fill="#e9e6e1"
      opacity="0.88"
    />

    <!-- Cartoon surface patches -->
    <circle cx="445" cy="260" r="22" fill="#a87552" opacity="0.62" />
    <circle cx="555" cy="245" r="17" fill="#d1b08a" opacity="0.58" />
    <circle cx="430" cy="335" r="13" fill="#8f6648" opacity="0.38" />

    <!-- Small icy highlights -->
    <circle cx="470" cy="210" r="8" fill="#e9e6e1" opacity="0.45" />
    <circle cx="535" cy="370" r="7" fill="#e9e6e1" opacity="0.35" />
  `;
}

function drawMoon(properties) {
  const clampedFraction = Math.max(
    0,
    Math.min(1, properties.illuminatedFraction),
  );

  const mariaDetail = `
    <!-- Oceanus Procellarum (Ocean of Storms) - Large, West -->
    <ellipse cx="420" cy="270" rx="45" ry="70" transform="rotate(-10 420 270)" />
    <!-- Mare Imbrium (Sea of Rains) - NW -->
    <circle cx="455" cy="215" r="35" />
    <!-- Mare Serenitatis (Sea of Serenity) - N/NW -->
    <circle cx="510" cy="210" r="28" />
    <!-- Mare Tranquillitatis (Sea of Tranquility) - Central-East -->
    <circle cx="560" cy="275" r="30" />
    <!-- Mare Crisium (Sea of Crises) - NE, isolated -->
    <ellipse cx="605" cy="235" rx="18" ry="14" />
    <!-- Mare Fecunditatis (Sea of Fertility) - SE -->
    <circle cx="595" cy="315" r="28" />
    <!-- Mare Nectaris (Sea of Nectar) - S of Tranquility -->
    <circle cx="560" cy="320" r="17" />
    <!-- Mare Nubium (Sea of Clouds) - SW -->
    <circle cx="465" cy="345" r="25" />
  `;

  const drawMaria = (color, opacity) => `
    <g fill="${color}" opacity="${opacity}" clip-path="url(#moon-clip)">
      ${mariaDetail}
    </g>
  `;

  if (clampedFraction === 0) {
    return `
      <defs>
        <clipPath id="moon-clip">
          <circle cx="500" cy="278" r="139" />
        </clipPath>
      </defs>
      <!-- Moon base -->
      <circle cx="500" cy="278" r="139" fill="#5f6368" />
      ${drawMaria("#000", "1")}
    `;
  }

  if (clampedFraction === 1) {
    return `
      <defs>
        <clipPath id="moon-clip">
          <circle cx="500" cy="278" r="139" />
        </clipPath>
      </defs>
      <!-- Moon base -->
      <circle cx="500" cy="278" r="139" fill="#d9d7d1" />
      <g style="mix-blend-mode: multiply;">
        ${drawMaria("#000", "1")}
      </g>
    `;
  }

  const terminatorRadiusX = Math.max(
    0.001,
    Math.abs(2 * clampedFraction - 1) * 139,
  );
  const isWaxing = properties.isWaxing;
  // For a waxing moon, illumination grows from right to left (standard Northern Hemisphere view)
  // For a waning moon, illumination shrinks from right to left
  const outerArcSweepFlag = isWaxing ? 1 : 0;
  const terminatorSweepFlag =
    (clampedFraction < 0.5 && isWaxing) || (clampedFraction >= 0.5 && !isWaxing)
      ? 0
      : 1;

  return `
    <defs>
      <clipPath id="moon-clip">
        <circle cx="500" cy="278" r="139" />
      </clipPath>
      <clipPath id="moon-lit-area">
        <path
          d="
            M 500 139
            A 139 139 0 0 ${outerArcSweepFlag} 500 417
            A ${terminatorRadiusX} 139 0 0 ${terminatorSweepFlag} 500 139
            Z
          "
        />
      </clipPath>
    </defs>

    <!-- Moon shadow -->
    <circle cx="500" cy="278" r="139" fill="#5f6368" />

    <!-- Illuminated portion -->
    <path
      d="
        M 500 139
        A 139 139 0 0 ${outerArcSweepFlag} 500 417
        A ${terminatorRadiusX} 139 0 0 ${terminatorSweepFlag} 500 139
        Z
      "
      fill="#d9d7d1"
      clip-path="url(#moon-clip)"
    />

    <!-- Surface detail on illuminated portion -->
    <g clip-path="url(#moon-lit-area)">
      <g style="mix-blend-mode: multiply;">
        ${drawMaria("#7a756b", "0.7")}
      </g>
    </g>
  `;
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
