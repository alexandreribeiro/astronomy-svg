import { describe, expect, it } from "vitest";
import { drawMoonPhase, getMoonPhaseName } from "../lib/moon-phase.js";

describe("moon phase names", () => {
  it.each([
    [0, true, "New Moon"],
    [0.099, true, "New Moon"],
    [0.1, true, "Wax Crescent"],
    [0.2, true, "Wax Crescent"],
    [0.45, true, "First Quarter"],
    [0.5, true, "First Quarter"],
    [0.55, true, "First Quarter"],
    [0.8, true, "Wax Gibbous"],
    [0.95, true, "Wax Gibbous"],
    [0.951, true, "Full Moon"],
    [1, false, "Full Moon"],
    [0.951, false, "Full Moon"],
    [0.95, false, "Wan Gibbous"],
    [0.8, false, "Wan Gibbous"],
    [0.55, false, "Last Quarter"],
    [0.5, false, "Last Quarter"],
    [0.45, false, "Last Quarter"],
    [0.2, false, "Wan Crescent"],
    [0.1, false, "Wan Crescent"],
    [0.099, false, "New Moon"],
  ])("returns %s / %s as %s", (illuminatedFraction, isWaxing, phaseName) => {
    expect(getMoonPhaseName(illuminatedFraction, isWaxing)).toBe(phaseName);
  });
});

describe("moon phase tile", () => {
  it("draws the current moon with percent, trend, and phase name", () => {
    const now = new Date("2026-05-30T12:00:00Z");
    const applicationContext = {
      astronomyJS: {
        getDate() {
          return now;
        },
        getIlluminatedFractionForObject(_, date) {
          return date ? 0.75 : 0.74;
        },
      },
    };

    const svg = drawMoonPhase(applicationContext, 100);

    expect(svg).toContain("74% ▲");
    expect(svg).toContain("Wax Gibbous");
    expect(svg).toContain('x="500" y="660"');
    expect(svg).toContain('x="500" y="833"');
    expect(svg).not.toContain("phase-shadow-disk");
    expect(svg).not.toContain("Visible at");
  });
});
