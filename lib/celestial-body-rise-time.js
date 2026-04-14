import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";

export function drawCelestialBodyRiseTime(
  applicationContext,
  celestialBody,
  sizeInPixels,
) {
  let astronomyJS = applicationContext.astronomyJS;
  let riseTime = astronomyJS.getEphemerisDateForObject(
    celestialBody,
    astronomyJS.getDate(),
    celestialBody === "Sun" ? "SUNRISE" : "RISE",
  );
  let illuminatedFraction =
    astronomyJS.getIlluminatedFractionForObject(celestialBody);
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody, {
    isGrayScale: false,
    illuminatedFraction: illuminatedFraction,
    isWaxing:
      astronomyJS.getIlluminatedFractionForObject(
        celestialBody,
        new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
      ) > illuminatedFraction,
  });
  svg += drawFirstRowText("Rise");
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
  svg += endSvg(svg);
  return svg;
}
