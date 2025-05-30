import { AstronomyJS } from "astronomyjs";
import { drawAzimuth } from "./lib/azimuth.js";
import { drawAltitude } from "./lib/altitude.js";
import { drawSunAltitudePath } from "./lib/sun-altitude-path.js";
import { drawCelestialBodyRiseTime } from "./lib/celestial-body-rise-time.js";
import { drawCelestialBodySettingTime } from "./lib/celestial-body-set-time.js";
import { drawCelestialBodyVisibility } from "./lib/celestial-body-visibility.js";
import { drawCelestialBodyVisibilityMap } from "./lib/celestial-body-visibility-map.js";

export class AstronomySVG {
  constructor() {
    this.astronomyJS = new AstronomyJS();
  }

  getDate() {
    return this.astronomyJS.getDate();
  }

  setDate(newDate) {
    this.astronomyJS.setDate(newDate);
  }

  setLocation(latitude, longitude) {
    this.astronomyJS.setLocation("Earth", latitude, longitude, 0);
  }

  static initialize(latitude, longitude) {
    let astronomySVG = new AstronomySVG();
    astronomySVG.setDate(new Date());
    astronomySVG.setLocation(latitude, longitude);
    return astronomySVG;
  }

  drawAzimuth(celestialBody, width) {
    return drawAzimuth(this.astronomyJS, celestialBody, width);
  }

  drawAltitude(celestialBody, width) {
    return drawAltitude(this.astronomyJS, celestialBody, width);
  }

  drawSunAltitudePath(width, isRectangular) {
    return drawSunAltitudePath(this.astronomyJS, width, isRectangular);
  }

  drawCelestialBodyRiseTime(celestialBody, width) {
    return drawCelestialBodyRiseTime(this.astronomyJS, celestialBody, width);
  }

  drawCelestialBodySettingTime(celestialBody, width) {
    return drawCelestialBodySettingTime(this.astronomyJS, celestialBody, width);
  }

  drawCelestialBodyVisibility(celestialBody, width) {
    return drawCelestialBodyVisibility(this.astronomyJS, celestialBody, width);
  }

  drawCelestialBodyVisibilityMap(celestialBody, width, azimuthReference) {
    return drawCelestialBodyVisibilityMap(
      this.astronomyJS,
      celestialBody,
      width,
      azimuthReference,
    );
  }
}

export function initialize(latitude, longitude) {
  return AstronomySVG.initialize(latitude, longitude);
}
