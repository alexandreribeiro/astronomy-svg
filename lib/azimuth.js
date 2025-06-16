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
    astronomyJS.getAltAzCoordinatesForObject(celestialBody).longitude;
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody);
  svg += drawFirstRowText("Azimuth");
  svg += drawSecondRowText(getAzimuthWithZoneLabel(azimuth));
  svg += endSvg(svg);
  return svg;
}
