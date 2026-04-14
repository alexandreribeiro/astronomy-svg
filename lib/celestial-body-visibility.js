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
    astronomyJS.getAltitudeAzimuthCoordinatesForObject(celestialBody);
  let illuminatedFraction =
    astronomyJS.getIlluminatedFractionForObject(celestialBody);
  let svg = startSquareSvg(sizeInPixels, "black");
  if (altAzCoordinates.altitude < 0) {
    svg += drawCelestialBody(celestialBody, {
      isGrayScale: true,
      illuminatedFraction: illuminatedFraction,
      isWaxing:
        astronomyJS.getIlluminatedFractionForObject(
          celestialBody,
          new Date(astronomyJS.getDate() + 5 * 60 * 1000),
        ) > illuminatedFraction,
    });
    let riseTime = astronomyJS.getEphemerisDateForObject(
      celestialBody,
      astronomyJS.getDate(),
      celestialBody === "Sun" ? "SUNRISE" : "RISE",
    );
    svg += drawFirstRowText("Visible at");
    svg += drawSecondRowText(
      riseTime.toLocaleTimeString(applicationContext.locale ?? undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        ...(applicationContext.timezone
          ? { timeZone: applicationContext.timezone }
          : {}),
      }),
    );
  } else {
    let oldAltitude = astronomyJS.getAltitudeAzimuthCoordinatesForObject(
      celestialBody,
      new Date(astronomyJS.getDate() - 5 * 60 * 1000),
    ).altitude;
    svg += drawFirstRowText(
      getAltitudeLabel(altAzCoordinates.altitude, oldAltitude),
    );
    svg += drawSecondRowText(getAzimuthWithZoneLabel(altAzCoordinates.azimuth));
    svg += drawCelestialBody(celestialBody, false, illuminatedFraction);
  }
  svg += endSvg(svg);
  return svg;
}
