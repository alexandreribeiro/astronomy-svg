import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";

export function drawCelestialBodySettingTime(
  applicationContext,
  celestialBody,
  sizeInPixels,
) {
  let astronomyJS = applicationContext.astronomyJS;
  let settingTime = astronomyJS.getEphemerisDateForObject(
    celestialBody,
    astronomyJS.getDate(),
    "SET",
  );
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawCelestialBody(celestialBody);
  svg += drawFirstRowText("Set");
  svg += drawSecondRowText(
    settingTime.toLocaleTimeString(applicationContext.locale ?? [], {
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
