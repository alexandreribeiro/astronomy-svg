import { describe, expect, it } from "vitest";
import { drawCelestialBodyAltitudePath } from "./celestial-body-altitude-path.js";
import { drawSunAltitudePath } from "./sun-altitude-path.js";

function createApplicationContext() {
  const now = new Date("2026-05-30T12:00:00Z");

  return {
    astronomyJS: {
      getDate() {
        return now;
      },
      getAltitudeAzimuthCoordinatesForObject(celestialBody) {
        if (celestialBody === "Sun") {
          return { altitude: -1, azimuth: 180 };
        }

        return { altitude: 10, azimuth: 180 };
      },
      getIlluminatedFractionForObject() {
        return 0.5;
      },
    },
  };
}

describe("altitude path sunlight glow", () => {
  it("clips the Sun altitude path glow to the sky side", () => {
    const svg = drawSunAltitudePath(createApplicationContext(), 1000, false);

    expect(svg).toMatch(
      /<ellipse[^>]+fill="url\(#twilight-glow-[^)]+\)" clip-path="url\(#bottom-half-clip\)" \/>/,
    );
  });

  it("clips the celestial body altitude path glow to the sky side", () => {
    const svg = drawCelestialBodyAltitudePath(
      createApplicationContext(),
      "Moon",
      1000,
      false,
    );

    expect(svg).toMatch(
      /<ellipse[^>]+fill="url\(#twilight-glow-[^)]+\)" clip-path="url\(#bottom-half-clip\)" \/>/,
    );
  });
});
