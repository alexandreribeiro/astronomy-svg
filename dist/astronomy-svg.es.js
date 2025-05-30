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
const d = {
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
class n {
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
    return t / d.MS_PER_DAY + d.JULIAN_DAY_OFFSET;
  }
  static julianDateToDate(t) {
    return new Date(
      (t - d.JULIAN_DAY_OFFSET) * d.MS_PER_DAY
    );
  }
  static julianDaysSinceEpoch2000(t) {
    return t - d.JULIAN_DAY_2000;
  }
  static julianCenturiesSinceEpoch2000(t) {
    return this.julianDaysSinceEpoch2000(t) / d.DAYS_PER_JULIAN_CENTURY;
  }
  static meanSiderealTime(t) {
    const e = this.julianDaysSinceEpoch2000(t), i = this.julianCenturiesSinceEpoch2000(t), o = 280.46061837 + 360.98564736629 * e + 387933e-9 * i * i - i * i * i / 3871e4;
    return n.modDegrees(o);
  }
}
class M {
  constructor(t, e, i) {
    this.x = t, this.y = e, this.z = i;
  }
  minus(t) {
    return new M(
      this.x - t.x,
      this.y - t.y,
      this.z - t.z
    );
  }
}
class b {
  constructor(t, e, i) {
    this.latitude = t, this.longitude = e, this.radius = i;
  }
  toDegrees() {
    let t = this.latitude, e = this.longitude;
    return new b(
      `${t < 0 ? "-" : ""}${n.padZero(0 | (t < 0 ? t = -t : t))}° ${n.padZero(0 | t % 1 * 60)}' ${n.padZero(0 | t * 60 % 1 * 60)}''`,
      `${e < 0 ? "-" : ""}${n.padZero(0 | (e < 0 ? e = -e : e))}° ${n.padZero(0 | e % 1 * 60)}' ${n.padZero(0 | e * 60 % 1 * 60)}''`,
      this.radius
    );
  }
  toHours() {
    let t = this.latitude, e = this.longitude;
    return new b(
      `${t < 0 ? "-" : ""}${n.padZero(0 | (t < 0 ? t = -t : t))}° ${n.padZero(0 | t % 1 * 60)}' ${n.padZero(0 | t * 60 % 1 * 60)}''`,
      `${e < 0 ? "-" : ""}${n.padZero(0 | (e < 0 ? e = -e / 15 : e = e / 15))}h ${n.padZero(0 | e % 1 * 60)}m ${n.padZero(0 | e * 60 % 1 * 60)}s`,
      this.radius
    );
  }
}
class F {
  constructor(t, e) {
    this.sphericalCoordinates = t || new b(
      d.GREENWICH_OBSERVATORY_COORDINATES.LATITUDE,
      d.GREENWICH_OBSERVATORY_COORDINATES.LONGITUDE,
      d.GREENWICH_OBSERVATORY_COORDINATES.RADIUS
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
    ), o = n.degreesToRadians(
      this.solarSystemObject.axialTilt
    );
    return new M(
      i.x,
      i.y * Math.cos(o) - i.z * Math.sin(o),
      i.y * Math.sin(o) + i.z * Math.cos(o)
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
    ), o = i.x > 0 && i.y < 0 ? 360 : i.x < 0 ? 180 : 0, a = n.radiansToDegrees(
      Math.atan(i.y / i.x)
    ) + o, s = n.radiansToDegrees(
      Math.atan(
        i.z / Math.sqrt(
          Math.pow(i.x, 2) + Math.pow(i.y, 2)
        )
      )
    );
    return new b(
      s,
      a,
      this.getDistanceToSolarSystemObject(t, e)
    );
  }
  getHADecCoordinatesForSolarSystemObject(t, e) {
    const i = this.getRectangularEquatorialCoordinatesForSolarSystemObject(
      t,
      e
    ), o = i.x > 0 && i.y < 0 ? 360 : i.x < 0 ? 180 : 0, a = n.radiansToDegrees(
      Math.atan(i.y / i.x)
    ) + o, s = n.modDegrees(
      this.getLocalSiderealTime(e) - a
    ), c = n.radiansToDegrees(
      Math.atan(
        i.z / Math.sqrt(
          Math.pow(i.x, 2) + Math.pow(i.y, 2)
        )
      )
    );
    return new b(
      c,
      s,
      this.getDistanceToSolarSystemObject(t, e)
    );
  }
  getAltAzCoordinatesForEquatorialCoordinates(t, e) {
    const i = n.degreesToRadians(
      n.modDegrees(
        t.longitude - this.getLocalSiderealTime(e)
      )
    ), o = n.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), a = n.degreesToRadians(
      t.latitude
    ), s = n.radiansToDegrees(
      Math.asin(
        Math.sin(o) * Math.sin(a) + Math.cos(o) * Math.cos(a) * Math.cos(i)
      )
    ), c = n.radiansToDegrees(
      Math.PI - Math.atan2(
        Math.sin(i),
        Math.cos(i) * Math.sin(o) - Math.tan(a) * Math.cos(o)
      )
    );
    return new b(s, c, null);
  }
  getLocalSiderealTime(t) {
    return n.modDegrees(
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
    const o = n.degreesToRadians(
      this.sphericalCoordinates.latitude
    ), a = n.degreesToRadians(i), s = n.degreesToRadians(
      this.getRADecCoordinatesForSolarSystemObject(
        t,
        e
      ).latitude
    ), c = (Math.sin(a) - Math.sin(o) * Math.sin(s)) / (Math.cos(o) * Math.cos(s));
    return n.radiansToDegrees(Math.acos(c));
  }
  getIterationValueForPositionalEphemerisForObject(t, e, i) {
    if (i === d.EPHEMERIS_TYPE.TRANSIT)
      return e - this.getObjectTransit(t, e) / 15 / 24;
    {
      const o = this.getObjectTransit(
        t,
        e
      ), a = this.getObjectLocalHourAngleForAltitude(
        t,
        e,
        i.ALTITUDE
      ), s = n.mod180Degrees(
        i.IS_GOING_UP ? o + a : o - a
      );
      return e - s / 15 / 24;
    }
  }
  iteratePositionalEphemerisForObject(t, e, i) {
    let o = this.getIterationValueForPositionalEphemerisForObject(
      t,
      e,
      i
    ), a = +o;
    for (let s = 0; s < 1e3 && (o = this.getIterationValueForPositionalEphemerisForObject(
      t,
      o,
      i
    ), !(Math.abs(o - a) < 10 ^ -5)); s++)
      a = o;
    return m.julianDateToDate(o);
  }
  getCorrectDateForPositionalEphemeris(t, e, i, o) {
    const a = this.iteratePositionalEphemerisForObject(
      t,
      e,
      i
    );
    if (o > 0 && a.getDate() !== m.julianDateToDate(e).getDate()) {
      const s = m.julianDate(a), c = s > e ? -1 : 1;
      return this.getCorrectDateForPositionalEphemeris(
        t,
        s + c,
        i,
        o - 1
      );
    } else return o === 0 ? null : a;
  }
  getDateForPositionalEphemeris(t, e, i) {
    return this.getCorrectDateForPositionalEphemeris(
      t,
      e,
      i,
      d.NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS
    );
  }
}
class W {
  constructor(t, e) {
    this.objectType = t, this.name = e;
  }
}
class y extends W {
  constructor(t, e, i, o) {
    super(d.SOLAR_SYSTEM_OBJECT, t), this.orbitalParameters = e, this.meanRadius = i, this.axialTilt = o;
  }
  /**
   * @param julianDate
   * @returns {RectangularCoordinates}
   */
  getRectangularHeliocentricCoordinates(t) {
    const e = m.julianCenturiesSinceEpoch2000(t), i = n.degreesToRadians(
      this.orbitalParameters.getInclination(e)
    ), o = n.degreesToRadians(
      this.orbitalParameters.getTrueAnomaly(e)
    ), a = n.degreesToRadians(
      this.orbitalParameters.getPerihelion(e)
    ), s = n.degreesToRadians(
      this.orbitalParameters.getAscendingNode(e)
    ), c = this.orbitalParameters.getOrbitRadius(
      e
    ), l = o + a - s, u = c * (Math.cos(s) * Math.cos(l) - Math.sin(s) * Math.sin(l) * Math.cos(i)), h = c * (Math.sin(s) * Math.cos(l) + Math.cos(s) * Math.sin(l) * Math.cos(i)), f = c * (Math.sin(l) * Math.sin(i));
    return new M(u, h, f);
  }
}
class p {
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
  constructor(t, e, i, o, a, s, c, l, u, h, f, S) {
    this.a0 = t, this.e0 = e, this.i0 = i, this.o0 = o, this.w0 = a, this.l0 = s, this.ac = c, this.ec = l, this.ic = u, this.oc = h, this.wc = f, this.lc = S;
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
    return n.modDegrees(
      this.i0 + this.ic / 3600 * t
    );
  }
  getAscendingNode(t) {
    return n.modDegrees(
      this.o0 + this.oc / 3600 * t
    );
  }
  getPerihelion(t) {
    return n.modDegrees(
      this.w0 + this.wc / 3600 * t
    );
  }
  getMeanLongitude(t) {
    return n.modDegrees(
      this.l0 + this.lc / 3600 * t
    );
  }
  getMeanAnomaly(t) {
    return n.modDegrees(
      this.getMeanLongitude(t) - this.getPerihelion(t)
    );
  }
  /**
   *
   * @param julianCenturiesSinceEpoch2000
   * @returns {*} E: eccentric anomaly
   */
  getEccentricAnomaly(t) {
    const e = n.degreesToRadians(
      this.getMeanAnomaly(t)
    ), i = this.getEccentricity(t);
    let o = e + i * Math.sin(e) * (1 + i * Math.cos(e)), a = 0, s = 0, c = 0;
    for (; c++ < 1e4 && (a = o - (o - i * Math.sin(o) - e) / (1 - i * Math.cos(o)), s = a - o, o = a, !(Math.abs(s) <= d.EPS)); )
      ;
    return n.radiansToDegrees(a);
  }
  /**
   * @param julianCenturiesSinceEpoch2000
   * @returns V: true anomaly
   */
  getTrueAnomaly(t) {
    const e = this.getEccentricity(t), i = n.degreesToRadians(
      this.getEccentricAnomaly(t)
    ), o = 2 * Math.atan(
      Math.sqrt((1 + e) / (1 - e)) * Math.tan(0.5 * i)
    );
    return n.radiansToDegrees(o);
  }
  /**
   * R = (a * (1 - e^2)) / (1 + e * cos(V))
   * @param julianCenturiesSinceEpoch2000
   * @returns R: orbit radius
   */
  getOrbitRadius(t) {
    const e = this.getSemiMajorAxis(t), i = this.getEccentricity(t), o = this.getTrueAnomaly(t);
    return e * (1 - Math.pow(i, 2)) / (1 + i * Math.cos(n.degreesToRadians(o)));
  }
}
class J extends y {
  constructor() {
    const t = new p(
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
class B extends y {
  constructor() {
    const t = new p(
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
class Z extends y {
  constructor() {
    const t = new p(
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
class q extends y {
  constructor() {
    const t = new p(
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
class X extends y {
  constructor() {
    const t = new p(
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
class K extends y {
  constructor() {
    const t = new p(
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
class Q extends y {
  constructor() {
    const t = new p(
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
class tt extends y {
  constructor() {
    const t = new p(
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
  new J(),
  new B(),
  new Z(),
  new q(),
  new X(),
  new K(),
  new Q(),
  new tt()
];
class it extends y {
  constructor() {
    const t = new p(
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
    super("Pluto", t, 1188300, 122.53);
  }
}
const rt = [new it()];
class ot extends y {
  constructor() {
    super("Sun", null, 695508e3);
  }
  getRectangularHeliocentricCoordinates(t) {
    return new M(0, 0, 0);
  }
}
const at = [new ot()].concat(et).concat(rt);
class P {
  constructor() {
    this.skyObjects = [...at], this.astronomicalCalculator = new F(), this.julianDate = null, this.date = null;
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
    return Object.values(d.EPHEMERIS_TYPE).find(
      (e) => e.NAME === t
    ) || null;
  }
  setLocation(t, e, i, o) {
    const a = this.getSkyObjectByName(t);
    if (!a)
      throw new Error(`Solar system object "${t}" not found`);
    this.astronomicalCalculator = new F(
      new b(
        e,
        i,
        a.meanRadius + o
      ),
      a
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
    const o = e ? m.julianDate(e) : this.julianDate;
    if (o === null)
      throw new Error("Reference date not set");
    const a = this.astronomicalCalculator.getRADecCoordinatesForSolarSystemObject(
      i,
      o
    );
    return this.astronomicalCalculator.getAltAzCoordinatesForEquatorialCoordinates(
      a,
      o
    );
  }
  static initialize(t, e) {
    let i = new P();
    return i.setLocation("Earth", t, e, 0), i.setDate(/* @__PURE__ */ new Date()), i;
  }
  getEphemerisDateForObject(t, e, i) {
    const o = this.getSkyObjectByName(t), a = this.getEphemerisTypeByName(i);
    if (!o || !a)
      throw new Error("Invalid object name or ephemeris type");
    return this.astronomicalCalculator.getDateForPositionalEphemeris(
      o,
      m.julianDate(e),
      a
    );
  }
}
function x(r, t) {
  return `<svg viewBox="0 0 1000 1000" width="${r}" height="${r}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function st(r, t) {
  return `<svg viewBox="0 0 2000 1000" width="${r}" height="${r / 2}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function T() {
  return "</svg>";
}
function g(r, t) {
  let e = t ? pt() : "";
  return r === "Sun" ? e += nt() : r === "Mercury" ? e += ct() : r === "Venus" ? e += lt() : r === "Mars" ? e += ut() : r === "Jupiter" ? e += dt() : r === "Saturn" ? e += ht() : r === "Uranus" ? e += ft() : r === "Neptune" ? e += yt() : r === "Pluto" && (e += gt()), e += t ? mt() : "", e;
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
function ct() {
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
function lt() {
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
function ut() {
  return `<circle cx="500" cy="278" r="139" fill="#d2691e" />
          <!-- Ice cap (ellipse) -->
          <ellipse cx="500" cy="167" rx="42" ry="21" fill="white" opacity="0.9" />
          <!-- Surface features -->
          <circle cx="458" cy="236" r="21" fill="#a0522d" />
          <circle cx="542" cy="319" r="17.35" fill="#a0522d" />
          <circle cx="514" cy="250" r="13.9" fill="#cd853f" />
          <circle cx="472" cy="306" r="10.4" fill="#cd853f" />`;
}
function dt() {
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
function ht() {
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
function ft() {
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
function yt() {
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
function gt() {
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
function pt() {
  return `<defs>
    <filter id="grayscale">
        <feColorMatrix type="saturate" values="0" />
    </filter>
    </defs>
    <g filter="url(#grayscale)">`;
}
function mt() {
  return "</g>";
}
function bt(r) {
  const t = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"], e = (r % 360 + 360) % 360, i = Math.floor((e + 22.5) / 45) % 8;
  return t[i];
}
function U(r, t) {
  return `${r.toFixed(1)} ${r > t ? "▲" : r < t ? "▼" : ""}`;
}
function H(r) {
  return `${r.toFixed(1)} ${bt(r)}`;
}
function A(r) {
  return `<text x="500" y="660" font-size="139" text-anchor="middle"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${r}
        </text>`;
}
function w(r) {
  return `<text x="500" y="833" font-size="139" text-anchor="middle"
                fill="white" font-family="Verdana" dominant-baseline="middle">
          ${r}
          </text>`;
}
function xt(r, t, e) {
  let i = r.getAltAzCoordinatesForObject(t).longitude, o = x(e, "black");
  return o += g(t), o += A("Azimuth"), o += w(H(i)), o += T(), o;
}
function Tt(r, t, e) {
  let i = r.getAltAzCoordinatesForObject(t).latitude, o = r.getAltAzCoordinatesForObject(
    t,
    new Date(r.getDate() - 5 * 60 * 1e3)
  ).latitude, a = x(e, "black");
  return a += g(t), a += A("Altitude"), a += w(U(i, o)), a += T(), a;
}
function k(r) {
  const t = parseInt(r.slice(1), 16);
  return {
    r: t >> 16 & 255,
    g: t >> 8 & 255,
    b: t & 255
  };
}
function St({ r, g: t, b: e }) {
  return "#" + [r, t, e].map((i) => i.toString(16).padStart(2, "0")).join("");
}
function $(r, t, e) {
  return r + (t - r) * e;
}
function D(r, t, e) {
  return (e - r) / (t - r);
}
function O(r, t, e) {
  const i = k(r), o = k(t);
  return St({
    r: Math.round($(i.r, o.r, e)),
    g: Math.round($(i.g, o.g, e)),
    b: Math.round($(i.b, o.b, e))
  });
}
function At(r) {
  const t = r.getAltAzCoordinatesForObject("Sun").latitude, e = wt(t), i = z(t), o = D(
    e.limit,
    i.limit,
    t
  ), a = O(
    e.top,
    i.top,
    o
  ), s = O(
    e.bottom,
    i.bottom,
    o
  );
  return `<defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${a}" />
                <stop offset="55%" stop-color="${a}" />
                <stop offset="100%" stop-color="${s}" />
            </linearGradient></defs>`;
}
function z(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : r <= -15 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : r <= -12 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : r <= -9 ? { top: "#171c29", bottom: "#525662", limit: -9 } : r <= -6 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : r <= -3 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : r <= 0 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : r <= 10 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 90 };
}
function wt(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -90 } : r <= -15 ? { top: "#0b0c1a", bottom: "#0b0c1a", limit: -18 } : r <= -12 ? { top: "#0b0c1a", bottom: "#101734", limit: -15 } : r <= -9 ? { top: "#171c27", bottom: "#282e3c", limit: -12 } : r <= -6 ? { top: "#171c29", bottom: "#525662", limit: -9 } : r <= -3 ? { top: "#4e545f", bottom: "#b9a76c", limit: -6 } : r <= 0 ? { top: "#909798", bottom: "#f9d92b", limit: -3 } : r <= 10 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: 0 } : { top: "#bcd6fc", bottom: "#98d5fc", limit: 10 };
}
function Et(r, t, e) {
  const i = r.getDate(), o = i.getHours() * 60 + i.getMinutes(), a = e ? 2e3 : 1e3, s = Mt(r.getDate()), c = s.map((R, _) => {
    const V = _ / (s.length - 1) * a, Y = r.getAltAzCoordinatesForObject(
      "Sun",
      R
    ).latitude;
    return [V, G(Y, -90, 90, 950, 50).toFixed(0)];
  }).map(([R, _]) => `${R},${_}`).join(" "), l = r.getAltAzCoordinatesForObject("Sun").latitude, u = G(l, -90, 90, 950, 50).toFixed(0), h = z(l), f = It(l), S = D(
    f.limit,
    h.limit,
    l
  ), E = O(
    h.bottom,
    f.bottom,
    S
  ), C = l > 0 ? 1 : l < -9 ? 0 : D(-9, 0, l), v = l > -3 ? 1 : l < -9 ? 0 : D(-9, -3, l), L = O(
    "#808080",
    "#ffffff",
    v
  );
  let I = e ? st(t, "black") : x(t, "black");
  return I += `
        <rect x="0" y="500" width="${a}" height="500" fill="black" />
        <defs>
            <clipPath id="top-half-clip">
                <rect x="0" y="500" width="${a * 2}" height="500" />
            </clipPath>
            <clipPath id="bottom-half-clip">
                <rect x="0" y="0" width="${a * 2}" height="500" />
            </clipPath>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * C}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * C}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${0.1 * C}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${E}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${E}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${E}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${E}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${L}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${a}" height="500" fill="url(#sky)" />
        <ellipse cx="${j(o, a)}" cy="${u}" rx="${1.2 * a}" ry="125" fill="url(#twilight-glow)" />
        <rect x="0" y="500" width="${a}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${c}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient)" stroke-width="35" points="${c}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${a}" y2="500" stroke="${L}" stroke-width="15" />
        <circle cx="${j(o, a)}"
            cy="${u}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${j(o, a)}"
            cy="${u}" r="150" fill="url(#sun-glow)" clip-path="url(#bottom-half-clip)" />
           `, I += At(r), I += T(), console.log(), I;
}
function Mt(r) {
  const t = [], e = new Date(
    r.getFullYear(),
    r.getMonth(),
    r.getDate()
  );
  for (let i = 0; i < 48; i++) {
    const o = new Date(e.getTime() + i * 30 * 60 * 1e3);
    t.push(o);
  }
  return t;
}
function G(r, t, e, i, o) {
  return i + (r - t) * (o - i) / (e - t);
}
function j(r, t) {
  return r / 1440 * t;
}
function It(r) {
  return r <= -18 ? { top: "#0b0c1a", bottom: "#101734", limit: -90 } : r <= -15 ? { top: "#171c27", bottom: "#282e3c", limit: -18 } : r <= -12 ? { top: "#171c29", bottom: "#525662", limit: -15 } : r <= -9 ? { top: "#4e545f", bottom: "#b9a76c", limit: -12 } : r <= -6 ? { top: "#909798", bottom: "#f9d92b", limit: -9 } : r <= -3 ? { top: "#b6d8ed", bottom: "#f6da3f", limit: -6 } : r <= 0 ? { top: "#bcd6fc", bottom: "#98d5fc", limit: -3 } : { top: "#cce8fd", bottom: "#98d5fc", limit: 0 };
}
function Dt(r, t, e) {
  let i = r.getEphemerisDateForObject(
    t,
    r.getDate(),
    "RISE"
  ), o = x(e, "black");
  return o += g(t), o += A("Rise"), o += w(
    i.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    })
  ), o += T(), o;
}
function Ot(r, t, e) {
  let i = r.getEphemerisDateForObject(
    t,
    r.getDate(),
    "SET"
  ), o = x(e, "black");
  return o += g(t), o += A("Set"), o += w(
    i.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    })
  ), o += T(), o;
}
function Ct(r, t, e) {
  let i = r.getAltAzCoordinatesForObject(t), o = x(e, "black");
  if (i.latitude < 0) {
    o += g(t, !0);
    let a = r.getEphemerisDateForObject(
      t,
      r.getDate(),
      "RISE"
    );
    o += A("Visible at"), o += w(
      a.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      })
    );
  } else {
    let a = r.getAltAzCoordinatesForObject(
      t,
      new Date(r.getDate() - 3e5)
    ).latitude;
    o += A(
      U(i.latitude, a)
    ), o += w(
      H(i.longitude)
    ), o += g(t);
  }
  return o += T(), o;
}
function Rt(r, t, e, i) {
  let o = r.getAltAzCoordinatesForObject(t), a = x(e, "black");
  if (o.latitude < 0) {
    a += g(t, !0);
    let s = r.getEphemerisDateForObject(
      t,
      r.getDate(),
      "RISE"
    );
    a += A("Visible at"), a += w(
      s.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      })
    );
  } else {
    let s = 380, c = 500, l = 520, u = s * (1 - o.latitude / 90), h = (o.longitude - 90) * (Math.PI / 180), f = c + u * Math.cos(h), S = l + u * Math.sin(h);
    a += '<rect x="0" y="0" width="1000" height="1000" fill="url(#sky)" />', i !== void 0 && i !== 0 ? a += `
            <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${c}" y="${l - s - 60}">${i}</text>
          </g>
          <g transform="rotate(${360 - i} ${c} ${l})">
        ` : a += "<g>", a += `
          <circle cx="${c}" cy="${l}" r="${s}" fill="none" stroke="white" stroke-width="15" />
          <circle cx="${c}" cy="${l}" r="${s / 2}" fill="none" stroke="white" stroke-width="8" />
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="${c}" y="${l - s - 60}">N</text>
          </g>
        `, a += `<g transform="translate(${f - 500}, ${S - 279})
                translate(500, 279) scale(0.3) translate(-500, -279)">`, a += g(t), a += "</g></g>";
  }
  return a += T(), a;
}
function _t(r, t, e, i) {
  let o = x(e, "black"), a = 380, s = 500, c = 520;
  o += '<rect x="0" y="0" width="1000" height="1000" fill="url(#sky)" />', i !== void 0 && i !== 0 ? o += `
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
          <text x="${s}" y="${c - a - 60}">${i}</text>
        </g>
        <g transform="rotate(${360 - i} ${s} ${c})">
      ` : o += "<g>", o += `
        <circle cx="${s}" cy="${c}" r="${a}" fill="none" stroke="white" stroke-width="15" />
        <circle cx="${s}" cy="${c}" r="${a / 2}" fill="none" stroke="white" stroke-width="8" />
        <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
          <text x="${s}" y="${c - a - 60}">N</text>
        </g>
      `;
  for (let l of t) {
    let u = r.getAltAzCoordinatesForObject(l);
    if (u.latitude < 0)
      continue;
    let h = a * (1 - u.latitude / 90), f = (u.longitude - 90) * (Math.PI / 180), S = s + h * Math.cos(f), E = c + h * Math.sin(f);
    o += `<g transform="translate(${S - 500}, ${E - 279})
              translate(500, 279) scale(0.3) translate(-500, -279)">`, o += g(l), o += "</g>";
  }
  return o += "</g>", o += T(), o;
}
class N {
  constructor() {
    this.astronomyJS = new P();
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
    let i = new N();
    return i.setDate(/* @__PURE__ */ new Date()), i.setLocation(t, e), i;
  }
  drawAzimuth(t, e) {
    return xt(this.astronomyJS, t, e);
  }
  drawAltitude(t, e) {
    return Tt(this.astronomyJS, t, e);
  }
  drawSunAltitudePath(t, e) {
    return Et(this.astronomyJS, t, e);
  }
  drawCelestialBodyRiseTime(t, e) {
    return Dt(this.astronomyJS, t, e);
  }
  drawCelestialBodySettingTime(t, e) {
    return Ot(this.astronomyJS, t, e);
  }
  drawCelestialBodyVisibility(t, e) {
    return Ct(this.astronomyJS, t, e);
  }
  drawCelestialBodyVisibilityMap(t, e, i) {
    return Rt(
      this.astronomyJS,
      t,
      e,
      i
    );
  }
  drawMultiCelestialBodyVisibilityMap(t, e, i) {
    return _t(
      this.astronomyJS,
      t,
      e,
      i
    );
  }
}
function $t(r, t) {
  return N.initialize(r, t);
}
export {
  N as AstronomySVG,
  $t as initialize
};
