function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function linearInterpolation(a, b, t) {
  return a + (b - a) * t;
}

export function inverseLinearInterpolation(smaller, bigger, value) {
  return (value - smaller) / (bigger - smaller);
}

export function interpolateColor(color1, color2, t) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  return rgbToHex({
    r: Math.round(linearInterpolation(c1.r, c2.r, t)),
    g: Math.round(linearInterpolation(c1.g, c2.g, t)),
    b: Math.round(linearInterpolation(c1.b, c2.b, t)),
  });
}
