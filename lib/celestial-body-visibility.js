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
  let altitudeAzimuthCoordinates =
    astronomyJS.getAltitudeAzimuthCoordinatesForObject(celestialBody);
  let illuminatedFraction =
    astronomyJS.getIlluminatedFractionForObject(celestialBody);
  let svg = startSquareSvg(sizeInPixels, "black");
  if (altitudeAzimuthCoordinates.altitude < 0) {
    svg += drawCelestialBody(celestialBody, {
      drawNotVisibleSymbol: true,
      illuminatedFraction: illuminatedFraction,
      isWaxing:
        astronomyJS.getIlluminatedFractionForObject(
          celestialBody,
          new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
        ) > illuminatedFraction,
    });
    let riseTime = astronomyJS.getEphemerisDateForObject(
      celestialBody,
      astronomyJS.getDate(),
      celestialBody === "Sun" ? "SUNRISE" : "RISE",
    );
    svg += drawFirstRowText("Visible at");
    svg += drawSecondRowText(
      riseTime
        ? riseTime.toLocaleTimeString(applicationContext.locale ?? undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            ...(applicationContext.timezone
              ? { timeZone: applicationContext.timezone }
              : {}),
          })
        : "-",
    );
  } else {
    let oldAltitude = astronomyJS.getAltitudeAzimuthCoordinatesForObject(
      celestialBody,
      new Date(astronomyJS.getDate().getTime() - 5 * 60 * 1000),
    ).altitude;
    svg += drawFirstRowText(
      getAltitudeLabel(altitudeAzimuthCoordinates.altitude, oldAltitude),
    );
    svg += drawSecondRowText(
      getAzimuthWithZoneLabel(altitudeAzimuthCoordinates.azimuth),
    );
    svg += drawCelestialBody(celestialBody, {
      illuminatedFraction: illuminatedFraction,
      isWaxing:
        astronomyJS.getIlluminatedFractionForObject(
          celestialBody,
          new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
        ) > illuminatedFraction,
    });
  }
  svg += endSvg(svg);
  return svg;
}
