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
const u = {
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
class s {
  static modDegrees(t) {
    for (; t < 0; )
      t = t + 360;
    return t % 360;
  }
  static mod180Degrees(t) {
    const e = this.modDegrees(t);
    return e > 180 ? e - 360 : e;
  }
  static modRadians(t) {
    for (; t < 0; )
      t = t + 2 * Math.PI;
    return t % (2 * Math.PI);
  }
  static modPiRadians(t) {
    const e = this.modRadians(t);
    return t > Math.PI ? e - 2 * Math.PI : e;
  }
  static radiansToDegrees(t) {
    return t * 180 / Math.PI;
  }
  static degreesToRadians(t) {
    return t * Math.PI / 180;
  }
  static padZero(t) {
    return t = t.toString(), t.length >= 2 ? t : "0" + t;
  }
}
class g {
  static julianDate(t) {
    return t / u.MS_PER_DAY + u.JULIAN_DAY_OFFSET;
  }
  static julianDateToDate(t) {
    return new Date(
      (t - u.JULIAN_DAY_OFFSET) * u.MS_PER_DAY
    );
  }
  static julianDaysSinceEpoch2000(t) {
    return t - u.JULIAN_DAY_2000;
  }
  static julianCenturiesSinceEpoch2000(t) {
    return this.julianDaysSinceEpoch2000(t) / u.DAYS_PER_JULIAN_CENTURY;
  }
  static meanSiderealTime(t) {
    const e = this.julianDaysSinceEpoch2000(t), o = this.julianCenturiesSinceEpoch2000(t), i = 280.46061837 + 360.98564736629 * e + 387933e-9 * o * o - o * o * o / 3871e4;
    return s.modDegrees(i);
  }
}
class I {
  constructor(t, e, o) {
    this.x = t, this.y = e, this.z = o;
  }
  minus(t) {
    return new I(
      this.x - t.x,
      this.y - t.y,
      this.z - t.z
    );
  }
}
class m {
  constructor(t, e, o) {
    this.latitude = t, this.longitude = e, this.radius = o;
  }
  toDegrees() {
    let t = this.latitude, e = this.longitude;
    return new m(
      `${t < 0 ? "-" : ""}${s.padZero(0 | (t < 0 ? t = -t : t))}° ${s.padZero(0 | t % 1 * 60)}' ${s.padZero(0 | t * 60 % 1 * 60)}''`,
      `${e < 0 ? "-" : ""}${s.padZero(0 | (e < 0 ? e = -e : e))}° ${s.padZero(0 | e % 1 * 60)}' ${s.padZero(0 | e * 60 % 1 * 60)}''`,
      this.radius
    );
  }
  toHours() {
    let t = this.latitude, e = this.longitude;
    return new m(
      `${t < 0 ? "-" : ""}${s.padZero(0 | (t < 0 ? t = -t : t))}° ${s.padZero(0 | t % 1 * 60)}' ${s.padZero(0 | t * 60 % 1 * 60)}''`,
      `${e < 0 ? "-" : ""}${s.padZero(0 | (e < 0 ? e = -e / 15 : e = e / 15))}h ${s.padZero(0 | e % 1 * 60)}m ${s.padZero(0 | e * 60 % 1 * 60)}s`,
      this.radius
    );
  }
}
class U {
  constructor(t, e) {
    this.sphericalCoordinates = t || new m(
      u.GREENWICH_OBSERVATORY_COORDINATES.LATITUDE,
      u.GREENWICH_OBSERVATORY_COORDINATES.LONGITUDE,
      u.GREENWICH_OBSERVATORY_COORDINATES.RADIUS
    ), this.solarSystemObject = e;
  }
  getRectangularObjectCentricCoordinatesForSolarSystemObject(t, e) {
    return t.getRectangularHeliocentricCoordinates(e).minus(
      this.solarSystemObject.getRectangularHeliocentricCoordinates(
        e
      )
    );
  }
  getRectangularEquatorialCoordinatesForSolarSystemObject(t, e) {
    const o = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(
      t,
      e
    ), i = s.degreesToRadians(
      this.solarSystemObject.axialTilt
    );
    return new I(
      o.x,
      o.y * Math.cos(i) - o.z * Math.sin(i),
      o.y * Math.sin(i) + o.z * Math.cos(i)
    );
  }
  getDistanceToSolarSystemObject(t, e) {
    const o = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(
      t,
      e
    );
    return Math.sqrt(
      Math.pow(o.x, 2) + Math.pow(o.y, 2) + Math.pow(o.z, 2)
    );
  }
  getRADecCoordinatesForSolarSystemObject(t, e) {
    const o = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      t,
      e
    ), i = o.x > 0 && o.y < 0 ? 360 : o.x < 0 ? 180 : 0, n = s.radiansToDegrees(
      Math.atan(o.y / o.x)
    ) + i, a = s.radiansToDegrees(
      Math.atan(
        o.z / Math.sqrt(
          Math.pow(o.x, 2) + Math.pow(o.y, 2)
        )
      )
    );
    return new m(
      a,
      n,
      this.getDistanceToSolarSystemObject(t, e)
    );
  }
  getHADecCoordinatesForSolarSystemObject(t, e) {
    const o = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      t,
      e
    ), i = o.x > 0 && o.y < 0 ? 360 : o.x < 0 ? 180 : 0, n = s.radiansToDegrees(
      Math.atan(o.y / o.x)
    ) + i, a = s.modDegrees(
      this.getLocalSiderealTime(e) - n
    ), l = s.radiansToDegrees(
      Math.atan(
        o.z / Math.sqrt(
          Math.pow(o.x, 2) + Math.pow(o.y, 2)
        )
      )
    );
    return new m(
      l,
      a,
      this.getDistanceToSolarSystemObject(t, e)
    );
  }
  getAltAzCoordinatesForEquatorialCoordinates(t, e) {
    const o = s.degreesToRadians(
      s.modDegrees(
        t.longitude - this.getLocalSiderealTime(e)
      )
    ), i = s.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), n = s.degreesToRadians(
      t.latitude
    ), a = s.radiansToDegrees(
      Math.asin(
        Math.sin(i) * Math.sin(n) + Math.cos(i) * Math.cos(n) * Math.cos(o)
      )
    ), l = s.radiansToDegrees(
      Math.PI - Math.atan2(
        Math.sin(o),
        Math.cos(o) * Math.sin(i) - Math.tan(n) * Math.cos(i)
      )
    );
    return new m(a, l, null);
  }
  getLocalSiderealTime(t) {
    return s.modDegrees(
      g.meanSiderealTime(t) + this.sphericalCoordinates.longitude
    );
  }
  getObjectTransit(t, e) {
    const o = this.getRADecCoordinatesForSolarSystemObject(
      t,
      e
    ).longitude;
    return this.getLocalSiderealTime(e) - o;
  }
  getObjectLocalHourAngleForAltitude(t, e, o) {
    const i = s.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), n = s.degreesToRadians(o), a = s.degreesToRadians(
      this.getRADecCoordinatesForSolarSystemObject(
        t,
        e
      ).latitude
    ), l = (Math.sin(n) - Math.sin(i) * Math.sin(a)) / (Math.cos(i) * Math.cos(a));
    return s.radiansToDegrees(Math.acos(l));
  }
  getIterationValueForPositionalEphemerisForObject(t, e, o) {
    if (o === u.EPHEMERIS_TYPE.TRANSIT)
      return e - this.getObjectTransit(t, e) / 15 / 24;
    {
      const i = this.getObjectTransit(
        t,
        e
      ), n = this.getObjectLocalHourAngleForAltitude(
        t,
        e,
        o.ALTITUDE
      ), a = s.mod180Degrees(
        o.IS_GOING_UP ? i + n : i - n
      );
      return e - a / 15 / 24;
    }
  }
  iteratePositionalEphemerisForObject(t, e, o) {
    let i = this.getIterationValueForPositionalEphemerisForObject(
      t,
      e,
      o
    ), n = +i;
    for (let a = 0; a < 1e3 && (i = this.getIterationValueForPositionalEphemerisForObject(
      t,
      i,
      o
    ), !(Math.abs(i - n) < 10 ^ -5)); a++)
      n = i;
    return g.julianDateToDate(i);
  }
  getCorrectDateForPositionalEphemeris(t, e, o, i) {
    const n = this.iteratePositionalEphemerisForObject(
      t,
      e,
      o
    );
    if (i > 0 && n.getDate() !== g.julianDateToDate(e).getDate()) {
      const a = g.julianDate(n), l = a > e ? -1 : 1;
      return this.getCorrectDateForPositionalEphemeris(
        t,
        a + l,
        o,
        i - 1
      );
    } else return i === 0 ? null : n;
  }
  getDateForPositionalEphemeris(t, e, o) {
    return this.getCorrectDateForPositionalEphemeris(
      t,
      e,
      o,
      u.NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS
    );
  }
}
class Z {
  constructor(t, e) {
    this.objectType = t, this.name = e;
  }
}
class d extends Z {
  constructor(t, e, o, i) {
    super(u.SOLAR_SYSTEM_OBJECT, t), this.orbitalParameters = e, this.meanRadius = o, this.axialTilt = i;
  }
  /**
   * @param julianDate
   * @returns {RectangularCoordinates}
   */
  getRectangularHeliocentricCoordinates(t) {
    const e = g.julianCenturiesSinceEpoch2000(t), o = s.degreesToRadians(
      this.orbitalParameters.getInclination(e)
    ), i = s.degreesToRadians(
      this.orbitalParameters.getTrueAnomaly(e)
    ), n = s.degreesToRadians(
      this.orbitalParameters.getPerihelion(e)
    ), a = s.degreesToRadians(
      this.orbitalParameters.getAscendingNode(e)
    ), l = this.orbitalParameters.getOrbitRadius(
      e
    ), c = i + n - a, T = l * (Math.cos(a) * Math.cos(c) - Math.sin(a) * Math.sin(c) * Math.cos(o)), p = l * (Math.sin(a) * Math.cos(c) + Math.cos(a) * Math.sin(c) * Math.cos(o)), h = l * (Math.sin(c) * Math.sin(o));
    return new I(T, p, h);
  }
}
class f {
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
  constructor(t, e, o, i, n, a, l, c, T, p, h, w) {
    this.a0 = t, this.e0 = e, this.i0 = o, this.o0 = i, this.w0 = n, this.l0 = a, this.ac = l, this.ec = c, this.ic = T, this.oc = p, this.wc = h, this.lc = w;
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns a - semi major axis
   */
  getSemiMajorAxis(t) {
    return this.a0 + this.ac * t;
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns e - eccentricity
   */
  getEccentricity(t) {
    return this.e0 + this.ec * t;
  }
  getInclination(t) {
    return s.modDegrees(
      this.i0 + this.ic / 3600 * t
    );
  }
  getAscendingNode(t) {
    return s.modDegrees(
      this.o0 + this.oc / 3600 * t
    );
  }
  getPerihelion(t) {
    return s.modDegrees(
      this.w0 + this.wc / 3600 * t
    );
  }
  getMeanLongitude(t) {
    return s.modDegrees(
      this.l0 + this.lc / 3600 * t
    );
  }
  getMeanAnomaly(t) {
    return s.modDegrees(
      this.getMeanLongitude(t) - this.getPerihelion(t)
    );
  }
  /**
   *
   * @param julianCenturiesSinceEpoch2000
   * @returns {*} E: eccentric anomaly
   */
  getEccentricAnomaly(t) {
    const e = s.degreesToRadians(
      this.getMeanAnomaly(t)
    ), o = this.getEccentricity(t);
    let i = e + o * Math.sin(e) * (1 + o * Math.cos(e)), n = 0, a = 0, l = 0;
    for (; l++ < 1e4 && (n = i - (i - o * Math.sin(i) - e) / (1 - o * Math.cos(i)), a = n - i, i = n, !(Math.abs(a) <= u.EPS)); )
      ;
    return s.radiansToDegrees(n);
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns V: true anomaly
   */
  getTrueAnomaly(t) {
    const e = this.getEccentricity(t), o = s.degreesToRadians(
      this.getEccentricAnomaly(t)
    ), i = 2 * Math.atan(
      Math.sqrt((1 + e) / (1 - e)) * Math.tan(0.5 * o)
    );
    return s.radiansToDegrees(i);
  }
  /**
   * R = (a * (1 - e^2)) / (1 + e * cos(V))
   * @param julianCenturiesSinceEpoch2000
   * @returns R: orbit radius
   */
  getOrbitRadius(t) {
    const e = this.getSemiMajorAxis(t), o = this.getEccentricity(t), i = this.getTrueAnomaly(t);
    return e * (1 - Math.pow(o, 2)) / (1 + o * Math.cos(s.degreesToRadians(i)));
  }
}
class q extends d {
  constructor() {
    const t = new f(
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
    super("Mercury", t, 2439700, 2.04);
  }
}
class X extends d {
  constructor() {
    const t = new f(
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
    super("Venus", t, 6051800, 2.64);
  }
}
class K extends d {
  constructor() {
    const t = new f(
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
    super("Earth", t, 6371e3, 23.439281);
  }
}
class Q extends d {
  constructor() {
    const t = new f(
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
    super("Mars", t, 3389500, 25.19);
  }
}
class tt extends d {
  constructor() {
    const t = new f(
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
    super("Jupiter", t, 69911e3, 3.13);
  }
}
class et extends d {
  constructor() {
    const t = new f(
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
    super("Saturn", t, 58232e3, 26.73);
  }
}
class ot extends d {
  constructor() {
    const t = new f(
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
    super("Uranus", t, 25362e3, 97.77);
  }
}
class rt extends d {
  constructor() {
    const t = new f(
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
    super("Neptune", t, 24622e3, 28.32);
  }
}
const it = [
  new q(),
  new X(),
  new K(),
  new Q(),
  new tt(),
  new et(),
  new ot(),
  new rt()
];
class nt extends d {
  constructor() {
    super("Sun", null, 695508e3);
  }
  getRectangularHeliocentricCoordinates(t) {
    return new I(0, 0, 0);
  }
}
const st = [new nt()].concat(it);
class N {
  constructor() {
    this.skyObjects = [...st], this.astronomicalCalculator = new U(), this.julianDate = null, this.date = null;
  }
  getJulianDate() {
    return this.julianDate;
  }
  setJulianDate(t) {
    this.julianDate = t;
  }
  getDate() {
    return this.date;
  }
  setDate(t) {
    this.date = t, this.setJulianDate(g.julianDate(t));
  }
  getSkyObjectByName(t) {
    return this.skyObjects.find((e) => e.name === t) || null;
  }
  getEphemerisTypeByName(t) {
    return Object.values(u.EPHEMERIS_TYPE).find(
      (e) => e.NAME === t
    ) || null;
  }
  setLocation(t, e, o, i) {
    const n = this.getSkyObjectByName(t);
    if (!n)
      throw new Error(`Solar system object "${t}" not found`);
    this.astronomicalCalculator = new U(
      new m(
        e,
        o,
        n.meanRadius + i
      ),
      n
    );
  }
  getRADecCoordinatesForObject(t) {
    const e = this.getSkyObjectByName(t);
    if (!e || this.julianDate === null)
      throw new Error("Invalid object name or Julian date not set");
    return this.astronomicalCalculator.getRADecCoordinatesForSolarSystemObject(
      e,
      this.julianDate
    );
  }
  getHADecCoordinatesForObject(t) {
    const e = this.getSkyObjectByName(t);
    if (!e || this.julianDate === null)
      throw new Error("Invalid object name or Julian date not set");
    return this.astronomicalCalculator.getHADecCoordinatesForSolarSystemObject(
      e,
      this.julianDate
    );
  }
  getAltAzCoordinatesForObject(t, e) {
    const o = this.getSkyObjectByName(t);
    if (!o)
      throw new Error(`Object "${t}" not found`);
    const i = e ? g.julianDate(e) : this.julianDate;
    if (i === null)
      throw new Error("Reference date not set");
    const n = this.astronomicalCalculator.getRADecCoordinatesForSolarSystemObject(
      o,
      i
    );
    return this.astronomicalCalculator.getAltAzCoordinatesForEquatorialCoordinates(
      n,
      i
    );
  }
  static initialize(t, e) {
    let o = new N();
    return o.setLocation("Earth", t, e, 0), o.setDate(/* @__PURE__ */ new Date()), o;
  }
  getEphemerisDateForObject(t, e, o) {
    const i = this.getSkyObjectByName(t), n = this.getEphemerisTypeByName(o);
    if (!i || !n)
      throw new Error("Invalid object name or ephemeris type");
    return this.astronomicalCalculator.getDateForPositionalEphemeris(
      i,
      g.julianDate(e),
      n
    );
  }
}
function y(r, t) {
  return `<svg viewBox="0 0 1000 1000" width="${r}" height="${r}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function at(r, t) {
  return `<svg viewBox="0 0 2000 1000" width="${r}" height="${r / 2}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function E() {
  return "</svg>";
}
function b(r, t) {
  let e = t ? ut() : "";
  return r === "Sun" ? e += ct() : r === "Mars" && (e += lt()), e += t ? ht() : "", e;
}
function ct() {
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
function lt() {
  return `<circle cx="500" cy="278" r="139" fill="#d2691e" />
          <!-- Ice cap (ellipse) -->
          <ellipse cx="500" cy="167" rx="42" ry="21" fill="white" opacity="0.9" />
          <!-- Surface features -->
          <circle cx="458" cy="236" r="21" fill="#a0522d" />
          <circle cx="542" cy="319" r="17.35" fill="#a0522d" />
          <circle cx="514" cy="250" r="13.9" fill="#cd853f" />
          <circle cx="472" cy="306" r="10.4" fill="#cd853f" />`;
}
function ut() {
  return `<defs>
    <filter id="grayscale">
        <feColorMatrix type="saturate" values="0" />
    </filter>
    </defs>
    <g filter="url(#grayscale)">`;
}
function ht() {
  return "</g>";
}
function dt(r) {
  const t = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"], e = (r % 360 + 360) % 360, o = Math.floor((e + 22.5) / 45) % 8;
  return t[o];
}
function z(r, t) {
  return `${r.toFixed(1)} ${r > t ? "▲" : r < t ? "▼" : ""}`;
}
function v(r) {
  return `${r.toFixed(1)} ${dt(r)}`;
}
function A(r) {
  return `<text x="500" y="660" font-size="139" text-anchor="middle"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${r}
        </text>`;
}
function S(r) {
  return `<text x="500" y="833" font-size="139" text-anchor="middle"
                fill="white" font-family="Verdana" dominant-baseline="middle">
          ${r}
          </text>`;
}
function gt(r, t, e) {
  let o = r.getAltAzCoordinatesForObject(t).longitude, i = y(e, "black");
  return i += b(t), i += A("Azimuth"), i += S(v(o)), i += E(), i;
}
function mt(r, t, e) {
  let o = r.getAltAzCoordinatesForObject(t).latitude, i = r.getAltAzCoordinatesForObject(
    t,
    new Date(r.getDate() - 5 * 60 * 1e3)
  ).latitude, n = y(e, "black");
  return n += b(t), n += A("Altitude"), n += S(z(o, i)), n += E(), n;
}
function ft(r, t, e) {
  const o = r.getDate(), i = o.getHours() * 60 + o.getMinutes(), n = e ? 2e3 : 1e3, a = Tt(r.getDate()), l = a.map((x, C) => {
    const B = C / (a.length - 1) * n, J = r.getAltAzCoordinatesForObject(
      "Sun",
      x
    ).latitude;
    return [B, k(J, -90, 90, 950, 50).toFixed(0)];
  }).map(([x, C]) => `${x},${C}`).join(" "), c = r.getAltAzCoordinatesForObject("Sun").latitude, T = k(c, -90, 90, 950, 50).toFixed(0), p = At(c), h = bt(c), w = pt(c), F = M(
    p.limit,
    h.limit,
    c
  ), G = O(
    p.top,
    h.top,
    F
  ), Y = O(
    p.bottom,
    h.bottom,
    F
  ), V = M(
    w.limit,
    h.limit,
    c
  ), D = O(
    h.bottom,
    w.bottom,
    V
  ), R = c > 0 ? 1 : c < -9 ? 0 : M(-9, 0, c), W = c > -3 ? 1 : c < -9 ? 0 : M(-9, -3, c), $ = O(
    "#808080",
    "#ffffff",
    W
  );
  let _ = e ? at(t, "black") : y(t, "black");
  return _ += `
        <rect x="0" y="500" width="${n}" height="500" fill="black" />
        <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${G}" />
                <stop offset="55%" stop-color="${G}" />
                <stop offset="100%" stop-color="${Y}" />
            </linearGradient>
            <clipPath id="top-half-clip">
                <rect x="0" y="500" width="${n * 2}" height="500" />
            </clipPath>
            <clipPath id="bottom-half-clip">
                <rect x="0" y="0" width="${n * 2}" height="500" />
            </clipPath>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * R}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * R}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${0.1 * R}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${D}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${D}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${D}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${D}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${$}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${n}" height="500" fill="url(#sky)" />
        <ellipse cx="${j(i, n)}" cy="${T}" rx="${1.2 * n}" ry="125" fill="url(#twilight-glow)" />
        <rect x="0" y="500" width="${n}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${l}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${l}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${n}" y2="500" stroke="${$}" stroke-width="5" />
        <circle cx="${j(i, n)}"
            cy="${T}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${j(i, n)}"
            cy="${T}" r="150" fill="url(#sun-glow)" clip-path="url(#bottom-half-clip)" />
           `, _ += E(), console.log(), _;
}
function Tt(r) {
  const t = [], e = new Date(
    r.getFullYear(),
    r.getMonth(),
    r.getDate()
  );
  for (let o = 0; o < 48; o++) {
    const i = new Date(e.getTime() + o * 30 * 60 * 1e3);
    t.push(i);
  }
  return t;
}
function k(r, t, e, o, i) {
  return o + (r - t) * (i - o) / (e - t);
}
function j(r, t) {
  return r / 1440 * t;
}
function pt(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#101734", limit: -90 } : r <= -15 ? { top: "#171c27", bottom: "#282e3c", limit: -18 } : r <= -12 ? { top: "#171c29", bottom: "#525662", limit: -15 } : r <= -9 ? { top: "#4e545f", bottom: "#b9a76c", limit: -12 } : r <= -6 ? { top: "#909798", bottom: "#f9d92b", limit: -9 } : r <= -3 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: -6 } : r <= 0 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: -3 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 0 };
}
function bt(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : r <= -15 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : r <= -12 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : r <= -9 ? { top: "#171c29", bottom: "#525662", limit: -9 } : r <= -6 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : r <= -3 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : r <= 0 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : r <= 10 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 90 };
}
function At(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -90 } : r <= -15 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : r <= -12 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : r <= -9 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : r <= -6 ? { top: "#171c29", bottom: "#525662", limit: -9 } : r <= -3 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : r <= 0 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : r <= 10 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 };
}
function H(r) {
  const t = parseInt(r.slice(1), 16);
  return {
    r: t >> 16 & 255,
    g: t >> 8 & 255,
    b: t & 255
  };
}
function St({ r, g: t, b: e }) {
  return "#" + [r, t, e].map((o) => o.toString(16).padStart(2, "0")).join("");
}
function L(r, t, e) {
  return r + (t - r) * e;
}
function M(r, t, e) {
  return (e - r) / (t - r);
}
function O(r, t, e) {
  const o = H(r), i = H(t);
  return St({
    r: Math.round(L(o.r, i.r, e)),
    g: Math.round(L(o.g, i.g, e)),
    b: Math.round(L(o.b, i.b, e))
  });
}
function yt(r, t, e) {
  let o = r.getEphemerisDateForObject(
    t,
    r.getDate(),
    "RISE"
  ), i = y(e, "black");
  return i += b(t), i += A("Rise"), i += S(
    o.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    })
  ), i += E(), i;
}
function Et(r, t, e) {
  let o = r.getEphemerisDateForObject(
    t,
    r.getDate(),
    "SET"
  ), i = y(e, "black");
  return i += b(t), i += A("Rise"), i += S(
    o.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    })
  ), i += E(), i;
}
function It(r, t, e) {
  let o = r.getAltAzCoordinatesForObject(t), i = y(e, "black");
  if (o.latitude < 0) {
    i += b(t, !0);
    let n = r.getEphemerisDateForObject(
      t,
      r.getDate(),
      "RISE"
    );
    i += A("Visible at"), i += S(
      n.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      })
    );
  } else {
    let n = r.getAltAzCoordinatesForObject(
      t,
      new Date(r.getDate() - 3e5)
    ).latitude;
    i += A(
      z(o.latitude, n)
    ), i += S(
      v(o.longitude)
    ), i += b(t);
  }
  return i += E(), i;
}
class P {
  constructor() {
    this.astronomyJS = new N();
  }
  getDate() {
    return this.astronomyJS.getDate();
  }
  setDate(t) {
    this.astronomyJS.setDate(t);
  }
  setLocation(t, e) {
    this.astronomyJS.setLocation("Earth", t, e, 0);
  }
  static initialize(t, e) {
    let o = new P();
    return o.setDate(/* @__PURE__ */ new Date()), o.setLocation(t, e), o;
  }
  drawAzimuth(t, e) {
    return gt(this.astronomyJS, t, e);
  }
  drawAltitude(t, e) {
    return mt(this.astronomyJS, t, e);
  }
  drawSunAltitudePath(t, e) {
    return ft(this.astronomyJS, t, e);
  }
  drawCelestialBodyRiseTime(t, e) {
    return yt(this.astronomyJS, t, e);
  }
  drawCelestialBodySettingTime(t, e) {
    return Et(this.astronomyJS, t, e);
  }
  drawCelestialBodyVisibility(t, e) {
    return It(this.astronomyJS, t, e);
  }
}
function wt(r, t) {
  return P.initialize(r, t);
}
export {
  P as AstronomySVG,
  wt as initialize
};
