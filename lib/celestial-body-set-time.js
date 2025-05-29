import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";

export function drawCelestialBodySettingTime(
  astronomyJS,
  celestialBody,
  sizeInPixels,
) {
  let settingTime = astronomyJS.getEphemerisDateForObject(
    celestialBody,
    astronomyJS.getDate(),
    "SET",
  );
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody);
  svg += drawFirstRowText("Rise");
  svg += drawSecondRowText(
    settingTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );
  svg += endSvg(svg);
  return svg;
}
