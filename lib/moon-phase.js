import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";

const PHASE_BOUNDARIES = {
  newMoon: 0.1,
  quarterStart: 0.45,
  quarterEnd: 0.55,
  fullMoon: 0.95,
};

function clampIlluminatedFraction(illuminatedFraction) {
  return Math.max(0, Math.min(1, illuminatedFraction));
}

export function getMoonPhaseName(illuminatedFraction, isWaxing) {
  const clampedFraction = clampIlluminatedFraction(illuminatedFraction);

  if (clampedFraction < PHASE_BOUNDARIES.newMoon) {
    return "New Moon";
  }

  if (clampedFraction > PHASE_BOUNDARIES.fullMoon) {
    return "Full Moon";
  }

  if (isWaxing) {
    if (clampedFraction < PHASE_BOUNDARIES.quarterStart) {
      return "Wax Crescent";
    }

    if (clampedFraction <= PHASE_BOUNDARIES.quarterEnd) {
      return "First Quarter";
    }

    return "Wax Gibbous";
  }

  if (clampedFraction > PHASE_BOUNDARIES.quarterEnd) {
    return "Wan Gibbous";
  }

  if (clampedFraction >= PHASE_BOUNDARIES.quarterStart) {
    return "Last Quarter";
  }

  return "Wan Crescent";
}

function getTrendTriangle(isWaxing) {
  return isWaxing ? "▲" : "▼";
}

export function drawMoonPhase(applicationContext, sizeInPixels) {
  let astronomyJS = applicationContext.astronomyJS;
  let illuminatedFraction = astronomyJS.getIlluminatedFractionForObject("Moon");
  let futureIlluminatedFraction = astronomyJS.getIlluminatedFractionForObject(
    "Moon",
    new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
  );
  let isWaxing = futureIlluminatedFraction > illuminatedFraction;
  let percentIlluminated = Math.round(
    clampIlluminatedFraction(illuminatedFraction) * 100,
  );
  let phaseName = getMoonPhaseName(illuminatedFraction, isWaxing);

  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody("Moon", {
    illuminatedFraction: illuminatedFraction,
    isWaxing: isWaxing,
  });
  svg += drawFirstRowText(
    `${percentIlluminated}% ${getTrendTriangle(isWaxing)}`,
  );
  svg += drawSecondRowText(phaseName);
  svg += endSvg(svg);
  return svg;
}
