import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { drawFirstRowText, drawSecondRowText } from "./utils/labels.js";
import { defineSkyLinearGradient } from "./utils/sky-gradient.js";

export function drawCelestialBodyVisibilityMap(
  applicationContext,
  celestialBody,
  sizeInPixels,
  azimuthReference,
) {
  let astronomyJS = applicationContext.astronomyJS;
  let sunAltitude = astronomyJS.getAltAzCoordinatesForObject("Sun").latitude;
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
    let radius = 380;
    let cx = 500;
    let cy = 520;
    let radiusFromCenter = radius * (1 - altAzCoordinates.latitude / 90);
    let theta = (altAzCoordinates.longitude - 90) * (Math.PI / 180);
    let celestialBodyX = cx + radiusFromCenter * Math.cos(theta);
    let celestialBodyY = cy + radiusFromCenter * Math.sin(theta);
    svg += `<rect x="0" y="0" width="1000" height="1000" fill="url(#sky-${sunAltitude})" />`;
    if (azimuthReference !== undefined && azimuthReference !== 0) {
      svg += `
            <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${cx}" y="${cy - radius - 60}">${azimuthReference}</text>
          </g>
          <g transform="rotate(${360 - azimuthReference} ${cx} ${cy})">
        `;
    } else {
      svg += `<g>`;
    }
    svg += `
          <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="white" stroke-width="15" />
          <circle cx="${cx}" cy="${cy}" r="${radius / 2}" fill="none" stroke="white" stroke-width="8" />
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${cx}" y="${cy - radius - 60}">N</text>
          </g>
        `;
    svg += `<g transform="translate(${celestialBodyX - 500}, ${celestialBodyY - 279})
                translate(500, 279) scale(0.3) translate(-500, -279)">`;
    svg += drawCelestialBody(celestialBody);
    svg += `</g></g>`;
  }

  svg += defineSkyLinearGradient(sunAltitude);
  svg += endSvg(svg);
  return svg;
}
