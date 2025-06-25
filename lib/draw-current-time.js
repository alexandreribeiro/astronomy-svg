import { endSvg, startSquareSvg } from "./svg.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";

export function drawCurrentTime(applicationContext, sizeInPixels) {
  let astronomyJS = applicationContext.astronomyJS;
  const now = astronomyJS.getDate();
  let svg = startSquareSvg(sizeInPixels, "black");
  svg += drawClock(applicationContext);
  svg += drawFirstRowText(
    now.toLocaleDateString(applicationContext.locale ?? [], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...(applicationContext.timezone
        ? { timeZone: applicationContext.timezone }
        : {}),
    }),
  );
  svg += drawSecondRowText(
    now.toLocaleTimeString(applicationContext.locale ?? [], {
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

function drawClock(applicationContext) {
  let astronomyJS = applicationContext.astronomyJS;
  const now = astronomyJS.getDate();
  let currentHour = now.toLocaleTimeString(applicationContext.locale ?? [], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...(applicationContext.timezone
      ? { timeZone: applicationContext.timezone }
      : {}),
  });
  let hourAngle =
    ((parseInt(currentHour.split(":")[0]) % 12) +
      currentHour.split(":")[1] / 60) *
    30;
  let minuteAngle = parseInt(currentHour.split(":")[1]) * 6;

  let svg = `<!-- Clock circle -->
    <circle cx="500" cy="278" r="180" stroke="#fff" stroke-width="4" />
    <g transform="rotate(${hourAngle}, 500, 278)">
    <line id="hour-hand" x1="500" y1="278" x2="500" y2="188" stroke="#fff" stroke-width="15" stroke-linecap="round" />
    </g>
    <g transform="rotate(${minuteAngle}, 500, 278)">
    <line id="minute-hand" x1="500" y1="278" x2="500" y2="138" stroke="#fff" stroke-width="12" stroke-linecap="round" />
    </g>
    <circle cx="500" cy="278" r="10" fill="#fff" />`;
  for (let i = 0; i < 12; i++) {
    const angle = i * 30; // 360 / 12 = 30 degrees per hour
    svg += `
    <g transform="rotate(${angle}, 500, 278)">
      <line x1="500" y1="98" x2="500" y2="118" stroke="#fff" stroke-width="6" />
    </g>
  `;
  }
  return svg;
}
