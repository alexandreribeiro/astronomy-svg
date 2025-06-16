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
    astronomyJS.getAltAzCoordinatesForObject(celestialBody).latitude;
  let oldAltitude = astronomyJS.getAltAzCoordinatesForObject(
    celestialBody,
    new Date(astronomyJS.getDate() - 5 * 60 * 1000),
  ).latitude;
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody);
  svg += drawFirstRowText("Altitude");
  svg += drawSecondRowText(getAltitudeLabel(altitude, oldAltitude));
  svg += endSvg(svg);
  return svg;
}
