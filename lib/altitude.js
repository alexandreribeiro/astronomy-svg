import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import {
  drawFirstRowText,
  drawSecondRowText,
  getAltitudeLabel,
} from "./utils/labels.js";

export function drawAltitude(applicationContext, celestialBody, sizeInPixels) {
  let astronomyJS = applicationContext.astronomyJS;
  let altitude =
    astronomyJS.getAltitudeAzimuthCoordinatesForObject(celestialBody).altitude;
  let illuminatedFraction =
    astronomyJS.getIlluminatedFractionForObject(celestialBody);
  let oldAltitude = astronomyJS.getAltitudeAzimuthCoordinatesForObject(
    celestialBody,
    new Date(astronomyJS.getDate().getTime() - 5 * 60 * 1000),
  ).altitude;
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody, {
    illuminatedFraction: illuminatedFraction,
    isWaxing:
      astronomyJS.getIlluminatedFractionForObject(
        celestialBody,
        new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
      ) > illuminatedFraction,
  });
  svg += drawFirstRowText("Altitude");
  svg += drawSecondRowText(getAltitudeLabel(altitude, oldAltitude));
  svg += endSvg(svg);
  return svg;
}
