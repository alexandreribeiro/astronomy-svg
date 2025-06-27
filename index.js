import { AstronomyJS } from "astronomy-js";
import { drawAzimuth } from "./lib/azimuth.js";
import { drawAltitude } from "./lib/altitude.js";
import { drawSunAltitudePath } from "./lib/sun-altitude-path.js";
import { drawCelestialBodyRiseTime } from "./lib/celestial-body-rise-time.js";
import { drawCelestialBodySettingTime } from "./lib/celestial-body-set-time.js";
import { drawCelestialBodyVisibility } from "./lib/celestial-body-visibility.js";
import { drawCelestialBodyVisibilityMap } from "./lib/celestial-body-visibility-map.js";
import { drawMultiCelestialBodyVisibilityMap } from "./lib/multi-celestial-body-visibility-map.js";
import {
  drawCurrentTime,
  drawCurrentTimeWide,
} from "./lib/draw-current-time.js";

export class AstronomySVG {
  applicationContext = {
    astronomyJS: null,
    locale: null,
    timezone: null,
  };

  constructor() {
    this.applicationContext.astronomyJS = new AstronomyJS();
  }

  getDate() {
    return this.applicationContext.astronomyJS.getDate();
  }

  setDate(newDate) {
    this.applicationContext.astronomyJS.setDate(newDate);
  }

  setLocale(locale) {
    this.applicationContext.locale = locale;
  }

  setTimezone(timezone) {
    this.applicationContext.timezone = timezone;
  }

  setLocation(latitude, longitude) {
    this.applicationContext.astronomyJS.setLocation(
      "Earth",
      latitude,
      longitude,
      0,
    );
  }

  getLocation() {
    return this.applicationContext.astronomyJS.getLatitudeLongitudeCoordinates();
  }

  static initialize(latitude, longitude) {
    let astronomySVG = new AstronomySVG();
    astronomySVG.setDate(new Date());
    astronomySVG.setLocation(latitude, longitude);
    return astronomySVG;
  }

  drawAzimuth(celestialBody, width) {
    return drawAzimuth(this.applicationContext, celestialBody, width);
  }

  drawAltitude(celestialBody, width) {
    return drawAltitude(this.applicationContext, celestialBody, width);
  }

  drawSunAltitudePath(width, isRectangular, shouldDrawTime = false) {
    return drawSunAltitudePath(
      this.applicationContext,
      width,
      isRectangular,
      shouldDrawTime,
    );
  }

  drawCelestialBodyRiseTime(celestialBody, width) {
    return drawCelestialBodyRiseTime(
      this.applicationContext,
      celestialBody,
      width,
    );
  }

  drawCelestialBodySettingTime(celestialBody, width) {
    return drawCelestialBodySettingTime(
      this.applicationContext,
      celestialBody,
      width,
    );
  }

  drawCelestialBodyVisibility(celestialBody, width) {
    return drawCelestialBodyVisibility(
      this.applicationContext,
      celestialBody,
      width,
    );
  }

  drawCurrentTime(width) {
    return drawCurrentTime(this.applicationContext, width);
  }

  drawCurrentTimeWide(width) {
    return drawCurrentTimeWide(this.applicationContext, width);
  }

  drawCelestialBodyVisibilityMap(celestialBody, width, azimuthReference) {
    return drawCelestialBodyVisibilityMap(
      this.applicationContext,
      celestialBody,
      width,
      azimuthReference,
    );
  }

  drawMultiCelestialBodyVisibilityMap(
    celestialBodyList,
    width,
    azimuthReference,
  ) {
    return drawMultiCelestialBodyVisibilityMap(
      this.applicationContext,
      celestialBodyList,
      width,
      azimuthReference,
    );
  }
}

export function initialize(latitude, longitude) {
  return AstronomySVG.initialize(latitude, longitude);
}
