import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";

export function drawCelestialBodyRiseTime(
  astronomyJS,
  celestialBody,
  sizeInPixels,
) {
  let riseTime = astronomyJS.getEphemerisDateForObject(
    celestialBody,
    astronomyJS.getDate(),
    "RISE",
  );
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody);
  svg += drawFirstRowText("Rise");
  svg += drawSecondRowText(
    riseTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );
  svg += endSvg(svg);
  return svg;
}
