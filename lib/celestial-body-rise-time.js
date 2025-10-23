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
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody);
  svg += drawFirstRowText("Rise");
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
  svg += endSvg(svg);
  return svg;
}
