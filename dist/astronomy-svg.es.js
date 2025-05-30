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
class m {
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
    const e = this.julianDaysSinceEpoch2000(t), i = this.julianCenturiesSinceEpoch2000(t), r = 280.46061837 + 360.98564736629 * e + 387933e-9 * i * i - i * i * i / 3871e4;
    return s.modDegrees(r);
  }
}
class I {
  constructor(t, e, i) {
    this.x = t, this.y = e, this.z = i;
  }
  minus(t) {
    return new I(
      this.x - t.x,
      this.y - t.y,
      this.z - t.z
    );
  }
}
class T {
  constructor(t, e, i) {
    this.latitude = t, this.longitude = e, this.radius = i;
  }
  toDegrees() {
    let t = this.latitude, e = this.longitude;
    return new T(
      `${t < 0 ? "-" : ""}${s.padZero(0 | (t < 0 ? t = -t : t))}° ${s.padZero(0 | t % 1 * 60)}' ${s.padZero(0 | t * 60 % 1 * 60)}''`,
      `${e < 0 ? "-" : ""}${s.padZero(0 | (e < 0 ? e = -e : e))}° ${s.padZero(0 | e % 1 * 60)}' ${s.padZero(0 | e * 60 % 1 * 60)}''`,
      this.radius
    );
  }
  toHours() {
    let t = this.latitude, e = this.longitude;
    return new T(
      `${t < 0 ? "-" : ""}${s.padZero(0 | (t < 0 ? t = -t : t))}° ${s.padZero(0 | t % 1 * 60)}' ${s.padZero(0 | t * 60 % 1 * 60)}''`,
      `${e < 0 ? "-" : ""}${s.padZero(0 | (e < 0 ? e = -e / 15 : e = e / 15))}h ${s.padZero(0 | e % 1 * 60)}m ${s.padZero(0 | e * 60 % 1 * 60)}s`,
      this.radius
    );
  }
}
class F {
  constructor(t, e) {
    this.sphericalCoordinates = t || new T(
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
    const i = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(
      t,
      e
    ), r = s.degreesToRadians(
      this.solarSystemObject.axialTilt
    );
    return new I(
      i.x,
      i.y * Math.cos(r) - i.z * Math.sin(r),
      i.y * Math.sin(r) + i.z * Math.cos(r)
    );
  }
  getDistanceToSolarSystemObject(t, e) {
    const i = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(
      t,
      e
    );
    return Math.sqrt(
      Math.pow(i.x, 2) + Math.pow(i.y, 2) + Math.pow(i.z, 2)
    );
  }
  getRADecCoordinatesForSolarSystemObject(t, e) {
    const i = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      t,
      e
    ), r = i.x > 0 && i.y < 0 ? 360 : i.x < 0 ? 180 : 0, n = s.radiansToDegrees(
      Math.atan(i.y / i.x)
    ) + r, a = s.radiansToDegrees(
      Math.atan(
        i.z / Math.sqrt(
          Math.pow(i.x, 2) + Math.pow(i.y, 2)
        )
      )
    );
    return new T(
      a,
      n,
      this.getDistanceToSolarSystemObject(t, e)
    );
  }
  getHADecCoordinatesForSolarSystemObject(t, e) {
    const i = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      t,
      e
    ), r = i.x > 0 && i.y < 0 ? 360 : i.x < 0 ? 180 : 0, n = s.radiansToDegrees(
      Math.atan(i.y / i.x)
    ) + r, a = s.modDegrees(
      this.getLocalSiderealTime(e) - n
    ), c = s.radiansToDegrees(
      Math.atan(
        i.z / Math.sqrt(
          Math.pow(i.x, 2) + Math.pow(i.y, 2)
        )
      )
    );
    return new T(
      c,
      a,
      this.getDistanceToSolarSystemObject(t, e)
    );
  }
  getAltAzCoordinatesForEquatorialCoordinates(t, e) {
    const i = s.degreesToRadians(
      s.modDegrees(
        t.longitude - this.getLocalSiderealTime(e)
      )
    ), r = s.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), n = s.degreesToRadians(
      t.latitude
    ), a = s.radiansToDegrees(
      Math.asin(
        Math.sin(r) * Math.sin(n) + Math.cos(r) * Math.cos(n) * Math.cos(i)
      )
    ), c = s.radiansToDegrees(
      Math.PI - Math.atan2(
        Math.sin(i),
        Math.cos(i) * Math.sin(r) - Math.tan(n) * Math.cos(r)
      )
    );
    return new T(a, c, null);
  }
  getLocalSiderealTime(t) {
    return s.modDegrees(
      m.meanSiderealTime(t) + this.sphericalCoordinates.longitude
    );
  }
  getObjectTransit(t, e) {
    const i = this.getRADecCoordinatesForSolarSystemObject(
      t,
      e
    ).longitude;
    return this.getLocalSiderealTime(e) - i;
  }
  getObjectLocalHourAngleForAltitude(t, e, i) {
    const r = s.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), n = s.degreesToRadians(i), a = s.degreesToRadians(
      this.getRADecCoordinatesForSolarSystemObject(
        t,
        e
      ).latitude
    ), c = (Math.sin(n) - Math.sin(r) * Math.sin(a)) / (Math.cos(r) * Math.cos(a));
    return s.radiansToDegrees(Math.acos(c));
  }
  getIterationValueForPositionalEphemerisForObject(t, e, i) {
    if (i === u.EPHEMERIS_TYPE.TRANSIT)
      return e - this.getObjectTransit(t, e) / 15 / 24;
    {
      const r = this.getObjectTransit(
        t,
        e
      ), n = this.getObjectLocalHourAngleForAltitude(
        t,
        e,
        i.ALTITUDE
      ), a = s.mod180Degrees(
        i.IS_GOING_UP ? r + n : r - n
      );
      return e - a / 15 / 24;
    }
  }
  iteratePositionalEphemerisForObject(t, e, i) {
    let r = this.getIterationValueForPositionalEphemerisForObject(
      t,
      e,
      i
    ), n = +r;
    for (let a = 0; a < 1e3 && (r = this.getIterationValueForPositionalEphemerisForObject(
      t,
      r,
      i
    ), !(Math.abs(r - n) < 10 ^ -5)); a++)
      n = r;
    return m.julianDateToDate(r);
  }
  getCorrectDateForPositionalEphemeris(t, e, i, r) {
    const n = this.iteratePositionalEphemerisForObject(
      t,
      e,
      i
    );
    if (r > 0 && n.getDate() !== m.julianDateToDate(e).getDate()) {
      const a = m.julianDate(n), c = a > e ? -1 : 1;
      return this.getCorrectDateForPositionalEphemeris(
        t,
        a + c,
        i,
        r - 1
      );
    } else return r === 0 ? null : n;
  }
  getDateForPositionalEphemeris(t, e, i) {
    return this.getCorrectDateForPositionalEphemeris(
      t,
      e,
      i,
      u.NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS
    );
  }
}
class B {
  constructor(t, e) {
    this.objectType = t, this.name = e;
  }
}
class g extends B {
  constructor(t, e, i, r) {
    super(u.SOLAR_SYSTEM_OBJECT, t), this.orbitalParameters = e, this.meanRadius = i, this.axialTilt = r;
  }
  /**
   * @param julianDate
   * @returns {RectangularCoordinates}
   */
  getRectangularHeliocentricCoordinates(t) {
    const e = m.julianCenturiesSinceEpoch2000(t), i = s.degreesToRadians(
      this.orbitalParameters.getInclination(e)
    ), r = s.degreesToRadians(
      this.orbitalParameters.getTrueAnomaly(e)
    ), n = s.degreesToRadians(
      this.orbitalParameters.getPerihelion(e)
    ), a = s.degreesToRadians(
      this.orbitalParameters.getAscendingNode(e)
    ), c = this.orbitalParameters.getOrbitRadius(
      e
    ), l = r + n - a, d = c * (Math.cos(a) * Math.cos(l) - Math.sin(a) * Math.sin(l) * Math.cos(i)), h = c * (Math.sin(a) * Math.cos(l) + Math.cos(a) * Math.sin(l) * Math.cos(i)), f = c * (Math.sin(l) * Math.sin(i));
    return new I(d, h, f);
  }
}
class b {
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
  constructor(t, e, i, r, n, a, c, l, d, h, f, w) {
    this.a0 = t, this.e0 = e, this.i0 = i, this.o0 = r, this.w0 = n, this.l0 = a, this.ac = c, this.ec = l, this.ic = d, this.oc = h, this.wc = f, this.lc = w;
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
    ), i = this.getEccentricity(t);
    let r = e + i * Math.sin(e) * (1 + i * Math.cos(e)), n = 0, a = 0, c = 0;
    for (; c++ < 1e4 && (n = r - (r - i * Math.sin(r) - e) / (1 - i * Math.cos(r)), a = n - r, r = n, !(Math.abs(a) <= u.EPS)); )
      ;
    return s.radiansToDegrees(n);
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns V: true anomaly
   */
  getTrueAnomaly(t) {
    const e = this.getEccentricity(t), i = s.degreesToRadians(
      this.getEccentricAnomaly(t)
    ), r = 2 * Math.atan(
      Math.sqrt((1 + e) / (1 - e)) * Math.tan(0.5 * i)
    );
    return s.radiansToDegrees(r);
  }
  /**
   * R = (a * (1 - e^2)) / (1 + e * cos(V))
   * @param julianCenturiesSinceEpoch2000
   * @returns R: orbit radius
   */
  getOrbitRadius(t) {
    const e = this.getSemiMajorAxis(t), i = this.getEccentricity(t), r = this.getTrueAnomaly(t);
    return e * (1 - Math.pow(i, 2)) / (1 + i * Math.cos(s.degreesToRadians(r)));
  }
}
class W extends g {
  constructor() {
    const t = new b(
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
class J extends g {
  constructor() {
    const t = new b(
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
class Z extends g {
  constructor() {
    const t = new b(
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
class q extends g {
  constructor() {
    const t = new b(
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
class X extends g {
  constructor() {
    const t = new b(
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
class K extends g {
  constructor() {
    const t = new b(
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
class Q extends g {
  constructor() {
    const t = new b(
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
class tt extends g {
  constructor() {
    const t = new b(
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
const et = [
  new W(),
  new J(),
  new Z(),
  new q(),
  new X(),
  new K(),
  new Q(),
  new tt()
];
class it extends g {
  constructor() {
    super("Sun", null, 695508e3);
  }
  getRectangularHeliocentricCoordinates(t) {
    return new I(0, 0, 0);
  }
}
const ot = [new it()].concat(et);
class N {
  constructor() {
    this.skyObjects = [...ot], this.astronomicalCalculator = new F(), this.julianDate = null, this.date = null;
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
    this.date = t, this.setJulianDate(m.julianDate(t));
  }
  getSkyObjectByName(t) {
    return this.skyObjects.find((e) => e.name === t) || null;
  }
  getEphemerisTypeByName(t) {
    return Object.values(u.EPHEMERIS_TYPE).find(
      (e) => e.NAME === t
    ) || null;
  }
  setLocation(t, e, i, r) {
    const n = this.getSkyObjectByName(t);
    if (!n)
      throw new Error(`Solar system object "${t}" not found`);
    this.astronomicalCalculator = new F(
      new T(
        e,
        i,
        n.meanRadius + r
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
    const i = this.getSkyObjectByName(t);
    if (!i)
      throw new Error(`Object "${t}" not found`);
    const r = e ? m.julianDate(e) : this.julianDate;
    if (r === null)
      throw new Error("Reference date not set");
    const n = this.astronomicalCalculator.getRADecCoordinatesForSolarSystemObject(
      i,
      r
    );
    return this.astronomicalCalculator.getAltAzCoordinatesForEquatorialCoordinates(
      n,
      r
    );
  }
  static initialize(t, e) {
    let i = new N();
    return i.setLocation("Earth", t, e, 0), i.setDate(/* @__PURE__ */ new Date()), i;
  }
  getEphemerisDateForObject(t, e, i) {
    const r = this.getSkyObjectByName(t), n = this.getEphemerisTypeByName(i);
    if (!r || !n)
      throw new Error("Invalid object name or ephemeris type");
    return this.astronomicalCalculator.getDateForPositionalEphemeris(
      r,
      m.julianDate(e),
      n
    );
  }
}
function S(o, t) {
  return `<svg viewBox="0 0 1000 1000" width="${o}" height="${o}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function rt(o, t) {
  return `<svg viewBox="0 0 2000 1000" width="${o}" height="${o / 2}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function E() {
  return "</svg>";
}
function p(o, t) {
  let e = t ? at() : "";
  return o === "Sun" ? e += nt() : o === "Mars" && (e += st()), e += t ? ct() : "", e;
}
function nt() {
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
function st() {
  return `<circle cx="500" cy="278" r="139" fill="#d2691e" />
          <!-- Ice cap (ellipse) -->
          <ellipse cx="500" cy="167" rx="42" ry="21" fill="white" opacity="0.9" />
          <!-- Surface features -->
          <circle cx="458" cy="236" r="21" fill="#a0522d" />
          <circle cx="542" cy="319" r="17.35" fill="#a0522d" />
          <circle cx="514" cy="250" r="13.9" fill="#cd853f" />
          <circle cx="472" cy="306" r="10.4" fill="#cd853f" />`;
}
function at() {
  return `<defs>
    <filter id="grayscale">
        <feColorMatrix type="saturate" values="0" />
    </filter>
    </defs>
    <g filter="url(#grayscale)">`;
}
function ct() {
  return "</g>";
}
function lt(o) {
  const t = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"], e = (o % 360 + 360) % 360, i = Math.floor((e + 22.5) / 45) % 8;
  return t[i];
}
function U(o, t) {
  return `${o.toFixed(1)} ${o > t ? "▲" : o < t ? "▼" : ""}`;
}
function H(o) {
  return `${o.toFixed(1)} ${lt(o)}`;
}
function y(o) {
  return `<text x="500" y="660" font-size="139" text-anchor="middle"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${o}
        </text>`;
}
function A(o) {
  return `<text x="500" y="833" font-size="139" text-anchor="middle"
                fill="white" font-family="Verdana" dominant-baseline="middle">
          ${o}
          </text>`;
}
function ut(o, t, e) {
  let i = o.getAltAzCoordinatesForObject(t).longitude, r = S(e, "black");
  return r += p(t), r += y("Azimuth"), r += A(H(i)), r += E(), r;
}
function dt(o, t, e) {
  let i = o.getAltAzCoordinatesForObject(t).latitude, r = o.getAltAzCoordinatesForObject(
    t,
    new Date(o.getDate() - 5 * 60 * 1e3)
  ).latitude, n = S(e, "black");
  return n += p(t), n += y("Altitude"), n += A(U(i, r)), n += E(), n;
}
function G(o) {
  const t = parseInt(o.slice(1), 16);
  return {
    r: t >> 16 & 255,
    g: t >> 8 & 255,
    b: t & 255
  };
}
function ht({ r: o, g: t, b: e }) {
  return "#" + [o, t, e].map((i) => i.toString(16).padStart(2, "0")).join("");
}
function j(o, t, e) {
  return o + (t - o) * e;
}
function O(o, t, e) {
  return (e - o) / (t - o);
}
function x(o, t, e) {
  const i = G(o), r = G(t);
  return ht({
    r: Math.round(j(i.r, r.r, e)),
    g: Math.round(j(i.g, r.g, e)),
    b: Math.round(j(i.b, r.b, e))
  });
}
function gt(o) {
  const t = o.getAltAzCoordinatesForObject("Sun").latitude, e = ft(t), i = z(t), r = O(
    e.limit,
    i.limit,
    t
  ), n = x(
    e.top,
    i.top,
    r
  ), a = x(
    e.bottom,
    i.bottom,
    r
  );
  return `<defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${n}" />
                <stop offset="55%" stop-color="${n}" />
                <stop offset="100%" stop-color="${a}" />
            </linearGradient></defs>`;
}
function z(o) {
  return o <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : o <= -15 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : o <= -12 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : o <= -9 ? { top: "#171c29", bottom: "#525662", limit: -9 } : o <= -6 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : o <= -3 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : o <= 0 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : o <= 10 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 90 };
}
function ft(o) {
  return o <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -90 } : o <= -15 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : o <= -12 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : o <= -9 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : o <= -6 ? { top: "#171c29", bottom: "#525662", limit: -9 } : o <= -3 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : o <= 0 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : o <= 10 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 };
}
function mt(o, t, e) {
  const i = o.getDate(), r = i.getHours() * 60 + i.getMinutes(), n = e ? 2e3 : 1e3, a = Tt(o.getDate()), c = a.map((C, _) => {
    const Y = _ / (a.length - 1) * n, V = o.getAltAzCoordinatesForObject(
      "Sun",
      C
    ).latitude;
    return [Y, k(V, -90, 90, 950, 50).toFixed(0)];
  }).map(([C, _]) => `${C},${_}`).join(" "), l = o.getAltAzCoordinatesForObject("Sun").latitude, d = k(l, -90, 90, 950, 50).toFixed(0), h = z(l), f = pt(l), w = O(
    f.limit,
    h.limit,
    l
  ), M = x(
    h.bottom,
    f.bottom,
    w
  ), R = l > 0 ? 1 : l < -9 ? 0 : O(-9, 0, l), v = l > -3 ? 1 : l < -9 ? 0 : O(-9, -3, l), P = x(
    "#808080",
    "#ffffff",
    v
  );
  let D = e ? rt(t, "black") : S(t, "black");
  return D += `
        <rect x="0" y="500" width="${n}" height="500" fill="black" />
        <defs>
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
                <stop offset="0%" stop-color="${M}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${M}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${M}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${M}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${P}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${n}" height="500" fill="url(#sky)" />
        <ellipse cx="${L(r, n)}" cy="${d}" rx="${1.2 * n}" ry="125" fill="url(#twilight-glow)" />
        <rect x="0" y="500" width="${n}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${c}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${c}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${n}" y2="500" stroke="${P}" stroke-width="5" />
        <circle cx="${L(r, n)}"
            cy="${d}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${L(r, n)}"
            cy="${d}" r="150" fill="url(#sun-glow)" clip-path="url(#bottom-half-clip)" />
           `, D += gt(o), D += E(), console.log(), D;
}
function Tt(o) {
  const t = [], e = new Date(
    o.getFullYear(),
    o.getMonth(),
    o.getDate()
  );
  for (let i = 0; i < 48; i++) {
    const r = new Date(e.getTime() + i * 30 * 60 * 1e3);
    t.push(r);
  }
  return t;
}
function k(o, t, e, i, r) {
  return i + (o - t) * (r - i) / (e - t);
}
function L(o, t) {
  return o / 1440 * t;
}
function pt(o) {
  return o <= -18 ? { top: "#0b0c1a", bottom: "#101734", limit: -90 } : o <= -15 ? { top: "#171c27", bottom: "#282e3c", limit: -18 } : o <= -12 ? { top: "#171c29", bottom: "#525662", limit: -15 } : o <= -9 ? { top: "#4e545f", bottom: "#b9a76c", limit: -12 } : o <= -6 ? { top: "#909798", bottom: "#f9d92b", limit: -9 } : o <= -3 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: -6 } : o <= 0 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: -3 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 0 };
}
function bt(o, t, e) {
  let i = o.getEphemerisDateForObject(
    t,
    o.getDate(),
    "RISE"
  ), r = S(e, "black");
  return r += p(t), r += y("Rise"), r += A(
    i.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    })
  ), r += E(), r;
}
function yt(o, t, e) {
  let i = o.getEphemerisDateForObject(
    t,
    o.getDate(),
    "SET"
  ), r = S(e, "black");
  return r += p(t), r += y("Rise"), r += A(
    i.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    })
  ), r += E(), r;
}
function At(o, t, e) {
  let i = o.getAltAzCoordinatesForObject(t), r = S(e, "black");
  if (i.latitude < 0) {
    r += p(t, !0);
    let n = o.getEphemerisDateForObject(
      t,
      o.getDate(),
      "RISE"
    );
    r += y("Visible at"), r += A(
      n.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      })
    );
  } else {
    let n = o.getAltAzCoordinatesForObject(
      t,
      new Date(o.getDate() - 3e5)
    ).latitude;
    r += y(
      U(i.latitude, n)
    ), r += A(
      H(i.longitude)
    ), r += p(t);
  }
  return r += E(), r;
}
function St(o, t, e, i) {
  let r = o.getAltAzCoordinatesForObject(t), n = S(e, "black");
  if (r.latitude < 0) {
    n += p(t, !0);
    let a = o.getEphemerisDateForObject(
      t,
      o.getDate(),
      "RISE"
    );
    n += y("Visible at"), n += A(
      a.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      })
    );
  } else {
    let a = 380, c = 500, l = 520, d = a * (1 - r.latitude / 90), h = (r.longitude - 90) * (Math.PI / 180), f = c + d * Math.cos(h), w = l + d * Math.sin(h);
    n += '<rect x="0" y="0" width="1000" height="1000" fill="url(#sky)" />', i !== void 0 && i !== 0 ? n += `
            <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${c}" y="${l - a - 60}">${i}</text>
          </g>
          <g transform="rotate(${360 - i} ${c} ${l})">
        ` : n += "<g>", n += `
          <circle cx="${c}" cy="${l}" r="${a}" fill="none" stroke="white" stroke-width="15" />
          <circle cx="${c}" cy="${l}" r="${a / 2}" fill="none" stroke="white" stroke-width="8" />
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${c}" y="${l - a - 60}">N</text>
          </g>
        `, n += `<g transform="translate(${f - 500}, ${w - 279})
                translate(500, 279) scale(0.3) translate(-500, -279)">`, n += p(t), n += "</g></g>";
  }
  return n += E(), n;
}
class $ {
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
    let i = new $();
    return i.setDate(/* @__PURE__ */ new Date()), i.setLocation(t, e), i;
  }
  drawAzimuth(t, e) {
    return ut(this.astronomyJS, t, e);
  }
  drawAltitude(t, e) {
    return dt(this.astronomyJS, t, e);
  }
  drawSunAltitudePath(t, e) {
    return mt(this.astronomyJS, t, e);
  }
  drawCelestialBodyRiseTime(t, e) {
    return bt(this.astronomyJS, t, e);
  }
  drawCelestialBodySettingTime(t, e) {
    return yt(this.astronomyJS, t, e);
  }
  drawCelestialBodyVisibility(t, e) {
    return At(this.astronomyJS, t, e);
  }
  drawCelestialBodyVisibilityMap(t, e, i) {
    return St(
      this.astronomyJS,
      t,
      e,
      i
    );
  }
}
function Et(o, t) {
  return $.initialize(o, t);
}
export {
  $ as AstronomySVG,
  Et as initialize
};
