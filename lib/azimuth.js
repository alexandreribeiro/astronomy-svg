import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import {
  drawFirstRowText,
  drawSecondRowText,
  getAzimuthWithZoneLabel,
} from "./utils/labels.js";

export function drawAzimuth(applicationContext, celestialBody, sizeInPixels) {
  let astronomyJS = applicationContext.astronomyJS;
  let azimuth =
    astronomyJS.getAltitudeAzimuthCoordinatesForObject(celestialBody).azimuth;
  let illuminatedFraction =
    astronomyJS.getIlluminatedFractionForObject(celestialBody);
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody, {
    illuminatedFraction: illuminatedFraction,
    isWaxing:
      astronomyJS.getIlluminatedFractionForObject(
        celestialBody,
        new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
      ) > illuminatedFraction,
  });
  svg += drawFirstRowText("Azimuth");
  svg += drawSecondRowText(getAzimuthWithZoneLabel(azimuth));
  svg += endSvg(svg);
  return svg;
}
