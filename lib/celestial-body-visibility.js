import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import {
  drawFirstRowText,
  drawSecondRowText,
  getAltitudeLabel,
  getAzimuthWithZoneLabel,
} from "./utils/labels.js";

export function drawCelestialBodyVisibility(
  applicationContext,
  celestialBody,
  sizeInPixels,
) {
  let astronomyJS = applicationContext.astronomyJS;
  let altAzCoordinates =
    astronomyJS.getAltAzCoordinatesForObject(celestialBody);
  let svg = startSquareSvg(sizeInPixels, "black");
  if (altAzCoordinates.latitude < 0) {
    svg += drawCelestialBody(celestialBody, true);
    let riseTime = astronomyJS.getEphemerisDateForObject(
      celestialBody,
      astronomyJS.getDate(),
      "RISE",
    );
    svg += drawFirstRowText("Visible at");
    svg += drawSecondRowText(
      riseTime.toLocaleTimeString(applicationContext.locale ?? [], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        ...(applicationContext.timezone
          ? { timeZone: applicationContext.timezone }
          : {}),
      }),
    );
  } else {
    let oldAltitude = astronomyJS.getAltAzCoordinatesForObject(
      celestialBody,
      new Date(astronomyJS.getDate() - 5 * 60 * 1000),
    ).latitude;
    svg += drawFirstRowText(
      getAltitudeLabel(altAzCoordinates.latitude, oldAltitude),
    );
    svg += drawSecondRowText(
      getAzimuthWithZoneLabel(altAzCoordinates.longitude),
    );
    svg += drawCelestialBody(celestialBody);
  }
  svg += endSvg(svg);
  return svg;
}
