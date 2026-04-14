import { endSvg, startSquareSvg } from "./svg.js";
import { drawCelestialBody } from "./draw-celestial-body.js";
import { defineSkyLinearGradient } from "./utils/sky-gradient.js";

export function drawMultiCelestialBodyVisibilityMap(
  applicationContext,
  celestialBodyList,
  sizeInPixels,
  azimuthReference,
) {
  let astronomyJS = applicationContext.astronomyJS;
  let sunAltitude =
    astronomyJS.getAltitudeAzimuthCoordinatesForObject("Sun").altitude;
  let svg = startSquareSvg(sizeInPixels, "black");

  let radius = 380;
  let cx = 500;
  let cy = 520;

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

  for (let celestialBody of celestialBodyList) {
    let altAzCoordinates =
      astronomyJS.getAltitudeAzimuthCoordinatesForObject(celestialBody);
    let illuminatedFraction =
      astronomyJS.getIlluminatedFractionForObject(celestialBody);
    if (altAzCoordinates.altitude < 0) {
      continue;
    }
    let radiusFromCenter = radius * (1 - altAzCoordinates.altitude / 90);
    let theta = (altAzCoordinates.azimuth - 90) * (Math.PI / 180);
    let celestialBodyX = cx + radiusFromCenter * Math.cos(theta);
    let celestialBodyY = cy + radiusFromCenter * Math.sin(theta);
    svg += `<g transform="translate(${celestialBodyX - 500}, ${celestialBodyY - 279})
              translate(500, 279) scale(0.3) translate(-500, -279)">`;
    svg += drawCelestialBody(celestialBody, {
      isGrayScale: false,
      illuminatedFraction: illuminatedFraction,
      isWaxing:
        astronomyJS.getIlluminatedFractionForObject(
          celestialBody,
          new Date(astronomyJS.getDate().getTime() + 5 * 60 * 1000),
        ) > illuminatedFraction,
    });
    svg += `</g>`;
  }

  svg += `</g>`;

  svg += defineSkyLinearGradient(sunAltitude);
  svg += endSvg(svg);
  return svg;
}
