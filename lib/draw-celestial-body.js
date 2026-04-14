export function drawCelestialBody(celestialBody, properties) {
  let svg = properties.isGrayScale ? startGrayscaleFilter() : "";
  if (celestialBody === "Sun") {
    svg += drawSun(properties);
  } else if (celestialBody === "Moon") {
    svg += drawMoon(properties);
  } else if (celestialBody === "Mercury") {
    svg += drawMercury(properties);
  } else if (celestialBody === "Venus") {
    svg += drawVenus(properties);
  } else if (celestialBody === "Mars") {
    svg += drawMars(properties);
  } else if (celestialBody === "Jupiter") {
    svg += drawJupiter(properties);
  } else if (celestialBody === "Saturn") {
    svg += drawSaturn(properties);
  } else if (celestialBody === "Uranus") {
    svg += drawUranus(properties);
  } else if (celestialBody === "Neptune") {
    svg += drawNeptune(properties);
  } else if (celestialBody === "Pluto") {
    svg += drawPluto(properties);
  }
  svg += properties.isGrayScale ? endGrayscaleFilter() : "";
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

function drawMercury() {
  return `
    <!-- Mercury base -->
    <circle cx="500" cy="278" r="139" fill="#b0a59f" />

    <!-- Craters across surface, including near edges -->
    <circle cx="470" cy="230" r="14" fill="#72655f" opacity="0.70" />
    <circle cx="530" cy="250" r="12" fill="#5e524e" opacity="0.75" />
    <circle cx="490" cy="305" r="11" fill="#6a5c58" opacity="0.68" />
    <circle cx="455" cy="275" r="10" fill="#4f4541" opacity="0.65" />
    <circle cx="520" cy="325" r="9" fill="#6c615c" opacity="0.70" />
    <circle cx="540" cy="215" r="13" fill="#645954" opacity="0.72" />

    <!-- Near-edge craters -->
    <circle cx="390" cy="278" r="8" fill="#72655f" opacity="0.70" />
    <circle cx="610" cy="278" r="9" fill="#5e524e" opacity="0.73" />
    <circle cx="500" cy="139" r="10" fill="#6c615c" opacity="0.68" />
    <circle cx="500" cy="417" r="11" fill="#4f4541" opacity="0.70" />
    <circle cx="410" cy="185" r="8" fill="#6a5c58" opacity="0.67" />
    <circle cx="590" cy="365" r="9" fill="#645954" opacity="0.72" />
  `;
}

function drawVenus() {
  return `
    <!-- Venus base -->
    <circle cx="500" cy="278" r="139" fill="#e5c07b" />

    <!-- Thicker cloud bands -->
    <ellipse cx="500" cy="240" rx="139" ry="18" fill="#d4b06a" opacity="0.35" />
    <ellipse cx="500" cy="278" rx="139" ry="20" fill="#c8a158" opacity="0.3" />
    <ellipse cx="500" cy="315" rx="139" ry="16" fill="#b89249" opacity="0.25" />

    <!-- Swirl features -->
    <circle cx="470" cy="250" r="20" fill="#b88e3b" opacity="0.3" />

    <!-- Polar glow (top and bottom) -->
    <ellipse cx="500" cy="160" rx="60" ry="20" fill="white" opacity="0.4" />
    <ellipse cx="500" cy="400" rx="60" ry="20" fill="white" opacity="0.4" />
  `;
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

function drawJupiter() {
  return `
    <!-- Jupiter base -->
    <circle cx="500" cy="278" r="139" fill="#d2b48c" />

    <!-- Symmetrical medium bands -->
    <ellipse cx="500" cy="248" rx="139" ry="12" fill="#c89b76" opacity="0.85" />
    <ellipse cx="500" cy="278" rx="139" ry="10" fill="#ba8c6e" opacity="0.85" />
    <ellipse cx="500" cy="308" rx="139" ry="12" fill="#c89b76" opacity="0.85" />

    <!-- Great Red Spot -->
    <ellipse cx="570" cy="305" rx="20" ry="12" fill="#cc543a" />
    
    <ellipse cx="500" cy="170" rx="60" ry="30" fill="#ba8c6e" opacity="0.7" />
  `;
}

function drawSaturn() {
  return `
    <!-- Rings behind -->
    <g transform="rotate(-25 500 278)">
      <ellipse cx="500" cy="278" rx="220" ry="50" fill="none" stroke="#e6e6e6" stroke-width="20" opacity="0.5" />
      <ellipse cx="500" cy="278" rx="250" ry="55" fill="none" stroke="#f2f2f2" stroke-width="12" opacity="0.4" />
    </g>

    <!-- Saturn base (on top of back rings) -->
    <circle cx="500" cy="278" r="139" fill="#d8c48f" />

    <!-- Atmospheric bands -->
    <ellipse cx="500" cy="260" rx="139" ry="12" fill="#c9b87e" opacity="0.5" />
    <ellipse cx="500" cy="278" rx="139" ry="14" fill="#bcae6f" opacity="0.5" />
    <ellipse cx="500" cy="296" rx="139" ry="12" fill="#b1a460" opacity="0.45" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="139" rx="60" ry="20" fill="white" opacity="0.15" />
    <ellipse cx="500" cy="417" rx="60" ry="20" fill="white" opacity="0.15" />

    <!-- Rings front -->
    <g transform="rotate(-25 500 278)">
      <ellipse cx="500" cy="278" rx="220" ry="50" fill="none" stroke="#f5f5f5" stroke-width="14" opacity="0.7" />
      <ellipse cx="500" cy="278" rx="250" ry="55" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.5" />
    </g>
  `;
}

function drawUranus() {
  return `
    <!-- Uranus base -->
    <circle cx="500" cy="278" r="139" fill="#7fdbff" />

    <!-- Atmospheric subtle bands -->
    <ellipse cx="500" cy="260" rx="139" ry="12" fill="#6ec8e9" opacity="0.4" />
    <ellipse cx="500" cy="278" rx="139" ry="14" fill="#62b4d8" opacity="0.4" />
    <ellipse cx="500" cy="296" rx="139" ry="12" fill="#5aa2c6" opacity="0.35" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="139" rx="60" ry="20" fill="white" opacity="0.12" />
    <ellipse cx="500" cy="417" rx="60" ry="20" fill="white" opacity="0.12" />

    <!-- Small swirl / cloud feature -->
    <circle cx="460" cy="290" r="20" fill="#54a3b9" opacity="0.5" />
    <circle cx="540" cy="260" r="17" fill="#6dc3e3" opacity="0.45" />
  `;
}

function drawNeptune() {
  return `
    <!-- Neptune base -->
    <circle cx="500" cy="278" r="139" fill="#3b5ca8" />

    <!-- Atmospheric subtle bands -->
    <ellipse cx="500" cy="260" rx="139" ry="12" fill="#345292" opacity="0.45" />
    <ellipse cx="500" cy="278" rx="139" ry="14" fill="#2f4b7f" opacity="0.45" />
    <ellipse cx="500" cy="296" rx="139" ry="12" fill="#2a456f" opacity="0.4" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="139" rx="60" ry="20" fill="white" opacity="0.1" />
    <ellipse cx="500" cy="417" rx="60" ry="20" fill="white" opacity="0.1" />

    <!-- Cloud spots -->
    <circle cx="460" cy="290" r="25" fill="#4064c7" opacity="0.6" />
    <circle cx="530" cy="250" r="20" fill="#4a71d2" opacity="0.55" />
    <circle cx="520" cy="320" r="15" fill="#3a56a0" opacity="0.5" />
  `;
}

function drawPluto() {
  return `
    <!-- Pluto base -->
    <circle cx="500" cy="278" r="139" fill="#c2b29e" />

    <!-- Surface patches -->
    <circle cx="460" cy="290" r="25" fill="#a89987" opacity="0.7" />
    <circle cx="540" cy="260" r="20" fill="#bfb7a8" opacity="0.65" />
    <circle cx="520" cy="320" r="15" fill="#9f8f7d" opacity="0.6" />
    <circle cx="480" cy="310" r="10" fill="#b0a596" opacity="0.6" />

    <!-- Icy heart -->
    <path
      d="
        M 500 300
        C 500 250, 440 250, 440 300
        C 440 350, 500 370, 500 400
        C 500 370, 560 350, 560 300
        C 560 250, 500 250, 500 300
        Z
      "
      fill="#e9e6e1"
      opacity="0.9"
    />

    <!-- Slight shadow for depth -->
    <ellipse cx="470" cy="320" rx="100" ry="50" fill="black" opacity="0.1" />
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
  const terminatorSweepFlag = clampedFraction < 0.5 ? 0 : 1;

  return `
    <defs>
      <clipPath id="moon-clip">
        <circle cx="500" cy="278" r="139" />
      </clipPath>
      <clipPath id="moon-lit-area">
        <path
          d="
            M 500 139
            A 139 139 0 0 1 500 417
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
        A 139 139 0 0 1 500 417
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
