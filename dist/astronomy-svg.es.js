/*! MIT License

Copyright (c) 2025 Alexandre Ribeiro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
var wn = Object.defineProperty;
var Tn = (r, e, t) => e in r ? wn(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Ct = (r, e, t) => Tn(r, typeof e != "symbol" ? e + "" : e, t);
const N = {
  SOLAR_SYSTEM_OBJECT: "SOLAR_SYSTEM_OBJECT",
  GREENWICH_OBSERVATORY_COORDINATES: {
    LATITUDE: 51.476852,
    LONGITUDE: -5e-4,
    RADIUS: 6371046
  },
  EPHEMERIS_TYPE: {
    RISE: {
      NAME: "RISE",
      ALTITUDE: "-0.833",
      IS_GOING_UP: !0
    },
    SET: {
      NAME: "SET",
      ALTITUDE: "-0.833",
      IS_GOING_UP: !1
    },
    TRANSIT: {
      NAME: "TRANSIT",
      ALTITUDE: null,
      IS_GOING_UP: null
    },
    CIVIL_TWILIGHT_START: {
      NAME: "CIVIL_TWILIGHT_START",
      ALTITUDE: "-6",
      IS_GOING_UP: !0
    },
    CIVIL_TWILIGHT_END: {
      NAME: "CIVIL_TWILIGHT_END",
      ALTITUDE: "-6",
      IS_GOING_UP: !1
    },
    NAUTICAL_TWILIGHT_START: {
      NAME: "NAUTICAL_TWILIGHT_START",
      ALTITUDE: "-12",
      IS_GOING_UP: !0
    },
    NAUTICAL_TWILIGHT_END: {
      NAME: "NAUTICAL_TWILIGHT_END",
      ALTITUDE: "-12",
      IS_GOING_UP: !1
    },
    ASTRONOMICAL_TWILIGHT_START: {
      NAME: "ASTRONOMICAL_TWILIGHT_START",
      ALTITUDE: "-18",
      IS_GOING_UP: !0
    },
    ASTRONOMICAL_TWILIGHT_END: {
      NAME: "ASTRONOMICAL_TWILIGHT_END",
      ALTITUDE: "-18",
      IS_GOING_UP: !1
    }
  },
  MS_PER_DAY: 864e5,
  JULIAN_DAY_OFFSET: 24405875e-1,
  JULIAN_DAY_2000: 2451545,
  EPS: Math.pow(10, -9),
  NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS: 5,
  DAYS_PER_JULIAN_CENTURY: 36525
};
class g {
  static modDegrees(e) {
    for (; e < 0; )
      e = e + 360;
    return e % 360;
  }
  static mod180Degrees(e) {
    const t = this.modDegrees(e);
    return t > 180 ? t - 360 : t;
  }
  static modRadians(e) {
    for (; e < 0; )
      e = e + 2 * Math.PI;
    return e % (2 * Math.PI);
  }
  static modPiRadians(e) {
    const t = this.modRadians(e);
    return e > Math.PI ? t - 2 * Math.PI : t;
  }
  static radiansToDegrees(e) {
    return e * 180 / Math.PI;
  }
  static degreesToRadians(e) {
    return e * Math.PI / 180;
  }
  static padZero(e) {
    return e = e.toString(), e.length >= 2 ? e : "0" + e;
  }
}
class B {
  static julianDate(e) {
    return e / N.MS_PER_DAY + N.JULIAN_DAY_OFFSET;
  }
  static julianDateToDate(e) {
    return new Date(
      (e - N.JULIAN_DAY_OFFSET) * N.MS_PER_DAY
    );
  }
  static julianDaysSinceEpoch2000(e) {
    return e - N.JULIAN_DAY_2000;
  }
  static julianCenturiesSinceEpoch2000(e) {
    return this.julianDaysSinceEpoch2000(e) / N.DAYS_PER_JULIAN_CENTURY;
  }
  static meanSiderealTime(e) {
    const t = this.julianDaysSinceEpoch2000(e), n = this.julianCenturiesSinceEpoch2000(e), s = 280.46061837 + 360.98564736629 * t + 387933e-9 * n * n - n * n * n / 3871e4;
    return g.modDegrees(s);
  }
}
class De {
  constructor(e, t, n) {
    this.x = e, this.y = t, this.z = n;
  }
  minus(e) {
    return new De(
      this.x - e.x,
      this.y - e.y,
      this.z - e.z
    );
  }
}
class Q {
  constructor(e, t, n) {
    this.latitude = e, this.longitude = t, this.radius = n;
  }
  toDegrees() {
    let e = this.latitude, t = this.longitude;
    return new Q(
      `${e < 0 ? "-" : ""}${g.padZero(0 | (e < 0 ? e = -e : e))}° ${g.padZero(0 | e % 1 * 60)}' ${g.padZero(0 | e * 60 % 1 * 60)}''`,
      `${t < 0 ? "-" : ""}${g.padZero(0 | (t < 0 ? t = -t : t))}° ${g.padZero(0 | t % 1 * 60)}' ${g.padZero(0 | t * 60 % 1 * 60)}''`,
      this.radius
    );
  }
  toHours() {
    let e = this.latitude, t = this.longitude;
    return new Q(
      `${e < 0 ? "-" : ""}${g.padZero(0 | (e < 0 ? e = -e : e))}° ${g.padZero(0 | e % 1 * 60)}' ${g.padZero(0 | e * 60 % 1 * 60)}''`,
      `${t < 0 ? "-" : ""}${g.padZero(0 | (t < 0 ? t = -t / 15 : t = t / 15))}h ${g.padZero(0 | t % 1 * 60)}m ${g.padZero(0 | t * 60 % 1 * 60)}s`,
      this.radius
    );
  }
}
class At {
  constructor(e, t) {
    this.sphericalCoordinates = e || new Q(
      N.GREENWICH_OBSERVATORY_COORDINATES.LATITUDE,
      N.GREENWICH_OBSERVATORY_COORDINATES.LONGITUDE,
      N.GREENWICH_OBSERVATORY_COORDINATES.RADIUS
    ), this.solarSystemObject = t;
  }
  getRectangularObjectCentricCoordinatesForSolarSystemObject(e, t) {
    return e.getRectangularHeliocentricCoordinates(t).minus(
      this.solarSystemObject.getRectangularHeliocentricCoordinates(
        t
      )
    );
  }
  getRectangularEquatorialCoordinatesForSolarSystemObject(e, t) {
    const n = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(
      e,
      t
    ), s = g.degreesToRadians(
      this.solarSystemObject.axialTilt
    );
    return new De(
      n.x,
      n.y * Math.cos(s) - n.z * Math.sin(s),
      n.y * Math.sin(s) + n.z * Math.cos(s)
    );
  }
  getDistanceToSolarSystemObject(e, t) {
    const n = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(
      e,
      t
    );
    return Math.sqrt(
      Math.pow(n.x, 2) + Math.pow(n.y, 2) + Math.pow(n.z, 2)
    );
  }
  getRADecCoordinatesForSolarSystemObject(e, t) {
    const n = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      e,
      t
    ), s = n.x > 0 && n.y < 0 ? 360 : n.x < 0 ? 180 : 0, i = g.radiansToDegrees(
      Math.atan(n.y / n.x)
    ) + s, a = g.radiansToDegrees(
      Math.atan(
        n.z / Math.sqrt(
          Math.pow(n.x, 2) + Math.pow(n.y, 2)
        )
      )
    );
    return new Q(
      a,
      i,
      this.getDistanceToSolarSystemObject(e, t)
    );
  }
  getHADecCoordinatesForSolarSystemObject(e, t) {
    const n = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      e,
      t
    ), s = n.x > 0 && n.y < 0 ? 360 : n.x < 0 ? 180 : 0, i = g.radiansToDegrees(
      Math.atan(n.y / n.x)
    ) + s, a = g.modDegrees(
      this.getLocalSiderealTime(t) - i
    ), o = g.radiansToDegrees(
      Math.atan(
        n.z / Math.sqrt(
          Math.pow(n.x, 2) + Math.pow(n.y, 2)
        )
      )
    );
    return new Q(
      o,
      a,
      this.getDistanceToSolarSystemObject(e, t)
    );
  }
  getAltAzCoordinatesForEquatorialCoordinates(e, t) {
    const n = g.degreesToRadians(
      g.modDegrees(
        e.longitude - this.getLocalSiderealTime(t)
      )
    ), s = g.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), i = g.degreesToRadians(
      e.latitude
    ), a = g.radiansToDegrees(
      Math.asin(
        Math.sin(s) * Math.sin(i) + Math.cos(s) * Math.cos(i) * Math.cos(n)
      )
    ), o = g.radiansToDegrees(
      Math.PI - Math.atan2(
        Math.sin(n),
        Math.cos(n) * Math.sin(s) - Math.tan(i) * Math.cos(s)
      )
    );
    return new Q(a, o, null);
  }
  getLocalSiderealTime(e) {
    return g.modDegrees(
      B.meanSiderealTime(e) + this.sphericalCoordinates.longitude
    );
  }
  getObjectTransit(e, t) {
    const n = this.getRADecCoordinatesForSolarSystemObject(
      e,
      t
    ).longitude;
    return this.getLocalSiderealTime(t) - n;
  }
  getObjectLocalHourAngleForAltitude(e, t, n) {
    const s = g.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), i = g.degreesToRadians(n), a = g.degreesToRadians(
      this.getRADecCoordinatesForSolarSystemObject(
        e,
        t
      ).latitude
    ), o = (Math.sin(i) - Math.sin(s) * Math.sin(a)) / (Math.cos(s) * Math.cos(a));
    return g.radiansToDegrees(Math.acos(o));
  }
  getIterationValueForPositionalEphemerisForObject(e, t, n) {
    if (n === N.EPHEMERIS_TYPE.TRANSIT)
      return t - this.getObjectTransit(e, t) / 15 / 24;
    {
      const s = this.getObjectTransit(
        e,
        t
      ), i = this.getObjectLocalHourAngleForAltitude(
        e,
        t,
        n.ALTITUDE
      ), a = g.mod180Degrees(
        n.IS_GOING_UP ? s + i : s - i
      );
      return t - a / 15 / 24;
    }
  }
  iteratePositionalEphemerisForObject(e, t, n) {
    let s = this.getIterationValueForPositionalEphemerisForObject(
      e,
      t,
      n
    ), i = +s;
    for (let a = 0; a < 1e3 && (s = this.getIterationValueForPositionalEphemerisForObject(
      e,
      s,
      n
    ), !(Math.abs(s - i) < 10 ^ -5)); a++)
      i = s;
    return B.julianDateToDate(s);
  }
  getCorrectDateForPositionalEphemeris(e, t, n, s) {
    const i = this.iteratePositionalEphemerisForObject(
      e,
      t,
      n
    );
    if (s > 0 && i.getDate() !== B.julianDateToDate(t).getDate()) {
      const a = B.julianDate(i), o = a > t ? -1 : 1;
      return this.getCorrectDateForPositionalEphemeris(
        e,
        a + o,
        n,
        s - 1
      );
    } else return s === 0 ? null : i;
  }
  getDateForPositionalEphemeris(e, t, n) {
    return this.getCorrectDateForPositionalEphemeris(
      e,
      t,
      n,
      N.NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS
    );
  }
}
class Sn {
  constructor(e, t) {
    this.objectType = e, this.name = t;
  }
}
class z extends Sn {
  constructor(e, t, n, s) {
    super(N.SOLAR_SYSTEM_OBJECT, e), this.orbitalParameters = t, this.meanRadius = n, this.axialTilt = s;
  }
  /**
   * @param julianDate
   * @returns {RectangularCoordinates}
   */
  getRectangularHeliocentricCoordinates(e) {
    const t = B.julianCenturiesSinceEpoch2000(e), n = g.degreesToRadians(
      this.orbitalParameters.getInclination(t)
    ), s = g.degreesToRadians(
      this.orbitalParameters.getTrueAnomaly(t)
    ), i = g.degreesToRadians(
      this.orbitalParameters.getPerihelion(t)
    ), a = g.degreesToRadians(
      this.orbitalParameters.getAscendingNode(t)
    ), o = this.orbitalParameters.getOrbitRadius(
      t
    ), l = s + i - a, u = o * (Math.cos(a) * Math.cos(l) - Math.sin(a) * Math.sin(l) * Math.cos(n)), c = o * (Math.sin(a) * Math.cos(l) + Math.cos(a) * Math.sin(l) * Math.cos(n)), h = o * (Math.sin(l) * Math.sin(n));
    return new De(u, c, h);
  }
}
class _ {
  /**
   * @constructor
   * @param a0 semi-major axis (AU)
   * @param e0 eccentricity
   * @param i0 inclination (degrees)
   * @param o0 longitude of the ascending node (degrees)
   * @param w0 longitude of perihelion (degrees)
   * @param l0 mean longitude (degrees)
   * @param ac semi-major axis centennial rate (AU per Julian century)
   * @param ec eccentricity (per Julian century)
   * @param ic inclination (arc seconds per Julian century)
   * @param oc longitude of the ascending node (arc seconds per Julian century)
   * @param wc longitude of perihelion (arc seconds per Julian century)
   * @param lc mean longitude (arc seconds per Julian century)
   */
  constructor(e, t, n, s, i, a, o, l, u, c, h, w) {
    this.a0 = e, this.e0 = t, this.i0 = n, this.o0 = s, this.w0 = i, this.l0 = a, this.ac = o, this.ec = l, this.ic = u, this.oc = c, this.wc = h, this.lc = w;
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns a - semi major axis
   */
  getSemiMajorAxis(e) {
    return this.a0 + this.ac * e;
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns e - eccentricity
   */
  getEccentricity(e) {
    return this.e0 + this.ec * e;
  }
  getInclination(e) {
    return g.modDegrees(
      this.i0 + this.ic / 3600 * e
    );
  }
  getAscendingNode(e) {
    return g.modDegrees(
      this.o0 + this.oc / 3600 * e
    );
  }
  getPerihelion(e) {
    return g.modDegrees(
      this.w0 + this.wc / 3600 * e
    );
  }
  getMeanLongitude(e) {
    return g.modDegrees(
      this.l0 + this.lc / 3600 * e
    );
  }
  getMeanAnomaly(e) {
    return g.modDegrees(
      this.getMeanLongitude(e) - this.getPerihelion(e)
    );
  }
  /**
   *
   * @param julianCenturiesSinceEpoch2000
   * @returns {*} E: eccentric anomaly
   */
  getEccentricAnomaly(e) {
    const t = g.degreesToRadians(
      this.getMeanAnomaly(e)
    ), n = this.getEccentricity(e);
    let s = t + n * Math.sin(t) * (1 + n * Math.cos(t)), i = 0, a = 0, o = 0;
    for (; o++ < 1e4 && (i = s - (s - n * Math.sin(s) - t) / (1 - n * Math.cos(s)), a = i - s, s = i, !(Math.abs(a) <= N.EPS)); )
      ;
    return g.radiansToDegrees(i);
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns V: true anomaly
   */
  getTrueAnomaly(e) {
    const t = this.getEccentricity(e), n = g.degreesToRadians(
      this.getEccentricAnomaly(e)
    ), s = 2 * Math.atan(
      Math.sqrt((1 + t) / (1 - t)) * Math.tan(0.5 * n)
    );
    return g.radiansToDegrees(s);
  }
  /**
   * R = (a * (1 - e^2)) / (1 + e * cos(V))
   * @param julianCenturiesSinceEpoch2000
   * @returns R: orbit radius
   */
  getOrbitRadius(e) {
    const t = this.getSemiMajorAxis(e), n = this.getEccentricity(e), s = this.getTrueAnomaly(e);
    return t * (1 - Math.pow(n, 2)) / (1 + n * Math.cos(g.degreesToRadians(s)));
  }
}
class On extends z {
  constructor() {
    const e = new _(
      0.38709893,
      0.20563069,
      7.00487,
      48.33167,
      77.45645,
      252.25084,
      66e-8,
      2527e-8,
      -23.51,
      -446.3,
      573.57,
      53810162829e-2
    );
    super("Mercury", e, 2439700, 2.04);
  }
}
class kn extends z {
  constructor() {
    const e = new _(
      0.72333199,
      677323e-8,
      3.39471,
      76.68069,
      131.53298,
      181.97973,
      92e-8,
      -4938e-8,
      -2.86,
      -996.89,
      -108.8,
      21066413606e-2
    );
    super("Venus", e, 6051800, 2.64);
  }
}
class bn extends z {
  constructor() {
    const e = new _(
      1.00000011,
      0.01671022,
      5e-5,
      -11.26064,
      102.94719,
      100.46435,
      -5e-8,
      -3804e-8,
      -46.94,
      -18228.25,
      1198.28,
      12959774063e-2
    );
    super("Earth", e, 6371e3, 23.439281);
  }
}
class xn extends z {
  constructor() {
    const e = new _(
      1.52366231,
      0.09341233,
      1.85061,
      49.57854,
      336.04084,
      355.45332,
      -7221e-8,
      11902e-8,
      -25.47,
      -1020.19,
      1560.78,
      6890510378e-2
    );
    super("Mars", e, 3389500, 25.19);
  }
}
class En extends z {
  constructor() {
    const e = new _(
      5.20336301,
      0.04839266,
      1.3053,
      100.55615,
      14.75385,
      34.40438,
      60737e-8,
      -1288e-7,
      -4.15,
      1217.17,
      839.93,
      1092507835e-2
    );
    super("Jupiter", e, 69911e3, 3.13);
  }
}
class Mn extends z {
  constructor() {
    const e = new _(
      9.53707032,
      0.0541506,
      2.48446,
      113.71504,
      92.43194,
      49.94432,
      -30153e-7,
      -36762e-8,
      6.11,
      -1591.05,
      -1948.89,
      440105295e-2
    );
    super("Saturn", e, 58232e3, 26.73);
  }
}
class In extends z {
  constructor() {
    const e = new _(
      19.19126393,
      0.04716771,
      0.76986,
      74.22988,
      170.96424,
      313.23218,
      152025e-8,
      -1915e-7,
      -2.09,
      -1681.4,
      1312.56,
      154254779e-2
    );
    super("Uranus", e, 25362e3, 97.77);
  }
}
class Dn extends z {
  constructor() {
    const e = new _(
      30.06896348,
      858587e-8,
      1.76917,
      131.72169,
      44.97135,
      304.88003,
      -125196e-8,
      251e-7,
      -3.64,
      -151.25,
      -844.43,
      786449.21
    );
    super("Neptune", e, 24622e3, 28.32);
  }
}
const Nn = [
  new On(),
  new kn(),
  new bn(),
  new xn(),
  new En(),
  new Mn(),
  new In(),
  new Dn()
];
class vn extends z {
  constructor() {
    const e = new _(
      39.48168677,
      0.24880766,
      17.14175,
      110.30347,
      113.76329,
      238.92881,
      -207e-10,
      6465e-8,
      501e-8,
      -37.033,
      7.765,
      145.2078
    );
    super("Pluto", e, 1188300, 122.53);
  }
}
const Cn = [new vn()];
class An extends z {
  constructor() {
    super("Sun", null, 695508e3);
  }
  getRectangularHeliocentricCoordinates(e) {
    return new De(0, 0, 0);
  }
}
const Fn = [new An()].concat(Nn).concat(Cn);
class St {
  constructor() {
    this.skyObjects = [...Fn], this.astronomicalCalculator = new At(), this.julianDate = null, this.date = null;
  }
  getJulianDate() {
    return this.julianDate;
  }
  setJulianDate(e) {
    this.julianDate = e;
  }
  getDate() {
    return this.date;
  }
  setDate(e) {
    this.date = e, this.setJulianDate(B.julianDate(e));
  }
  getSkyObjectByName(e) {
    return this.skyObjects.find((t) => t.name === e) || null;
  }
  getEphemerisTypeByName(e) {
    return Object.values(N.EPHEMERIS_TYPE).find(
      (t) => t.NAME === e
    ) || null;
  }
  setLocation(e, t, n, s) {
    const i = this.getSkyObjectByName(e);
    if (!i)
      throw new Error(`Solar system object "${e}" not found`);
    this.astronomicalCalculator = new At(
      new Q(
        t,
        n,
        i.meanRadius + s
      ),
      i
    );
  }
  getLatitudeLongitudeCoordinates() {
    return {
      latitude: this.astronomicalCalculator.sphericalCoordinates.latitude,
      longitude: this.astronomicalCalculator.sphericalCoordinates.longitude
    };
  }
  getRADecCoordinatesForObject(e) {
    const t = this.getSkyObjectByName(e);
    if (!t || this.julianDate === null)
      throw new Error("Invalid object name or Julian date not set");
    return this.astronomicalCalculator.getRADecCoordinatesForSolarSystemObject(
      t,
      this.julianDate
    );
  }
  getHADecCoordinatesForObject(e) {
    const t = this.getSkyObjectByName(e);
    if (!t || this.julianDate === null)
      throw new Error("Invalid object name or Julian date not set");
    return this.astronomicalCalculator.getHADecCoordinatesForSolarSystemObject(
      t,
      this.julianDate
    );
  }
  getAltAzCoordinatesForObject(e, t) {
    const n = this.getSkyObjectByName(e);
    if (!n)
      throw new Error(`Object "${e}" not found`);
    const s = t ? B.julianDate(t) : this.julianDate;
    if (s === null)
      throw new Error("Reference date not set");
    const i = this.astronomicalCalculator.getRADecCoordinatesForSolarSystemObject(
      n,
      s
    );
    return this.astronomicalCalculator.getAltAzCoordinatesForEquatorialCoordinates(
      i,
      s
    );
  }
  static initialize(e, t) {
    let n = new St();
    return n.setLocation("Earth", e, t, 0), n.setDate(/* @__PURE__ */ new Date()), n;
  }
  getEphemerisDateForObject(e, t, n) {
    const s = this.getSkyObjectByName(e), i = this.getEphemerisTypeByName(n);
    if (!s || !i)
      throw new Error("Invalid object name or ephemeris type");
    return this.astronomicalCalculator.getDateForPositionalEphemeris(
      s,
      B.julianDate(t),
      i
    );
  }
}
function X(r, e) {
  return `<svg viewBox="0 0 1000 1000" width="${r}" height="${r}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${e}" />`;
}
function $n(r, e) {
  return `<svg viewBox="0 0 2000 1000" width="${r}" height="${r / 2}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${e}" />`;
}
function ee() {
  return "</svg>";
}
function Z(r, e) {
  let t = e ? Gn() : "";
  return r === "Sun" ? t += Ln() : r === "Mercury" ? t += Vn() : r === "Venus" ? t += Rn() : r === "Mars" ? t += Wn() : r === "Jupiter" ? t += zn() : r === "Saturn" ? t += Un() : r === "Uranus" ? t += Zn() : r === "Neptune" ? t += Pn() : r === "Pluto" && (t += _n()), t += e ? Hn() : "", t;
}
function Ln() {
  return `
        <!-- Sun body -->
        <circle cx="500" cy="278" r="139" fill="#f4a300" />
        <!-- Sun rays -->
        <g stroke="#e69500" stroke-width="21" stroke-linecap="round">
            <line x1="500" y1="111" x2="500" y2="69" />
            <line x1="500" y1="445" x2="500" y2="486" />
            <line x1="333" y1="278" x2="292" y2="278" />
            <line x1="667" y1="278" x2="708" y2="278" />
            <line x1="403" y1="181" x2="375" y2="153" />
            <line x1="597" y1="181" x2="625" y2="153" />
            <line x1="403" y1="375" x2="375" y2="403" />
            <line x1="597" y1="375" x2="625" y2="403" />
        </g>`;
}
function Vn() {
  return `
    <!-- Mercury base -->
    <circle cx="500" cy="278" r="139" fill="#b0a59f" />

    <!-- Craters across surface, including near edges -->
    <circle cx="470" cy="230" r="14" fill="#72655f" opacity="0.70" />
    <circle cx="530" cy="250" r="12" fill="#5e524e" opacity="0.75" />
    <circle cx="490" cy="305" r="11" fill="#6a5c58" opacity="0.68" />
    <circle cx="455" cy="275" r="10" fill="#4f4541" opacity="0.65" />
    <circle cx="520" cy="325" r="9" fill="#6c615c" opacity="0.70" />
    <circle cx="540" cy="215" r="13" fill="#645954" opacity="0.72" />

    <!-- Near-edge craters -->
    <circle cx="390" cy="278" r="8" fill="#72655f" opacity="0.70" />
    <circle cx="610" cy="278" r="9" fill="#5e524e" opacity="0.73" />
    <circle cx="500" cy="139" r="10" fill="#6c615c" opacity="0.68" />
    <circle cx="500" cy="417" r="11" fill="#4f4541" opacity="0.70" />
    <circle cx="410" cy="185" r="8" fill="#6a5c58" opacity="0.67" />
    <circle cx="590" cy="365" r="9" fill="#645954" opacity="0.72" />
  `;
}
function Rn() {
  return `
    <!-- Venus base -->
    <circle cx="500" cy="278" r="139" fill="#e5c07b" />

    <!-- Thicker cloud bands -->
    <ellipse cx="500" cy="240" rx="139" ry="18" fill="#d4b06a" opacity="0.35" />
    <ellipse cx="500" cy="278" rx="139" ry="20" fill="#c8a158" opacity="0.3" />
    <ellipse cx="500" cy="315" rx="139" ry="16" fill="#b89249" opacity="0.25" />

    <!-- Swirl features -->
    <circle cx="470" cy="250" r="20" fill="#b88e3b" opacity="0.3" />

    <!-- Polar glow (top and bottom) -->
    <ellipse cx="500" cy="160" rx="60" ry="20" fill="white" opacity="0.4" />
    <ellipse cx="500" cy="400" rx="60" ry="20" fill="white" opacity="0.4" />
  `;
}
function Wn() {
  return `<circle cx="500" cy="278" r="139" fill="#d2691e" />
          <!-- Ice cap (ellipse) -->
          <ellipse cx="500" cy="167" rx="42" ry="21" fill="white" opacity="0.9" />
          <!-- Surface features -->
          <circle cx="458" cy="236" r="21" fill="#a0522d" />
          <circle cx="542" cy="319" r="17.35" fill="#a0522d" />
          <circle cx="514" cy="250" r="13.9" fill="#cd853f" />
          <circle cx="472" cy="306" r="10.4" fill="#cd853f" />`;
}
function zn() {
  return `
    <!-- Jupiter base -->
    <circle cx="500" cy="278" r="139" fill="#d2b48c" />

    <!-- Symmetrical medium bands -->
    <ellipse cx="500" cy="248" rx="139" ry="12" fill="#c89b76" opacity="0.85" />
    <ellipse cx="500" cy="278" rx="139" ry="10" fill="#ba8c6e" opacity="0.85" />
    <ellipse cx="500" cy="308" rx="139" ry="12" fill="#c89b76" opacity="0.85" />

    <!-- Great Red Spot -->
    <ellipse cx="570" cy="305" rx="20" ry="12" fill="#cc543a" />
    
    <ellipse cx="500" cy="170" rx="60" ry="30" fill="#ba8c6e" opacity="0.7" />
  `;
}
function Un() {
  return `
    <!-- Rings behind -->
    <g transform="rotate(-25 500 278)">
      <ellipse cx="500" cy="278" rx="220" ry="50" fill="none" stroke="#e6e6e6" stroke-width="20" opacity="0.5" />
      <ellipse cx="500" cy="278" rx="250" ry="55" fill="none" stroke="#f2f2f2" stroke-width="12" opacity="0.4" />
    </g>

    <!-- Saturn base (on top of back rings) -->
    <circle cx="500" cy="278" r="139" fill="#d8c48f" />

    <!-- Atmospheric bands -->
    <ellipse cx="500" cy="260" rx="139" ry="12" fill="#c9b87e" opacity="0.5" />
    <ellipse cx="500" cy="278" rx="139" ry="14" fill="#bcae6f" opacity="0.5" />
    <ellipse cx="500" cy="296" rx="139" ry="12" fill="#b1a460" opacity="0.45" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="139" rx="60" ry="20" fill="white" opacity="0.15" />
    <ellipse cx="500" cy="417" rx="60" ry="20" fill="white" opacity="0.15" />

    <!-- Rings front -->
    <g transform="rotate(-25 500 278)">
      <ellipse cx="500" cy="278" rx="220" ry="50" fill="none" stroke="#f5f5f5" stroke-width="14" opacity="0.7" />
      <ellipse cx="500" cy="278" rx="250" ry="55" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.5" />
    </g>
  `;
}
function Zn() {
  return `
    <!-- Uranus base -->
    <circle cx="500" cy="278" r="139" fill="#7fdbff" />

    <!-- Atmospheric subtle bands -->
    <ellipse cx="500" cy="260" rx="139" ry="12" fill="#6ec8e9" opacity="0.4" />
    <ellipse cx="500" cy="278" rx="139" ry="14" fill="#62b4d8" opacity="0.4" />
    <ellipse cx="500" cy="296" rx="139" ry="12" fill="#5aa2c6" opacity="0.35" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="139" rx="60" ry="20" fill="white" opacity="0.12" />
    <ellipse cx="500" cy="417" rx="60" ry="20" fill="white" opacity="0.12" />

    <!-- Small swirl / cloud feature -->
    <circle cx="460" cy="290" r="20" fill="#54a3b9" opacity="0.5" />
    <circle cx="540" cy="260" r="17" fill="#6dc3e3" opacity="0.45" />
  `;
}
function Pn() {
  return `
    <!-- Neptune base -->
    <circle cx="500" cy="278" r="139" fill="#3b5ca8" />

    <!-- Atmospheric subtle bands -->
    <ellipse cx="500" cy="260" rx="139" ry="12" fill="#345292" opacity="0.45" />
    <ellipse cx="500" cy="278" rx="139" ry="14" fill="#2f4b7f" opacity="0.45" />
    <ellipse cx="500" cy="296" rx="139" ry="12" fill="#2a456f" opacity="0.4" />

    <!-- Polar glow -->
    <ellipse cx="500" cy="139" rx="60" ry="20" fill="white" opacity="0.1" />
    <ellipse cx="500" cy="417" rx="60" ry="20" fill="white" opacity="0.1" />

    <!-- Cloud spots -->
    <circle cx="460" cy="290" r="25" fill="#4064c7" opacity="0.6" />
    <circle cx="530" cy="250" r="20" fill="#4a71d2" opacity="0.55" />
    <circle cx="520" cy="320" r="15" fill="#3a56a0" opacity="0.5" />
  `;
}
function _n() {
  return `
    <!-- Pluto base -->
    <circle cx="500" cy="278" r="139" fill="#c2b29e" />

    <!-- Surface patches -->
    <circle cx="460" cy="290" r="25" fill="#a89987" opacity="0.7" />
    <circle cx="540" cy="260" r="20" fill="#bfb7a8" opacity="0.65" />
    <circle cx="520" cy="320" r="15" fill="#9f8f7d" opacity="0.6" />
    <circle cx="480" cy="310" r="10" fill="#b0a596" opacity="0.6" />

    <!-- Icy heart -->
    <path
      d="
        M 500 300
        C 500 250, 440 250, 440 300
        C 440 350, 500 370, 500 400
        C 500 370, 560 350, 560 300
        C 560 250, 500 250, 500 300
        Z
      "
      fill="#e9e6e1"
      opacity="0.9"
    />

    <!-- Slight shadow for depth -->
    <ellipse cx="470" cy="320" rx="100" ry="50" fill="black" opacity="0.1" />
  `;
}
function Gn() {
  return `<defs>
    <filter id="grayscale">
        <feColorMatrix type="saturate" values="0" />
    </filter>
    </defs>
    <g filter="url(#grayscale)">`;
}
function Hn() {
  return "</g>";
}
function jn(r) {
  const e = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"], t = (r % 360 + 360) % 360, n = Math.floor((t + 22.5) / 45) % 8;
  return e[n];
}
function cr(r, e) {
  return `${r.toFixed(1)} ${r > e ? "▲" : r < e ? "▼" : ""}`;
}
function fr(r) {
  return `${r.toFixed(1)} ${jn(r)}`;
}
function ie(r) {
  return `<text x="500" y="660" font-size="139" text-anchor="middle"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${r}
        </text>`;
}
function ae(r) {
  return `<text x="500" y="833" font-size="139" text-anchor="middle"
                fill="white" font-family="Verdana" dominant-baseline="middle">
          ${r}
          </text>`;
}
function Yn(r, e, t) {
  let s = r.astronomyJS.getAltAzCoordinatesForObject(e).longitude, i = X(t, "black");
  return i += Z(e), i += ie("Azimuth"), i += ae(fr(s)), i += ee(), i;
}
function qn(r, e, t) {
  let n = r.astronomyJS, s = n.getAltAzCoordinatesForObject(e).latitude, i = n.getAltAzCoordinatesForObject(
    e,
    new Date(n.getDate() - 5 * 60 * 1e3)
  ).latitude, a = X(t, "black");
  return a += Z(e), a += ie("Altitude"), a += ae(cr(s, i)), a += ee(), a;
}
function Ft(r) {
  const e = parseInt(r.slice(1), 16);
  return {
    r: e >> 16 & 255,
    g: e >> 8 & 255,
    b: e & 255
  };
}
function Jn({ r, g: e, b: t }) {
  return "#" + [r, e, t].map((n) => n.toString(16).padStart(2, "0")).join("");
}
function Ke(r, e, t) {
  return r + (e - r) * t;
}
function We(r, e, t) {
  return (t - r) / (e - r);
}
function Ue(r, e, t) {
  const n = Ft(r), s = Ft(e);
  return Jn({
    r: Math.round(Ke(n.r, s.r, t)),
    g: Math.round(Ke(n.g, s.g, t)),
    b: Math.round(Ke(n.b, s.b, t))
  });
}
function Ot(r) {
  const e = Bn(r), t = dr(r), n = We(
    e.limit,
    t.limit,
    r
  ), s = Ue(
    e.top,
    t.top,
    n
  ), i = Ue(
    e.bottom,
    t.bottom,
    n
  );
  return `<defs>
            <linearGradient id="sky-${r}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${s}" />
                <stop offset="55%" stop-color="${s}" />
                <stop offset="100%" stop-color="${i}" />
            </linearGradient></defs>`;
}
function dr(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : r <= -15 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : r <= -12 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : r <= -9 ? { top: "#171c29", bottom: "#525662", limit: -9 } : r <= -6 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : r <= -3 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : r <= 0 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : r <= 10 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 90 };
}
function Bn(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -90 } : r <= -15 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : r <= -12 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : r <= -9 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : r <= -6 ? { top: "#171c29", bottom: "#525662", limit: -9 } : r <= -3 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : r <= 0 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : r <= 10 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 };
}
class oe extends Error {
}
class Qn extends oe {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class Kn extends oe {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Xn extends oe {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class de extends oe {
}
class hr extends oe {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class E extends oe {
}
class j extends oe {
  constructor() {
    super("Zone is an abstract class");
  }
}
const f = "numeric", W = "short", C = "long", Ze = {
  year: f,
  month: f,
  day: f
}, mr = {
  year: f,
  month: W,
  day: f
}, es = {
  year: f,
  month: W,
  day: f,
  weekday: W
}, yr = {
  year: f,
  month: C,
  day: f
}, gr = {
  year: f,
  month: C,
  day: f,
  weekday: C
}, pr = {
  hour: f,
  minute: f
}, wr = {
  hour: f,
  minute: f,
  second: f
}, Tr = {
  hour: f,
  minute: f,
  second: f,
  timeZoneName: W
}, Sr = {
  hour: f,
  minute: f,
  second: f,
  timeZoneName: C
}, Or = {
  hour: f,
  minute: f,
  hourCycle: "h23"
}, kr = {
  hour: f,
  minute: f,
  second: f,
  hourCycle: "h23"
}, br = {
  hour: f,
  minute: f,
  second: f,
  hourCycle: "h23",
  timeZoneName: W
}, xr = {
  hour: f,
  minute: f,
  second: f,
  hourCycle: "h23",
  timeZoneName: C
}, Er = {
  year: f,
  month: f,
  day: f,
  hour: f,
  minute: f
}, Mr = {
  year: f,
  month: f,
  day: f,
  hour: f,
  minute: f,
  second: f
}, Ir = {
  year: f,
  month: W,
  day: f,
  hour: f,
  minute: f
}, Dr = {
  year: f,
  month: W,
  day: f,
  hour: f,
  minute: f,
  second: f
}, ts = {
  year: f,
  month: W,
  day: f,
  weekday: W,
  hour: f,
  minute: f
}, Nr = {
  year: f,
  month: C,
  day: f,
  hour: f,
  minute: f,
  timeZoneName: W
}, vr = {
  year: f,
  month: C,
  day: f,
  hour: f,
  minute: f,
  second: f,
  timeZoneName: W
}, Cr = {
  year: f,
  month: C,
  day: f,
  weekday: C,
  hour: f,
  minute: f,
  timeZoneName: C
}, Ar = {
  year: f,
  month: C,
  day: f,
  weekday: C,
  hour: f,
  minute: f,
  second: f,
  timeZoneName: C
};
class Ne {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new j();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new j();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new j();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, t) {
    throw new j();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    throw new j();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new j();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new j();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new j();
  }
}
let Xe = null;
class He extends Ne {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return Xe === null && (Xe = new He()), Xe;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(e, { format: t, locale: n }) {
    return _r(e, t, n);
  }
  /** @override **/
  formatOffset(e, t) {
    return Me(this.offset(e), t);
  }
  /** @override **/
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  /** @override **/
  equals(e) {
    return e.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
const ut = /* @__PURE__ */ new Map();
function rs(r) {
  let e = ut.get(r);
  return e === void 0 && (e = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: r,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), ut.set(r, e)), e;
}
const ns = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function ss(r, e) {
  const t = r.format(e).replace(/\u200E/g, ""), n = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, s, i, a, o, l, u, c] = n;
  return [a, s, i, o, l, u, c];
}
function is(r, e) {
  const t = r.formatToParts(e), n = [];
  for (let s = 0; s < t.length; s++) {
    const { type: i, value: a } = t[s], o = ns[i];
    i === "era" ? n[o] = a : y(o) || (n[o] = parseInt(a, 10));
  }
  return n;
}
const et = /* @__PURE__ */ new Map();
class P extends Ne {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let t = et.get(e);
    return t === void 0 && et.set(e, t = new P(e)), t;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    et.clear(), ut.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(e) {
    if (!e)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), this.zoneName = e, this.valid = P.isValidZone(e);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !1;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, { format: t, locale: n }) {
    return _r(e, t, n, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Me(this.offset(e), t);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    if (!this.valid) return NaN;
    const t = new Date(e);
    if (isNaN(t)) return NaN;
    const n = rs(this.name);
    let [s, i, a, o, l, u, c] = n.formatToParts ? is(n, t) : ss(n, t);
    o === "BC" && (s = -Math.abs(s) + 1);
    const w = Ye({
      year: s,
      month: i,
      day: a,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: c,
      millisecond: 0
    });
    let d = +t;
    const O = d % 1e3;
    return d -= O >= 0 ? O : 1e3 + O, (w - d) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
}
let $t = {};
function as(r, e = {}) {
  const t = JSON.stringify([r, e]);
  let n = $t[t];
  return n || (n = new Intl.ListFormat(r, e), $t[t] = n), n;
}
const ct = /* @__PURE__ */ new Map();
function ft(r, e = {}) {
  const t = JSON.stringify([r, e]);
  let n = ct.get(t);
  return n === void 0 && (n = new Intl.DateTimeFormat(r, e), ct.set(t, n)), n;
}
const dt = /* @__PURE__ */ new Map();
function os(r, e = {}) {
  const t = JSON.stringify([r, e]);
  let n = dt.get(t);
  return n === void 0 && (n = new Intl.NumberFormat(r, e), dt.set(t, n)), n;
}
const ht = /* @__PURE__ */ new Map();
function ls(r, e = {}) {
  const { base: t, ...n } = e, s = JSON.stringify([r, n]);
  let i = ht.get(s);
  return i === void 0 && (i = new Intl.RelativeTimeFormat(r, e), ht.set(s, i)), i;
}
let be = null;
function us() {
  return be || (be = new Intl.DateTimeFormat().resolvedOptions().locale, be);
}
const mt = /* @__PURE__ */ new Map();
function Fr(r) {
  let e = mt.get(r);
  return e === void 0 && (e = new Intl.DateTimeFormat(r).resolvedOptions(), mt.set(r, e)), e;
}
const yt = /* @__PURE__ */ new Map();
function cs(r) {
  let e = yt.get(r);
  if (!e) {
    const t = new Intl.Locale(r);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, "minimalDays" in e || (e = { ...$r, ...e }), yt.set(r, e);
  }
  return e;
}
function fs(r) {
  const e = r.indexOf("-x-");
  e !== -1 && (r = r.substring(0, e));
  const t = r.indexOf("-u-");
  if (t === -1)
    return [r];
  {
    let n, s;
    try {
      n = ft(r).resolvedOptions(), s = r;
    } catch {
      const l = r.substring(0, t);
      n = ft(l).resolvedOptions(), s = l;
    }
    const { numberingSystem: i, calendar: a } = n;
    return [s, i, a];
  }
}
function ds(r, e, t) {
  return (t || e) && (r.includes("-u-") || (r += "-u"), t && (r += `-ca-${t}`), e && (r += `-nu-${e}`)), r;
}
function hs(r) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const n = m.utc(2009, t, 1);
    e.push(r(n));
  }
  return e;
}
function ms(r) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const n = m.utc(2016, 11, 13 + t);
    e.push(r(n));
  }
  return e;
}
function Fe(r, e, t, n) {
  const s = r.listingMode();
  return s === "error" ? null : s === "en" ? t(e) : n(e);
}
function ys(r) {
  return r.numberingSystem && r.numberingSystem !== "latn" ? !1 : r.numberingSystem === "latn" || !r.locale || r.locale.startsWith("en") || Fr(r.locale).numberingSystem === "latn";
}
class gs {
  constructor(e, t, n) {
    this.padTo = n.padTo || 0, this.floor = n.floor || !1;
    const { padTo: s, floor: i, ...a } = n;
    if (!t || Object.keys(a).length > 0) {
      const o = { useGrouping: !1, ...n };
      n.padTo > 0 && (o.minimumIntegerDigits = n.padTo), this.inf = os(e, o);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : Mt(e, 3);
      return x(t, this.padTo);
    }
  }
}
class ps {
  constructor(e, t, n) {
    this.opts = n, this.originalZone = void 0;
    let s;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const a = -1 * (e.offset / 60), o = a >= 0 ? `Etc/GMT+${a}` : `Etc/GMT${a}`;
      e.offset !== 0 && P.create(o).valid ? (s = o, this.dt = e) : (s = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, s = e.zone.name) : (s = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const i = { ...this.opts };
    i.timeZone = i.timeZone || s, this.dtf = ft(t, i);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: e }) => e).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? e.map((t) => {
      if (t.type === "timeZoneName") {
        const n = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...t,
          value: n
        };
      } else
        return t;
    }) : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class ws {
  constructor(e, t, n) {
    this.opts = { style: "long", ...n }, !t && Zr() && (this.rtf = ls(e, n));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : Us(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const $r = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class S {
  static fromOpts(e) {
    return S.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, n, s, i = !1) {
    const a = e || b.defaultLocale, o = a || (i ? "en-US" : us()), l = t || b.defaultNumberingSystem, u = n || b.defaultOutputCalendar, c = pt(s) || b.defaultWeekSettings;
    return new S(o, l, u, c, a);
  }
  static resetCache() {
    be = null, ct.clear(), dt.clear(), ht.clear(), mt.clear(), yt.clear();
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: n, weekSettings: s } = {}) {
    return S.create(e, t, n, s);
  }
  constructor(e, t, n, s, i) {
    const [a, o, l] = fs(e);
    this.locale = a, this.numberingSystem = t || o || null, this.outputCalendar = n || l || null, this.weekSettings = s, this.intl = ds(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = ys(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : S.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      pt(e.weekSettings) || this.weekSettings,
      e.defaultToEN || !1
    );
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(e, t = !1) {
    return Fe(this, e, jr, () => {
      const n = t ? { month: e, day: "numeric" } : { month: e }, s = t ? "format" : "standalone";
      return this.monthsCache[s][e] || (this.monthsCache[s][e] = hs((i) => this.extract(i, n, "month"))), this.monthsCache[s][e];
    });
  }
  weekdays(e, t = !1) {
    return Fe(this, e, Jr, () => {
      const n = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, s = t ? "format" : "standalone";
      return this.weekdaysCache[s][e] || (this.weekdaysCache[s][e] = ms(
        (i) => this.extract(i, n, "weekday")
      )), this.weekdaysCache[s][e];
    });
  }
  meridiems() {
    return Fe(
      this,
      void 0,
      () => Br,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [m.utc(2016, 11, 13, 9), m.utc(2016, 11, 13, 19)].map(
            (t) => this.extract(t, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return Fe(this, e, Qr, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [m.utc(-40, 1, 1), m.utc(2017, 1, 1)].map(
        (n) => this.extract(n, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, n) {
    const s = this.dtFormatter(e, t), i = s.formatToParts(), a = i.find((o) => o.type.toLowerCase() === n);
    return a ? a.value : null;
  }
  numberFormatter(e = {}) {
    return new gs(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new ps(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new ws(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return as(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || Fr(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : Pr() ? cs(this.locale) : $r;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return this.locale === e.locale && this.numberingSystem === e.numberingSystem && this.outputCalendar === e.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
}
let tt = null;
class I extends Ne {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return tt === null && (tt = new I(0)), tt;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? I.utcInstance : new I(e);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(e) {
    if (e) {
      const t = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (t)
        return new I(qe(t[1], t[2]));
    }
    return null;
  }
  constructor(e) {
    super(), this.fixed = e;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Me(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Me(-this.fixed, "narrow")}`;
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Me(this.fixed, t);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !0;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return !0;
  }
}
class Ts extends Ne {
  constructor(e) {
    super(), this.zoneName = e;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function J(r, e) {
  if (y(r) || r === null)
    return e;
  if (r instanceof Ne)
    return r;
  if (Es(r)) {
    const t = r.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? He.instance : t === "utc" || t === "gmt" ? I.utcInstance : I.parseSpecifier(t) || P.create(r);
  } else return K(r) ? I.instance(r) : typeof r == "object" && "offset" in r && typeof r.offset == "function" ? r : new Ts(r);
}
const kt = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, Lt = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, Ss = kt.hanidec.replace(/[\[|\]]/g, "").split("");
function Os(r) {
  let e = parseInt(r, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < r.length; t++) {
      const n = r.charCodeAt(t);
      if (r[t].search(kt.hanidec) !== -1)
        e += Ss.indexOf(r[t]);
      else
        for (const s in Lt) {
          const [i, a] = Lt[s];
          n >= i && n <= a && (e += n - i);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const gt = /* @__PURE__ */ new Map();
function ks() {
  gt.clear();
}
function L({ numberingSystem: r }, e = "") {
  const t = r || "latn";
  let n = gt.get(t);
  n === void 0 && (n = /* @__PURE__ */ new Map(), gt.set(t, n));
  let s = n.get(e);
  return s === void 0 && (s = new RegExp(`${kt[t]}${e}`), n.set(e, s)), s;
}
let Vt = () => Date.now(), Rt = "system", Wt = null, zt = null, Ut = null, Zt = 60, Pt, _t = null;
class b {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Vt;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Vt = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    Rt = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return J(Rt, He.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Wt;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    Wt = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return zt;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    zt = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Ut;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    Ut = e;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return _t;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    _t = pt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return Zt;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(e) {
    Zt = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Pt;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Pt = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    S.resetCache(), P.resetCache(), m.resetCache(), ks();
  }
}
class R {
  constructor(e, t) {
    this.reason = e, this.explanation = t;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const Lr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Vr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function F(r, e) {
  return new R(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${r}, which is invalid`
  );
}
function bt(r, e, t) {
  const n = new Date(Date.UTC(r, e - 1, t));
  r < 100 && r >= 0 && n.setUTCFullYear(n.getUTCFullYear() - 1900);
  const s = n.getUTCDay();
  return s === 0 ? 7 : s;
}
function Rr(r, e, t) {
  return t + (ve(r) ? Vr : Lr)[e - 1];
}
function Wr(r, e) {
  const t = ve(r) ? Vr : Lr, n = t.findIndex((i) => i < e), s = e - t[n];
  return { month: n + 1, day: s };
}
function xt(r, e) {
  return (r - e + 7) % 7 + 1;
}
function Pe(r, e = 4, t = 1) {
  const { year: n, month: s, day: i } = r, a = Rr(n, s, i), o = xt(bt(n, s, i), t);
  let l = Math.floor((a - o + 14 - e) / 7), u;
  return l < 1 ? (u = n - 1, l = Ie(u, e, t)) : l > Ie(n, e, t) ? (u = n + 1, l = 1) : u = n, { weekYear: u, weekNumber: l, weekday: o, ...Je(r) };
}
function Gt(r, e = 4, t = 1) {
  const { weekYear: n, weekNumber: s, weekday: i } = r, a = xt(bt(n, 1, e), t), o = he(n);
  let l = s * 7 + i - a - 7 + e, u;
  l < 1 ? (u = n - 1, l += he(u)) : l > o ? (u = n + 1, l -= he(n)) : u = n;
  const { month: c, day: h } = Wr(u, l);
  return { year: u, month: c, day: h, ...Je(r) };
}
function rt(r) {
  const { year: e, month: t, day: n } = r, s = Rr(e, t, n);
  return { year: e, ordinal: s, ...Je(r) };
}
function Ht(r) {
  const { year: e, ordinal: t } = r, { month: n, day: s } = Wr(e, t);
  return { year: e, month: n, day: s, ...Je(r) };
}
function jt(r, e) {
  if (!y(r.localWeekday) || !y(r.localWeekNumber) || !y(r.localWeekYear)) {
    if (!y(r.weekday) || !y(r.weekNumber) || !y(r.weekYear))
      throw new de(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return y(r.localWeekday) || (r.weekday = r.localWeekday), y(r.localWeekNumber) || (r.weekNumber = r.localWeekNumber), y(r.localWeekYear) || (r.weekYear = r.localWeekYear), delete r.localWeekday, delete r.localWeekNumber, delete r.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function bs(r, e = 4, t = 1) {
  const n = je(r.weekYear), s = $(
    r.weekNumber,
    1,
    Ie(r.weekYear, e, t)
  ), i = $(r.weekday, 1, 7);
  return n ? s ? i ? !1 : F("weekday", r.weekday) : F("week", r.weekNumber) : F("weekYear", r.weekYear);
}
function xs(r) {
  const e = je(r.year), t = $(r.ordinal, 1, he(r.year));
  return e ? t ? !1 : F("ordinal", r.ordinal) : F("year", r.year);
}
function zr(r) {
  const e = je(r.year), t = $(r.month, 1, 12), n = $(r.day, 1, _e(r.year, r.month));
  return e ? t ? n ? !1 : F("day", r.day) : F("month", r.month) : F("year", r.year);
}
function Ur(r) {
  const { hour: e, minute: t, second: n, millisecond: s } = r, i = $(e, 0, 23) || e === 24 && t === 0 && n === 0 && s === 0, a = $(t, 0, 59), o = $(n, 0, 59), l = $(s, 0, 999);
  return i ? a ? o ? l ? !1 : F("millisecond", s) : F("second", n) : F("minute", t) : F("hour", e);
}
function y(r) {
  return typeof r > "u";
}
function K(r) {
  return typeof r == "number";
}
function je(r) {
  return typeof r == "number" && r % 1 === 0;
}
function Es(r) {
  return typeof r == "string";
}
function Ms(r) {
  return Object.prototype.toString.call(r) === "[object Date]";
}
function Zr() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function Pr() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function Is(r) {
  return Array.isArray(r) ? r : [r];
}
function Yt(r, e, t) {
  if (r.length !== 0)
    return r.reduce((n, s) => {
      const i = [e(s), s];
      return n && t(n[0], i[0]) === n[0] ? n : i;
    }, null)[1];
}
function Ds(r, e) {
  return e.reduce((t, n) => (t[n] = r[n], t), {});
}
function ye(r, e) {
  return Object.prototype.hasOwnProperty.call(r, e);
}
function pt(r) {
  if (r == null)
    return null;
  if (typeof r != "object")
    throw new E("Week settings must be an object");
  if (!$(r.firstDay, 1, 7) || !$(r.minimalDays, 1, 7) || !Array.isArray(r.weekend) || r.weekend.some((e) => !$(e, 1, 7)))
    throw new E("Invalid week settings");
  return {
    firstDay: r.firstDay,
    minimalDays: r.minimalDays,
    weekend: Array.from(r.weekend)
  };
}
function $(r, e, t) {
  return je(r) && r >= e && r <= t;
}
function Ns(r, e) {
  return r - e * Math.floor(r / e);
}
function x(r, e = 2) {
  const t = r < 0;
  let n;
  return t ? n = "-" + ("" + -r).padStart(e, "0") : n = ("" + r).padStart(e, "0"), n;
}
function q(r) {
  if (!(y(r) || r === null || r === ""))
    return parseInt(r, 10);
}
function re(r) {
  if (!(y(r) || r === null || r === ""))
    return parseFloat(r);
}
function Et(r) {
  if (!(y(r) || r === null || r === "")) {
    const e = parseFloat("0." + r) * 1e3;
    return Math.floor(e);
  }
}
function Mt(r, e, t = !1) {
  const n = 10 ** e;
  return (t ? Math.trunc : Math.round)(r * n) / n;
}
function ve(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function he(r) {
  return ve(r) ? 366 : 365;
}
function _e(r, e) {
  const t = Ns(e - 1, 12) + 1, n = r + (e - t) / 12;
  return t === 2 ? ve(n) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function Ye(r) {
  let e = Date.UTC(
    r.year,
    r.month - 1,
    r.day,
    r.hour,
    r.minute,
    r.second,
    r.millisecond
  );
  return r.year < 100 && r.year >= 0 && (e = new Date(e), e.setUTCFullYear(r.year, r.month - 1, r.day)), +e;
}
function qt(r, e, t) {
  return -xt(bt(r, 1, e), t) + e - 1;
}
function Ie(r, e = 4, t = 1) {
  const n = qt(r, e, t), s = qt(r + 1, e, t);
  return (he(r) - n + s) / 7;
}
function wt(r) {
  return r > 99 ? r : r > b.twoDigitCutoffYear ? 1900 + r : 2e3 + r;
}
function _r(r, e, t, n = null) {
  const s = new Date(r), i = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  n && (i.timeZone = n);
  const a = { timeZoneName: e, ...i }, o = new Intl.DateTimeFormat(t, a).formatToParts(s).find((l) => l.type.toLowerCase() === "timezonename");
  return o ? o.value : null;
}
function qe(r, e) {
  let t = parseInt(r, 10);
  Number.isNaN(t) && (t = 0);
  const n = parseInt(e, 10) || 0, s = t < 0 || Object.is(t, -0) ? -n : n;
  return t * 60 + s;
}
function Gr(r) {
  const e = Number(r);
  if (typeof r == "boolean" || r === "" || Number.isNaN(e))
    throw new E(`Invalid unit value ${r}`);
  return e;
}
function Ge(r, e) {
  const t = {};
  for (const n in r)
    if (ye(r, n)) {
      const s = r[n];
      if (s == null) continue;
      t[e(n)] = Gr(s);
    }
  return t;
}
function Me(r, e) {
  const t = Math.trunc(Math.abs(r / 60)), n = Math.trunc(Math.abs(r % 60)), s = r >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${s}${x(t, 2)}:${x(n, 2)}`;
    case "narrow":
      return `${s}${t}${n > 0 ? `:${n}` : ""}`;
    case "techie":
      return `${s}${x(t, 2)}${x(n, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function Je(r) {
  return Ds(r, ["hour", "minute", "second", "millisecond"]);
}
const vs = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], Hr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], Cs = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function jr(r) {
  switch (r) {
    case "narrow":
      return [...Cs];
    case "short":
      return [...Hr];
    case "long":
      return [...vs];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const Yr = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], qr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], As = ["M", "T", "W", "T", "F", "S", "S"];
function Jr(r) {
  switch (r) {
    case "narrow":
      return [...As];
    case "short":
      return [...qr];
    case "long":
      return [...Yr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Br = ["AM", "PM"], Fs = ["Before Christ", "Anno Domini"], $s = ["BC", "AD"], Ls = ["B", "A"];
function Qr(r) {
  switch (r) {
    case "narrow":
      return [...Ls];
    case "short":
      return [...$s];
    case "long":
      return [...Fs];
    default:
      return null;
  }
}
function Vs(r) {
  return Br[r.hour < 12 ? 0 : 1];
}
function Rs(r, e) {
  return Jr(e)[r.weekday - 1];
}
function Ws(r, e) {
  return jr(e)[r.month - 1];
}
function zs(r, e) {
  return Qr(e)[r.year < 0 ? 0 : 1];
}
function Us(r, e, t = "always", n = !1) {
  const s = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, i = ["hours", "minutes", "seconds"].indexOf(r) === -1;
  if (t === "auto" && i) {
    const h = r === "days";
    switch (e) {
      case 1:
        return h ? "tomorrow" : `next ${s[r][0]}`;
      case -1:
        return h ? "yesterday" : `last ${s[r][0]}`;
      case 0:
        return h ? "today" : `this ${s[r][0]}`;
    }
  }
  const a = Object.is(e, -0) || e < 0, o = Math.abs(e), l = o === 1, u = s[r], c = n ? l ? u[1] : u[2] || u[1] : l ? s[r][0] : r;
  return a ? `${o} ${c} ago` : `in ${o} ${c}`;
}
function Jt(r, e) {
  let t = "";
  for (const n of r)
    n.literal ? t += n.val : t += e(n.val);
  return t;
}
const Zs = {
  D: Ze,
  DD: mr,
  DDD: yr,
  DDDD: gr,
  t: pr,
  tt: wr,
  ttt: Tr,
  tttt: Sr,
  T: Or,
  TT: kr,
  TTT: br,
  TTTT: xr,
  f: Er,
  ff: Ir,
  fff: Nr,
  ffff: Cr,
  F: Mr,
  FF: Dr,
  FFF: vr,
  FFFF: Ar
};
class M {
  static create(e, t = {}) {
    return new M(e, t);
  }
  static parseFormat(e) {
    let t = null, n = "", s = !1;
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const o = e.charAt(a);
      o === "'" ? (n.length > 0 && i.push({ literal: s || /^\s+$/.test(n), val: n }), t = null, n = "", s = !s) : s || o === t ? n += o : (n.length > 0 && i.push({ literal: /^\s+$/.test(n), val: n }), n = o, t = o);
    }
    return n.length > 0 && i.push({ literal: s || /^\s+$/.test(n), val: n }), i;
  }
  static macroTokenToFormatOpts(e) {
    return Zs[e];
  }
  constructor(e, t) {
    this.opts = t, this.loc = e, this.systemLoc = null;
  }
  formatWithSystemDefault(e, t) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, { ...this.opts, ...t }).format();
  }
  dtFormatter(e, t = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...t });
  }
  formatDateTime(e, t) {
    return this.dtFormatter(e, t).format();
  }
  formatDateTimeParts(e, t) {
    return this.dtFormatter(e, t).formatToParts();
  }
  formatInterval(e, t) {
    return this.dtFormatter(e.start, t).dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
  }
  resolvedOptions(e, t) {
    return this.dtFormatter(e, t).resolvedOptions();
  }
  num(e, t = 0) {
    if (this.opts.forceSimple)
      return x(e, t);
    const n = { ...this.opts };
    return t > 0 && (n.padTo = t), this.loc.numberFormatter(n).format(e);
  }
  formatDateTimeFromString(e, t) {
    const n = this.loc.listingMode() === "en", s = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", i = (d, O) => this.loc.extract(e, d, O), a = (d) => e.isOffsetFixed && e.offset === 0 && d.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, d.format) : "", o = () => n ? Vs(e) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (d, O) => n ? Ws(e, d) : i(O ? { month: d } : { month: d, day: "numeric" }, "month"), u = (d, O) => n ? Rs(e, d) : i(
      O ? { weekday: d } : { weekday: d, month: "long", day: "numeric" },
      "weekday"
    ), c = (d) => {
      const O = M.macroTokenToFormatOpts(d);
      return O ? this.formatWithSystemDefault(e, O) : d;
    }, h = (d) => n ? zs(e, d) : i({ era: d }, "era"), w = (d) => {
      switch (d) {
        // ms
        case "S":
          return this.num(e.millisecond);
        case "u":
        // falls through
        case "SSS":
          return this.num(e.millisecond, 3);
        // seconds
        case "s":
          return this.num(e.second);
        case "ss":
          return this.num(e.second, 2);
        // fractional seconds
        case "uu":
          return this.num(Math.floor(e.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(e.millisecond / 100));
        // minutes
        case "m":
          return this.num(e.minute);
        case "mm":
          return this.num(e.minute, 2);
        // hours
        case "h":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
        case "hh":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
        case "H":
          return this.num(e.hour);
        case "HH":
          return this.num(e.hour, 2);
        // offset
        case "Z":
          return a({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return a({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return a({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return e.zone.offsetName(e.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return e.zone.offsetName(e.ts, { format: "long", locale: this.loc.locale });
        // zone
        case "z":
          return e.zoneName;
        // meridiems
        case "a":
          return o();
        // dates
        case "d":
          return s ? i({ day: "numeric" }, "day") : this.num(e.day);
        case "dd":
          return s ? i({ day: "2-digit" }, "day") : this.num(e.day, 2);
        // weekdays - standalone
        case "c":
          return this.num(e.weekday);
        case "ccc":
          return u("short", !0);
        case "cccc":
          return u("long", !0);
        case "ccccc":
          return u("narrow", !0);
        // weekdays - format
        case "E":
          return this.num(e.weekday);
        case "EEE":
          return u("short", !1);
        case "EEEE":
          return u("long", !1);
        case "EEEEE":
          return u("narrow", !1);
        // months - standalone
        case "L":
          return s ? i({ month: "numeric", day: "numeric" }, "month") : this.num(e.month);
        case "LL":
          return s ? i({ month: "2-digit", day: "numeric" }, "month") : this.num(e.month, 2);
        case "LLL":
          return l("short", !0);
        case "LLLL":
          return l("long", !0);
        case "LLLLL":
          return l("narrow", !0);
        // months - format
        case "M":
          return s ? i({ month: "numeric" }, "month") : this.num(e.month);
        case "MM":
          return s ? i({ month: "2-digit" }, "month") : this.num(e.month, 2);
        case "MMM":
          return l("short", !1);
        case "MMMM":
          return l("long", !1);
        case "MMMMM":
          return l("narrow", !1);
        // years
        case "y":
          return s ? i({ year: "numeric" }, "year") : this.num(e.year);
        case "yy":
          return s ? i({ year: "2-digit" }, "year") : this.num(e.year.toString().slice(-2), 2);
        case "yyyy":
          return s ? i({ year: "numeric" }, "year") : this.num(e.year, 4);
        case "yyyyyy":
          return s ? i({ year: "numeric" }, "year") : this.num(e.year, 6);
        // eras
        case "G":
          return h("short");
        case "GG":
          return h("long");
        case "GGGGG":
          return h("narrow");
        case "kk":
          return this.num(e.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(e.weekYear, 4);
        case "W":
          return this.num(e.weekNumber);
        case "WW":
          return this.num(e.weekNumber, 2);
        case "n":
          return this.num(e.localWeekNumber);
        case "nn":
          return this.num(e.localWeekNumber, 2);
        case "ii":
          return this.num(e.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(e.localWeekYear, 4);
        case "o":
          return this.num(e.ordinal);
        case "ooo":
          return this.num(e.ordinal, 3);
        case "q":
          return this.num(e.quarter);
        case "qq":
          return this.num(e.quarter, 2);
        case "X":
          return this.num(Math.floor(e.ts / 1e3));
        case "x":
          return this.num(e.ts);
        default:
          return c(d);
      }
    };
    return Jt(M.parseFormat(t), w);
  }
  formatDurationFromString(e, t) {
    const n = (l) => {
      switch (l[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, s = (l) => (u) => {
      const c = n(u);
      return c ? this.num(l.get(c), u.length) : u;
    }, i = M.parseFormat(t), a = i.reduce(
      (l, { literal: u, val: c }) => u ? l : l.concat(c),
      []
    ), o = e.shiftTo(...a.map(n).filter((l) => l));
    return Jt(i, s(o));
  }
}
const Kr = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function ge(...r) {
  const e = r.reduce((t, n) => t + n.source, "");
  return RegExp(`^${e}$`);
}
function pe(...r) {
  return (e) => r.reduce(
    ([t, n, s], i) => {
      const [a, o, l] = i(e, s);
      return [{ ...t, ...a }, o || n, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function we(r, ...e) {
  if (r == null)
    return [null, null];
  for (const [t, n] of e) {
    const s = t.exec(r);
    if (s)
      return n(s);
  }
  return [null, null];
}
function Xr(...r) {
  return (e, t) => {
    const n = {};
    let s;
    for (s = 0; s < r.length; s++)
      n[r[s]] = q(e[t + s]);
    return [n, null, t + s];
  };
}
const en = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, Ps = `(?:${en.source}?(?:\\[(${Kr.source})\\])?)?`, It = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, tn = RegExp(`${It.source}${Ps}`), Dt = RegExp(`(?:T${tn.source})?`), _s = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Gs = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Hs = /(\d{4})-?(\d{3})/, js = Xr("weekYear", "weekNumber", "weekDay"), Ys = Xr("year", "ordinal"), qs = /(\d{4})-(\d\d)-(\d\d)/, rn = RegExp(
  `${It.source} ?(?:${en.source}|(${Kr.source}))?`
), Js = RegExp(`(?: ${rn.source})?`);
function me(r, e, t) {
  const n = r[e];
  return y(n) ? t : q(n);
}
function Bs(r, e) {
  return [{
    year: me(r, e),
    month: me(r, e + 1, 1),
    day: me(r, e + 2, 1)
  }, null, e + 3];
}
function Te(r, e) {
  return [{
    hours: me(r, e, 0),
    minutes: me(r, e + 1, 0),
    seconds: me(r, e + 2, 0),
    milliseconds: Et(r[e + 3])
  }, null, e + 4];
}
function Ce(r, e) {
  const t = !r[e] && !r[e + 1], n = qe(r[e + 1], r[e + 2]), s = t ? null : I.instance(n);
  return [{}, s, e + 3];
}
function Ae(r, e) {
  const t = r[e] ? P.create(r[e]) : null;
  return [{}, t, e + 1];
}
const Qs = RegExp(`^T?${It.source}$`), Ks = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Xs(r) {
  const [e, t, n, s, i, a, o, l, u] = r, c = e[0] === "-", h = l && l[0] === "-", w = (d, O = !1) => d !== void 0 && (O || d && c) ? -d : d;
  return [
    {
      years: w(re(t)),
      months: w(re(n)),
      weeks: w(re(s)),
      days: w(re(i)),
      hours: w(re(a)),
      minutes: w(re(o)),
      seconds: w(re(l), l === "-0"),
      milliseconds: w(Et(u), h)
    }
  ];
}
const ei = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function Nt(r, e, t, n, s, i, a) {
  const o = {
    year: e.length === 2 ? wt(q(e)) : q(e),
    month: Hr.indexOf(t) + 1,
    day: q(n),
    hour: q(s),
    minute: q(i)
  };
  return a && (o.second = q(a)), r && (o.weekday = r.length > 3 ? Yr.indexOf(r) + 1 : qr.indexOf(r) + 1), o;
}
const ti = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function ri(r) {
  const [
    ,
    e,
    t,
    n,
    s,
    i,
    a,
    o,
    l,
    u,
    c,
    h
  ] = r, w = Nt(e, s, n, t, i, a, o);
  let d;
  return l ? d = ei[l] : u ? d = 0 : d = qe(c, h), [w, new I(d)];
}
function ni(r) {
  return r.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const si = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, ii = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ai = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Bt(r) {
  const [, e, t, n, s, i, a, o] = r;
  return [Nt(e, s, n, t, i, a, o), I.utcInstance];
}
function oi(r) {
  const [, e, t, n, s, i, a, o] = r;
  return [Nt(e, o, t, n, s, i, a), I.utcInstance];
}
const li = ge(_s, Dt), ui = ge(Gs, Dt), ci = ge(Hs, Dt), fi = ge(tn), nn = pe(
  Bs,
  Te,
  Ce,
  Ae
), di = pe(
  js,
  Te,
  Ce,
  Ae
), hi = pe(
  Ys,
  Te,
  Ce,
  Ae
), mi = pe(
  Te,
  Ce,
  Ae
);
function yi(r) {
  return we(
    r,
    [li, nn],
    [ui, di],
    [ci, hi],
    [fi, mi]
  );
}
function gi(r) {
  return we(ni(r), [ti, ri]);
}
function pi(r) {
  return we(
    r,
    [si, Bt],
    [ii, Bt],
    [ai, oi]
  );
}
function wi(r) {
  return we(r, [Ks, Xs]);
}
const Ti = pe(Te);
function Si(r) {
  return we(r, [Qs, Ti]);
}
const Oi = ge(qs, Js), ki = ge(rn), bi = pe(
  Te,
  Ce,
  Ae
);
function xi(r) {
  return we(
    r,
    [Oi, nn],
    [ki, bi]
  );
}
const Qt = "Invalid Duration", sn = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, Ei = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...sn
}, A = 146097 / 400, ue = 146097 / 4800, Mi = {
  years: {
    quarters: 4,
    months: 12,
    weeks: A / 7,
    days: A,
    hours: A * 24,
    minutes: A * 24 * 60,
    seconds: A * 24 * 60 * 60,
    milliseconds: A * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: A / 28,
    days: A / 4,
    hours: A * 24 / 4,
    minutes: A * 24 * 60 / 4,
    seconds: A * 24 * 60 * 60 / 4,
    milliseconds: A * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: ue / 7,
    days: ue,
    hours: ue * 24,
    minutes: ue * 24 * 60,
    seconds: ue * 24 * 60 * 60,
    milliseconds: ue * 24 * 60 * 60 * 1e3
  },
  ...sn
}, se = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], Ii = se.slice(0).reverse();
function Y(r, e, t = !1) {
  const n = {
    values: t ? e.values : { ...r.values, ...e.values || {} },
    loc: r.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || r.conversionAccuracy,
    matrix: e.matrix || r.matrix
  };
  return new p(n);
}
function an(r, e) {
  let t = e.milliseconds ?? 0;
  for (const n of Ii.slice(1))
    e[n] && (t += e[n] * r[n].milliseconds);
  return t;
}
function Kt(r, e) {
  const t = an(r, e) < 0 ? -1 : 1;
  se.reduceRight((n, s) => {
    if (y(e[s]))
      return n;
    if (n) {
      const i = e[n] * t, a = r[s][n], o = Math.floor(i / a);
      e[s] += o * t, e[n] -= o * a * t;
    }
    return s;
  }, null), se.reduce((n, s) => {
    if (y(e[s]))
      return n;
    if (n) {
      const i = e[n] % 1;
      e[n] -= i, e[s] += i * r[n][s];
    }
    return s;
  }, null);
}
function Di(r) {
  const e = {};
  for (const [t, n] of Object.entries(r))
    n !== 0 && (e[t] = n);
  return e;
}
class p {
  /**
   * @private
   */
  constructor(e) {
    const t = e.conversionAccuracy === "longterm" || !1;
    let n = t ? Mi : Ei;
    e.matrix && (n = e.matrix), this.values = e.values, this.loc = e.loc || S.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = n, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(e, t) {
    return p.fromObject({ milliseconds: e }, t);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(e, t = {}) {
    if (e == null || typeof e != "object")
      throw new E(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new p({
      values: Ge(e, p.normalizeUnit),
      loc: S.fromObject(t),
      conversionAccuracy: t.conversionAccuracy,
      matrix: t.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(e) {
    if (K(e))
      return p.fromMillis(e);
    if (p.isDuration(e))
      return e;
    if (typeof e == "object")
      return p.fromObject(e);
    throw new E(
      `Unknown duration argument ${e} of type ${typeof e}`
    );
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(e, t) {
    const [n] = wi(e);
    return n ? p.fromObject(n, t) : p.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(e, t) {
    const [n] = Si(e);
    return n ? p.fromObject(n, t) : p.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new E("need to specify a reason the Duration is invalid");
    const n = e instanceof R ? e : new R(e, t);
    if (b.throwOnInvalid)
      throw new Xn(n);
    return new p({ invalid: n });
  }
  /**
   * @private
   */
  static normalizeUnit(e) {
    const t = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[e && e.toLowerCase()];
    if (!t) throw new hr(e);
    return t;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(e) {
    return e && e.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(e, t = {}) {
    const n = {
      ...t,
      floor: t.round !== !1 && t.floor !== !1
    };
    return this.isValid ? M.create(this.loc, n).formatDurationFromString(this, e) : Qt;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(e = {}) {
    if (!this.isValid) return Qt;
    const t = se.map((n) => {
      const s = this.values[n];
      return y(s) ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: n.slice(0, -1) }).format(s);
    }).filter((n) => n);
    return this.loc.listFormatter({ type: "conjunction", style: e.listStyle || "narrow", ...e }).format(t);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) return null;
    let e = "P";
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += Mt(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(e = {}) {
    if (!this.isValid) return null;
    const t = this.toMillis();
    return t < 0 || t >= 864e5 ? null : (e = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...e,
      includeOffset: !1
    }, m.fromMillis(t, { zone: "UTC" }).toISOTime(e));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? an(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(e) {
    if (!this.isValid) return this;
    const t = p.fromDurationLike(e), n = {};
    for (const s of se)
      (ye(t.values, s) || ye(this.values, s)) && (n[s] = t.get(s) + this.get(s));
    return Y(this, { values: n }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = p.fromDurationLike(e);
    return this.plus(t.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(e) {
    if (!this.isValid) return this;
    const t = {};
    for (const n of Object.keys(this.values))
      t[n] = Gr(e(this.values[n], n));
    return Y(this, { values: t }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(e) {
    return this[p.normalizeUnit(e)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(e) {
    if (!this.isValid) return this;
    const t = { ...this.values, ...Ge(e, p.normalizeUnit) };
    return Y(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: n, matrix: s } = {}) {
    const a = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: s, conversionAccuracy: n };
    return Y(this, a);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const e = this.toObject();
    return Kt(this.matrix, e), Y(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = Di(this.normalize().shiftToAll().toObject());
    return Y(this, { values: e }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...e) {
    if (!this.isValid) return this;
    if (e.length === 0)
      return this;
    e = e.map((a) => p.normalizeUnit(a));
    const t = {}, n = {}, s = this.toObject();
    let i;
    for (const a of se)
      if (e.indexOf(a) >= 0) {
        i = a;
        let o = 0;
        for (const u in n)
          o += this.matrix[u][a] * n[u], n[u] = 0;
        K(s[a]) && (o += s[a]);
        const l = Math.trunc(o);
        t[a] = l, n[a] = (o * 1e3 - l * 1e3) / 1e3;
      } else K(s[a]) && (n[a] = s[a]);
    for (const a in n)
      n[a] !== 0 && (t[i] += a === i ? n[a] : n[a] / this.matrix[i][a]);
    return Kt(this.matrix, t), Y(this, { values: t }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ) : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const e = {};
    for (const t of Object.keys(this.values))
      e[t] = this.values[t] === 0 ? 0 : -this.values[t];
    return Y(this, { values: e }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(e) {
    if (!this.isValid || !e.isValid || !this.loc.equals(e.loc))
      return !1;
    function t(n, s) {
      return n === void 0 || n === 0 ? s === void 0 || s === 0 : n === s;
    }
    for (const n of se)
      if (!t(this.values[n], e.values[n]))
        return !1;
    return !0;
  }
}
const ce = "Invalid Interval";
function Ni(r, e) {
  return !r || !r.isValid ? k.invalid("missing or invalid start") : !e || !e.isValid ? k.invalid("missing or invalid end") : e < r ? k.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${r.toISO()} and end=${e.toISO()}`
  ) : null;
}
class k {
  /**
   * @private
   */
  constructor(e) {
    this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new E("need to specify a reason the Interval is invalid");
    const n = e instanceof R ? e : new R(e, t);
    if (b.throwOnInvalid)
      throw new Kn(n);
    return new k({ invalid: n });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const n = ke(e), s = ke(t), i = Ni(n, s);
    return i ?? new k({
      start: n,
      end: s
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(e, t) {
    const n = p.fromDurationLike(t), s = ke(e);
    return k.fromDateTimes(s, s.plus(n));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const n = p.fromDurationLike(t), s = ke(e);
    return k.fromDateTimes(s.minus(n), s);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(e, t) {
    const [n, s] = (e || "").split("/", 2);
    if (n && s) {
      let i, a;
      try {
        i = m.fromISO(n, t), a = i.isValid;
      } catch {
        a = !1;
      }
      let o, l;
      try {
        o = m.fromISO(s, t), l = o.isValid;
      } catch {
        l = !1;
      }
      if (a && l)
        return k.fromDateTimes(i, o);
      if (a) {
        const u = p.fromISO(s, t);
        if (u.isValid)
          return k.after(i, u);
      } else if (l) {
        const u = p.fromISO(n, t);
        if (u.isValid)
          return k.before(o, u);
      }
    }
    return k.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(e) {
    return e && e.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns the last DateTime included in the interval (since end is not part of the interval)
   * @type {DateTime}
   */
  get lastDateTime() {
    return this.isValid && this.e ? this.e.minus(1) : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(e = "milliseconds", t) {
    if (!this.isValid) return NaN;
    const n = this.start.startOf(e, t);
    let s;
    return t != null && t.useLocaleWeeks ? s = this.end.reconfigure({ locale: n.locale }) : s = this.end, s = s.startOf(e, t), Math.floor(s.diff(n, e).get(e)) + (s.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(e) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(e) {
    return this.isValid ? this.s > e : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(e) {
    return this.isValid ? this.e <= e : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(e) {
    return this.isValid ? this.s <= e && this.e > e : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start: e, end: t } = {}) {
    return this.isValid ? k.fromDateTimes(e || this.s, t || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const t = e.map(ke).filter((a) => this.contains(a)).sort((a, o) => a.toMillis() - o.toMillis()), n = [];
    let { s } = this, i = 0;
    for (; s < this.e; ) {
      const a = t[i] || this.e, o = +a > +this.e ? this.e : a;
      n.push(k.fromDateTimes(s, o)), s = o, i += 1;
    }
    return n;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(e) {
    const t = p.fromDurationLike(e);
    if (!this.isValid || !t.isValid || t.as("milliseconds") === 0)
      return [];
    let { s: n } = this, s = 1, i;
    const a = [];
    for (; n < this.e; ) {
      const o = this.start.plus(t.mapUnits((l) => l * s));
      i = +o > +this.e ? this.e : o, a.push(k.fromDateTimes(n, i)), n = i, s += 1;
    }
    return a;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(e) {
    return this.isValid ? +this.e == +e.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(e) {
    return this.isValid ? +e.e == +this.s : !1;
  }
  /**
   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(e) {
    return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(e) {
    return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(e) {
    if (!this.isValid) return this;
    const t = this.s > e.s ? this.s : e.s, n = this.e < e.e ? this.e : e.e;
    return t >= n ? null : k.fromDateTimes(t, n);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(e) {
    if (!this.isValid) return this;
    const t = this.s < e.s ? this.s : e.s, n = this.e > e.e ? this.e : e.e;
    return k.fromDateTimes(t, n);
  }
  /**
   * Merge an array of Intervals into an equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
   * and ending with the latest.
   *
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(e) {
    const [t, n] = e.sort((s, i) => s.s - i.s).reduce(
      ([s, i], a) => i ? i.overlaps(a) || i.abutsStart(a) ? [s, i.union(a)] : [s.concat([i]), a] : [s, a],
      [[], null]
    );
    return n && t.push(n), t;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(e) {
    let t = null, n = 0;
    const s = [], i = e.map((l) => [
      { time: l.s, type: "s" },
      { time: l.e, type: "e" }
    ]), a = Array.prototype.concat(...i), o = a.sort((l, u) => l.time - u.time);
    for (const l of o)
      n += l.type === "s" ? 1 : -1, n === 1 ? t = l.time : (t && +t != +l.time && s.push(k.fromDateTimes(t, l.time)), t = null);
    return k.merge(s);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return k.xor([this].concat(e)).map((t) => this.intersection(t)).filter((t) => t && !t.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : ce;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(e = Ze, t = {}) {
    return this.isValid ? M.create(this.s.loc.clone(t), e).formatInterval(this) : ce;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : ce;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : ce;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : ce;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(e, { separator: t = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : ce;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(e, t) {
    return this.isValid ? this.e.diff(this.s, e, t) : p.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return k.fromDateTimes(e(this.s), e(this.e));
  }
}
class $e {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = b.defaultZone) {
    const t = m.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return P.isValidZone(e);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(e) {
    return J(e, b.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || S.create(e)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || S.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || S.create(e)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(e = "long", { locale: t = null, numberingSystem: n = null, locObj: s = null, outputCalendar: i = "gregory" } = {}) {
    return (s || S.create(t, n, i)).months(e);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(e = "long", { locale: t = null, numberingSystem: n = null, locObj: s = null, outputCalendar: i = "gregory" } = {}) {
    return (s || S.create(t, n, i)).months(e, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(e = "long", { locale: t = null, numberingSystem: n = null, locObj: s = null } = {}) {
    return (s || S.create(t, n, null)).weekdays(e);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(e = "long", { locale: t = null, numberingSystem: n = null, locObj: s = null } = {}) {
    return (s || S.create(t, n, null)).weekdays(e, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale: e = null } = {}) {
    return S.create(e).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(e = "short", { locale: t = null } = {}) {
    return S.create(t, null, "gregory").eras(e);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: Zr(), localeWeek: Pr() };
  }
}
function Xt(r, e) {
  const t = (s) => s.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), n = t(e) - t(r);
  return Math.floor(p.fromMillis(n).as("days"));
}
function vi(r, e, t) {
  const n = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const c = Xt(l, u);
        return (c - c % 7) / 7;
      }
    ],
    ["days", Xt]
  ], s = {}, i = r;
  let a, o;
  for (const [l, u] of n)
    t.indexOf(l) >= 0 && (a = l, s[l] = u(r, e), o = i.plus(s), o > e ? (s[l]--, r = i.plus(s), r > e && (o = r, s[l]--, r = i.plus(s))) : r = o);
  return [r, s, o, a];
}
function Ci(r, e, t, n) {
  let [s, i, a, o] = vi(r, e, t);
  const l = e - s, u = t.filter(
    (h) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(h) >= 0
  );
  u.length === 0 && (a < e && (a = s.plus({ [o]: 1 })), a !== s && (i[o] = (i[o] || 0) + l / (a - s)));
  const c = p.fromObject(i, n);
  return u.length > 0 ? p.fromMillis(l, n).shiftTo(...u).plus(c) : c;
}
const Ai = "missing Intl.DateTimeFormat.formatToParts support";
function T(r, e = (t) => t) {
  return { regex: r, deser: ([t]) => e(Os(t)) };
}
const Fi = " ", on = `[ ${Fi}]`, ln = new RegExp(on, "g");
function $i(r) {
  return r.replace(/\./g, "\\.?").replace(ln, on);
}
function er(r) {
  return r.replace(/\./g, "").replace(ln, " ").toLowerCase();
}
function V(r, e) {
  return r === null ? null : {
    regex: RegExp(r.map($i).join("|")),
    deser: ([t]) => r.findIndex((n) => er(t) === er(n)) + e
  };
}
function tr(r, e) {
  return { regex: r, deser: ([, t, n]) => qe(t, n), groups: e };
}
function Le(r) {
  return { regex: r, deser: ([e]) => e };
}
function Li(r) {
  return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Vi(r, e) {
  const t = L(e), n = L(e, "{2}"), s = L(e, "{3}"), i = L(e, "{4}"), a = L(e, "{6}"), o = L(e, "{1,2}"), l = L(e, "{1,3}"), u = L(e, "{1,6}"), c = L(e, "{1,9}"), h = L(e, "{2,4}"), w = L(e, "{4,6}"), d = (D) => ({ regex: RegExp(Li(D.val)), deser: ([G]) => G, literal: !0 }), v = ((D) => {
    if (r.literal)
      return d(D);
    switch (D.val) {
      // era
      case "G":
        return V(e.eras("short"), 0);
      case "GG":
        return V(e.eras("long"), 0);
      // years
      case "y":
        return T(u);
      case "yy":
        return T(h, wt);
      case "yyyy":
        return T(i);
      case "yyyyy":
        return T(w);
      case "yyyyyy":
        return T(a);
      // months
      case "M":
        return T(o);
      case "MM":
        return T(n);
      case "MMM":
        return V(e.months("short", !0), 1);
      case "MMMM":
        return V(e.months("long", !0), 1);
      case "L":
        return T(o);
      case "LL":
        return T(n);
      case "LLL":
        return V(e.months("short", !1), 1);
      case "LLLL":
        return V(e.months("long", !1), 1);
      // dates
      case "d":
        return T(o);
      case "dd":
        return T(n);
      // ordinals
      case "o":
        return T(l);
      case "ooo":
        return T(s);
      // time
      case "HH":
        return T(n);
      case "H":
        return T(o);
      case "hh":
        return T(n);
      case "h":
        return T(o);
      case "mm":
        return T(n);
      case "m":
        return T(o);
      case "q":
        return T(o);
      case "qq":
        return T(n);
      case "s":
        return T(o);
      case "ss":
        return T(n);
      case "S":
        return T(l);
      case "SSS":
        return T(s);
      case "u":
        return Le(c);
      case "uu":
        return Le(o);
      case "uuu":
        return T(t);
      // meridiem
      case "a":
        return V(e.meridiems(), 0);
      // weekYear (k)
      case "kkkk":
        return T(i);
      case "kk":
        return T(h, wt);
      // weekNumber (W)
      case "W":
        return T(o);
      case "WW":
        return T(n);
      // weekdays
      case "E":
      case "c":
        return T(t);
      case "EEE":
        return V(e.weekdays("short", !1), 1);
      case "EEEE":
        return V(e.weekdays("long", !1), 1);
      case "ccc":
        return V(e.weekdays("short", !0), 1);
      case "cccc":
        return V(e.weekdays("long", !0), 1);
      // offset/zone
      case "Z":
      case "ZZ":
        return tr(new RegExp(`([+-]${o.source})(?::(${n.source}))?`), 2);
      case "ZZZ":
        return tr(new RegExp(`([+-]${o.source})(${n.source})?`), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case "z":
        return Le(/[a-z_+-/]{1,256}?/i);
      // this special-case "token" represents a place where a macro-token expanded into a white-space literal
      // in this case we accept any non-newline white-space
      case " ":
        return Le(/[^\S\n\r]/);
      default:
        return d(D);
    }
  })(r) || {
    invalidReason: Ai
  };
  return v.token = r, v;
}
const Ri = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function Wi(r, e, t) {
  const { type: n, value: s } = r;
  if (n === "literal") {
    const l = /^\s+$/.test(s);
    return {
      literal: !l,
      val: l ? " " : s
    };
  }
  const i = e[n];
  let a = n;
  n === "hour" && (e.hour12 != null ? a = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? a = "hour12" : a = "hour24" : a = t.hour12 ? "hour12" : "hour24");
  let o = Ri[a];
  if (typeof o == "object" && (o = o[i]), o)
    return {
      literal: !1,
      val: o
    };
}
function zi(r) {
  return [`^${r.map((t) => t.regex).reduce((t, n) => `${t}(${n.source})`, "")}$`, r];
}
function Ui(r, e, t) {
  const n = r.match(e);
  if (n) {
    const s = {};
    let i = 1;
    for (const a in t)
      if (ye(t, a)) {
        const o = t[a], l = o.groups ? o.groups + 1 : 1;
        !o.literal && o.token && (s[o.token.val[0]] = o.deser(n.slice(i, i + l))), i += l;
      }
    return [n, s];
  } else
    return [n, {}];
}
function Zi(r) {
  const e = (i) => {
    switch (i) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let t = null, n;
  return y(r.z) || (t = P.create(r.z)), y(r.Z) || (t || (t = new I(r.Z)), n = r.Z), y(r.q) || (r.M = (r.q - 1) * 3 + 1), y(r.h) || (r.h < 12 && r.a === 1 ? r.h += 12 : r.h === 12 && r.a === 0 && (r.h = 0)), r.G === 0 && r.y && (r.y = -r.y), y(r.u) || (r.S = Et(r.u)), [Object.keys(r).reduce((i, a) => {
    const o = e(a);
    return o && (i[o] = r[a]), i;
  }, {}), t, n];
}
let nt = null;
function Pi() {
  return nt || (nt = m.fromMillis(1555555555555)), nt;
}
function _i(r, e) {
  if (r.literal)
    return r;
  const t = M.macroTokenToFormatOpts(r.val), n = dn(t, e);
  return n == null || n.includes(void 0) ? r : n;
}
function un(r, e) {
  return Array.prototype.concat(...r.map((t) => _i(t, e)));
}
class cn {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = un(M.parseFormat(t), e), this.units = this.tokens.map((n) => Vi(n, e)), this.disqualifyingUnit = this.units.find((n) => n.invalidReason), !this.disqualifyingUnit) {
      const [n, s] = zi(this.units);
      this.regex = RegExp(n, "i"), this.handlers = s;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, n] = Ui(e, this.regex, this.handlers), [s, i, a] = n ? Zi(n) : [null, null, void 0];
      if (ye(n, "a") && ye(n, "H"))
        throw new de(
          "Can't include meridiem when specifying 24-hour format"
        );
      return {
        input: e,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches: t,
        matches: n,
        result: s,
        zone: i,
        specificOffset: a
      };
    } else
      return { input: e, tokens: this.tokens, invalidReason: this.invalidReason };
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
}
function fn(r, e, t) {
  return new cn(r, t).explainFromTokens(e);
}
function Gi(r, e, t) {
  const { result: n, zone: s, specificOffset: i, invalidReason: a } = fn(r, e, t);
  return [n, s, i, a];
}
function dn(r, e) {
  if (!r)
    return null;
  const n = M.create(e, r).dtFormatter(Pi()), s = n.formatToParts(), i = n.resolvedOptions();
  return s.map((a) => Wi(a, r, i));
}
const st = "Invalid DateTime", rr = 864e13;
function xe(r) {
  return new R("unsupported zone", `the zone "${r.name}" is not supported`);
}
function it(r) {
  return r.weekData === null && (r.weekData = Pe(r.c)), r.weekData;
}
function at(r) {
  return r.localWeekData === null && (r.localWeekData = Pe(
    r.c,
    r.loc.getMinDaysInFirstWeek(),
    r.loc.getStartOfWeek()
  )), r.localWeekData;
}
function ne(r, e) {
  const t = {
    ts: r.ts,
    zone: r.zone,
    c: r.c,
    o: r.o,
    loc: r.loc,
    invalid: r.invalid
  };
  return new m({ ...t, ...e, old: t });
}
function hn(r, e, t) {
  let n = r - e * 60 * 1e3;
  const s = t.offset(n);
  if (e === s)
    return [n, e];
  n -= (s - e) * 60 * 1e3;
  const i = t.offset(n);
  return s === i ? [n, s] : [r - Math.min(s, i) * 60 * 1e3, Math.max(s, i)];
}
function Ve(r, e) {
  r += e * 60 * 1e3;
  const t = new Date(r);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
    hour: t.getUTCHours(),
    minute: t.getUTCMinutes(),
    second: t.getUTCSeconds(),
    millisecond: t.getUTCMilliseconds()
  };
}
function ze(r, e, t) {
  return hn(Ye(r), e, t);
}
function nr(r, e) {
  const t = r.o, n = r.c.year + Math.trunc(e.years), s = r.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, i = {
    ...r.c,
    year: n,
    month: s,
    day: Math.min(r.c.day, _e(n, s)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, a = p.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), o = Ye(i);
  let [l, u] = hn(o, t, r.zone);
  return a !== 0 && (l += a, u = r.zone.offset(l)), { ts: l, o: u };
}
function fe(r, e, t, n, s, i) {
  const { setZone: a, zone: o } = t;
  if (r && Object.keys(r).length !== 0 || e) {
    const l = e || o, u = m.fromObject(r, {
      ...t,
      zone: l,
      specificOffset: i
    });
    return a ? u : u.setZone(o);
  } else
    return m.invalid(
      new R("unparsable", `the input "${s}" can't be parsed as ${n}`)
    );
}
function Re(r, e, t = !0) {
  return r.isValid ? M.create(S.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(r, e) : null;
}
function ot(r, e) {
  const t = r.c.year > 9999 || r.c.year < 0;
  let n = "";
  return t && r.c.year >= 0 && (n += "+"), n += x(r.c.year, t ? 6 : 4), e ? (n += "-", n += x(r.c.month), n += "-", n += x(r.c.day)) : (n += x(r.c.month), n += x(r.c.day)), n;
}
function sr(r, e, t, n, s, i) {
  let a = x(r.c.hour);
  return e ? (a += ":", a += x(r.c.minute), (r.c.millisecond !== 0 || r.c.second !== 0 || !t) && (a += ":")) : a += x(r.c.minute), (r.c.millisecond !== 0 || r.c.second !== 0 || !t) && (a += x(r.c.second), (r.c.millisecond !== 0 || !n) && (a += ".", a += x(r.c.millisecond, 3))), s && (r.isOffsetFixed && r.offset === 0 && !i ? a += "Z" : r.o < 0 ? (a += "-", a += x(Math.trunc(-r.o / 60)), a += ":", a += x(Math.trunc(-r.o % 60))) : (a += "+", a += x(Math.trunc(r.o / 60)), a += ":", a += x(Math.trunc(r.o % 60)))), i && (a += "[" + r.zone.ianaName + "]"), a;
}
const mn = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Hi = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, ji = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, yn = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Yi = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], qi = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Ji(r) {
  const e = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[r.toLowerCase()];
  if (!e) throw new hr(r);
  return e;
}
function ir(r) {
  switch (r.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return Ji(r);
  }
}
function Bi(r) {
  if (Ee === void 0 && (Ee = b.now()), r.type !== "iana")
    return r.offset(Ee);
  const e = r.name;
  let t = Tt.get(e);
  return t === void 0 && (t = r.offset(Ee), Tt.set(e, t)), t;
}
function ar(r, e) {
  const t = J(e.zone, b.defaultZone);
  if (!t.isValid)
    return m.invalid(xe(t));
  const n = S.fromObject(e);
  let s, i;
  if (y(r.year))
    s = b.now();
  else {
    for (const l of yn)
      y(r[l]) && (r[l] = mn[l]);
    const a = zr(r) || Ur(r);
    if (a)
      return m.invalid(a);
    const o = Bi(t);
    [s, i] = ze(r, o, t);
  }
  return new m({ ts: s, zone: t, loc: n, o: i });
}
function or(r, e, t) {
  const n = y(t.round) ? !0 : t.round, s = (a, o) => (a = Mt(a, n || t.calendary ? 0 : 2, !0), e.loc.clone(t).relFormatter(t).format(a, o)), i = (a) => t.calendary ? e.hasSame(r, a) ? 0 : e.startOf(a).diff(r.startOf(a), a).get(a) : e.diff(r, a).get(a);
  if (t.unit)
    return s(i(t.unit), t.unit);
  for (const a of t.units) {
    const o = i(a);
    if (Math.abs(o) >= 1)
      return s(o, a);
  }
  return s(r > e ? -0 : 0, t.units[t.units.length - 1]);
}
function lr(r) {
  let e = {}, t;
  return r.length > 0 && typeof r[r.length - 1] == "object" ? (e = r[r.length - 1], t = Array.from(r).slice(0, r.length - 1)) : t = Array.from(r), [e, t];
}
let Ee;
const Tt = /* @__PURE__ */ new Map();
class m {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || b.defaultZone;
    let n = e.invalid || (Number.isNaN(e.ts) ? new R("invalid input") : null) || (t.isValid ? null : xe(t));
    this.ts = y(e.ts) ? b.now() : e.ts;
    let s = null, i = null;
    if (!n)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [s, i] = [e.old.c, e.old.o];
      else {
        const o = K(e.o) && !e.old ? e.o : t.offset(this.ts);
        s = Ve(this.ts, o), n = Number.isNaN(s.year) ? new R("invalid input") : null, s = n ? null : s, i = n ? null : o;
      }
    this._zone = t, this.loc = e.loc || S.create(), this.invalid = n, this.weekData = null, this.localWeekData = null, this.c = s, this.o = i, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new m({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [e, t] = lr(arguments), [n, s, i, a, o, l, u] = t;
    return ar({ year: n, month: s, day: i, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [e, t] = lr(arguments), [n, s, i, a, o, l, u] = t;
    return e.zone = I.utcInstance, ar({ year: n, month: s, day: i, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const n = Ms(e) ? e.valueOf() : NaN;
    if (Number.isNaN(n))
      return m.invalid("invalid input");
    const s = J(t.zone, b.defaultZone);
    return s.isValid ? new m({
      ts: n,
      zone: s,
      loc: S.fromObject(t)
    }) : m.invalid(xe(s));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(e, t = {}) {
    if (K(e))
      return e < -rr || e > rr ? m.invalid("Timestamp out of range") : new m({
        ts: e,
        zone: J(t.zone, b.defaultZone),
        loc: S.fromObject(t)
      });
    throw new E(
      `fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`
    );
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(e, t = {}) {
    if (K(e))
      return new m({
        ts: e * 1e3,
        zone: J(t.zone, b.defaultZone),
        loc: S.fromObject(t)
      });
    throw new E("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(e, t = {}) {
    e = e || {};
    const n = J(t.zone, b.defaultZone);
    if (!n.isValid)
      return m.invalid(xe(n));
    const s = S.fromObject(t), i = Ge(e, ir), { minDaysInFirstWeek: a, startOfWeek: o } = jt(i, s), l = b.now(), u = y(t.specificOffset) ? n.offset(l) : t.specificOffset, c = !y(i.ordinal), h = !y(i.year), w = !y(i.month) || !y(i.day), d = h || w, O = i.weekYear || i.weekNumber;
    if ((d || c) && O)
      throw new de(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (w && c)
      throw new de("Can't mix ordinal dates with month/day");
    const v = O || i.weekday && !d;
    let D, G, H = Ve(l, u);
    v ? (D = Yi, G = Hi, H = Pe(H, a, o)) : c ? (D = qi, G = ji, H = rt(H)) : (D = yn, G = mn);
    let te = !1;
    for (const Oe of D) {
      const pn = i[Oe];
      y(pn) ? te ? i[Oe] = G[Oe] : i[Oe] = H[Oe] : te = !0;
    }
    const U = v ? bs(i, a, o) : c ? xs(i) : zr(i), le = U || Ur(i);
    if (le)
      return m.invalid(le);
    const Be = v ? Gt(i, a, o) : c ? Ht(i) : i, [Qe, gn] = ze(Be, u, n), Se = new m({
      ts: Qe,
      zone: n,
      o: gn,
      loc: s
    });
    return i.weekday && d && e.weekday !== Se.weekday ? m.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${i.weekday} and a date of ${Se.toISO()}`
    ) : Se.isValid ? Se : m.invalid(Se.invalid);
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(e, t = {}) {
    const [n, s] = yi(e);
    return fe(n, s, t, "ISO 8601", e);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(e, t = {}) {
    const [n, s] = gi(e);
    return fe(n, s, t, "RFC 2822", e);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(e, t = {}) {
    const [n, s] = pi(e);
    return fe(n, s, t, "HTTP", t);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(e, t, n = {}) {
    if (y(e) || y(t))
      throw new E("fromFormat requires an input string and a format");
    const { locale: s = null, numberingSystem: i = null } = n, a = S.fromOpts({
      locale: s,
      numberingSystem: i,
      defaultToEN: !0
    }), [o, l, u, c] = Gi(a, e, t);
    return c ? m.invalid(c) : fe(o, l, n, `format ${t}`, e, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, t, n = {}) {
    return m.fromFormat(e, t, n);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(e, t = {}) {
    const [n, s] = xi(e);
    return fe(n, s, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new E("need to specify a reason the DateTime is invalid");
    const n = e instanceof R ? e : new R(e, t);
    if (b.throwOnInvalid)
      throw new Qn(n);
    return new m({ invalid: n });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(e) {
    return e && e.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(e, t = {}) {
    const n = dn(e, S.fromObject(t));
    return n ? n.map((s) => s ? s.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(e, t = {}) {
    return un(M.parseFormat(e), S.fromObject(t)).map((s) => s.val).join("");
  }
  static resetCache() {
    Ee = void 0, Tt.clear();
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(e) {
    return this[e];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? it(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? it(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? it(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? at(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? at(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? at(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? rt(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? $e.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? $e.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? $e.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? $e.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const e = 864e5, t = 6e4, n = Ye(this.c), s = this.zone.offset(n - e), i = this.zone.offset(n + e), a = this.zone.offset(n - s * t), o = this.zone.offset(n - i * t);
    if (a === o)
      return [this];
    const l = n - a * t, u = n - o * t, c = Ve(l, a), h = Ve(u, o);
    return c.hour === h.hour && c.minute === h.minute && c.second === h.second && c.millisecond === h.millisecond ? [ne(this, { ts: l }), ne(this, { ts: u })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return ve(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return _e(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? he(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Ie(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? Ie(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(e = {}) {
    const { locale: t, numberingSystem: n, calendar: s } = M.create(
      this.loc.clone(e),
      e
    ).resolvedOptions(this);
    return { locale: t, numberingSystem: n, outputCalendar: s };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(e = 0, t = {}) {
    return this.setZone(I.instance(e), t);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(b.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(e, { keepLocalTime: t = !1, keepCalendarTime: n = !1 } = {}) {
    if (e = J(e, b.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let s = this.ts;
      if (t || n) {
        const i = e.offset(this.ts), a = this.toObject();
        [s] = ze(a, i, e);
      }
      return ne(this, { ts: s, zone: e });
    } else
      return m.invalid(xe(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: n } = {}) {
    const s = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: n });
    return ne(this, { loc: s });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(e) {
    return this.reconfigure({ locale: e });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(e) {
    if (!this.isValid) return this;
    const t = Ge(e, ir), { minDaysInFirstWeek: n, startOfWeek: s } = jt(t, this.loc), i = !y(t.weekYear) || !y(t.weekNumber) || !y(t.weekday), a = !y(t.ordinal), o = !y(t.year), l = !y(t.month) || !y(t.day), u = o || l, c = t.weekYear || t.weekNumber;
    if ((u || a) && c)
      throw new de(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && a)
      throw new de("Can't mix ordinal dates with month/day");
    let h;
    i ? h = Gt(
      { ...Pe(this.c, n, s), ...t },
      n,
      s
    ) : y(t.ordinal) ? (h = { ...this.toObject(), ...t }, y(t.day) && (h.day = Math.min(_e(h.year, h.month), h.day))) : h = Ht({ ...rt(this.c), ...t });
    const [w, d] = ze(h, this.o, this.zone);
    return ne(this, { ts: w, o: d });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(e) {
    if (!this.isValid) return this;
    const t = p.fromDurationLike(e);
    return ne(this, nr(this, t));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = p.fromDurationLike(e).negate();
    return ne(this, nr(this, t));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(e, { useLocaleWeeks: t = !1 } = {}) {
    if (!this.isValid) return this;
    const n = {}, s = p.normalizeUnit(e);
    switch (s) {
      case "years":
        n.month = 1;
      // falls through
      case "quarters":
      case "months":
        n.day = 1;
      // falls through
      case "weeks":
      case "days":
        n.hour = 0;
      // falls through
      case "hours":
        n.minute = 0;
      // falls through
      case "minutes":
        n.second = 0;
      // falls through
      case "seconds":
        n.millisecond = 0;
        break;
    }
    if (s === "weeks")
      if (t) {
        const i = this.loc.getStartOfWeek(), { weekday: a } = this;
        a < i && (n.weekNumber = this.weekNumber - 1), n.weekday = i;
      } else
        n.weekday = 1;
    if (s === "quarters") {
      const i = Math.ceil(this.month / 3);
      n.month = (i - 1) * 3 + 1;
    }
    return this.set(n);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(e, t) {
    return this.isValid ? this.plus({ [e]: 1 }).startOf(e, t).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(e, t = {}) {
    return this.isValid ? M.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : st;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(e = Ze, t = {}) {
    return this.isValid ? M.create(this.loc.clone(t), e).formatDateTime(this) : st;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(e = {}) {
    return this.isValid ? M.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string|null}
   */
  toISO({
    format: e = "extended",
    suppressSeconds: t = !1,
    suppressMilliseconds: n = !1,
    includeOffset: s = !0,
    extendedZone: i = !1
  } = {}) {
    if (!this.isValid)
      return null;
    const a = e === "extended";
    let o = ot(this, a);
    return o += "T", o += sr(this, a, t, n, s, i), o;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string|null}
   */
  toISODate({ format: e = "extended" } = {}) {
    return this.isValid ? ot(this, e === "extended") : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Re(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: t = !1,
    includeOffset: n = !0,
    includePrefix: s = !1,
    extendedZone: i = !1,
    format: a = "extended"
  } = {}) {
    return this.isValid ? (s ? "T" : "") + sr(
      this,
      a === "extended",
      t,
      e,
      n,
      i
    ) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Re(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return Re(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? ot(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset: e = !0, includeZone: t = !1, includeOffsetSpace: n = !0 } = {}) {
    let s = "HH:mm:ss.SSS";
    return (t || e) && (n && (s += " "), t ? s += "z" : e && (s += "ZZ")), Re(this, s, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(e = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : st;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(e = {}) {
    if (!this.isValid) return {};
    const t = { ...this.c };
    return e.includeConfig && (t.outputCalendar = this.outputCalendar, t.numberingSystem = this.loc.numberingSystem, t.locale = this.loc.locale), t;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(e, t = "milliseconds", n = {}) {
    if (!this.isValid || !e.isValid)
      return p.invalid("created by diffing an invalid DateTime");
    const s = { locale: this.locale, numberingSystem: this.numberingSystem, ...n }, i = Is(t).map(p.normalizeUnit), a = e.valueOf() > this.valueOf(), o = a ? this : e, l = a ? e : this, u = Ci(o, l, i, s);
    return a ? u.negate() : u;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(e = "milliseconds", t = {}) {
    return this.diff(m.now(), e, t);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(e) {
    return this.isValid ? k.fromDateTimes(this, e) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(e, t, n) {
    if (!this.isValid) return !1;
    const s = e.valueOf(), i = this.setZone(e.zone, { keepLocalTime: !0 });
    return i.startOf(t, n) <= s && s <= i.endOf(t, n);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(e) {
    return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(e = {}) {
    if (!this.isValid) return null;
    const t = e.base || m.fromObject({}, { zone: this.zone }), n = e.padding ? this < t ? -e.padding : e.padding : 0;
    let s = ["years", "months", "days", "hours", "minutes", "seconds"], i = e.unit;
    return Array.isArray(e.unit) && (s = e.unit, i = void 0), or(t, this.plus(n), {
      ...e,
      numeric: "always",
      units: s,
      unit: i
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(e = {}) {
    return this.isValid ? or(e.base || m.fromObject({}, { zone: this.zone }), this, {
      ...e,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...e) {
    if (!e.every(m.isDateTime))
      throw new E("min requires all arguments be DateTimes");
    return Yt(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(m.isDateTime))
      throw new E("max requires all arguments be DateTimes");
    return Yt(e, (t) => t.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(e, t, n = {}) {
    const { locale: s = null, numberingSystem: i = null } = n, a = S.fromOpts({
      locale: s,
      numberingSystem: i,
      defaultToEN: !0
    });
    return fn(a, e, t);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, t, n = {}) {
    return m.fromFormatExplain(e, t, n);
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(e, t = {}) {
    const { locale: n = null, numberingSystem: s = null } = t, i = S.fromOpts({
      locale: n,
      numberingSystem: s,
      defaultToEN: !0
    });
    return new cn(i, e);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {Object} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(e, t, n = {}) {
    if (y(e) || y(t))
      throw new E(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: s = null, numberingSystem: i = null } = n, a = S.fromOpts({
      locale: s,
      numberingSystem: i,
      defaultToEN: !0
    });
    if (!a.equals(t.locale))
      throw new E(
        `fromFormatParser called with a locale of ${a}, but the format parser was created for ${t.locale}`
      );
    const { result: o, zone: l, specificOffset: u, invalidReason: c } = t.explainFromTokens(e);
    return c ? m.invalid(c) : fe(
      o,
      l,
      n,
      `format ${t.format}`,
      e,
      u
    );
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return Ze;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return mr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return es;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return yr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return gr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return pr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return wr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Tr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Sr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Or;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return kr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return br;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return xr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Er;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Mr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Ir;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Dr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return ts;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Nr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return vr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return Cr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Ar;
  }
}
function ke(r) {
  if (m.isDateTime(r))
    return r;
  if (r && r.valueOf && K(r.valueOf()))
    return m.fromJSDate(r);
  if (r && typeof r == "object")
    return m.fromObject(r);
  throw new E(
    `Unknown datetime argument: ${r}, of type ${typeof r}`
  );
}
function Qi(r, e, t) {
  let n = r.astronomyJS;
  const s = n.getDate();
  let i, a;
  if (r.timezone) {
    let U = m.fromJSDate(s).setZone(
      r.timezone
    );
    a = U.startOf("day").toJSDate(), i = U.hour * 60 + U.minute;
  } else
    i = s.getHours() * 60 + s.getMinutes(), a = new Date(s.getFullYear(), s.getMonth(), s.getDate());
  const o = t ? 2e3 : 1e3, l = Ki(a), u = l.map((U, le) => {
    const Be = le / (l.length - 1) * o, Qe = n.getAltAzCoordinatesForObject(
      "Sun",
      U
    ).latitude;
    return [Be, ur(Qe, -90, 90, 950, 50).toFixed(0)];
  }).map(([U, le]) => `${U},${le}`).join(" "), c = n.getAltAzCoordinatesForObject("Sun").latitude, h = ur(c, -90, 90, 950, 50).toFixed(0), w = dr(c), d = Xi(c), O = We(
    d.limit,
    w.limit,
    c
  ), v = Ue(
    w.bottom,
    d.bottom,
    O
  ), D = c > 0 ? 1 : c < -9 ? 0 : We(-9, 0, c), G = c > -3 ? 1 : c < -9 ? 0 : We(-9, -3, c), H = Ue(
    "#808080",
    "#ffffff",
    G
  );
  let te = t ? $n(e, "black") : X(e, "black");
  return te += `
        <rect x="0" y="500" width="${o}" height="500" fill="black" />
        <defs>
            <clipPath id="top-half-clip">
                <rect x="0" y="500" width="${o * 2}" height="500" />
            </clipPath>
            <clipPath id="bottom-half-clip">
                <rect x="0" y="0" width="${o * 2}" height="500" />
            </clipPath>
            <radialGradient id="sun-glow-${c}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * D}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * D}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${0.1 * D}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow-${c}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${v}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${v}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${v}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${v}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient-${c}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${H}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${o}" height="500" fill="url(#sky-${c})" />
        <ellipse cx="${lt(i, o)}" cy="${h}" rx="${1.2 * o}" ry="125" fill="url(#twilight-glow-${c})" />
        <rect x="0" y="500" width="${o}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient-${c})" stroke-width="35" points="${u}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient-${c})" stroke-width="35" points="${u}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${o}" y2="500" stroke="${H}" stroke-width="15" />
        <circle cx="${lt(i, o)}"
            cy="${h}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${lt(i, o)}"
            cy="${h}" r="150" fill="url(#sun-glow-${c})" clip-path="url(#bottom-half-clip)" />
           `, te += Ot(c), te += ee(), te;
}
function Ki(r) {
  const e = [];
  for (let t = 0; t < 48; t++) {
    const n = new Date(r.getTime() + t * 30 * 60 * 1e3);
    e.push(n);
  }
  return e;
}
function ur(r, e, t, n, s) {
  return n + (r - e) * (s - n) / (t - e);
}
function lt(r, e) {
  return r / 1440 * e;
}
function Xi(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#101734", limit: -90 } : r <= -15 ? { top: "#171c27", bottom: "#282e3c", limit: -18 } : r <= -12 ? { top: "#171c29", bottom: "#525662", limit: -15 } : r <= -9 ? { top: "#4e545f", bottom: "#b9a76c", limit: -12 } : r <= -6 ? { top: "#909798", bottom: "#f9d92b", limit: -9 } : r <= -3 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: -6 } : r <= 0 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: -3 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 0 };
}
function ea(r, e, t) {
  let n = r.astronomyJS, s = n.getEphemerisDateForObject(
    e,
    n.getDate(),
    "RISE"
  ), i = X(t, "black");
  return i += Z(e), i += ie("Rise"), i += ae(
    s.toLocaleTimeString(r.locale ?? [], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1,
      ...r.timezone ? { timeZone: r.timezone } : {}
    })
  ), i += ee(), i;
}
function ta(r, e, t) {
  let n = r.astronomyJS, s = n.getEphemerisDateForObject(
    e,
    n.getDate(),
    "SET"
  ), i = X(t, "black");
  return i += Z(e), i += ie("Set"), i += ae(
    s.toLocaleTimeString(r.locale ?? [], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1,
      ...r.timezone ? { timeZone: r.timezone } : {}
    })
  ), i += ee(), i;
}
function ra(r, e, t) {
  let n = r.astronomyJS, s = n.getAltAzCoordinatesForObject(e), i = X(t, "black");
  if (s.latitude < 0) {
    i += Z(e, !0);
    let a = n.getEphemerisDateForObject(
      e,
      n.getDate(),
      "RISE"
    );
    i += ie("Visible at"), i += ae(
      a.toLocaleTimeString(r.locale ?? [], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1,
        ...r.timezone ? { timeZone: r.timezone } : {}
      })
    );
  } else {
    let a = n.getAltAzCoordinatesForObject(
      e,
      new Date(n.getDate() - 3e5)
    ).latitude;
    i += ie(
      cr(s.latitude, a)
    ), i += ae(
      fr(s.longitude)
    ), i += Z(e);
  }
  return i += ee(), i;
}
function na(r, e, t, n) {
  let s = r.astronomyJS, i = s.getAltAzCoordinatesForObject("Sun").latitude, a = s.getAltAzCoordinatesForObject(e), o = X(t, "black");
  if (a.latitude < 0) {
    o += Z(e, !0);
    let l = s.getEphemerisDateForObject(
      e,
      s.getDate(),
      "RISE"
    );
    o += ie("Visible at"), o += ae(
      l.toLocaleTimeString(r.locale ?? [], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1,
        ...r.timezone ? { timeZone: r.timezone } : {}
      })
    );
  } else {
    let l = 380, u = 500, c = 520, h = l * (1 - a.latitude / 90), w = (a.longitude - 90) * (Math.PI / 180), d = u + h * Math.cos(w), O = c + h * Math.sin(w);
    o += `<rect x="0" y="0" width="1000" height="1000" fill="url(#sky-${i})" />`, n !== void 0 && n !== 0 ? o += `
            <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${u}" y="${c - l - 60}">${n}</text>
          </g>
          <g transform="rotate(${360 - n} ${u} ${c})">
        ` : o += "<g>", o += `
          <circle cx="${u}" cy="${c}" r="${l}" fill="none" stroke="white" stroke-width="15" />
          <circle cx="${u}" cy="${c}" r="${l / 2}" fill="none" stroke="white" stroke-width="8" />
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${u}" y="${c - l - 60}">N</text>
          </g>
        `, o += `<g transform="translate(${d - 500}, ${O - 279})
                translate(500, 279) scale(0.3) translate(-500, -279)">`, o += Z(e), o += "</g></g>";
  }
  return o += Ot(i), o += ee(), o;
}
function sa(r, e, t, n) {
  let s = r.astronomyJS, i = s.getAltAzCoordinatesForObject("Sun").latitude, a = X(t, "black"), o = 380, l = 500, u = 520;
  a += `<rect x="0" y="0" width="1000" height="1000" fill="url(#sky-${i})" />`, n !== void 0 && n !== 0 ? a += `
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
          <text x="${l}" y="${u - o - 60}">${n}</text>
        </g>
        <g transform="rotate(${360 - n} ${l} ${u})">
      ` : a += "<g>", a += `
        <circle cx="${l}" cy="${u}" r="${o}" fill="none" stroke="white" stroke-width="15" />
        <circle cx="${l}" cy="${u}" r="${o / 2}" fill="none" stroke="white" stroke-width="8" />
        <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
          <text x="${l}" y="${u - o - 60}">N</text>
        </g>
      `;
  for (let c of e) {
    let h = s.getAltAzCoordinatesForObject(c);
    if (h.latitude < 0)
      continue;
    let w = o * (1 - h.latitude / 90), d = (h.longitude - 90) * (Math.PI / 180), O = l + w * Math.cos(d), v = u + w * Math.sin(d);
    a += `<g transform="translate(${O - 500}, ${v - 279})
              translate(500, 279) scale(0.3) translate(-500, -279)">`, a += Z(c), a += "</g>";
  }
  return a += "</g>", a += Ot(i), a += ee(), a;
}
class vt {
  constructor() {
    Ct(this, "applicationContext", {
      astronomyJS: null,
      locale: null,
      timezone: null
    });
    this.applicationContext.astronomyJS = new St();
  }
  getDate() {
    return this.applicationContext.astronomyJS.getDate();
  }
  setDate(e) {
    this.applicationContext.astronomyJS.setDate(e);
  }
  setLocale(e) {
    this.applicationContext.locale = e;
  }
  setTimezone(e) {
    this.applicationContext.timezone = e;
  }
  setLocation(e, t) {
    this.applicationContext.astronomyJS.setLocation(
      "Earth",
      e,
      t,
      0
    );
  }
  getLocation() {
    return this.applicationContext.astronomyJS.getLatitudeLongitudeCoordinates();
  }
  static initialize(e, t) {
    let n = new vt();
    return n.setDate(/* @__PURE__ */ new Date()), n.setLocation(e, t), n;
  }
  drawAzimuth(e, t) {
    return Yn(this.applicationContext, e, t);
  }
  drawAltitude(e, t) {
    return qn(this.applicationContext, e, t);
  }
  drawSunAltitudePath(e, t) {
    return Qi(this.applicationContext, e, t);
  }
  drawCelestialBodyRiseTime(e, t) {
    return ea(
      this.applicationContext,
      e,
      t
    );
  }
  drawCelestialBodySettingTime(e, t) {
    return ta(
      this.applicationContext,
      e,
      t
    );
  }
  drawCelestialBodyVisibility(e, t) {
    return ra(
      this.applicationContext,
      e,
      t
    );
  }
  drawCelestialBodyVisibilityMap(e, t, n) {
    return na(
      this.applicationContext,
      e,
      t,
      n
    );
  }
  drawMultiCelestialBodyVisibilityMap(e, t, n) {
    return sa(
      this.applicationContext,
      e,
      t,
      n
    );
  }
}
function aa(r, e) {
  return vt.initialize(r, e);
}
export {
  vt as AstronomySVG,
  aa as initialize
};
