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
//#region node_modules/astronomy-js/lib/constants.js
var e = {
	SOLAR_SYSTEM_OBJECT: "SOLAR_SYSTEM_OBJECT",
	GREENWICH_OBSERVATORY_COORDINATES: {
		LATITUDE: 51.476852,
		LONGITUDE: -5e-4,
		RADIUS: 6371046,
		ELEVATION: 46
	},
	KIRUNA_COORDINATES: {
		LATITUDE: 67.85,
		LONGITUDE: 20.21,
		RADIUS: 6371500,
		ELEVATION: 500
	},
	EPHEMERIS_TYPE: {
		SUNRISE: {
			NAME: "SUNRISE",
			ALTITUDE: "-0.833",
			IS_GOING_UP: !0
		},
		SUNSET: {
			NAME: "SUNSET",
			ALTITUDE: "-0.833",
			IS_GOING_UP: !1
		},
		MOONRISE: {
			NAME: "MOONRISE",
			ALTITUDE: "-0.833",
			IS_GOING_UP: !0
		},
		MOONSET: {
			NAME: "MOONSET",
			ALTITUDE: "-0.833",
			IS_GOING_UP: !1
		},
		GOLDEN_HOUR_START: {
			NAME: "GOLDEN_HOUR_START",
			ALTITUDE: "6",
			IS_GOING_UP: !1
		},
		GOLDEN_HOUR_END: {
			NAME: "GOLDEN_HOUR_END",
			ALTITUDE: "6",
			IS_GOING_UP: !0
		},
		RISE: {
			NAME: "RISE",
			ALTITUDE: "0",
			IS_GOING_UP: !0
		},
		SET: {
			NAME: "SET",
			ALTITUDE: "0",
			IS_GOING_UP: !1
		},
		TRANSIT: {
			NAME: "TRANSIT",
			ALTITUDE: null,
			IS_GOING_UP: null
		},
		LOWER_TRANSIT: {
			NAME: "LOWER_TRANSIT",
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
	MS_PER_HOUR: 3600 * 1e3,
	MS_PER_DAY: 3600 * 1e3 * 24,
	MS_PER_YEAR: 3600 * 1e3 * 24 * 365.2422,
	JULIAN_DAY_OFFSET: 2440587.5,
	JULIAN_DAY_2000: 2451545,
	JULIAN_DAY_2010: 2455197.5,
	EPS: 10 ** -9,
	DEGREE: Math.PI / 180,
	NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS: 5,
	ARC_SECONDS_IN_A_DEGREE: 3600,
	DAYS_PER_JULIAN_CENTURY: 36525,
	METERS_PER_AU: 149597870700
}, t = class {
	static julianDate(t) {
		return t / e.MS_PER_DAY + e.JULIAN_DAY_OFFSET;
	}
	static julianDateToDate(t) {
		return new Date((t - e.JULIAN_DAY_OFFSET) * e.MS_PER_DAY);
	}
	static julianDaysSinceEpoch2000(t) {
		return t - e.JULIAN_DAY_2000;
	}
	static julianCenturiesSinceEpoch2000(t) {
		return this.julianDaysSinceEpoch2000(t) / e.DAYS_PER_JULIAN_CENTURY;
	}
}, n = class {
	static modDegrees(e) {
		for (; e < 0;) e += 360;
		return e % 360;
	}
	static mod180Degrees(e) {
		let t = this.modDegrees(e);
		return t > 180 ? t - 360 : t;
	}
	static modRadians(e) {
		for (; e < 0;) e += 2 * Math.PI;
		return e % (2 * Math.PI);
	}
	static modPiRadians(e) {
		let t = this.modRadians(e);
		return t > Math.PI ? t - 2 * Math.PI : t;
	}
	static radiansToDegrees(e) {
		return 180 / Math.PI * e;
	}
	static degreesToRadians(e) {
		return Math.PI / 180 * e;
	}
}, r = class e {
	constructor(e, t, n, r) {
		this.x = e, this.y = t, this.z = n, this.center = r;
	}
	minus(t, n) {
		return new e(this.x - t.x, this.y - t.y, this.z - t.z, n);
	}
}, i = class {
	constructor(e, t, n, r) {
		this.lambda = e, this.beta = t, this.delta = n, this.center = r;
	}
}, a = class {
	constructor(e, t, n, r, i) {
		this.rightAscension = e, this.declination = t, this.delta = n, this.obliquity = r, this.center = i;
	}
}, o = class {
	constructor(e, t, n, r) {
		this.azimuth = e, this.altitude = t, this.distance = n, this.observerLocation = r;
	}
}, s = class {
	constructor(e, t, n, r) {
		this.rightAscension = e, this.declination = t, this.distance = n, this.observerLocation = r;
	}
}, c = class {
	static eclipticRectangularToEclipticSphericalCoordinates(e) {
		let t = Math.sqrt(e.x * e.x + e.y * e.y + e.z * e.z), n = Math.atan2(e.y, e.x) * (180 / Math.PI), r = Math.asin(e.z / t) * (180 / Math.PI);
		return new i((n + 360) % 360, r, t, e.center);
	}
	static eclipticSphericalToEquatorialSphericalCoordinates(e, t) {
		let r = n.degreesToRadians(e.lambda), i = n.degreesToRadians(e.beta), o = n.degreesToRadians(t), s = Math.sin(i) * Math.cos(o) + Math.cos(i) * Math.sin(o) * Math.sin(r), c = Math.sin(r) * Math.cos(o) - Math.tan(i) * Math.sin(o), l = Math.atan2(c, Math.cos(r));
		return new a(n.modDegrees(n.radiansToDegrees(l)), n.radiansToDegrees(Math.asin(s)), e.delta, t, e.center);
	}
	static equatorialSphericalToTopocentricEquatorialSphericalCoordinates(t, r, i) {
		let a = t.center.meanRadius, o = n.degreesToRadians(t.rightAscension), c = n.degreesToRadians(t.declination), l = n.degreesToRadians(r.latitude), u = n.degreesToRadians(i), d = Math.atan((1 - t.center.flattening) * Math.tan(l)), f = (1 - t.center.flattening) * Math.sin(d) + r.elevation / a * Math.sin(l), p = Math.cos(d) + r.elevation / a * Math.cos(l), m = Math.asin(t.center.meanRadius / e.METERS_PER_AU / t.delta), h = u - o, g = Math.atan2(-p * Math.sin(m) * Math.sin(h), Math.cos(c) - p * Math.sin(m) * Math.cos(h));
		return new s(n.modDegrees(n.radiansToDegrees(o + g)), n.radiansToDegrees(Math.atan2((Math.sin(c) - f * Math.sin(m)) * Math.cos(g), Math.cos(c) - p * Math.sin(m) * Math.cos(h))), null, r);
	}
	static topocentricEquatorialToTopocentricHorizontalSphericalCoordinates(e, t) {
		let r = n.degreesToRadians(e.rightAscension), i = n.degreesToRadians(e.declination), a = n.degreesToRadians(e.observerLocation.latitude), s = n.degreesToRadians(t) - r, c = Math.asin(Math.sin(a) * Math.sin(i) + Math.cos(a) * Math.cos(i) * Math.cos(s)), l = Math.atan2(Math.sin(s), Math.cos(s) * Math.sin(a) - Math.tan(i) * Math.cos(a)), u = n.radiansToDegrees(c);
		return new o(n.modDegrees(n.radiansToDegrees(l) + 180), u, null, e.observerLocation);
	}
}, l = class {
	constructor(e, t, n) {
		this.hourAngle = e, this.declination = t, this.distance = n;
	}
}, u = class i {
	static getTopocentricEquatorialSphericalCoordinates(e, t, n) {
		let r = e.center.getRectangularHeliocentricCoordinates(n), i = t.getRectangularHeliocentricCoordinates(n), o = i.minus(r, i.center), s = c.eclipticRectangularToEclipticSphericalCoordinates(o), l = c.eclipticSphericalToEquatorialSphericalCoordinates(s, e.center.getObliquity(n)), u = l.rightAscension, d = l.declination, f = l.delta, p = this.getLocalMeanSiderealTime(e, n), m = new a(u, d, f, e.center.getObliquity(n), e.center);
		return c.equatorialSphericalToTopocentricEquatorialSphericalCoordinates(m, e, p);
	}
	static getTopocentricHorizontalSphericalCoordinatesForSolarSystemObject(e, t, n) {
		let r = i.getTopocentricEquatorialSphericalCoordinates(e, t, n), a = this.getLocalMeanSiderealTime(e, n);
		return c.topocentricEquatorialToTopocentricHorizontalSphericalCoordinates(r, a);
	}
	static getRectangularObjectCentricCoordinatesForSolarSystemObject(e, t, n) {
		return t.getRectangularHeliocentricCoordinates(n).minus(e.center.getRectangularHeliocentricCoordinates(n), e.center);
	}
	static getRectangularEquatorialCoordinatesForSolarSystemObject(e, t, i) {
		let a = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(e, t, i), o = n.degreesToRadians(e.center.axialTilt);
		return new r(a.x, a.y * Math.cos(o) - a.z * Math.sin(o), a.y * Math.sin(o) + a.z * Math.cos(o));
	}
	static getDistanceToSolarSystemObject(e, t, n) {
		let r = this.getRectangularObjectCentricCoordinatesForSolarSystemObject(e, t, n);
		return Math.sqrt(r.x ** 2 + r.y ** 2 + r.z ** 2);
	}
	static getHADecCoordinatesForSolarSystemObject(e, t, r) {
		let a = this.getTopocentricEquatorialSphericalCoordinates(e, t, r);
		return new l(n.modDegrees(i.getLocalMeanSiderealTime(e, r) - a.rightAscension), a.declination, a.distance);
	}
	static getLocalMeanSiderealTime(e, t) {
		return n.modDegrees(e.center.getPrimeMeridianMeanSiderealTime(t) + e.longitude);
	}
	static getObjectTransit(e, t, n) {
		let r = this.getTopocentricEquatorialSphericalCoordinates(e, t, n).rightAscension;
		return this.getLocalMeanSiderealTime(e, n) - r;
	}
	static getObjectLowerTransit(e, t, r) {
		let i = this.getTopocentricEquatorialSphericalCoordinates(e, t, r).rightAscension, a = this.getLocalMeanSiderealTime(e, r) - i - 180;
		return n.mod180Degrees(a);
	}
	static getObjectLocalHourAngleForAltitude(e, t, r, i) {
		let a = n.degreesToRadians(e.latitude), o = n.degreesToRadians(i), s = n.degreesToRadians(this.getTopocentricEquatorialSphericalCoordinates(e, t, r).declination), c = (Math.sin(o) - Math.sin(a) * Math.sin(s)) / (Math.cos(a) * Math.cos(s));
		return n.radiansToDegrees(Math.acos(c));
	}
	static getIterationValueForPositionalEphemerisForObject(t, r, i, a) {
		if (a === e.EPHEMERIS_TYPE.TRANSIT) return i - this.getObjectTransit(t, r, i) / 15 / 24;
		if (a === e.EPHEMERIS_TYPE.LOWER_TRANSIT) return i - this.getObjectLowerTransit(t, r, i) / 15 / 24;
		{
			let e = this.getObjectTransit(t, r, i), o = this.getObjectLocalHourAngleForAltitude(t, r, i, a.ALTITUDE);
			return i - n.mod180Degrees(a.IS_GOING_UP ? e + o : e - o) / 15 / 24;
		}
	}
	static iteratePositionalEphemerisForObject(e, n, r, i) {
		let a = this.getIterationValueForPositionalEphemerisForObject(e, n, r, i), o = +a;
		for (let t = 0; t < 1e3 && !isNaN(a) && (a = this.getIterationValueForPositionalEphemerisForObject(e, n, a, i), !(Math.abs(a - o) < 1e-5)); t++) o = a;
		return t.julianDateToDate(a);
	}
	static getCorrectDateForPositionalEphemeris(e, n, r, i, a) {
		let o = this.iteratePositionalEphemerisForObject(e, n, r, i);
		if (a > 0 && o.getDate() !== t.julianDateToDate(r).getDate()) {
			let s = t.julianDate(o), c = s > r ? -1 : 1;
			return this.getCorrectDateForPositionalEphemeris(e, n, s + c, i, a - 1);
		} else if (a === 0) return null;
		else return o;
	}
	static getDateForPositionalEphemeris(t, n, r, i) {
		return this.getCorrectDateForPositionalEphemeris(t, n, r, i, e.NUMBERS_OF_ATTEMPT_TO_GET_POSITIONAL_EPHEMERIS);
	}
	static getIlluminatedFractionForObject(e, t, n) {
		let r = e.center.getRectangularHeliocentricCoordinates(n), i = t.getRectangularHeliocentricCoordinates(n), a = {
			x: -i.x,
			y: -i.y,
			z: -i.z
		}, o = {
			x: r.x - i.x,
			y: r.y - i.y,
			z: r.z - i.z
		}, s = a.x * o.x + a.y * o.y + a.z * o.z, c = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z), l = Math.sqrt(o.x * o.x + o.y * o.y + o.z * o.z);
		return (1 + Math.max(-1, Math.min(1, s / (c * l)))) / 2;
	}
}, d = class {
	constructor(e, t) {
		this.skyObjectType = e, this.name = t;
	}
}, f = {
	PLANET: "planet",
	STAR: "star",
	SATELLITE: "satellite",
	COMET: "comet",
	SUN: "sun"
}, p = class e extends d {
	constructor(e, t, n, r, i, a) {
		super(e, t), this.orbitalParameters = n, this.meanRadius = r, this.axialTilt = i, this.flattening = a;
	}
	static getRectangularHeliocentricCoordinatesFromOrbitalParameters(e, i) {
		let a = t.julianCenturiesSinceEpoch2000(i), o = n.degreesToRadians(e.getInclination(a)), s = n.degreesToRadians(e.getTrueAnomaly(a)), c = n.degreesToRadians(e.getPerihelion(a)), l = n.degreesToRadians(e.getAscendingNode(a)), u = e.getOrbitRadius(a), d = s + c - l;
		return new r(u * (Math.cos(l) * Math.cos(d) - Math.sin(l) * Math.sin(d) * Math.cos(o)), u * (Math.sin(l) * Math.cos(d) + Math.cos(l) * Math.sin(d) * Math.cos(o)), Math.sin(d) * Math.sin(o) * u, null);
	}
	getRectangularHeliocentricCoordinates(t) {
		return e.getRectangularHeliocentricCoordinatesFromOrbitalParameters(this.orbitalParameters, t);
	}
	getObliquity(e) {
		return this.axialTilt;
	}
	getPrimeMeridianMeanSiderealTime(e) {
		throw Error("Not implemented");
	}
}, m = class {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d) {
		this.a0 = e, this.e0 = t, this.i0 = n, this.o0 = r, this.w0 = i, this.l0 = a, this.ac = o, this.ec = s, this.ic = c, this.oc = l, this.wc = u, this.lc = d;
	}
	getSemiMajorAxis(e) {
		return this.a0 + this.ac * e;
	}
	getEccentricity(e) {
		return this.e0 + this.ec * e;
	}
	getInclination(e) {
		return n.modDegrees(this.i0 + this.ic / 3600 * e);
	}
	getAscendingNode(e) {
		return n.modDegrees(this.o0 + this.oc / 3600 * e);
	}
	getPerihelion(e) {
		return n.modDegrees(this.w0 + this.wc / 3600 * e);
	}
	getMeanLongitude(e) {
		return n.modDegrees(this.l0 + this.lc / 3600 * e);
	}
	getMeanAnomaly(e) {
		return n.modDegrees(this.getMeanLongitude(e) - this.getPerihelion(e));
	}
	getEccentricAnomaly(t) {
		let r = n.degreesToRadians(this.getMeanAnomaly(t)), i = this.getEccentricity(t), a = r + i * Math.sin(r) * (1 + i * Math.cos(r)), o = 0, s = 0, c = 0;
		for (; c++ < 1e4 && (o = a - (a - i * Math.sin(a) - r) / (1 - i * Math.cos(a)), s = o - a, a = o, !(Math.abs(s) <= e.EPS)););
		return n.radiansToDegrees(o);
	}
	getTrueAnomaly(e) {
		let t = this.getEccentricity(e), r = n.degreesToRadians(this.getEccentricAnomaly(e)), i = 2 * Math.atan(Math.sqrt((1 + t) / (1 - t)) * Math.tan(.5 * r));
		return n.radiansToDegrees(i);
	}
	getOrbitRadius(e) {
		let t = this.getSemiMajorAxis(e), r = this.getEccentricity(e), i = this.getTrueAnomaly(e);
		return t * (1 - r ** 2) / (1 + r * Math.cos(n.degreesToRadians(i)));
	}
}, h = class extends p {
	constructor() {
		let e = new m(.38709893, .20563069, 7.00487, 48.33167, 77.45645, 252.25084, 66e-8, 2527e-8, -23.51, -446.3, 573.57, 538101628.29);
		super(f.PLANET, "Mercury", e, 2439700, 2.04);
	}
}, g = class extends p {
	constructor() {
		let e = new m(.72333199, .00677323, 3.39471, 76.68069, 131.53298, 181.97973, 92e-8, -4938e-8, -2.86, -996.89, -108.8, 210664136.06);
		super(f.PLANET, "Venus", e, 6051800, 2.64);
	}
}, _ = class extends p {
	constructor() {
		let e = new m(1.00000011, .01671022, 5e-5, -11.26064, 102.94719, 100.46435, -5e-8, -3804e-8, -46.94, -18228.25, 1198.28, 129597740.63);
		super(f.PLANET, "Earth", e, 6378137, 23.439281, 1 / 298.257223563);
	}
	getObliquity(e) {
		let n = t.julianCenturiesSinceEpoch2000(e);
		return 23.43929111 - 46.815 * n / 3600 - 6e-4 * n * n / 3600 + .001813 * n * n * n / 3600;
	}
	getPrimeMeridianMeanSiderealTime(e) {
		let r = t.julianDaysSinceEpoch2000(e), i = t.julianCenturiesSinceEpoch2000(e), a = 280.46061837 + 360.98564736629 * r + 387933e-9 * i * i - i * i * i / 3871e4;
		return n.modDegrees(a);
	}
}, v = class extends p {
	constructor() {
		let e = new m(1.52366231, .09341233, 1.85061, 49.57854, 336.04084, 355.45332, -7221e-8, 11902e-8, -25.47, -1020.19, 1560.78, 68905103.78);
		super(f.PLANET, "Mars", e, 3389500, 25.19);
	}
}, y = class extends p {
	constructor() {
		let e = new m(5.20336301, .04839266, 1.3053, 100.55615, 14.75385, 34.40438, 60737e-8, -1288e-7, -4.15, 1217.17, 839.93, 10925078.35);
		super(f.PLANET, "Jupiter", e, 69911e3, 3.13);
	}
}, b = class extends p {
	constructor() {
		let e = new m(9.53707032, .0541506, 2.48446, 113.71504, 92.43194, 49.94432, -.0030153, -36762e-8, 6.11, -1591.05, -1948.89, 4401052.95);
		super(f.PLANET, "Saturn", e, 58232e3, 26.73);
	}
}, ee = class extends p {
	constructor() {
		let e = new m(19.19126393, .04716771, .76986, 74.22988, 170.96424, 313.23218, .00152025, -1915e-7, -2.09, -1681.4, 1312.56, 1542547.79);
		super(f.PLANET, "Uranus", e, 25362e3, 97.77);
	}
}, x = class extends p {
	constructor() {
		let e = new m(30.06896348, .00858587, 1.76917, 131.72169, 44.97135, 304.88003, -.00125196, 251e-7, -3.64, -151.25, -844.43, 786449.21);
		super(f.PLANET, "Neptune", e, 24622e3, 28.32);
	}
}, S = [
	new h(),
	new g(),
	new _(),
	new v(),
	new y(),
	new b(),
	new ee(),
	new x()
], te = [new class extends p {
	constructor() {
		let e = new m(39.48168677, .24880766, 17.14175, 110.30347, 113.76329, 238.92881, -2.07e-8, 6465e-8, 501e-8, -37.033, 7.765, 145.2078);
		super(f.PLANET, "Pluto", e, 1188300, 122.53);
	}
}()], ne = [new class extends p {
	constructor() {
		super(f.SATELLITE, "Moon", null, 1737400, 1.5424);
	}
	getRectangularHeliocentricCoordinates(e) {
		let n = t.julianCenturiesSinceEpoch2000(e), i = n * n, a = i * n, o = a * n, s = 218.3164477 + 481267.88123421 * n - .0015786 * i + a / 538841 - o / 65194e3, c = 297.8501921 + 445267.1114034 * n - .0018819 * i + a / 545868 - o / 113065e3, l = 357.5291092 + 35999.0502909 * n - 1536e-7 * i + a / 2449e4, u = 134.9633964 + 477198.8675055 * n + .0087414 * i + a / 69699 - o / 14712e3, d = 93.272095 + 483202.0175233 * n - .0036539 * i - a / 3526e3 + o / 86331e4, f = 119.75 + 131.849 * n, p = 53.09 + 479264.29 * n, m = 313.45 + 481266.484 * n, h = 1 - .002516 * n - 74e-7 * i, g = (e) => e * Math.PI / 180, v = [
			[
				0,
				0,
				1,
				0,
				6288774,
				-20905355
			],
			[
				2,
				0,
				-1,
				0,
				1274027,
				-3699111
			],
			[
				2,
				0,
				0,
				0,
				658314,
				-2955968
			],
			[
				0,
				0,
				2,
				0,
				213618,
				-569925
			],
			[
				0,
				1,
				0,
				0,
				-185116,
				48888
			],
			[
				0,
				0,
				0,
				2,
				-114332,
				-3149
			],
			[
				2,
				0,
				-2,
				0,
				58793,
				246158
			],
			[
				2,
				-1,
				-1,
				0,
				57066,
				-152138
			],
			[
				2,
				0,
				1,
				0,
				53322,
				-170733
			],
			[
				2,
				-1,
				0,
				0,
				45758,
				-204596
			],
			[
				0,
				1,
				-1,
				0,
				-40923,
				-129620
			],
			[
				1,
				0,
				0,
				0,
				-34720,
				108743
			],
			[
				0,
				1,
				1,
				0,
				-30383,
				104755
			],
			[
				2,
				0,
				0,
				-2,
				15327,
				10321
			],
			[
				0,
				0,
				1,
				2,
				-12528,
				0
			],
			[
				0,
				0,
				1,
				-2,
				10980,
				79661
			],
			[
				4,
				0,
				-1,
				0,
				10675,
				-34782
			],
			[
				0,
				0,
				3,
				0,
				10034,
				-23210
			],
			[
				4,
				0,
				-2,
				0,
				8548,
				-21636
			],
			[
				2,
				1,
				-1,
				0,
				-7888,
				24208
			],
			[
				2,
				1,
				0,
				0,
				-6766,
				30824
			],
			[
				1,
				0,
				-1,
				0,
				-5163,
				-8379
			],
			[
				1,
				1,
				0,
				0,
				4987,
				-16675
			],
			[
				2,
				-1,
				1,
				0,
				4036,
				-12831
			],
			[
				2,
				0,
				2,
				0,
				3994,
				-10445
			],
			[
				4,
				0,
				0,
				0,
				3861,
				-11650
			],
			[
				2,
				0,
				-3,
				0,
				3665,
				14403
			],
			[
				0,
				1,
				-2,
				0,
				-2689,
				-7003
			],
			[
				2,
				0,
				-1,
				2,
				-2602,
				0
			],
			[
				2,
				-1,
				-2,
				0,
				2390,
				10056
			],
			[
				1,
				0,
				1,
				0,
				-2348,
				6322
			],
			[
				2,
				-2,
				0,
				0,
				2236,
				-9884
			],
			[
				0,
				1,
				2,
				0,
				-2120,
				5751
			],
			[
				0,
				2,
				0,
				0,
				-2069,
				0
			],
			[
				2,
				-2,
				-1,
				0,
				2048,
				-4950
			],
			[
				2,
				0,
				1,
				-2,
				-1773,
				4130
			],
			[
				2,
				0,
				0,
				2,
				-1595,
				0
			],
			[
				4,
				-1,
				-1,
				0,
				1215,
				-3958
			],
			[
				0,
				0,
				2,
				2,
				-1110,
				0
			],
			[
				3,
				0,
				-1,
				0,
				-892,
				3258
			],
			[
				2,
				1,
				1,
				0,
				-810,
				2616
			],
			[
				4,
				-1,
				-2,
				0,
				759,
				-1897
			],
			[
				0,
				2,
				-1,
				0,
				-713,
				-2117
			],
			[
				2,
				2,
				-1,
				0,
				-700,
				2354
			],
			[
				2,
				1,
				-2,
				0,
				691,
				0
			],
			[
				2,
				-1,
				0,
				-2,
				596,
				0
			],
			[
				4,
				0,
				1,
				0,
				549,
				-1423
			],
			[
				0,
				0,
				4,
				0,
				537,
				-1117
			],
			[
				4,
				-1,
				0,
				0,
				520,
				-1571
			],
			[
				1,
				0,
				-2,
				0,
				-487,
				-1739
			],
			[
				2,
				1,
				0,
				-2,
				-399,
				0
			],
			[
				0,
				0,
				2,
				-2,
				-381,
				-4421
			],
			[
				1,
				1,
				1,
				0,
				351,
				0
			],
			[
				3,
				0,
				-2,
				0,
				-340,
				0
			],
			[
				4,
				0,
				-3,
				0,
				330,
				0
			],
			[
				2,
				-1,
				2,
				0,
				327,
				0
			],
			[
				0,
				2,
				1,
				0,
				-323,
				1165
			],
			[
				1,
				1,
				-1,
				0,
				299,
				0
			],
			[
				2,
				0,
				3,
				0,
				294,
				0
			],
			[
				2,
				0,
				-1,
				-2,
				0,
				8752
			]
		], y = [
			[
				0,
				0,
				0,
				1,
				5128122
			],
			[
				0,
				0,
				1,
				1,
				280602
			],
			[
				0,
				0,
				1,
				-1,
				277693
			],
			[
				2,
				0,
				0,
				-1,
				173237
			],
			[
				2,
				0,
				-1,
				1,
				55413
			],
			[
				2,
				0,
				-1,
				-1,
				46271
			],
			[
				2,
				0,
				0,
				1,
				32573
			],
			[
				0,
				0,
				2,
				1,
				17198
			],
			[
				2,
				0,
				1,
				-1,
				9266
			],
			[
				0,
				0,
				2,
				-1,
				8822
			],
			[
				2,
				-1,
				0,
				-1,
				8216
			],
			[
				2,
				0,
				-2,
				-1,
				4324
			],
			[
				2,
				0,
				1,
				1,
				4200
			],
			[
				2,
				1,
				0,
				-1,
				-3359
			],
			[
				2,
				-1,
				-1,
				1,
				2463
			],
			[
				2,
				-1,
				0,
				1,
				2211
			],
			[
				2,
				-1,
				-1,
				-1,
				2065
			],
			[
				0,
				1,
				-1,
				-1,
				-1870
			],
			[
				4,
				0,
				-1,
				-1,
				1828
			],
			[
				0,
				1,
				0,
				1,
				-1794
			],
			[
				0,
				0,
				0,
				3,
				-1749
			],
			[
				0,
				1,
				-1,
				1,
				-1565
			],
			[
				1,
				0,
				0,
				1,
				-1491
			],
			[
				0,
				1,
				1,
				1,
				-1475
			],
			[
				0,
				1,
				1,
				-1,
				-1410
			],
			[
				0,
				1,
				0,
				-1,
				-1344
			],
			[
				1,
				0,
				0,
				-1,
				-1335
			],
			[
				0,
				0,
				3,
				1,
				1107
			],
			[
				4,
				0,
				0,
				-1,
				1021
			],
			[
				4,
				0,
				-1,
				1,
				833
			],
			[
				0,
				0,
				1,
				-3,
				777
			],
			[
				4,
				0,
				-2,
				1,
				671
			],
			[
				2,
				0,
				0,
				-3,
				607
			],
			[
				2,
				0,
				2,
				-1,
				596
			],
			[
				2,
				-1,
				1,
				-1,
				491
			],
			[
				2,
				0,
				-2,
				1,
				-451
			],
			[
				0,
				0,
				3,
				-1,
				439
			],
			[
				2,
				0,
				2,
				1,
				422
			],
			[
				2,
				0,
				-3,
				-1,
				421
			],
			[
				2,
				1,
				-1,
				1,
				-366
			],
			[
				2,
				1,
				0,
				1,
				-351
			],
			[
				4,
				0,
				0,
				1,
				331
			],
			[
				2,
				-1,
				1,
				1,
				315
			],
			[
				2,
				-2,
				0,
				-1,
				302
			],
			[
				0,
				0,
				1,
				3,
				-283
			],
			[
				2,
				1,
				1,
				-1,
				-229
			],
			[
				1,
				1,
				0,
				-1,
				223
			],
			[
				1,
				1,
				0,
				1,
				223
			],
			[
				0,
				1,
				-2,
				-1,
				-220
			],
			[
				2,
				1,
				-1,
				-1,
				-220
			],
			[
				1,
				0,
				1,
				1,
				-185
			],
			[
				2,
				-1,
				-2,
				-1,
				181
			],
			[
				0,
				1,
				2,
				1,
				-177
			],
			[
				4,
				0,
				-2,
				-1,
				176
			],
			[
				4,
				-1,
				-1,
				-1,
				166
			],
			[
				1,
				0,
				1,
				-1,
				-164
			],
			[
				4,
				0,
				1,
				-1,
				132
			],
			[
				1,
				0,
				-1,
				-1,
				-119
			],
			[
				4,
				-1,
				0,
				-1,
				115
			],
			[
				2,
				-2,
				0,
				1,
				107
			]
		], b = 0;
		for (let [e, t, n, r, i, a] of v) {
			let a = e * g(c) + t * g(l) + n * g(u) + r * g(d);
			b += i * h ** +Math.abs(t) * Math.sin(a);
		}
		let ee = 0;
		for (let [e, t, n, r, i, a] of v) {
			let i = e * g(c) + t * g(l) + n * g(u) + r * g(d);
			ee += a * h ** +Math.abs(t) * Math.cos(i);
		}
		let x = 0;
		for (let [e, t, n, r, i] of y) {
			let a = e * g(c) + t * g(l) + n * g(u) + r * g(d);
			x += i * h ** +Math.abs(t) * Math.sin(a);
		}
		b = b + 3958 * Math.sin(g(f)) + 1962 * Math.sin(g(s - d)) + 318 * Math.sin(g(p)), x = x - 2235 * Math.sin(g(s)) + 382 * Math.sin(g(m)) + 175 * Math.sin(g(f - d)) + 175 * Math.sin(g(f + d)) + 127 * Math.sin(g(s - u)) - 115 * Math.sin(g(s + u));
		let S = s + b / 1e6, te = x / 1e6, ne = 385000.56 + ee / 1e3, re = g(S), C = g(te), ie = ne / 149597870.7, w = {
			x: ie * Math.cos(C) * Math.cos(re),
			y: ie * Math.cos(C) * Math.sin(re),
			z: ie * Math.sin(C)
		}, ae = new _().getRectangularHeliocentricCoordinates(e);
		return new r(ae.x + w.x, ae.y + w.y, ae.z + w.z);
	}
}()], re = [new class extends p {
	constructor() {
		super(f.SUN, "Sun", null, 695508e3, 0);
	}
	getRectangularHeliocentricCoordinates(e) {
		return new r(0, 0, 0, this);
	}
}()].concat(S, ne, te), C = class {
	constructor(e, t, n, r) {
		this.longitude = e, this.latitude = t, this.elevation = n, this.center = r;
	}
}, ie = class n {
	constructor() {
		this.skyObjects = [...re], this.observerLocation = null, this.julianDate = null, this.simulationDate = null;
	}
	static initialize(e, t) {
		let r = new n();
		return r.setLocation("Earth", e, t, 0), r.setDate(/* @__PURE__ */ new Date()), r;
	}
	getJulianDate() {
		return this.julianDate;
	}
	setJulianDate(e) {
		this.julianDate = e;
	}
	getDate() {
		return this.simulationDate;
	}
	setDate(e) {
		this.simulationDate = e, this.setJulianDate(t.julianDate(e));
	}
	getSkyObjectByName(e) {
		return this.skyObjects.find((t) => t.name === e) || null;
	}
	getEphemerisTypeByName(t) {
		return Object.values(e.EPHEMERIS_TYPE).find((e) => e.NAME === t) || null;
	}
	setLocation(e, t, n, r) {
		let i = this.getSkyObjectByName(e);
		if (!i) throw Error(`Solar system object "${e}" not found`);
		this.observerLocation = new C(n, t, r, i);
	}
	getRightAscensionDeclinationCoordinatesForObject(e, n) {
		let r = this.getSkyObjectByName(e);
		if (!r || this.julianDate === null) throw Error("Invalid object name or Julian date not set");
		let i = n ? t.julianDate(n) : this.julianDate;
		return u.getTopocentricEquatorialSphericalCoordinates(this.observerLocation, r, i);
	}
	getHourAngleDeclinationCoordinatesForObject(e, n) {
		let r = this.getSkyObjectByName(e);
		if (!r || this.julianDate === null) throw Error("Invalid object name or Julian date not set");
		let i = n ? t.julianDate(n) : this.julianDate;
		return u.getHADecCoordinatesForSolarSystemObject(this.observerLocation, r, i);
	}
	getAltitudeAzimuthCoordinatesForObject(e, n) {
		let r = this.getSkyObjectByName(e);
		if (!r) throw Error(`Object "${e}" not found`);
		let i = n ? t.julianDate(n) : this.julianDate;
		return u.getTopocentricHorizontalSphericalCoordinatesForSolarSystemObject(this.observerLocation, r, i);
	}
	getIlluminatedFractionForObject(e, n) {
		let r = this.getSkyObjectByName(e);
		if (!r) throw Error(`Object "${e}" not found`);
		let i = n ? t.julianDate(n) : this.julianDate;
		return u.getIlluminatedFractionForObject(this.observerLocation, r, i);
	}
	getLocalMeanSiderealTime() {
		if (this.julianDate === null) throw Error("Julian date not set");
		return u.getLocalMeanSiderealTime(this.observerLocation, this.julianDate);
	}
	getEphemerisDateForObject(e, n, r) {
		let i = this.getSkyObjectByName(e), a = this.getEphemerisTypeByName(r);
		if (!i || !a) throw Error("Invalid object name or ephemeris type");
		return u.getDateForPositionalEphemeris(this.observerLocation, i, t.julianDate(n), a);
	}
	getObserverLocation() {
		return this.observerLocation;
	}
	getLatitudeLongitudeCoordinates() {
		return this.observerLocation ? {
			latitude: this.observerLocation.latitude,
			longitude: this.observerLocation.longitude
		} : null;
	}
};
//#endregion
//#region lib/svg.js
function w(e, t) {
	return `<svg viewBox="0 0 1000 1000" width="${e}" height="${e}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function ae(e, t) {
	return `<svg viewBox="0 0 2000 1000" width="${e}" height="${e / 2}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${t}" />`;
}
function T() {
	return "</svg>";
}
//#endregion
//#region lib/draw-celestial-body.js
function E(e, t) {
	let n = "", r = "";
	return e === "Sun" ? r += oe(t) : e === "Moon" ? r += he(t) : e === "Mercury" ? r += se(t) : e === "Venus" ? r += ce(t) : e === "Mars" ? r += le(t) : e === "Jupiter" ? r += ue(t) : e === "Saturn" ? r += de(t) : e === "Uranus" ? r += fe(t) : e === "Neptune" ? r += pe(t) : e === "Pluto" && (r += me(t)), n += r, t.drawNotVisibleSymbol && (n += "\n    <defs>\n      <clipPath id=\"phase-shadow-disk\">\n        <circle cx=\"500\" cy=\"278\" r=\"139\" />\n      </clipPath>\n    </defs>\n\n    <g clip-path=\"url(#phase-shadow-disk)\">\n      <polygon points=\"0,0 1000,0 0,556\" fill=\"#24304f\" opacity=\"1\" />\n      <line x1=\"0\" y1=\"556\" x2=\"1000\" y2=\"0\" stroke=\"black\" stroke-width=\"12\" opacity=\"0.9\" />\n    </g>\n\n    <g transform=\"translate(380 180)\">\n      <circle cx=\"0\" cy=\"0\" r=\"74\" fill=\"#d8d8d8\" opacity=\"0.95\" />\n      <circle cx=\"0\" cy=\"0\" r=\"61\" fill=\"#242424\" opacity=\"0.9\" />\n    \n      <path d=\"M -38 0 C -19 -22, 19 -22, 38 0 C 19 22, -19 22, -38 0 Z\" fill=\"none\" stroke=\"#d8d8d8\" stroke-width=\"9\" />\n      <line x1=\"-35\" y1=\"35\" x2=\"35\" y2=\"-35\" stroke=\"#d8d8d8\" stroke-width=\"11\" stroke-linecap=\"round\" />\n    </g>\n  "), n;
}
function oe() {
	return "\n    <!-- Simple cartoon sun rays -->\n    <g stroke=\"#e69500\" stroke-width=\"18\" stroke-linecap=\"round\">\n      <line x1=\"500\" y1=\"139\" x2=\"500\" y2=\"92\" />\n      <line x1=\"500\" y1=\"417\" x2=\"500\" y2=\"464\" />\n      <line x1=\"361\" y1=\"278\" x2=\"314\" y2=\"278\" />\n      <line x1=\"639\" y1=\"278\" x2=\"686\" y2=\"278\" />\n\n      <line x1=\"402\" y1=\"180\" x2=\"369\" y2=\"147\" />\n      <line x1=\"598\" y1=\"180\" x2=\"631\" y2=\"147\" />\n      <line x1=\"402\" y1=\"376\" x2=\"369\" y2=\"409\" />\n      <line x1=\"598\" y1=\"376\" x2=\"631\" y2=\"409\" />\n    </g>\n\n    <!-- Sun base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#f4a300\" />\n  ";
}
function se() {
	return "\n    <!-- Mercury base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#b0a59f\" />\n\n    <!-- Slightly darker polar / edge shading -->\n    <ellipse cx=\"500\" cy=\"160\" rx=\"62\" ry=\"22\" fill=\"#8d827c\" opacity=\"0.32\" />\n    <ellipse cx=\"500\" cy=\"398\" rx=\"68\" ry=\"24\" fill=\"#766b66\" opacity=\"0.28\" />\n\n    <!-- Main cartoon craters -->\n    <circle cx=\"455\" cy=\"235\" r=\"18\" fill=\"#72655f\" opacity=\"0.72\" />\n    <circle cx=\"455\" cy=\"235\" r=\"9\" fill=\"#9a8f89\" opacity=\"0.45\" />\n\n    <circle cx=\"535\" cy=\"255\" r=\"14\" fill=\"#5e524e\" opacity=\"0.7\" />\n    <circle cx=\"535\" cy=\"255\" r=\"6\" fill=\"#9a8f89\" opacity=\"0.4\" />\n\n    <circle cx=\"485\" cy=\"320\" r=\"16\" fill=\"#6a5c58\" opacity=\"0.68\" />\n    <circle cx=\"485\" cy=\"320\" r=\"7\" fill=\"#9a8f89\" opacity=\"0.38\" />\n\n    <circle cx=\"565\" cy=\"335\" r=\"11\" fill=\"#645954\" opacity=\"0.68\" />\n    <circle cx=\"420\" cy=\"300\" r=\"10\" fill=\"#4f4541\" opacity=\"0.55\" />\n\n    <!-- Small surface spots -->\n    <circle cx=\"515\" cy=\"210\" r=\"7\" fill=\"#6c615c\" opacity=\"0.55\" />\n    <circle cx=\"590\" cy=\"275\" r=\"8\" fill=\"#5e524e\" opacity=\"0.5\" />\n    <circle cx=\"445\" cy=\"365\" r=\"7\" fill=\"#72655f\" opacity=\"0.48\" />\n  ";
}
function ce() {
	return "\n    <!-- Venus base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#e5c07b\" />\n\n    <!-- Simple cartoon cloud bands -->\n    <ellipse cx=\"500\" cy=\"225\" rx=\"118\" ry=\"18\" fill=\"#f2d796\" opacity=\"0.7\" />\n    <ellipse cx=\"500\" cy=\"265\" rx=\"139\" ry=\"20\" fill=\"#d4a85f\" opacity=\"0.45\" />\n    <ellipse cx=\"500\" cy=\"305\" rx=\"130\" ry=\"18\" fill=\"#f0c982\" opacity=\"0.55\" />\n    <ellipse cx=\"500\" cy=\"342\" rx=\"96\" ry=\"14\" fill=\"#b98545\" opacity=\"0.35\" />\n\n    <!-- Soft cartoon swirl features -->\n    <circle cx=\"455\" cy=\"250\" r=\"18\" fill=\"#b88e3b\" opacity=\"0.32\" />\n    <circle cx=\"545\" cy=\"315\" r=\"16\" fill=\"#c9954e\" opacity=\"0.3\" />\n\n    <!-- Polar glow -->\n    <ellipse cx=\"500\" cy=\"160\" rx=\"58\" ry=\"20\" fill=\"white\" opacity=\"0.32\" />\n    <ellipse cx=\"500\" cy=\"398\" rx=\"58\" ry=\"18\" fill=\"#b98545\" opacity=\"0.18\" />\n  ";
}
function le() {
	return "\n    <!-- Mars base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#d2691e\" />\n\n    <!-- Slightly darker polar / edge shading -->\n    <ellipse cx=\"500\" cy=\"395\" rx=\"72\" ry=\"24\" fill=\"#8f3f1f\" opacity=\"0.28\" />\n    <ellipse cx=\"500\" cy=\"160\" rx=\"58\" ry=\"20\" fill=\"#e48a45\" opacity=\"0.28\" />\n\n    <!-- Ice cap -->\n    <ellipse cx=\"500\" cy=\"167\" rx=\"42\" ry=\"21\" fill=\"white\" opacity=\"0.9\" />\n\n    <!-- Main cartoon surface patches -->\n    <circle cx=\"458\" cy=\"236\" r=\"22\" fill=\"#a0522d\" opacity=\"0.85\" />\n    <circle cx=\"542\" cy=\"319\" r=\"18\" fill=\"#a0522d\" opacity=\"0.85\" />\n\n    <!-- Smaller warm terrain details -->\n    <circle cx=\"514\" cy=\"250\" r=\"14\" fill=\"#cd853f\" opacity=\"0.75\" />\n    <circle cx=\"472\" cy=\"306\" r=\"11\" fill=\"#cd853f\" opacity=\"0.75\" />\n    <circle cx=\"590\" cy=\"275\" r=\"10\" fill=\"#8f3f1f\" opacity=\"0.5\" />\n    <circle cx=\"420\" cy=\"330\" r=\"9\" fill=\"#b75a2a\" opacity=\"0.55\" />\n\n    <!-- Soft highlight spots -->\n    <circle cx=\"440\" cy=\"205\" r=\"8\" fill=\"#e99655\" opacity=\"0.45\" />\n    <circle cx=\"535\" cy=\"365\" r=\"7\" fill=\"#e99655\" opacity=\"0.35\" />\n  ";
}
function ue() {
	return "\n    <!-- Jupiter base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#d2b48c\" />\n\n    <!-- Two simple cartoon cloud bands -->\n    <ellipse cx=\"500\" cy=\"252\" rx=\"139\" ry=\"17\" fill=\"#c89b76\" opacity=\"0.8\" />\n    <ellipse cx=\"500\" cy=\"305\" rx=\"139\" ry=\"18\" fill=\"#ba8c6e\" opacity=\"0.75\" />\n\n    <!-- Small soft cloud details -->\n    <ellipse cx=\"440\" cy=\"235\" rx=\"28\" ry=\"8\" fill=\"#ead2aa\" opacity=\"0.55\" />\n    <ellipse cx=\"535\" cy=\"270\" rx=\"34\" ry=\"9\" fill=\"#e6c79b\" opacity=\"0.45\" />\n    <ellipse cx=\"455\" cy=\"325\" rx=\"32\" ry=\"9\" fill=\"#a97658\" opacity=\"0.32\" />\n\n    <!-- Slightly darker poles -->\n    <ellipse cx=\"500\" cy=\"166\" rx=\"66\" ry=\"24\" fill=\"#a97658\" opacity=\"0.35\" />\n    <ellipse cx=\"500\" cy=\"390\" rx=\"70\" ry=\"24\" fill=\"#a97658\" opacity=\"0.28\" />\n\n    <!-- Great Red Spot -->\n    <ellipse cx=\"570\" cy=\"305\" rx=\"24\" ry=\"14\" fill=\"#cc543a\" />\n    <ellipse cx=\"570\" cy=\"305\" rx=\"12\" ry=\"7\" fill=\"#e27a55\" opacity=\"0.65\" />\n  ";
}
function de() {
	return "\n    <!-- Rings behind Saturn -->\n    <g transform=\"rotate(-25 500 278)\">\n      <ellipse cx=\"500\" cy=\"278\" rx=\"250\" ry=\"58\" fill=\"none\" stroke=\"#d9c28a\" stroke-width=\"22\" opacity=\"0.75\" />\n      <ellipse cx=\"500\" cy=\"278\" rx=\"215\" ry=\"48\" fill=\"none\" stroke=\"#f1dfaa\" stroke-width=\"12\" opacity=\"0.9\" />\n      <ellipse cx=\"500\" cy=\"278\" rx=\"175\" ry=\"38\" fill=\"none\" stroke=\"#8f7446\" stroke-width=\"7\" opacity=\"0.45\" />\n    </g>\n\n    <!-- Saturn base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#d8c48f\" />\n\n    <!-- Simple cartoon atmospheric bands -->\n    <ellipse cx=\"500\" cy=\"230\" rx=\"130\" ry=\"17\" fill=\"#ead8a6\" opacity=\"0.65\" />\n    <ellipse cx=\"500\" cy=\"268\" rx=\"139\" ry=\"16\" fill=\"#bfa369\" opacity=\"0.6\" />\n    <ellipse cx=\"500\" cy=\"305\" rx=\"137\" ry=\"18\" fill=\"#e6d09a\" opacity=\"0.55\" />\n    <ellipse cx=\"500\" cy=\"340\" rx=\"110\" ry=\"13\" fill=\"#ad8f58\" opacity=\"0.45\" />\n\n    <!-- Soft polar highlights -->\n    <ellipse cx=\"500\" cy=\"160\" rx=\"62\" ry=\"20\" fill=\"white\" opacity=\"0.22\" />\n    <ellipse cx=\"500\" cy=\"398\" rx=\"60\" ry=\"18\" fill=\"#8f7446\" opacity=\"0.16\" />\n\n    <!-- Rings front, kept simple and bold like the other cartoon planets -->\n    <g transform=\"rotate(-25 500 278)\">\n      <path d=\"M 250 278 A 250 58 0 0 0 750 278\" fill=\"none\" stroke=\"#ead39b\" stroke-width=\"18\" opacity=\"0.95\" />\n      <path d=\"M 285 278 A 215 48 0 0 0 715 278\" fill=\"none\" stroke=\"#fff0bd\" stroke-width=\"9\" opacity=\"0.9\" />\n      <path d=\"M 325 278 A 175 38 0 0 0 675 278\" fill=\"none\" stroke=\"#8f7446\" stroke-width=\"6\" opacity=\"0.45\" />\n    </g>\n  ";
}
function fe() {
	return "\n    <!-- Uranus base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#7fdbff\" />\n\n    <!-- Slightly darker polar / edge shading -->\n    <ellipse cx=\"500\" cy=\"160\" rx=\"66\" ry=\"22\" fill=\"#54a3b9\" opacity=\"0.22\" />\n    <ellipse cx=\"500\" cy=\"398\" rx=\"72\" ry=\"24\" fill=\"#3f91aa\" opacity=\"0.2\" />\n\n    <!-- Simple cartoon atmospheric bands -->\n    <ellipse cx=\"500\" cy=\"248\" rx=\"132\" ry=\"14\" fill=\"#6ec8e9\" opacity=\"0.42\" />\n    <ellipse cx=\"500\" cy=\"292\" rx=\"139\" ry=\"15\" fill=\"#62b4d8\" opacity=\"0.36\" />\n\n    <!-- Soft cloud details -->\n    <ellipse cx=\"455\" cy=\"225\" rx=\"30\" ry=\"9\" fill=\"#a7efff\" opacity=\"0.38\" />\n    <ellipse cx=\"550\" cy=\"318\" rx=\"36\" ry=\"10\" fill=\"#54a3b9\" opacity=\"0.28\" />\n    <circle cx=\"430\" cy=\"305\" r=\"14\" fill=\"#6dc3e3\" opacity=\"0.35\" />\n\n    <!-- Gentle highlight -->\n    <ellipse cx=\"455\" cy=\"205\" rx=\"36\" ry=\"18\" fill=\"white\" opacity=\"0.18\" />\n  ";
}
function pe() {
	return "\n    <!-- Neptune base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#3b5ca8\" />\n\n    <!-- Slightly darker polar / edge shading -->\n    <ellipse cx=\"500\" cy=\"160\" rx=\"66\" ry=\"22\" fill=\"#223b78\" opacity=\"0.28\" />\n    <ellipse cx=\"500\" cy=\"398\" rx=\"72\" ry=\"24\" fill=\"#1f3266\" opacity=\"0.24\" />\n\n    <!-- Simple cartoon atmospheric bands -->\n    <ellipse cx=\"500\" cy=\"250\" rx=\"136\" ry=\"14\" fill=\"#4a71d2\" opacity=\"0.45\" />\n    <ellipse cx=\"500\" cy=\"296\" rx=\"139\" ry=\"15\" fill=\"#2f4b7f\" opacity=\"0.42\" />\n\n    <!-- Soft storm / cloud details -->\n    <ellipse cx=\"545\" cy=\"235\" rx=\"34\" ry=\"10\" fill=\"#6f93e8\" opacity=\"0.35\" />\n    <ellipse cx=\"590\" cy=\"330\" rx=\"28\" ry=\"8\" fill=\"#4a71d2\" opacity=\"0.32\" />\n\n    <!-- Gentle highlight -->\n    <ellipse cx=\"455\" cy=\"205\" rx=\"34\" ry=\"17\" fill=\"white\" opacity=\"0.12\" />\n  ";
}
function me() {
	return "\n    <!-- Pluto base -->\n    <circle cx=\"500\" cy=\"278\" r=\"139\" fill=\"#c8a178\" />\n\n    <!-- Slightly darker polar / edge shading -->\n    <ellipse cx=\"500\" cy=\"160\" rx=\"64\" ry=\"22\" fill=\"#a87955\" opacity=\"0.28\" />\n    <ellipse cx=\"500\" cy=\"398\" rx=\"72\" ry=\"24\" fill=\"#8f6648\" opacity=\"0.24\" />\n\n    <!-- Soft icy heart region, shifted slightly right -->\n    <path\n      d=\"\n        M 520 302\n        C 520 258, 465 255, 465 300\n        C 465 342, 512 360, 520 386\n        C 528 360, 575 342, 575 300\n        C 575 255, 520 258, 520 302\n        Z\n      \"\n      fill=\"#e9e6e1\"\n      opacity=\"0.88\"\n    />\n\n    <!-- Cartoon surface patches -->\n    <circle cx=\"445\" cy=\"260\" r=\"22\" fill=\"#a87552\" opacity=\"0.62\" />\n    <circle cx=\"555\" cy=\"245\" r=\"17\" fill=\"#d1b08a\" opacity=\"0.58\" />\n    <circle cx=\"430\" cy=\"335\" r=\"13\" fill=\"#8f6648\" opacity=\"0.38\" />\n\n    <!-- Small icy highlights -->\n    <circle cx=\"470\" cy=\"210\" r=\"8\" fill=\"#e9e6e1\" opacity=\"0.45\" />\n    <circle cx=\"535\" cy=\"370\" r=\"7\" fill=\"#e9e6e1\" opacity=\"0.35\" />\n  ";
}
function he(e) {
	let t = Math.max(0, Math.min(1, e.illuminatedFraction)), n = (e, t) => `
    <g fill="${e}" opacity="${t}" clip-path="url(#moon-clip)">
      
    <!-- Oceanus Procellarum (Ocean of Storms) - Large, West -->
    <ellipse cx="420" cy="270" rx="45" ry="70" transform="rotate(-10 420 270)" />
    <!-- Mare Imbrium (Sea of Rains) - NW -->
    <circle cx="455" cy="215" r="35" />
    <!-- Mare Serenitatis (Sea of Serenity) - N/NW -->
    <circle cx="510" cy="210" r="28" />
    <!-- Mare Tranquillitatis (Sea of Tranquility) - Central-East -->
    <circle cx="560" cy="275" r="30" />
    <!-- Mare Crisium (Sea of Crises) - NE, isolated -->
    <ellipse cx="605" cy="235" rx="18" ry="14" />
    <!-- Mare Fecunditatis (Sea of Fertility) - SE -->
    <circle cx="595" cy="315" r="28" />
    <!-- Mare Nectaris (Sea of Nectar) - S of Tranquility -->
    <circle cx="560" cy="320" r="17" />
    <!-- Mare Nubium (Sea of Clouds) - SW -->
    <circle cx="465" cy="345" r="25" />
  
    </g>
  `;
	if (t === 0) return `
      <defs>
        <clipPath id="moon-clip">
          <circle cx="500" cy="278" r="139" />
        </clipPath>
      </defs>
      <!-- Moon base -->
      <circle cx="500" cy="278" r="139" fill="#5f6368" />
      ${n("#000", "1")}
    `;
	if (t === 1) return `
      <defs>
        <clipPath id="moon-clip">
          <circle cx="500" cy="278" r="139" />
        </clipPath>
      </defs>
      <!-- Moon base -->
      <circle cx="500" cy="278" r="139" fill="#d9d7d1" />
      <g style="mix-blend-mode: multiply;">
        ${n("#000", "1")}
      </g>
    `;
	let r = Math.max(.001, Math.abs(2 * t - 1) * 139), i = e.isWaxing, a = +!!i, o = t < .5 && i || t >= .5 && !i ? 0 : 1;
	return `
    <defs>
      <clipPath id="moon-clip">
        <circle cx="500" cy="278" r="139" />
      </clipPath>
      <clipPath id="moon-lit-area">
        <path
          d="
            M 500 139
            A 139 139 0 0 ${a} 500 417
            A ${r} 139 0 0 ${o} 500 139
            Z
          "
        />
      </clipPath>
    </defs>

    <!-- Moon shadow -->
    <circle cx="500" cy="278" r="139" fill="#5f6368" />

    <!-- Illuminated portion -->
    <path
      d="
        M 500 139
        A 139 139 0 0 ${a} 500 417
        A ${r} 139 0 0 ${o} 500 139
        Z
      "
      fill="#d9d7d1"
      clip-path="url(#moon-clip)"
    />

    <!-- Surface detail on illuminated portion -->
    <g clip-path="url(#moon-lit-area)">
      <g style="mix-blend-mode: multiply;">
        ${n("#7a756b", "0.7")}
      </g>
    </g>
  `;
}
//#endregion
//#region lib/utils/labels.js
function ge(e) {
	let t = [
		"N",
		"NE",
		"E",
		"SE",
		"S",
		"SW",
		"W",
		"NW"
	], n = (e % 360 + 360) % 360;
	return t[Math.floor((n + 22.5) / 45) % 8];
}
function _e(e, t) {
	return `${e.toFixed(1)} ${e > t ? "▲" : e < t ? "▼" : ""}`;
}
function ve(e) {
	return `${e.toFixed(1)} ${ge(e)}`;
}
function ye(e, t, n, r = "middle", i = 139) {
	return `<text x="${t}" y="${n}" font-size="${i}" text-anchor="${r}"
              fill="white" font-family="Verdana" dominant-baseline="middle">
        ${e}
        </text>`;
}
function D(e) {
	return ye(e, 500, 660);
}
function O(e) {
	return ye(e, 500, 833);
}
function be(e) {
	return ye(e, 50, 150, "start");
}
//#endregion
//#region lib/azimuth.js
function xe(e, t, n) {
	let r = e.astronomyJS, i = r.getAltitudeAzimuthCoordinatesForObject(t).azimuth, a = r.getIlluminatedFractionForObject(t), o = w(n, "black");
	return o += E(t, {
		illuminatedFraction: a,
		isWaxing: r.getIlluminatedFractionForObject(t, new Date(r.getDate().getTime() + 300 * 1e3)) > a
	}), o += D("Azimuth"), o += O(ve(i)), o += T(o), o;
}
//#endregion
//#region lib/altitude.js
function Se(e, t, n) {
	let r = e.astronomyJS, i = r.getAltitudeAzimuthCoordinatesForObject(t).altitude, a = r.getIlluminatedFractionForObject(t), o = r.getAltitudeAzimuthCoordinatesForObject(t, /* @__PURE__ */ new Date(r.getDate().getTime() - 300 * 1e3)).altitude, s = w(n, "black");
	return s += E(t, {
		illuminatedFraction: a,
		isWaxing: r.getIlluminatedFractionForObject(t, new Date(r.getDate().getTime() + 300 * 1e3)) > a
	}), s += D("Altitude"), s += O(_e(i, o)), s += T(s), s;
}
//#endregion
//#region lib/utils/interpolation.js
function Ce(e) {
	let t = parseInt(e.slice(1), 16);
	return {
		r: t >> 16 & 255,
		g: t >> 8 & 255,
		b: t & 255
	};
}
function we({ r: e, g: t, b: n }) {
	return "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
}
function Te(e, t, n) {
	return e + (t - e) * n;
}
function Ee(e, t, n) {
	return (n - e) / (t - e);
}
function De(e, t, n) {
	let r = Ce(e), i = Ce(t);
	return we({
		r: Math.round(Te(r.r, i.r, n)),
		g: Math.round(Te(r.g, i.g, n)),
		b: Math.round(Te(r.b, i.b, n))
	});
}
//#endregion
//#region lib/utils/sky-gradient.js
function Oe(e) {
	let t = Ae(e), n = ke(e), r = Ee(t.limit, n.limit, e), i = De(t.top, n.top, r);
	return `<defs>
            <linearGradient id="sky-${e}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${i}" />
                <stop offset="55%" stop-color="${i}" />
                <stop offset="100%" stop-color="${De(t.bottom, n.bottom, r)}" />
            </linearGradient></defs>`;
}
function ke(e) {
	return e <= -18 ? {
		top: "#0b0c1a",
		bottom: "#0b0c1a",
		limit: -18
	} : e <= -15 ? {
		top: "#0b0c1a",
		bottom: "#101734",
		limit: -15
	} : e <= -12 ? {
		top: "#171c27",
		bottom: "#282e3c",
		limit: -12
	} : e <= -9 ? {
		top: "#171c29",
		bottom: "#525662",
		limit: -9
	} : e <= -6 ? {
		top: "#4e545f",
		bottom: "#b9a76c",
		limit: -6
	} : e <= -3 ? {
		top: "#909798",
		bottom: "#f9d92b",
		limit: -3
	} : e <= 0 ? {
		top: "#b6d8ed",
		bottom: "#f6da3f",
		limit: 0
	} : e <= 10 ? {
		top: "#bcd6fc",
		bottom: "#98d5fc",
		limit: 10
	} : {
		top: "#cce8fd",
		bottom: "#98d5fc",
		limit: 90
	};
}
function Ae(e) {
	return e <= -18 ? {
		top: "#0b0c1a",
		bottom: "#0b0c1a",
		limit: -90
	} : e <= -15 ? {
		top: "#0b0c1a",
		bottom: "#0b0c1a",
		limit: -18
	} : e <= -12 ? {
		top: "#0b0c1a",
		bottom: "#101734",
		limit: -15
	} : e <= -9 ? {
		top: "#171c27",
		bottom: "#282e3c",
		limit: -12
	} : e <= -6 ? {
		top: "#171c29",
		bottom: "#525662",
		limit: -9
	} : e <= -3 ? {
		top: "#4e545f",
		bottom: "#b9a76c",
		limit: -6
	} : e <= 0 ? {
		top: "#909798",
		bottom: "#f9d92b",
		limit: -3
	} : e <= 10 ? {
		top: "#b6d8ed",
		bottom: "#f6da3f",
		limit: 0
	} : {
		top: "#bcd6fc",
		bottom: "#98d5fc",
		limit: 10
	};
}
//#endregion
//#region node_modules/luxon/build/es6/luxon.mjs
var je = class extends Error {}, Me = class extends je {
	constructor(e) {
		super(`Invalid DateTime: ${e.toMessage()}`);
	}
}, Ne = class extends je {
	constructor(e) {
		super(`Invalid Interval: ${e.toMessage()}`);
	}
}, Pe = class extends je {
	constructor(e) {
		super(`Invalid Duration: ${e.toMessage()}`);
	}
}, Fe = class extends je {}, Ie = class extends je {
	constructor(e) {
		super(`Invalid unit ${e}`);
	}
}, k = class extends je {}, A = class extends je {
	constructor() {
		super("Zone is an abstract class");
	}
}, j = "numeric", M = "short", N = "long", Le = {
	year: j,
	month: j,
	day: j
}, Re = {
	year: j,
	month: M,
	day: j
}, ze = {
	year: j,
	month: M,
	day: j,
	weekday: M
}, Be = {
	year: j,
	month: N,
	day: j
}, Ve = {
	year: j,
	month: N,
	day: j,
	weekday: N
}, He = {
	hour: j,
	minute: j
}, Ue = {
	hour: j,
	minute: j,
	second: j
}, We = {
	hour: j,
	minute: j,
	second: j,
	timeZoneName: M
}, Ge = {
	hour: j,
	minute: j,
	second: j,
	timeZoneName: N
}, Ke = {
	hour: j,
	minute: j,
	hourCycle: "h23"
}, qe = {
	hour: j,
	minute: j,
	second: j,
	hourCycle: "h23"
}, Je = {
	hour: j,
	minute: j,
	second: j,
	hourCycle: "h23",
	timeZoneName: M
}, Ye = {
	hour: j,
	minute: j,
	second: j,
	hourCycle: "h23",
	timeZoneName: N
}, Xe = {
	year: j,
	month: j,
	day: j,
	hour: j,
	minute: j
}, Ze = {
	year: j,
	month: j,
	day: j,
	hour: j,
	minute: j,
	second: j
}, Qe = {
	year: j,
	month: M,
	day: j,
	hour: j,
	minute: j
}, $e = {
	year: j,
	month: M,
	day: j,
	hour: j,
	minute: j,
	second: j
}, et = {
	year: j,
	month: M,
	day: j,
	weekday: M,
	hour: j,
	minute: j
}, tt = {
	year: j,
	month: N,
	day: j,
	hour: j,
	minute: j,
	timeZoneName: M
}, nt = {
	year: j,
	month: N,
	day: j,
	hour: j,
	minute: j,
	second: j,
	timeZoneName: M
}, rt = {
	year: j,
	month: N,
	day: j,
	weekday: N,
	hour: j,
	minute: j,
	timeZoneName: N
}, it = {
	year: j,
	month: N,
	day: j,
	weekday: N,
	hour: j,
	minute: j,
	second: j,
	timeZoneName: N
}, at = class {
	get type() {
		throw new A();
	}
	get name() {
		throw new A();
	}
	get ianaName() {
		return this.name;
	}
	get isUniversal() {
		throw new A();
	}
	offsetName(e, t) {
		throw new A();
	}
	formatOffset(e, t) {
		throw new A();
	}
	offset(e) {
		throw new A();
	}
	equals(e) {
		throw new A();
	}
	get isValid() {
		throw new A();
	}
}, ot = null, st = class e extends at {
	static get instance() {
		return ot === null && (ot = new e()), ot;
	}
	get type() {
		return "system";
	}
	get name() {
		return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	}
	get isUniversal() {
		return !1;
	}
	offsetName(e, { format: t, locale: n }) {
		return Ln(e, t, n);
	}
	formatOffset(e, t) {
		return Vn(this.offset(e), t);
	}
	offset(e) {
		return -new Date(e).getTimezoneOffset();
	}
	equals(e) {
		return e.type === "system";
	}
	get isValid() {
		return !0;
	}
}, ct = /* @__PURE__ */ new Map();
function lt(e) {
	let t = ct.get(e);
	return t === void 0 && (t = new Intl.DateTimeFormat("en-US", {
		hour12: !1,
		timeZone: e,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		era: "short"
	}), ct.set(e, t)), t;
}
var ut = {
	year: 0,
	month: 1,
	day: 2,
	era: 3,
	hour: 4,
	minute: 5,
	second: 6
};
function dt(e, t) {
	let n = e.format(t).replace(/\u200E/g, ""), [, r, i, a, o, s, c, l] = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n);
	return [
		a,
		r,
		i,
		o,
		s,
		c,
		l
	];
}
function ft(e, t) {
	let n = e.formatToParts(t), r = [];
	for (let e = 0; e < n.length; e++) {
		let { type: t, value: i } = n[e], a = ut[t];
		t === "era" ? r[a] = i : V(a) || (r[a] = parseInt(i, 10));
	}
	return r;
}
var pt = /* @__PURE__ */ new Map(), mt = class e extends at {
	static create(t) {
		let n = pt.get(t);
		return n === void 0 && pt.set(t, n = new e(t)), n;
	}
	static resetCache() {
		pt.clear(), ct.clear();
	}
	static isValidSpecifier(e) {
		return this.isValidZone(e);
	}
	static isValidZone(e) {
		if (!e) return !1;
		try {
			return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
		} catch {
			return !1;
		}
	}
	constructor(t) {
		super(), this.zoneName = t, this.valid = e.isValidZone(t);
	}
	get type() {
		return "iana";
	}
	get name() {
		return this.zoneName;
	}
	get isUniversal() {
		return !1;
	}
	offsetName(e, { format: t, locale: n }) {
		return Ln(e, t, n, this.name);
	}
	formatOffset(e, t) {
		return Vn(this.offset(e), t);
	}
	offset(e) {
		if (!this.valid) return NaN;
		let t = new Date(e);
		if (isNaN(t)) return NaN;
		let n = lt(this.name), [r, i, a, o, s, c, l] = n.formatToParts ? ft(n, t) : dt(n, t);
		o === "BC" && (r = -Math.abs(r) + 1);
		let u = Nn({
			year: r,
			month: i,
			day: a,
			hour: s === 24 ? 0 : s,
			minute: c,
			second: l,
			millisecond: 0
		}), d = +t, f = d % 1e3;
		return d -= f >= 0 ? f : 1e3 + f, (u - d) / (60 * 1e3);
	}
	equals(e) {
		return e.type === "iana" && e.name === this.name;
	}
	get isValid() {
		return this.valid;
	}
}, ht = {};
function gt(e, t = {}) {
	let n = JSON.stringify([e, t]), r = ht[n];
	return r || (r = new Intl.ListFormat(e, t), ht[n] = r), r;
}
var _t = /* @__PURE__ */ new Map();
function vt(e, t = {}) {
	let n = JSON.stringify([e, t]), r = _t.get(n);
	return r === void 0 && (r = new Intl.DateTimeFormat(e, t), _t.set(n, r)), r;
}
var yt = /* @__PURE__ */ new Map();
function bt(e, t = {}) {
	let n = JSON.stringify([e, t]), r = yt.get(n);
	return r === void 0 && (r = new Intl.NumberFormat(e, t), yt.set(n, r)), r;
}
var xt = /* @__PURE__ */ new Map();
function St(e, t = {}) {
	let { base: n, ...r } = t, i = JSON.stringify([e, r]), a = xt.get(i);
	return a === void 0 && (a = new Intl.RelativeTimeFormat(e, t), xt.set(i, a)), a;
}
var Ct = null;
function wt() {
	return Ct || (Ct = new Intl.DateTimeFormat().resolvedOptions().locale, Ct);
}
var Tt = /* @__PURE__ */ new Map();
function Et(e) {
	let t = Tt.get(e);
	return t === void 0 && (t = new Intl.DateTimeFormat(e).resolvedOptions(), Tt.set(e, t)), t;
}
var Dt = /* @__PURE__ */ new Map();
function Ot(e) {
	let t = Dt.get(e);
	if (!t) {
		let n = new Intl.Locale(e);
		t = "getWeekInfo" in n ? n.getWeekInfo() : n.weekInfo, "minimalDays" in t || (t = {
			...Rt,
			...t
		}), Dt.set(e, t);
	}
	return t;
}
function kt(e) {
	let t = e.indexOf("-x-");
	t !== -1 && (e = e.substring(0, t));
	let n = e.indexOf("-u-");
	if (n === -1) return [e];
	{
		let t, r;
		try {
			t = vt(e).resolvedOptions(), r = e;
		} catch {
			let i = e.substring(0, n);
			t = vt(i).resolvedOptions(), r = i;
		}
		let { numberingSystem: i, calendar: a } = t;
		return [
			r,
			i,
			a
		];
	}
}
function At(e, t, n) {
	return n || t ? (e.includes("-u-") || (e += "-u"), n && (e += `-ca-${n}`), t && (e += `-nu-${t}`), e) : e;
}
function jt(e) {
	let t = [];
	for (let n = 1; n <= 12; n++) {
		let r = $.utc(2009, n, 1);
		t.push(e(r));
	}
	return t;
}
function Mt(e) {
	let t = [];
	for (let n = 1; n <= 7; n++) {
		let r = $.utc(2016, 11, 13 + n);
		t.push(e(r));
	}
	return t;
}
function Nt(e, t, n, r) {
	let i = e.listingMode();
	return i === "error" ? null : i === "en" ? n(t) : r(t);
}
function Pt(e) {
	return e.numberingSystem && e.numberingSystem !== "latn" ? !1 : e.numberingSystem === "latn" || !e.locale || e.locale.startsWith("en") || Et(e.locale).numberingSystem === "latn";
}
var Ft = class {
	constructor(e, t, n) {
		this.padTo = n.padTo || 0, this.floor = n.floor || !1;
		let { padTo: r, floor: i, ...a } = n;
		if (!t || Object.keys(a).length > 0) {
			let t = {
				useGrouping: !1,
				...n
			};
			n.padTo > 0 && (t.minimumIntegerDigits = n.padTo), this.inf = bt(e, t);
		}
	}
	format(e) {
		if (this.inf) {
			let t = this.floor ? Math.floor(e) : e;
			return this.inf.format(t);
		} else return W(this.floor ? Math.floor(e) : kn(e, 3), this.padTo);
	}
}, It = class {
	constructor(e, t, n) {
		this.opts = n, this.originalZone = void 0;
		let r;
		if (this.opts.timeZone) this.dt = e;
		else if (e.zone.type === "fixed") {
			let t = -1 * (e.offset / 60), n = t >= 0 ? `Etc/GMT+${t}` : `Etc/GMT${t}`;
			e.offset !== 0 && mt.create(n).valid ? (r = n, this.dt = e) : (r = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
		} else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, r = e.zone.name) : (r = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
		let i = { ...this.opts };
		i.timeZone = i.timeZone || r, this.dtf = vt(t, i);
	}
	format() {
		return this.originalZone ? this.formatToParts().map(({ value: e }) => e).join("") : this.dtf.format(this.dt.toJSDate());
	}
	formatToParts() {
		let e = this.dtf.formatToParts(this.dt.toJSDate());
		return this.originalZone ? e.map((e) => {
			if (e.type === "timeZoneName") {
				let t = this.originalZone.offsetName(this.dt.ts, {
					locale: this.dt.locale,
					format: this.opts.timeZoneName
				});
				return {
					...e,
					value: t
				};
			} else return e;
		}) : e;
	}
	resolvedOptions() {
		return this.dtf.resolvedOptions();
	}
}, Lt = class {
	constructor(e, t, n) {
		this.opts = {
			style: "long",
			...n
		}, !t && bn() && (this.rtf = St(e, n));
	}
	format(e, t) {
		return this.rtf ? this.rtf.format(e, t) : or(t, e, this.opts.numeric, this.opts.style !== "long");
	}
	formatToParts(e, t) {
		return this.rtf ? this.rtf.formatToParts(e, t) : [];
	}
}, Rt = {
	firstDay: 1,
	minimalDays: 4,
	weekend: [6, 7]
}, P = class e {
	static fromOpts(t) {
		return e.create(t.locale, t.numberingSystem, t.outputCalendar, t.weekSettings, t.defaultToEN);
	}
	static create(t, n, r, i, a = !1) {
		let o = t || R.defaultLocale;
		return new e(o || (a ? "en-US" : wt()), n || R.defaultNumberingSystem, r || R.defaultOutputCalendar, En(i) || R.defaultWeekSettings, o);
	}
	static resetCache() {
		Ct = null, _t.clear(), yt.clear(), xt.clear(), Tt.clear(), Dt.clear();
	}
	static fromObject({ locale: t, numberingSystem: n, outputCalendar: r, weekSettings: i } = {}) {
		return e.create(t, n, r, i);
	}
	constructor(e, t, n, r, i) {
		let [a, o, s] = kt(e);
		this.locale = a, this.numberingSystem = t || o || null, this.outputCalendar = n || s || null, this.weekSettings = r, this.intl = At(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = {
			format: {},
			standalone: {}
		}, this.monthsCache = {
			format: {},
			standalone: {}
		}, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
	}
	get fastNumbers() {
		return this.fastNumbersCached ??= Pt(this), this.fastNumbersCached;
	}
	listingMode() {
		let e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
		return e && t ? "en" : "intl";
	}
	clone(t) {
		return !t || Object.getOwnPropertyNames(t).length === 0 ? this : e.create(t.locale || this.specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, En(t.weekSettings) || this.weekSettings, t.defaultToEN || !1);
	}
	redefaultToEN(e = {}) {
		return this.clone({
			...e,
			defaultToEN: !0
		});
	}
	redefaultToSystem(e = {}) {
		return this.clone({
			...e,
			defaultToEN: !1
		});
	}
	months(e, t = !1) {
		return Nt(this, e, Kn, () => {
			let n = this.intl === "ja" || this.intl.startsWith("ja-");
			t &= !n;
			let r = t ? {
				month: e,
				day: "numeric"
			} : { month: e }, i = t ? "format" : "standalone";
			if (!this.monthsCache[i][e]) {
				let t = n ? (e) => this.dtFormatter(e, r).format() : (e) => this.extract(e, r, "month");
				this.monthsCache[i][e] = jt(t);
			}
			return this.monthsCache[i][e];
		});
	}
	weekdays(e, t = !1) {
		return Nt(this, e, Xn, () => {
			let n = t ? {
				weekday: e,
				year: "numeric",
				month: "long",
				day: "numeric"
			} : { weekday: e }, r = t ? "format" : "standalone";
			return this.weekdaysCache[r][e] || (this.weekdaysCache[r][e] = Mt((e) => this.extract(e, n, "weekday"))), this.weekdaysCache[r][e];
		});
	}
	meridiems() {
		return Nt(this, void 0, () => Zn, () => {
			if (!this.meridiemCache) {
				let e = {
					hour: "numeric",
					hourCycle: "h12"
				};
				this.meridiemCache = [$.utc(2016, 11, 13, 9), $.utc(2016, 11, 13, 19)].map((t) => this.extract(t, e, "dayperiod"));
			}
			return this.meridiemCache;
		});
	}
	eras(e) {
		return Nt(this, e, tr, () => {
			let t = { era: e };
			return this.eraCache[e] || (this.eraCache[e] = [$.utc(-40, 1, 1), $.utc(2017, 1, 1)].map((e) => this.extract(e, t, "era"))), this.eraCache[e];
		});
	}
	extract(e, t, n) {
		let r = this.dtFormatter(e, t).formatToParts().find((e) => e.type.toLowerCase() === n);
		return r ? r.value : null;
	}
	numberFormatter(e = {}) {
		return new Ft(this.intl, e.forceSimple || this.fastNumbers, e);
	}
	dtFormatter(e, t = {}) {
		return new It(e, this.intl, t);
	}
	relFormatter(e = {}) {
		return new Lt(this.intl, this.isEnglish(), e);
	}
	listFormatter(e = {}) {
		return gt(this.intl, e);
	}
	isEnglish() {
		return this.locale === "en" || this.locale.toLowerCase() === "en-us" || Et(this.intl).locale.startsWith("en-us");
	}
	getWeekSettings() {
		return this.weekSettings ? this.weekSettings : xn() ? Ot(this.locale) : Rt;
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
}, zt = null, F = class e extends at {
	static get utcInstance() {
		return zt === null && (zt = new e(0)), zt;
	}
	static instance(t) {
		return t === 0 ? e.utcInstance : new e(t);
	}
	static parseSpecifier(t) {
		if (t) {
			let n = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
			if (n) return new e(Rn(n[1], n[2]));
		}
		return null;
	}
	constructor(e) {
		super(), this.fixed = e;
	}
	get type() {
		return "fixed";
	}
	get name() {
		return this.fixed === 0 ? "UTC" : `UTC${Vn(this.fixed, "narrow")}`;
	}
	get ianaName() {
		return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Vn(-this.fixed, "narrow")}`;
	}
	offsetName() {
		return this.name;
	}
	formatOffset(e, t) {
		return Vn(this.fixed, t);
	}
	get isUniversal() {
		return !0;
	}
	offset() {
		return this.fixed;
	}
	equals(e) {
		return e.type === "fixed" && e.fixed === this.fixed;
	}
	get isValid() {
		return !0;
	}
}, Bt = class extends at {
	constructor(e) {
		super(), this.zoneName = e;
	}
	get type() {
		return "invalid";
	}
	get name() {
		return this.zoneName;
	}
	get isUniversal() {
		return !1;
	}
	offsetName() {
		return null;
	}
	formatOffset() {
		return "";
	}
	offset() {
		return NaN;
	}
	equals() {
		return !1;
	}
	get isValid() {
		return !1;
	}
};
function I(e, t) {
	if (V(e) || e === null) return t;
	if (e instanceof at) return e;
	if (vn(e)) {
		let n = e.toLowerCase();
		return n === "default" ? t : n === "local" || n === "system" ? st.instance : n === "utc" || n === "gmt" ? F.utcInstance : F.parseSpecifier(n) || mt.create(e);
	} else if (H(e)) return F.instance(e);
	else if (typeof e == "object" && "offset" in e && typeof e.offset == "function") return e;
	else return new Bt(e);
}
var Vt = {
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
}, Ht = {
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
}, Ut = Vt.hanidec.replace(/[\[|\]]/g, "").split("");
function Wt(e) {
	let t = parseInt(e, 10);
	if (isNaN(t)) {
		t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e.charCodeAt(n);
			if (e[n].search(Vt.hanidec) !== -1) t += Ut.indexOf(e[n]);
			else for (let e in Ht) {
				let [n, i] = Ht[e];
				r >= n && r <= i && (t += r - n);
			}
		}
		return parseInt(t, 10);
	} else return t;
}
var Gt = /* @__PURE__ */ new Map();
function Kt() {
	Gt.clear();
}
function L({ numberingSystem: e }, t = "") {
	let n = e || "latn", r = Gt.get(n);
	r === void 0 && (r = /* @__PURE__ */ new Map(), Gt.set(n, r));
	let i = r.get(t);
	return i === void 0 && (i = RegExp(`${Vt[n]}${t}`), r.set(t, i)), i;
}
var qt = () => Date.now(), Jt = "system", Yt = null, Xt = null, Zt = null, Qt = 60, $t, en = null, R = class {
	static get now() {
		return qt;
	}
	static set now(e) {
		qt = e;
	}
	static set defaultZone(e) {
		Jt = e;
	}
	static get defaultZone() {
		return I(Jt, st.instance);
	}
	static get defaultLocale() {
		return Yt;
	}
	static set defaultLocale(e) {
		Yt = e;
	}
	static get defaultNumberingSystem() {
		return Xt;
	}
	static set defaultNumberingSystem(e) {
		Xt = e;
	}
	static get defaultOutputCalendar() {
		return Zt;
	}
	static set defaultOutputCalendar(e) {
		Zt = e;
	}
	static get defaultWeekSettings() {
		return en;
	}
	static set defaultWeekSettings(e) {
		en = En(e);
	}
	static get twoDigitCutoffYear() {
		return Qt;
	}
	static set twoDigitCutoffYear(e) {
		Qt = e % 100;
	}
	static get throwOnInvalid() {
		return $t;
	}
	static set throwOnInvalid(e) {
		$t = e;
	}
	static resetCaches() {
		P.resetCache(), mt.resetCache(), $.resetCache(), Kt();
	}
}, z = class {
	constructor(e, t) {
		this.reason = e, this.explanation = t;
	}
	toMessage() {
		return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
	}
}, tn = [
	0,
	31,
	59,
	90,
	120,
	151,
	181,
	212,
	243,
	273,
	304,
	334
], nn = [
	0,
	31,
	60,
	91,
	121,
	152,
	182,
	213,
	244,
	274,
	305,
	335
];
function B(e, t) {
	return new z("unit out of range", `you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`);
}
function rn(e, t, n) {
	let r = new Date(Date.UTC(e, t - 1, n));
	e < 100 && e >= 0 && r.setUTCFullYear(r.getUTCFullYear() - 1900);
	let i = r.getUTCDay();
	return i === 0 ? 7 : i;
}
function an(e, t, n) {
	return n + (An(e) ? nn : tn)[t - 1];
}
function on(e, t) {
	let n = An(e) ? nn : tn, r = n.findIndex((e) => e < t), i = t - n[r];
	return {
		month: r + 1,
		day: i
	};
}
function sn(e, t) {
	return (e - t + 7) % 7 + 1;
}
function cn(e, t = 4, n = 1) {
	let { year: r, month: i, day: a } = e, o = an(r, i, a), s = sn(rn(r, i, a), n), c = Math.floor((o - s + 14 - t) / 7), l;
	return c < 1 ? (l = r - 1, c = Fn(l, t, n)) : c > Fn(r, t, n) ? (l = r + 1, c = 1) : l = r, {
		weekYear: l,
		weekNumber: c,
		weekday: s,
		...Hn(e)
	};
}
function ln(e, t = 4, n = 1) {
	let { weekYear: r, weekNumber: i, weekday: a } = e, o = sn(rn(r, 1, t), n), s = jn(r), c = i * 7 + a - o - 7 + t, l;
	c < 1 ? (l = r - 1, c += jn(l)) : c > s ? (l = r + 1, c -= jn(r)) : l = r;
	let { month: u, day: d } = on(l, c);
	return {
		year: l,
		month: u,
		day: d,
		...Hn(e)
	};
}
function un(e) {
	let { year: t, month: n, day: r } = e;
	return {
		year: t,
		ordinal: an(t, n, r),
		...Hn(e)
	};
}
function dn(e) {
	let { year: t, ordinal: n } = e, { month: r, day: i } = on(t, n);
	return {
		year: t,
		month: r,
		day: i,
		...Hn(e)
	};
}
function fn(e, t) {
	if (!V(e.localWeekday) || !V(e.localWeekNumber) || !V(e.localWeekYear)) {
		if (!V(e.weekday) || !V(e.weekNumber) || !V(e.weekYear)) throw new Fe("Cannot mix locale-based week fields with ISO-based week fields");
		return V(e.localWeekday) || (e.weekday = e.localWeekday), V(e.localWeekNumber) || (e.weekNumber = e.localWeekNumber), V(e.localWeekYear) || (e.weekYear = e.localWeekYear), delete e.localWeekday, delete e.localWeekNumber, delete e.localWeekYear, {
			minDaysInFirstWeek: t.getMinDaysInFirstWeek(),
			startOfWeek: t.getStartOfWeek()
		};
	} else return {
		minDaysInFirstWeek: 4,
		startOfWeek: 1
	};
}
function pn(e, t = 4, n = 1) {
	let r = _n(e.weekYear), i = U(e.weekNumber, 1, Fn(e.weekYear, t, n)), a = U(e.weekday, 1, 7);
	return r ? i ? a ? !1 : B("weekday", e.weekday) : B("week", e.weekNumber) : B("weekYear", e.weekYear);
}
function mn(e) {
	let t = _n(e.year), n = U(e.ordinal, 1, jn(e.year));
	return t ? n ? !1 : B("ordinal", e.ordinal) : B("year", e.year);
}
function hn(e) {
	let t = _n(e.year), n = U(e.month, 1, 12), r = U(e.day, 1, Mn(e.year, e.month));
	return t ? n ? r ? !1 : B("day", e.day) : B("month", e.month) : B("year", e.year);
}
function gn(e) {
	let { hour: t, minute: n, second: r, millisecond: i } = e, a = U(t, 0, 23) || t === 24 && n === 0 && r === 0 && i === 0, o = U(n, 0, 59), s = U(r, 0, 59), c = U(i, 0, 999);
	return a ? o ? s ? c ? !1 : B("millisecond", i) : B("second", r) : B("minute", n) : B("hour", t);
}
function V(e) {
	return e === void 0;
}
function H(e) {
	return typeof e == "number";
}
function _n(e) {
	return typeof e == "number" && e % 1 == 0;
}
function vn(e) {
	return typeof e == "string";
}
function yn(e) {
	return Object.prototype.toString.call(e) === "[object Date]";
}
function bn() {
	try {
		return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
	} catch {
		return !1;
	}
}
function xn() {
	try {
		return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
	} catch {
		return !1;
	}
}
function Sn(e) {
	return Array.isArray(e) ? e : [e];
}
function Cn(e, t, n) {
	if (e.length !== 0) return e.reduce((e, r) => {
		let i = [t(r), r];
		return e && n(e[0], i[0]) === e[0] ? e : i;
	}, null)[1];
}
function wn(e, t) {
	return t.reduce((t, n) => (t[n] = e[n], t), {});
}
function Tn(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t);
}
function En(e) {
	if (e == null) return null;
	if (typeof e != "object") throw new k("Week settings must be an object");
	if (!U(e.firstDay, 1, 7) || !U(e.minimalDays, 1, 7) || !Array.isArray(e.weekend) || e.weekend.some((e) => !U(e, 1, 7))) throw new k("Invalid week settings");
	return {
		firstDay: e.firstDay,
		minimalDays: e.minimalDays,
		weekend: Array.from(e.weekend)
	};
}
function U(e, t, n) {
	return _n(e) && e >= t && e <= n;
}
function Dn(e, t) {
	return e - t * Math.floor(e / t);
}
function W(e, t = 2) {
	let n = e < 0, r;
	return r = n ? "-" + ("" + -e).padStart(t, "0") : ("" + e).padStart(t, "0"), r;
}
function G(e) {
	if (!(V(e) || e === null || e === "")) return parseInt(e, 10);
}
function K(e) {
	if (!(V(e) || e === null || e === "")) return parseFloat(e);
}
function On(e) {
	if (!(V(e) || e === null || e === "")) {
		let t = parseFloat("0." + e) * 1e3;
		return Math.floor(t);
	}
}
function kn(e, t, n = "round") {
	let r = 10 ** t;
	switch (n) {
		case "expand": return e > 0 ? Math.ceil(e * r) / r : Math.floor(e * r) / r;
		case "trunc": return Math.trunc(e * r) / r;
		case "round": return Math.round(e * r) / r;
		case "floor": return Math.floor(e * r) / r;
		case "ceil": return Math.ceil(e * r) / r;
		default: throw RangeError(`Value rounding ${n} is out of range`);
	}
}
function An(e) {
	return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
}
function jn(e) {
	return An(e) ? 366 : 365;
}
function Mn(e, t) {
	let n = Dn(t - 1, 12) + 1, r = e + (t - n) / 12;
	return n === 2 ? An(r) ? 29 : 28 : [
		31,
		null,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	][n - 1];
}
function Nn(e) {
	let t = Date.UTC(e.year, e.month - 1, e.day, e.hour, e.minute, e.second, e.millisecond);
	return e.year < 100 && e.year >= 0 && (t = new Date(t), t.setUTCFullYear(e.year, e.month - 1, e.day)), +t;
}
function Pn(e, t, n) {
	return -sn(rn(e, 1, t), n) + t - 1;
}
function Fn(e, t = 4, n = 1) {
	let r = Pn(e, t, n), i = Pn(e + 1, t, n);
	return (jn(e) - r + i) / 7;
}
function In(e) {
	return e > 99 ? e : e > R.twoDigitCutoffYear ? 1900 + e : 2e3 + e;
}
function Ln(e, t, n, r = null) {
	let i = new Date(e), a = {
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	};
	r && (a.timeZone = r);
	let o = {
		timeZoneName: t,
		...a
	}, s = new Intl.DateTimeFormat(n, o).formatToParts(i).find((e) => e.type.toLowerCase() === "timezonename");
	return s ? s.value : null;
}
function Rn(e, t) {
	let n = parseInt(e, 10);
	Number.isNaN(n) && (n = 0);
	let r = parseInt(t, 10) || 0, i = n < 0 || Object.is(n, -0) ? -r : r;
	return n * 60 + i;
}
function zn(e) {
	let t = Number(e);
	if (typeof e == "boolean" || e === "" || !Number.isFinite(t)) throw new k(`Invalid unit value ${e}`);
	return t;
}
function Bn(e, t) {
	let n = {};
	for (let r in e) if (Tn(e, r)) {
		let i = e[r];
		if (i == null) continue;
		n[t(r)] = zn(i);
	}
	return n;
}
function Vn(e, t) {
	let n = Math.trunc(Math.abs(e / 60)), r = Math.trunc(Math.abs(e % 60)), i = e >= 0 ? "+" : "-";
	switch (t) {
		case "short": return `${i}${W(n, 2)}:${W(r, 2)}`;
		case "narrow": return `${i}${n}${r > 0 ? `:${r}` : ""}`;
		case "techie": return `${i}${W(n, 2)}${W(r, 2)}`;
		default: throw RangeError(`Value format ${t} is out of range for property format`);
	}
}
function Hn(e) {
	return wn(e, [
		"hour",
		"minute",
		"second",
		"millisecond"
	]);
}
var Un = [
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
], Wn = [
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
], Gn = [
	"J",
	"F",
	"M",
	"A",
	"M",
	"J",
	"J",
	"A",
	"S",
	"O",
	"N",
	"D"
];
function Kn(e) {
	switch (e) {
		case "narrow": return [...Gn];
		case "short": return [...Wn];
		case "long": return [...Un];
		case "numeric": return [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12"
		];
		case "2-digit": return [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12"
		];
		default: return null;
	}
}
var qn = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
], Jn = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
], Yn = [
	"M",
	"T",
	"W",
	"T",
	"F",
	"S",
	"S"
];
function Xn(e) {
	switch (e) {
		case "narrow": return [...Yn];
		case "short": return [...Jn];
		case "long": return [...qn];
		case "numeric": return [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7"
		];
		default: return null;
	}
}
var Zn = ["AM", "PM"], Qn = ["Before Christ", "Anno Domini"], $n = ["BC", "AD"], er = ["B", "A"];
function tr(e) {
	switch (e) {
		case "narrow": return [...er];
		case "short": return [...$n];
		case "long": return [...Qn];
		default: return null;
	}
}
function nr(e) {
	return Zn[e.hour < 12 ? 0 : 1];
}
function rr(e, t) {
	return Xn(t)[e.weekday - 1];
}
function ir(e, t) {
	return Kn(t)[e.month - 1];
}
function ar(e, t) {
	return tr(t)[e.year < 0 ? 0 : 1];
}
function or(e, t, n = "always", r = !1) {
	let i = {
		years: ["year", "yr."],
		quarters: ["quarter", "qtr."],
		months: ["month", "mo."],
		weeks: ["week", "wk."],
		days: [
			"day",
			"day",
			"days"
		],
		hours: ["hour", "hr."],
		minutes: ["minute", "min."],
		seconds: ["second", "sec."]
	}, a = [
		"hours",
		"minutes",
		"seconds"
	].indexOf(e) === -1;
	if (n === "auto" && a) {
		let n = e === "days";
		switch (t) {
			case 1: return n ? "tomorrow" : `next ${i[e][0]}`;
			case -1: return n ? "yesterday" : `last ${i[e][0]}`;
			case 0: return n ? "today" : `this ${i[e][0]}`;
		}
	}
	let o = Object.is(t, -0) || t < 0, s = Math.abs(t), c = s === 1, l = i[e], u = r ? c ? l[1] : l[2] || l[1] : c ? i[e][0] : e;
	return o ? `${s} ${u} ago` : `in ${s} ${u}`;
}
function sr(e, t) {
	let n = "";
	for (let r of e) r.literal ? n += r.val : n += t(r.val);
	return n;
}
var cr = {
	D: Le,
	DD: Re,
	DDD: Be,
	DDDD: Ve,
	t: He,
	tt: Ue,
	ttt: We,
	tttt: Ge,
	T: Ke,
	TT: qe,
	TTT: Je,
	TTTT: Ye,
	f: Xe,
	ff: Qe,
	fff: tt,
	ffff: rt,
	F: Ze,
	FF: $e,
	FFF: nt,
	FFFF: it
}, q = class e {
	static create(t, n = {}) {
		return new e(t, n);
	}
	static parseFormat(e) {
		let t = null, n = "", r = !1, i = [];
		for (let a = 0; a < e.length; a++) {
			let o = e.charAt(a);
			o === "'" ? ((n.length > 0 || r) && i.push({
				literal: r || /^\s+$/.test(n),
				val: n === "" ? "'" : n
			}), t = null, n = "", r = !r) : r || o === t ? n += o : (n.length > 0 && i.push({
				literal: /^\s+$/.test(n),
				val: n
			}), n = o, t = o);
		}
		return n.length > 0 && i.push({
			literal: r || /^\s+$/.test(n),
			val: n
		}), i;
	}
	static macroTokenToFormatOpts(e) {
		return cr[e];
	}
	constructor(e, t) {
		this.opts = t, this.loc = e, this.systemLoc = null;
	}
	formatWithSystemDefault(e, t) {
		return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, {
			...this.opts,
			...t
		}).format();
	}
	dtFormatter(e, t = {}) {
		return this.loc.dtFormatter(e, {
			...this.opts,
			...t
		});
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
	num(e, t = 0, n = void 0) {
		if (this.opts.forceSimple) return W(e, t);
		let r = { ...this.opts };
		return t > 0 && (r.padTo = t), n && (r.signDisplay = n), this.loc.numberFormatter(r).format(e);
	}
	formatDateTimeFromString(t, n) {
		let r = this.loc.listingMode() === "en", i = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", a = (e, n) => this.loc.extract(t, e, n), o = (e) => t.isOffsetFixed && t.offset === 0 && e.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, e.format) : "", s = () => r ? nr(t) : a({
			hour: "numeric",
			hourCycle: "h12"
		}, "dayperiod"), c = (e, n) => r ? ir(t, e) : a(n ? { month: e } : {
			month: e,
			day: "numeric"
		}, "month"), l = (e, n) => r ? rr(t, e) : a(n ? { weekday: e } : {
			weekday: e,
			month: "long",
			day: "numeric"
		}, "weekday"), u = (n) => {
			let r = e.macroTokenToFormatOpts(n);
			return r ? this.formatWithSystemDefault(t, r) : n;
		}, d = (e) => r ? ar(t, e) : a({ era: e }, "era");
		return sr(e.parseFormat(n), (e) => {
			switch (e) {
				case "S": return this.num(t.millisecond);
				case "u":
				case "SSS": return this.num(t.millisecond, 3);
				case "s": return this.num(t.second);
				case "ss": return this.num(t.second, 2);
				case "uu": return this.num(Math.floor(t.millisecond / 10), 2);
				case "uuu": return this.num(Math.floor(t.millisecond / 100));
				case "m": return this.num(t.minute);
				case "mm": return this.num(t.minute, 2);
				case "h": return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12);
				case "hh": return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12, 2);
				case "H": return this.num(t.hour);
				case "HH": return this.num(t.hour, 2);
				case "Z": return o({
					format: "narrow",
					allowZ: this.opts.allowZ
				});
				case "ZZ": return o({
					format: "short",
					allowZ: this.opts.allowZ
				});
				case "ZZZ": return o({
					format: "techie",
					allowZ: this.opts.allowZ
				});
				case "ZZZZ": return t.zone.offsetName(t.ts, {
					format: "short",
					locale: this.loc.locale
				});
				case "ZZZZZ": return t.zone.offsetName(t.ts, {
					format: "long",
					locale: this.loc.locale
				});
				case "z": return t.zoneName;
				case "a": return s();
				case "d": return i ? a({ day: "numeric" }, "day") : this.num(t.day);
				case "dd": return i ? a({ day: "2-digit" }, "day") : this.num(t.day, 2);
				case "c": return this.num(t.weekday);
				case "ccc": return l("short", !0);
				case "cccc": return l("long", !0);
				case "ccccc": return l("narrow", !0);
				case "E": return this.num(t.weekday);
				case "EEE": return l("short", !1);
				case "EEEE": return l("long", !1);
				case "EEEEE": return l("narrow", !1);
				case "L": return i ? a({
					month: "numeric",
					day: "numeric"
				}, "month") : this.num(t.month);
				case "LL": return i ? a({
					month: "2-digit",
					day: "numeric"
				}, "month") : this.num(t.month, 2);
				case "LLL": return c("short", !0);
				case "LLLL": return c("long", !0);
				case "LLLLL": return c("narrow", !0);
				case "M": return i ? a({ month: "numeric" }, "month") : this.num(t.month);
				case "MM": return i ? a({ month: "2-digit" }, "month") : this.num(t.month, 2);
				case "MMM": return c("short", !1);
				case "MMMM": return c("long", !1);
				case "MMMMM": return c("narrow", !1);
				case "y": return i ? a({ year: "numeric" }, "year") : this.num(t.year);
				case "yy": return i ? a({ year: "2-digit" }, "year") : this.num(t.year.toString().slice(-2), 2);
				case "yyyy": return i ? a({ year: "numeric" }, "year") : this.num(t.year, 4);
				case "yyyyyy": return i ? a({ year: "numeric" }, "year") : this.num(t.year, 6);
				case "G": return d("short");
				case "GG": return d("long");
				case "GGGGG": return d("narrow");
				case "kk": return this.num(t.weekYear.toString().slice(-2), 2);
				case "kkkk": return this.num(t.weekYear, 4);
				case "W": return this.num(t.weekNumber);
				case "WW": return this.num(t.weekNumber, 2);
				case "n": return this.num(t.localWeekNumber);
				case "nn": return this.num(t.localWeekNumber, 2);
				case "ii": return this.num(t.localWeekYear.toString().slice(-2), 2);
				case "iiii": return this.num(t.localWeekYear, 4);
				case "o": return this.num(t.ordinal);
				case "ooo": return this.num(t.ordinal, 3);
				case "q": return this.num(t.quarter);
				case "qq": return this.num(t.quarter, 2);
				case "X": return this.num(Math.floor(t.ts / 1e3));
				case "x": return this.num(t.ts);
				default: return u(e);
			}
		});
	}
	formatDurationFromString(t, n) {
		let r = this.opts.signMode === "negativeLargestOnly" ? -1 : 1, i = (e) => {
			switch (e[0]) {
				case "S": return "milliseconds";
				case "s": return "seconds";
				case "m": return "minutes";
				case "h": return "hours";
				case "d": return "days";
				case "w": return "weeks";
				case "M": return "months";
				case "y": return "years";
				default: return null;
			}
		}, a = (e, t) => (n) => {
			let a = i(n);
			if (a) {
				let i = t.isNegativeDuration && a !== t.largestUnit ? r : 1, o;
				return o = this.opts.signMode === "negativeLargestOnly" && a !== t.largestUnit ? "never" : this.opts.signMode === "all" ? "always" : "auto", this.num(e.get(a) * i, n.length, o);
			} else return n;
		}, o = e.parseFormat(n), s = o.reduce((e, { literal: t, val: n }) => t ? e : e.concat(n), []), c = t.shiftTo(...s.map(i).filter((e) => e));
		return sr(o, a(c, {
			isNegativeDuration: c < 0,
			largestUnit: Object.keys(c.values)[0]
		}));
	}
}, lr = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function ur(...e) {
	let t = e.reduce((e, t) => e + t.source, "");
	return RegExp(`^${t}$`);
}
function dr(...e) {
	return (t) => e.reduce(([e, n, r], i) => {
		let [a, o, s] = i(t, r);
		return [
			{
				...e,
				...a
			},
			o || n,
			s
		];
	}, [
		{},
		null,
		1
	]).slice(0, 2);
}
function fr(e, ...t) {
	if (e == null) return [null, null];
	for (let [n, r] of t) {
		let t = n.exec(e);
		if (t) return r(t);
	}
	return [null, null];
}
function pr(...e) {
	return (t, n) => {
		let r = {}, i;
		for (i = 0; i < e.length; i++) r[e[i]] = G(t[n + i]);
		return [
			r,
			null,
			n + i
		];
	};
}
var mr = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, hr = `(?:${mr.source}?(?:\\[(${lr.source})\\])?)?`, gr = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, _r = RegExp(`${gr.source}${hr}`), vr = RegExp(`(?:[Tt]${_r.source})?`), yr = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, br = /(\d{4})-?W(\d\d)(?:-?(\d))?/, xr = /(\d{4})-?(\d{3})/, Sr = pr("weekYear", "weekNumber", "weekDay"), Cr = pr("year", "ordinal"), wr = /(\d{4})-(\d\d)-(\d\d)/, Tr = RegExp(`${gr.source} ?(?:${mr.source}|(${lr.source}))?`), Er = RegExp(`(?: ${Tr.source})?`);
function Dr(e, t, n) {
	let r = e[t];
	return V(r) ? n : G(r);
}
function Or(e, t) {
	return [
		{
			year: Dr(e, t),
			month: Dr(e, t + 1, 1),
			day: Dr(e, t + 2, 1)
		},
		null,
		t + 3
	];
}
function kr(e, t) {
	return [
		{
			hours: Dr(e, t, 0),
			minutes: Dr(e, t + 1, 0),
			seconds: Dr(e, t + 2, 0),
			milliseconds: On(e[t + 3])
		},
		null,
		t + 4
	];
}
function Ar(e, t) {
	let n = !e[t] && !e[t + 1], r = Rn(e[t + 1], e[t + 2]);
	return [
		{},
		n ? null : F.instance(r),
		t + 3
	];
}
function jr(e, t) {
	return [
		{},
		e[t] ? mt.create(e[t]) : null,
		t + 1
	];
}
var Mr = RegExp(`^T?${gr.source}$`), Nr = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Pr(e) {
	let [t, n, r, i, a, o, s, c, l] = e, u = t[0] === "-", d = c && c[0] === "-", f = (e, t = !1) => e !== void 0 && (t || e && u) ? -e : e;
	return [{
		years: f(K(n)),
		months: f(K(r)),
		weeks: f(K(i)),
		days: f(K(a)),
		hours: f(K(o)),
		minutes: f(K(s)),
		seconds: f(K(c), c === "-0"),
		milliseconds: f(On(l), d)
	}];
}
var Fr = {
	GMT: 0,
	EDT: -240,
	EST: -300,
	CDT: -300,
	CST: -360,
	MDT: -360,
	MST: -420,
	PDT: -420,
	PST: -480
};
function Ir(e, t, n, r, i, a, o) {
	let s = {
		year: t.length === 2 ? In(G(t)) : G(t),
		month: Wn.indexOf(n) + 1,
		day: G(r),
		hour: G(i),
		minute: G(a)
	};
	return o && (s.second = G(o)), e && (s.weekday = e.length > 3 ? qn.indexOf(e) + 1 : Jn.indexOf(e) + 1), s;
}
var Lr = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Rr(e) {
	let [, t, n, r, i, a, o, s, c, l, u, d] = e, f = Ir(t, i, r, n, a, o, s), p;
	return p = c ? Fr[c] : l ? 0 : Rn(u, d), [f, new F(p)];
}
function zr(e) {
	return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
var Br = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, Vr = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Hr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Ur(e) {
	let [, t, n, r, i, a, o, s] = e;
	return [Ir(t, i, r, n, a, o, s), F.utcInstance];
}
function Wr(e) {
	let [, t, n, r, i, a, o, s] = e;
	return [Ir(t, s, n, r, i, a, o), F.utcInstance];
}
var Gr = ur(yr, vr), Kr = ur(br, vr), qr = ur(xr, vr), Jr = ur(_r), Yr = dr(Or, kr, Ar, jr), Xr = dr(Sr, kr, Ar, jr), Zr = dr(Cr, kr, Ar, jr), Qr = dr(kr, Ar, jr);
function $r(e) {
	return fr(e, [Gr, Yr], [Kr, Xr], [qr, Zr], [Jr, Qr]);
}
function ei(e) {
	return fr(zr(e), [Lr, Rr]);
}
function ti(e) {
	return fr(e, [Br, Ur], [Vr, Ur], [Hr, Wr]);
}
function ni(e) {
	return fr(e, [Nr, Pr]);
}
var ri = dr(kr);
function ii(e) {
	return fr(e, [Mr, ri]);
}
var ai = ur(wr, Er), oi = ur(Tr), si = dr(kr, Ar, jr);
function ci(e) {
	return fr(e, [ai, Yr], [oi, si]);
}
var li = "Invalid Duration", ui = {
	weeks: {
		days: 7,
		hours: 168,
		minutes: 10080,
		seconds: 10080 * 60,
		milliseconds: 10080 * 60 * 1e3
	},
	days: {
		hours: 24,
		minutes: 1440,
		seconds: 1440 * 60,
		milliseconds: 1440 * 60 * 1e3
	},
	hours: {
		minutes: 60,
		seconds: 3600,
		milliseconds: 3600 * 1e3
	},
	minutes: {
		seconds: 60,
		milliseconds: 60 * 1e3
	},
	seconds: { milliseconds: 1e3 }
}, di = {
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
		hours: 2184,
		minutes: 2184 * 60,
		seconds: 2184 * 60 * 60,
		milliseconds: 2184 * 60 * 60 * 1e3
	},
	months: {
		weeks: 4,
		days: 30,
		hours: 720,
		minutes: 720 * 60,
		seconds: 720 * 60 * 60,
		milliseconds: 720 * 60 * 60 * 1e3
	},
	...ui
}, J = 146097 / 400, fi = 146097 / 4800, pi = {
	years: {
		quarters: 4,
		months: 12,
		weeks: J / 7,
		days: J,
		hours: J * 24,
		minutes: J * 24 * 60,
		seconds: J * 24 * 60 * 60,
		milliseconds: J * 24 * 60 * 60 * 1e3
	},
	quarters: {
		months: 3,
		weeks: J / 28,
		days: J / 4,
		hours: J * 24 / 4,
		minutes: J * 24 * 60 / 4,
		seconds: J * 24 * 60 * 60 / 4,
		milliseconds: J * 24 * 60 * 60 * 1e3 / 4
	},
	months: {
		weeks: fi / 7,
		days: fi,
		hours: fi * 24,
		minutes: fi * 24 * 60,
		seconds: fi * 24 * 60 * 60,
		milliseconds: fi * 24 * 60 * 60 * 1e3
	},
	...ui
}, mi = [
	"years",
	"quarters",
	"months",
	"weeks",
	"days",
	"hours",
	"minutes",
	"seconds",
	"milliseconds"
], hi = mi.slice(0).reverse();
function Y(e, t, n = !1) {
	return new X({
		values: n ? t.values : {
			...e.values,
			...t.values || {}
		},
		loc: e.loc.clone(t.loc),
		conversionAccuracy: t.conversionAccuracy || e.conversionAccuracy,
		matrix: t.matrix || e.matrix
	});
}
function gi(e, t) {
	let n = t.milliseconds ?? 0;
	for (let r of hi.slice(1)) t[r] && (n += t[r] * e[r].milliseconds);
	return n;
}
function _i(e, t) {
	let n = gi(e, t) < 0 ? -1 : 1;
	mi.reduceRight((r, i) => {
		if (V(t[i])) return r;
		if (r) {
			let a = t[r] * n, o = e[i][r], s = Math.floor(a / o);
			t[i] += s * n, t[r] -= s * o * n;
		}
		return i;
	}, null), mi.reduce((n, r) => {
		if (V(t[r])) return n;
		if (n) {
			let i = t[n] % 1;
			t[n] -= i, t[r] += i * e[n][r];
		}
		return r;
	}, null);
}
function vi(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r !== 0 && (t[n] = r);
	return t;
}
var X = class e {
	constructor(e) {
		let t = e.conversionAccuracy === "longterm" || !1, n = t ? pi : di;
		e.matrix && (n = e.matrix), this.values = e.values, this.loc = e.loc || P.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = n, this.isLuxonDuration = !0;
	}
	static fromMillis(t, n) {
		return e.fromObject({ milliseconds: t }, n);
	}
	static fromObject(t, n = {}) {
		if (typeof t != "object" || !t) throw new k(`Duration.fromObject: argument expected to be an object, got ${t === null ? "null" : typeof t}`);
		return new e({
			values: Bn(t, e.normalizeUnit),
			loc: P.fromObject(n),
			conversionAccuracy: n.conversionAccuracy,
			matrix: n.matrix
		});
	}
	static fromDurationLike(t) {
		if (H(t)) return e.fromMillis(t);
		if (e.isDuration(t)) return t;
		if (typeof t == "object") return e.fromObject(t);
		throw new k(`Unknown duration argument ${t} of type ${typeof t}`);
	}
	static fromISO(t, n) {
		let [r] = ni(t);
		return r ? e.fromObject(r, n) : e.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
	}
	static fromISOTime(t, n) {
		let [r] = ii(t);
		return r ? e.fromObject(r, n) : e.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
	}
	static invalid(t, n = null) {
		if (!t) throw new k("need to specify a reason the Duration is invalid");
		let r = t instanceof z ? t : new z(t, n);
		if (R.throwOnInvalid) throw new Pe(r);
		return new e({ invalid: r });
	}
	static normalizeUnit(e) {
		let t = {
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
		if (!t) throw new Ie(e);
		return t;
	}
	static isDuration(e) {
		return e && e.isLuxonDuration || !1;
	}
	get locale() {
		return this.isValid ? this.loc.locale : null;
	}
	get numberingSystem() {
		return this.isValid ? this.loc.numberingSystem : null;
	}
	toFormat(e, t = {}) {
		let n = {
			...t,
			floor: t.round !== !1 && t.floor !== !1
		};
		return this.isValid ? q.create(this.loc, n).formatDurationFromString(this, e) : li;
	}
	toHuman(e = {}) {
		if (!this.isValid) return li;
		let t = e.showZeros !== !1, n = mi.map((n) => {
			let r = this.values[n];
			return V(r) || r === 0 && !t ? null : this.loc.numberFormatter({
				style: "unit",
				unitDisplay: "long",
				...e,
				unit: n.slice(0, -1)
			}).format(r);
		}).filter((e) => e);
		return this.loc.listFormatter({
			type: "conjunction",
			style: e.listStyle || "narrow",
			...e
		}).format(n);
	}
	toObject() {
		return this.isValid ? { ...this.values } : {};
	}
	toISO() {
		if (!this.isValid) return null;
		let e = "P";
		return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += kn(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
	}
	toISOTime(e = {}) {
		if (!this.isValid) return null;
		let t = this.toMillis();
		return t < 0 || t >= 864e5 ? null : (e = {
			suppressMilliseconds: !1,
			suppressSeconds: !1,
			includePrefix: !1,
			format: "extended",
			...e,
			includeOffset: !1
		}, $.fromMillis(t, { zone: "UTC" }).toISOTime(e));
	}
	toJSON() {
		return this.toISO();
	}
	toString() {
		return this.toISO();
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
	}
	toMillis() {
		return this.isValid ? gi(this.matrix, this.values) : NaN;
	}
	valueOf() {
		return this.toMillis();
	}
	plus(t) {
		if (!this.isValid) return this;
		let n = e.fromDurationLike(t), r = {};
		for (let e of mi) (Tn(n.values, e) || Tn(this.values, e)) && (r[e] = n.get(e) + this.get(e));
		return Y(this, { values: r }, !0);
	}
	minus(t) {
		if (!this.isValid) return this;
		let n = e.fromDurationLike(t);
		return this.plus(n.negate());
	}
	mapUnits(e) {
		if (!this.isValid) return this;
		let t = {};
		for (let n of Object.keys(this.values)) t[n] = zn(e(this.values[n], n));
		return Y(this, { values: t }, !0);
	}
	get(t) {
		return this[e.normalizeUnit(t)];
	}
	set(t) {
		if (!this.isValid) return this;
		let n = {
			...this.values,
			...Bn(t, e.normalizeUnit)
		};
		return Y(this, { values: n });
	}
	reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: n, matrix: r } = {}) {
		let i = {
			loc: this.loc.clone({
				locale: e,
				numberingSystem: t
			}),
			matrix: r,
			conversionAccuracy: n
		};
		return Y(this, i);
	}
	as(e) {
		return this.isValid ? this.shiftTo(e).get(e) : NaN;
	}
	normalize() {
		if (!this.isValid) return this;
		let e = this.toObject();
		return _i(this.matrix, e), Y(this, { values: e }, !0);
	}
	rescale() {
		if (!this.isValid) return this;
		let e = vi(this.normalize().shiftToAll().toObject());
		return Y(this, { values: e }, !0);
	}
	shiftTo(...t) {
		if (!this.isValid || t.length === 0) return this;
		t = t.map((t) => e.normalizeUnit(t));
		let n = {}, r = {}, i = this.toObject(), a;
		for (let e of mi) if (t.indexOf(e) >= 0) {
			a = e;
			let t = 0;
			for (let n in r) t += this.matrix[n][e] * r[n], r[n] = 0;
			H(i[e]) && (t += i[e]);
			let o = Math.trunc(t);
			n[e] = o, r[e] = (t * 1e3 - o * 1e3) / 1e3;
		} else H(i[e]) && (r[e] = i[e]);
		for (let e in r) r[e] !== 0 && (n[a] += e === a ? r[e] : r[e] / this.matrix[a][e]);
		return _i(this.matrix, n), Y(this, { values: n }, !0);
	}
	shiftToAll() {
		return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
	}
	negate() {
		if (!this.isValid) return this;
		let e = {};
		for (let t of Object.keys(this.values)) e[t] = this.values[t] === 0 ? 0 : -this.values[t];
		return Y(this, { values: e }, !0);
	}
	removeZeros() {
		if (!this.isValid) return this;
		let e = vi(this.values);
		return Y(this, { values: e }, !0);
	}
	get years() {
		return this.isValid ? this.values.years || 0 : NaN;
	}
	get quarters() {
		return this.isValid ? this.values.quarters || 0 : NaN;
	}
	get months() {
		return this.isValid ? this.values.months || 0 : NaN;
	}
	get weeks() {
		return this.isValid ? this.values.weeks || 0 : NaN;
	}
	get days() {
		return this.isValid ? this.values.days || 0 : NaN;
	}
	get hours() {
		return this.isValid ? this.values.hours || 0 : NaN;
	}
	get minutes() {
		return this.isValid ? this.values.minutes || 0 : NaN;
	}
	get seconds() {
		return this.isValid ? this.values.seconds || 0 : NaN;
	}
	get milliseconds() {
		return this.isValid ? this.values.milliseconds || 0 : NaN;
	}
	get isValid() {
		return this.invalid === null;
	}
	get invalidReason() {
		return this.invalid ? this.invalid.reason : null;
	}
	get invalidExplanation() {
		return this.invalid ? this.invalid.explanation : null;
	}
	equals(e) {
		if (!this.isValid || !e.isValid || !this.loc.equals(e.loc)) return !1;
		function t(e, t) {
			return e === void 0 || e === 0 ? t === void 0 || t === 0 : e === t;
		}
		for (let n of mi) if (!t(this.values[n], e.values[n])) return !1;
		return !0;
	}
}, yi = "Invalid Interval";
function bi(e, t) {
	return !e || !e.isValid ? xi.invalid("missing or invalid start") : !t || !t.isValid ? xi.invalid("missing or invalid end") : t < e ? xi.invalid("end before start", `The end of an interval must be after its start, but you had start=${e.toISO()} and end=${t.toISO()}`) : null;
}
var xi = class e {
	constructor(e) {
		this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
	}
	static invalid(t, n = null) {
		if (!t) throw new k("need to specify a reason the Interval is invalid");
		let r = t instanceof z ? t : new z(t, n);
		if (R.throwOnInvalid) throw new Ne(r);
		return new e({ invalid: r });
	}
	static fromDateTimes(t, n) {
		let r = Sa(t), i = Sa(n);
		return bi(r, i) ?? new e({
			start: r,
			end: i
		});
	}
	static after(t, n) {
		let r = X.fromDurationLike(n), i = Sa(t);
		return e.fromDateTimes(i, i.plus(r));
	}
	static before(t, n) {
		let r = X.fromDurationLike(n), i = Sa(t);
		return e.fromDateTimes(i.minus(r), i);
	}
	static fromISO(t, n) {
		let [r, i] = (t || "").split("/", 2);
		if (r && i) {
			let t, a;
			try {
				t = $.fromISO(r, n), a = t.isValid;
			} catch {
				a = !1;
			}
			let o, s;
			try {
				o = $.fromISO(i, n), s = o.isValid;
			} catch {
				s = !1;
			}
			if (a && s) return e.fromDateTimes(t, o);
			if (a) {
				let r = X.fromISO(i, n);
				if (r.isValid) return e.after(t, r);
			} else if (s) {
				let t = X.fromISO(r, n);
				if (t.isValid) return e.before(o, t);
			}
		}
		return e.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
	}
	static isInterval(e) {
		return e && e.isLuxonInterval || !1;
	}
	get start() {
		return this.isValid ? this.s : null;
	}
	get end() {
		return this.isValid ? this.e : null;
	}
	get lastDateTime() {
		return this.isValid && this.e ? this.e.minus(1) : null;
	}
	get isValid() {
		return this.invalidReason === null;
	}
	get invalidReason() {
		return this.invalid ? this.invalid.reason : null;
	}
	get invalidExplanation() {
		return this.invalid ? this.invalid.explanation : null;
	}
	length(e = "milliseconds") {
		return this.isValid ? this.toDuration(e).get(e) : NaN;
	}
	count(e = "milliseconds", t) {
		if (!this.isValid) return NaN;
		let n = this.start.startOf(e, t), r;
		return r = t?.useLocaleWeeks ? this.end.reconfigure({ locale: n.locale }) : this.end, r = r.startOf(e, t), Math.floor(r.diff(n, e).get(e)) + (r.valueOf() !== this.end.valueOf());
	}
	hasSame(e) {
		return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
	}
	isEmpty() {
		return this.s.valueOf() === this.e.valueOf();
	}
	isAfter(e) {
		return this.isValid ? this.s > e : !1;
	}
	isBefore(e) {
		return this.isValid ? this.e <= e : !1;
	}
	contains(e) {
		return this.isValid ? this.s <= e && this.e > e : !1;
	}
	set({ start: t, end: n } = {}) {
		return this.isValid ? e.fromDateTimes(t || this.s, n || this.e) : this;
	}
	splitAt(...t) {
		if (!this.isValid) return [];
		let n = t.map(Sa).filter((e) => this.contains(e)).sort((e, t) => e.toMillis() - t.toMillis()), r = [], { s: i } = this, a = 0;
		for (; i < this.e;) {
			let t = n[a] || this.e, o = +t > +this.e ? this.e : t;
			r.push(e.fromDateTimes(i, o)), i = o, a += 1;
		}
		return r;
	}
	splitBy(t) {
		let n = X.fromDurationLike(t);
		if (!this.isValid || !n.isValid || n.as("milliseconds") === 0) return [];
		let { s: r } = this, i = 1, a, o = [];
		for (; r < this.e;) {
			let t = this.start.plus(n.mapUnits((e) => e * i));
			a = +t > +this.e ? this.e : t, o.push(e.fromDateTimes(r, a)), r = a, i += 1;
		}
		return o;
	}
	divideEqually(e) {
		return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
	}
	overlaps(e) {
		return this.e > e.s && this.s < e.e;
	}
	abutsStart(e) {
		return this.isValid ? +this.e == +e.s : !1;
	}
	abutsEnd(e) {
		return this.isValid ? +e.e == +this.s : !1;
	}
	engulfs(e) {
		return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
	}
	equals(e) {
		return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
	}
	intersection(t) {
		if (!this.isValid) return this;
		let n = this.s > t.s ? this.s : t.s, r = this.e < t.e ? this.e : t.e;
		return n >= r ? null : e.fromDateTimes(n, r);
	}
	union(t) {
		if (!this.isValid) return this;
		let n = this.s < t.s ? this.s : t.s, r = this.e > t.e ? this.e : t.e;
		return e.fromDateTimes(n, r);
	}
	static merge(e) {
		let [t, n] = e.sort((e, t) => e.s - t.s).reduce(([e, t], n) => t ? t.overlaps(n) || t.abutsStart(n) ? [e, t.union(n)] : [e.concat([t]), n] : [e, n], [[], null]);
		return n && t.push(n), t;
	}
	static xor(t) {
		let n = null, r = 0, i = [], a = t.map((e) => [{
			time: e.s,
			type: "s"
		}, {
			time: e.e,
			type: "e"
		}]), o = Array.prototype.concat(...a).sort((e, t) => e.time - t.time);
		for (let t of o) r += t.type === "s" ? 1 : -1, r === 1 ? n = t.time : (n && +n != +t.time && i.push(e.fromDateTimes(n, t.time)), n = null);
		return e.merge(i);
	}
	difference(...t) {
		return e.xor([this].concat(t)).map((e) => this.intersection(e)).filter((e) => e && !e.isEmpty());
	}
	toString() {
		return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : yi;
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
	}
	toLocaleString(e = Le, t = {}) {
		return this.isValid ? q.create(this.s.loc.clone(t), e).formatInterval(this) : yi;
	}
	toISO(e) {
		return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : yi;
	}
	toISODate() {
		return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : yi;
	}
	toISOTime(e) {
		return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : yi;
	}
	toFormat(e, { separator: t = " – " } = {}) {
		return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : yi;
	}
	toDuration(e, t) {
		return this.isValid ? this.e.diff(this.s, e, t) : X.invalid(this.invalidReason);
	}
	mapEndpoints(t) {
		return e.fromDateTimes(t(this.s), t(this.e));
	}
}, Si = class {
	static hasDST(e = R.defaultZone) {
		let t = $.now().setZone(e).set({ month: 12 });
		return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
	}
	static isValidIANAZone(e) {
		return mt.isValidZone(e);
	}
	static normalizeZone(e) {
		return I(e, R.defaultZone);
	}
	static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
		return (t || P.create(e)).getStartOfWeek();
	}
	static getMinimumDaysInFirstWeek({ locale: e = null, locObj: t = null } = {}) {
		return (t || P.create(e)).getMinDaysInFirstWeek();
	}
	static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
		return (t || P.create(e)).getWeekendDays().slice();
	}
	static months(e = "long", { locale: t = null, numberingSystem: n = null, locObj: r = null, outputCalendar: i = "gregory" } = {}) {
		return (r || P.create(t, n, i)).months(e);
	}
	static monthsFormat(e = "long", { locale: t = null, numberingSystem: n = null, locObj: r = null, outputCalendar: i = "gregory" } = {}) {
		return (r || P.create(t, n, i)).months(e, !0);
	}
	static weekdays(e = "long", { locale: t = null, numberingSystem: n = null, locObj: r = null } = {}) {
		return (r || P.create(t, n, null)).weekdays(e);
	}
	static weekdaysFormat(e = "long", { locale: t = null, numberingSystem: n = null, locObj: r = null } = {}) {
		return (r || P.create(t, n, null)).weekdays(e, !0);
	}
	static meridiems({ locale: e = null } = {}) {
		return P.create(e).meridiems();
	}
	static eras(e = "short", { locale: t = null } = {}) {
		return P.create(t, null, "gregory").eras(e);
	}
	static features() {
		return {
			relative: bn(),
			localeWeek: xn()
		};
	}
};
function Ci(e, t) {
	let n = (e) => e.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), r = n(t) - n(e);
	return Math.floor(X.fromMillis(r).as("days"));
}
function wi(e, t, n) {
	let r = [
		["years", (e, t) => t.year - e.year],
		["quarters", (e, t) => t.quarter - e.quarter + (t.year - e.year) * 4],
		["months", (e, t) => t.month - e.month + (t.year - e.year) * 12],
		["weeks", (e, t) => {
			let n = Ci(e, t);
			return (n - n % 7) / 7;
		}],
		["days", Ci]
	], i = {}, a = e, o, s;
	for (let [c, l] of r) n.indexOf(c) >= 0 && (o = c, i[c] = l(e, t), s = a.plus(i), s > t ? (i[c]--, e = a.plus(i), e > t && (s = e, i[c]--, e = a.plus(i))) : e = s);
	return [
		e,
		i,
		s,
		o
	];
}
function Ti(e, t, n, r) {
	let [i, a, o, s] = wi(e, t, n), c = t - i, l = n.filter((e) => [
		"hours",
		"minutes",
		"seconds",
		"milliseconds"
	].indexOf(e) >= 0);
	l.length === 0 && (o < t && (o = i.plus({ [s]: 1 })), o !== i && (a[s] = (a[s] || 0) + c / (o - i)));
	let u = X.fromObject(a, r);
	return l.length > 0 ? X.fromMillis(c, r).shiftTo(...l).plus(u) : u;
}
var Ei = "missing Intl.DateTimeFormat.formatToParts support";
function Z(e, t = (e) => e) {
	return {
		regex: e,
		deser: ([e]) => t(Wt(e))
	};
}
var Di = "[ \xA0]", Oi = new RegExp(Di, "g");
function ki(e) {
	return e.replace(/\./g, "\\.?").replace(Oi, Di);
}
function Ai(e) {
	return e.replace(/\./g, "").replace(Oi, " ").toLowerCase();
}
function Q(e, t) {
	return e === null ? null : {
		regex: RegExp(e.map(ki).join("|")),
		deser: ([n]) => e.findIndex((e) => Ai(n) === Ai(e)) + t
	};
}
function ji(e, t) {
	return {
		regex: e,
		deser: ([, e, t]) => Rn(e, t),
		groups: t
	};
}
function Mi(e) {
	return {
		regex: e,
		deser: ([e]) => e
	};
}
function Ni(e) {
	return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Pi(e, t) {
	let n = L(t), r = L(t, "{2}"), i = L(t, "{3}"), a = L(t, "{4}"), o = L(t, "{6}"), s = L(t, "{1,2}"), c = L(t, "{1,3}"), l = L(t, "{1,6}"), u = L(t, "{1,9}"), d = L(t, "{2,4}"), f = L(t, "{4,6}"), p = (e) => ({
		regex: RegExp(Ni(e.val)),
		deser: ([e]) => e,
		literal: !0
	}), m = ((m) => {
		if (e.literal) return p(m);
		switch (m.val) {
			case "G": return Q(t.eras("short"), 0);
			case "GG": return Q(t.eras("long"), 0);
			case "y": return Z(l);
			case "yy": return Z(d, In);
			case "yyyy": return Z(a);
			case "yyyyy": return Z(f);
			case "yyyyyy": return Z(o);
			case "M": return Z(s);
			case "MM": return Z(r);
			case "MMM": return Q(t.months("short", !0), 1);
			case "MMMM": return Q(t.months("long", !0), 1);
			case "L": return Z(s);
			case "LL": return Z(r);
			case "LLL": return Q(t.months("short", !1), 1);
			case "LLLL": return Q(t.months("long", !1), 1);
			case "d": return Z(s);
			case "dd": return Z(r);
			case "o": return Z(c);
			case "ooo": return Z(i);
			case "HH": return Z(r);
			case "H": return Z(s);
			case "hh": return Z(r);
			case "h": return Z(s);
			case "mm": return Z(r);
			case "m": return Z(s);
			case "q": return Z(s);
			case "qq": return Z(r);
			case "s": return Z(s);
			case "ss": return Z(r);
			case "S": return Z(c);
			case "SSS": return Z(i);
			case "u": return Mi(u);
			case "uu": return Mi(s);
			case "uuu": return Z(n);
			case "a": return Q(t.meridiems(), 0);
			case "kkkk": return Z(a);
			case "kk": return Z(d, In);
			case "W": return Z(s);
			case "WW": return Z(r);
			case "E":
			case "c": return Z(n);
			case "EEE": return Q(t.weekdays("short", !1), 1);
			case "EEEE": return Q(t.weekdays("long", !1), 1);
			case "ccc": return Q(t.weekdays("short", !0), 1);
			case "cccc": return Q(t.weekdays("long", !0), 1);
			case "Z":
			case "ZZ": return ji(RegExp(`([+-]${s.source})(?::(${r.source}))?`), 2);
			case "ZZZ": return ji(RegExp(`([+-]${s.source})(${r.source})?`), 2);
			case "z": return Mi(/[a-z_+-/]{1,256}?/i);
			case " ": return Mi(/[^\S\n\r]/);
			default: return p(m);
		}
	})(e) || { invalidReason: Ei };
	return m.token = e, m;
}
var Fi = {
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
function Ii(e, t, n) {
	let { type: r, value: i } = e;
	if (r === "literal") {
		let e = /^\s+$/.test(i);
		return {
			literal: !e,
			val: e ? " " : i
		};
	}
	let a = t[r], o = r;
	r === "hour" && (o = t.hour12 == null ? t.hourCycle == null ? n.hour12 ? "hour12" : "hour24" : t.hourCycle === "h11" || t.hourCycle === "h12" ? "hour12" : "hour24" : t.hour12 ? "hour12" : "hour24");
	let s = Fi[o];
	if (typeof s == "object" && (s = s[a]), s) return {
		literal: !1,
		val: s
	};
}
function Li(e) {
	return [`^${e.map((e) => e.regex).reduce((e, t) => `${e}(${t.source})`, "")}$`, e];
}
function Ri(e, t, n) {
	let r = e.match(t);
	if (r) {
		let e = {}, t = 1;
		for (let i in n) if (Tn(n, i)) {
			let a = n[i], o = a.groups ? a.groups + 1 : 1;
			!a.literal && a.token && (e[a.token.val[0]] = a.deser(r.slice(t, t + o))), t += o;
		}
		return [r, e];
	} else return [r, {}];
}
function zi(e) {
	let t = (e) => {
		switch (e) {
			case "S": return "millisecond";
			case "s": return "second";
			case "m": return "minute";
			case "h":
			case "H": return "hour";
			case "d": return "day";
			case "o": return "ordinal";
			case "L":
			case "M": return "month";
			case "y": return "year";
			case "E":
			case "c": return "weekday";
			case "W": return "weekNumber";
			case "k": return "weekYear";
			case "q": return "quarter";
			default: return null;
		}
	}, n = null, r;
	return V(e.z) || (n = mt.create(e.z)), V(e.Z) || (n ||= new F(e.Z), r = e.Z), V(e.q) || (e.M = (e.q - 1) * 3 + 1), V(e.h) || (e.h < 12 && e.a === 1 ? e.h += 12 : e.h === 12 && e.a === 0 && (e.h = 0)), e.G === 0 && e.y && (e.y = -e.y), V(e.u) || (e.S = On(e.u)), [
		Object.keys(e).reduce((n, r) => {
			let i = t(r);
			return i && (n[i] = e[r]), n;
		}, {}),
		n,
		r
	];
}
var Bi = null;
function Vi() {
	return Bi ||= $.fromMillis(1555555555555), Bi;
}
function Hi(e, t) {
	if (e.literal) return e;
	let n = qi(q.macroTokenToFormatOpts(e.val), t);
	return n == null || n.includes(void 0) ? e : n;
}
function Ui(e, t) {
	return Array.prototype.concat(...e.map((e) => Hi(e, t)));
}
var Wi = class {
	constructor(e, t) {
		if (this.locale = e, this.format = t, this.tokens = Ui(q.parseFormat(t), e), this.units = this.tokens.map((t) => Pi(t, e)), this.disqualifyingUnit = this.units.find((e) => e.invalidReason), !this.disqualifyingUnit) {
			let [e, t] = Li(this.units);
			this.regex = RegExp(e, "i"), this.handlers = t;
		}
	}
	explainFromTokens(e) {
		if (this.isValid) {
			let [t, n] = Ri(e, this.regex, this.handlers), [r, i, a] = n ? zi(n) : [
				null,
				null,
				void 0
			];
			if (Tn(n, "a") && Tn(n, "H")) throw new Fe("Can't include meridiem when specifying 24-hour format");
			return {
				input: e,
				tokens: this.tokens,
				regex: this.regex,
				rawMatches: t,
				matches: n,
				result: r,
				zone: i,
				specificOffset: a
			};
		} else return {
			input: e,
			tokens: this.tokens,
			invalidReason: this.invalidReason
		};
	}
	get isValid() {
		return !this.disqualifyingUnit;
	}
	get invalidReason() {
		return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
	}
};
function Gi(e, t, n) {
	return new Wi(e, n).explainFromTokens(t);
}
function Ki(e, t, n) {
	let { result: r, zone: i, specificOffset: a, invalidReason: o } = Gi(e, t, n);
	return [
		r,
		i,
		a,
		o
	];
}
function qi(e, t) {
	if (!e) return null;
	let n = q.create(t, e).dtFormatter(Vi()), r = n.formatToParts(), i = n.resolvedOptions();
	return r.map((t) => Ii(t, e, i));
}
var Ji = "Invalid DateTime", Yi = 864e13;
function Xi(e) {
	return new z("unsupported zone", `the zone "${e.name}" is not supported`);
}
function Zi(e) {
	return e.weekData === null && (e.weekData = cn(e.c)), e.weekData;
}
function Qi(e) {
	return e.localWeekData === null && (e.localWeekData = cn(e.c, e.loc.getMinDaysInFirstWeek(), e.loc.getStartOfWeek())), e.localWeekData;
}
function $i(e, t) {
	let n = {
		ts: e.ts,
		zone: e.zone,
		c: e.c,
		o: e.o,
		loc: e.loc,
		invalid: e.invalid
	};
	return new $({
		...n,
		...t,
		old: n
	});
}
function ea(e, t, n) {
	let r = e - t * 60 * 1e3, i = n.offset(r);
	if (t === i) return [r, t];
	r -= (i - t) * 60 * 1e3;
	let a = n.offset(r);
	return i === a ? [r, i] : [e - Math.min(i, a) * 60 * 1e3, Math.max(i, a)];
}
function ta(e, t) {
	e += t * 60 * 1e3;
	let n = new Date(e);
	return {
		year: n.getUTCFullYear(),
		month: n.getUTCMonth() + 1,
		day: n.getUTCDate(),
		hour: n.getUTCHours(),
		minute: n.getUTCMinutes(),
		second: n.getUTCSeconds(),
		millisecond: n.getUTCMilliseconds()
	};
}
function na(e, t, n) {
	return ea(Nn(e), t, n);
}
function ra(e, t) {
	let n = e.o, r = e.c.year + Math.trunc(t.years), i = e.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3, a = {
		...e.c,
		year: r,
		month: i,
		day: Math.min(e.c.day, Mn(r, i)) + Math.trunc(t.days) + Math.trunc(t.weeks) * 7
	}, o = X.fromObject({
		years: t.years - Math.trunc(t.years),
		quarters: t.quarters - Math.trunc(t.quarters),
		months: t.months - Math.trunc(t.months),
		weeks: t.weeks - Math.trunc(t.weeks),
		days: t.days - Math.trunc(t.days),
		hours: t.hours,
		minutes: t.minutes,
		seconds: t.seconds,
		milliseconds: t.milliseconds
	}).as("milliseconds"), [s, c] = ea(Nn(a), n, e.zone);
	return o !== 0 && (s += o, c = e.zone.offset(s)), {
		ts: s,
		o: c
	};
}
function ia(e, t, n, r, i, a) {
	let { setZone: o, zone: s } = n;
	if (e && Object.keys(e).length !== 0 || t) {
		let r = t || s, i = $.fromObject(e, {
			...n,
			zone: r,
			specificOffset: a
		});
		return o ? i : i.setZone(s);
	} else return $.invalid(new z("unparsable", `the input "${i}" can't be parsed as ${r}`));
}
function aa(e, t, n = !0) {
	return e.isValid ? q.create(P.create("en-US"), {
		allowZ: n,
		forceSimple: !0
	}).formatDateTimeFromString(e, t) : null;
}
function oa(e, t, n) {
	let r = e.c.year > 9999 || e.c.year < 0, i = "";
	if (r && e.c.year >= 0 && (i += "+"), i += W(e.c.year, r ? 6 : 4), n === "year") return i;
	if (t) {
		if (i += "-", i += W(e.c.month), n === "month") return i;
		i += "-";
	} else if (i += W(e.c.month), n === "month") return i;
	return i += W(e.c.day), i;
}
function sa(e, t, n, r, i, a, o) {
	let s = !n || e.c.millisecond !== 0 || e.c.second !== 0, c = "";
	switch (o) {
		case "day":
		case "month":
		case "year": break;
		default:
			if (c += W(e.c.hour), o === "hour") break;
			if (t) {
				if (c += ":", c += W(e.c.minute), o === "minute") break;
				s && (c += ":", c += W(e.c.second));
			} else {
				if (c += W(e.c.minute), o === "minute") break;
				s && (c += W(e.c.second));
			}
			if (o === "second") break;
			s && (!r || e.c.millisecond !== 0) && (c += ".", c += W(e.c.millisecond, 3));
	}
	return i && (e.isOffsetFixed && e.offset === 0 && !a ? c += "Z" : e.o < 0 ? (c += "-", c += W(Math.trunc(-e.o / 60)), c += ":", c += W(Math.trunc(-e.o % 60))) : (c += "+", c += W(Math.trunc(e.o / 60)), c += ":", c += W(Math.trunc(e.o % 60)))), a && (c += "[" + e.zone.ianaName + "]"), c;
}
var ca = {
	month: 1,
	day: 1,
	hour: 0,
	minute: 0,
	second: 0,
	millisecond: 0
}, la = {
	weekNumber: 1,
	weekday: 1,
	hour: 0,
	minute: 0,
	second: 0,
	millisecond: 0
}, ua = {
	ordinal: 1,
	hour: 0,
	minute: 0,
	second: 0,
	millisecond: 0
}, da = [
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"millisecond"
], fa = [
	"weekYear",
	"weekNumber",
	"weekday",
	"hour",
	"minute",
	"second",
	"millisecond"
], pa = [
	"year",
	"ordinal",
	"hour",
	"minute",
	"second",
	"millisecond"
];
function ma(e) {
	let t = {
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
	}[e.toLowerCase()];
	if (!t) throw new Ie(e);
	return t;
}
function ha(e) {
	switch (e.toLowerCase()) {
		case "localweekday":
		case "localweekdays": return "localWeekday";
		case "localweeknumber":
		case "localweeknumbers": return "localWeekNumber";
		case "localweekyear":
		case "localweekyears": return "localWeekYear";
		default: return ma(e);
	}
}
function ga(e) {
	if (ba === void 0 && (ba = R.now()), e.type !== "iana") return e.offset(ba);
	let t = e.name, n = xa.get(t);
	return n === void 0 && (n = e.offset(ba), xa.set(t, n)), n;
}
function _a(e, t) {
	let n = I(t.zone, R.defaultZone);
	if (!n.isValid) return $.invalid(Xi(n));
	let r = P.fromObject(t), i, a;
	if (V(e.year)) i = R.now();
	else {
		for (let t of da) V(e[t]) && (e[t] = ca[t]);
		let t = hn(e) || gn(e);
		if (t) return $.invalid(t);
		let r = ga(n);
		[i, a] = na(e, r, n);
	}
	return new $({
		ts: i,
		zone: n,
		loc: r,
		o: a
	});
}
function va(e, t, n) {
	let r = V(n.round) ? !0 : n.round, i = V(n.rounding) ? "trunc" : n.rounding, a = (e, a) => (e = kn(e, r || n.calendary ? 0 : 2, n.calendary ? "round" : i), t.loc.clone(n).relFormatter(n).format(e, a)), o = (r) => n.calendary ? t.hasSame(e, r) ? 0 : t.startOf(r).diff(e.startOf(r), r).get(r) : t.diff(e, r).get(r);
	if (n.unit) return a(o(n.unit), n.unit);
	for (let e of n.units) {
		let t = o(e);
		if (Math.abs(t) >= 1) return a(t, e);
	}
	return a(e > t ? -0 : 0, n.units[n.units.length - 1]);
}
function ya(e) {
	let t = {}, n;
	return e.length > 0 && typeof e[e.length - 1] == "object" ? (t = e[e.length - 1], n = Array.from(e).slice(0, e.length - 1)) : n = Array.from(e), [t, n];
}
var ba, xa = /* @__PURE__ */ new Map(), $ = class e {
	constructor(e) {
		let t = e.zone || R.defaultZone, n = e.invalid || (Number.isNaN(e.ts) ? new z("invalid input") : null) || (t.isValid ? null : Xi(t));
		this.ts = V(e.ts) ? R.now() : e.ts;
		let r = null, i = null;
		if (!n) if (e.old && e.old.ts === this.ts && e.old.zone.equals(t)) [r, i] = [e.old.c, e.old.o];
		else {
			let a = H(e.o) && !e.old ? e.o : t.offset(this.ts);
			r = ta(this.ts, a), n = Number.isNaN(r.year) ? new z("invalid input") : null, r = n ? null : r, i = n ? null : a;
		}
		this._zone = t, this.loc = e.loc || P.create(), this.invalid = n, this.weekData = null, this.localWeekData = null, this.c = r, this.o = i, this.isLuxonDateTime = !0;
	}
	static now() {
		return new e({});
	}
	static local() {
		let [e, t] = ya(arguments), [n, r, i, a, o, s, c] = t;
		return _a({
			year: n,
			month: r,
			day: i,
			hour: a,
			minute: o,
			second: s,
			millisecond: c
		}, e);
	}
	static utc() {
		let [e, t] = ya(arguments), [n, r, i, a, o, s, c] = t;
		return e.zone = F.utcInstance, _a({
			year: n,
			month: r,
			day: i,
			hour: a,
			minute: o,
			second: s,
			millisecond: c
		}, e);
	}
	static fromJSDate(t, n = {}) {
		let r = yn(t) ? t.valueOf() : NaN;
		if (Number.isNaN(r)) return e.invalid("invalid input");
		let i = I(n.zone, R.defaultZone);
		return i.isValid ? new e({
			ts: r,
			zone: i,
			loc: P.fromObject(n)
		}) : e.invalid(Xi(i));
	}
	static fromMillis(t, n = {}) {
		if (!H(t)) throw new k(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`);
		return t < -864e13 || t > Yi ? e.invalid("Timestamp out of range") : new e({
			ts: t,
			zone: I(n.zone, R.defaultZone),
			loc: P.fromObject(n)
		});
	}
	static fromSeconds(t, n = {}) {
		if (H(t)) return new e({
			ts: t * 1e3,
			zone: I(n.zone, R.defaultZone),
			loc: P.fromObject(n)
		});
		throw new k("fromSeconds requires a numerical input");
	}
	static fromObject(t, n = {}) {
		t ||= {};
		let r = I(n.zone, R.defaultZone);
		if (!r.isValid) return e.invalid(Xi(r));
		let i = P.fromObject(n), a = Bn(t, ha), { minDaysInFirstWeek: o, startOfWeek: s } = fn(a, i), c = R.now(), l = V(n.specificOffset) ? r.offset(c) : n.specificOffset, u = !V(a.ordinal), d = !V(a.year), f = !V(a.month) || !V(a.day), p = d || f, m = a.weekYear || a.weekNumber;
		if ((p || u) && m) throw new Fe("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
		if (f && u) throw new Fe("Can't mix ordinal dates with month/day");
		let h = m || a.weekday && !p, g, _, v = ta(c, l);
		h ? (g = fa, _ = la, v = cn(v, o, s)) : u ? (g = pa, _ = ua, v = un(v)) : (g = da, _ = ca);
		let y = !1;
		for (let e of g) {
			let t = a[e];
			V(t) ? y ? a[e] = _[e] : a[e] = v[e] : y = !0;
		}
		let b = (h ? pn(a, o, s) : u ? mn(a) : hn(a)) || gn(a);
		if (b) return e.invalid(b);
		let [ee, x] = na(h ? ln(a, o, s) : u ? dn(a) : a, l, r), S = new e({
			ts: ee,
			zone: r,
			o: x,
			loc: i
		});
		return a.weekday && p && t.weekday !== S.weekday ? e.invalid("mismatched weekday", `you can't specify both a weekday of ${a.weekday} and a date of ${S.toISO()}`) : S.isValid ? S : e.invalid(S.invalid);
	}
	static fromISO(e, t = {}) {
		let [n, r] = $r(e);
		return ia(n, r, t, "ISO 8601", e);
	}
	static fromRFC2822(e, t = {}) {
		let [n, r] = ei(e);
		return ia(n, r, t, "RFC 2822", e);
	}
	static fromHTTP(e, t = {}) {
		let [n, r] = ti(e);
		return ia(n, r, t, "HTTP", t);
	}
	static fromFormat(t, n, r = {}) {
		if (V(t) || V(n)) throw new k("fromFormat requires an input string and a format");
		let { locale: i = null, numberingSystem: a = null } = r, [o, s, c, l] = Ki(P.fromOpts({
			locale: i,
			numberingSystem: a,
			defaultToEN: !0
		}), t, n);
		return l ? e.invalid(l) : ia(o, s, r, `format ${n}`, t, c);
	}
	static fromString(t, n, r = {}) {
		return e.fromFormat(t, n, r);
	}
	static fromSQL(e, t = {}) {
		let [n, r] = ci(e);
		return ia(n, r, t, "SQL", e);
	}
	static invalid(t, n = null) {
		if (!t) throw new k("need to specify a reason the DateTime is invalid");
		let r = t instanceof z ? t : new z(t, n);
		if (R.throwOnInvalid) throw new Me(r);
		return new e({ invalid: r });
	}
	static isDateTime(e) {
		return e && e.isLuxonDateTime || !1;
	}
	static parseFormatForOpts(e, t = {}) {
		let n = qi(e, P.fromObject(t));
		return n ? n.map((e) => e ? e.val : null).join("") : null;
	}
	static expandFormat(e, t = {}) {
		return Ui(q.parseFormat(e), P.fromObject(t)).map((e) => e.val).join("");
	}
	static resetCache() {
		ba = void 0, xa.clear();
	}
	get(e) {
		return this[e];
	}
	get isValid() {
		return this.invalid === null;
	}
	get invalidReason() {
		return this.invalid ? this.invalid.reason : null;
	}
	get invalidExplanation() {
		return this.invalid ? this.invalid.explanation : null;
	}
	get locale() {
		return this.isValid ? this.loc.locale : null;
	}
	get numberingSystem() {
		return this.isValid ? this.loc.numberingSystem : null;
	}
	get outputCalendar() {
		return this.isValid ? this.loc.outputCalendar : null;
	}
	get zone() {
		return this._zone;
	}
	get zoneName() {
		return this.isValid ? this.zone.name : null;
	}
	get year() {
		return this.isValid ? this.c.year : NaN;
	}
	get quarter() {
		return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
	}
	get month() {
		return this.isValid ? this.c.month : NaN;
	}
	get day() {
		return this.isValid ? this.c.day : NaN;
	}
	get hour() {
		return this.isValid ? this.c.hour : NaN;
	}
	get minute() {
		return this.isValid ? this.c.minute : NaN;
	}
	get second() {
		return this.isValid ? this.c.second : NaN;
	}
	get millisecond() {
		return this.isValid ? this.c.millisecond : NaN;
	}
	get weekYear() {
		return this.isValid ? Zi(this).weekYear : NaN;
	}
	get weekNumber() {
		return this.isValid ? Zi(this).weekNumber : NaN;
	}
	get weekday() {
		return this.isValid ? Zi(this).weekday : NaN;
	}
	get isWeekend() {
		return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
	}
	get localWeekday() {
		return this.isValid ? Qi(this).weekday : NaN;
	}
	get localWeekNumber() {
		return this.isValid ? Qi(this).weekNumber : NaN;
	}
	get localWeekYear() {
		return this.isValid ? Qi(this).weekYear : NaN;
	}
	get ordinal() {
		return this.isValid ? un(this.c).ordinal : NaN;
	}
	get monthShort() {
		return this.isValid ? Si.months("short", { locObj: this.loc })[this.month - 1] : null;
	}
	get monthLong() {
		return this.isValid ? Si.months("long", { locObj: this.loc })[this.month - 1] : null;
	}
	get weekdayShort() {
		return this.isValid ? Si.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
	}
	get weekdayLong() {
		return this.isValid ? Si.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
	}
	get offset() {
		return this.isValid ? +this.o : NaN;
	}
	get offsetNameShort() {
		return this.isValid ? this.zone.offsetName(this.ts, {
			format: "short",
			locale: this.locale
		}) : null;
	}
	get offsetNameLong() {
		return this.isValid ? this.zone.offsetName(this.ts, {
			format: "long",
			locale: this.locale
		}) : null;
	}
	get isOffsetFixed() {
		return this.isValid ? this.zone.isUniversal : null;
	}
	get isInDST() {
		return this.isOffsetFixed ? !1 : this.offset > this.set({
			month: 1,
			day: 1
		}).offset || this.offset > this.set({ month: 5 }).offset;
	}
	getPossibleOffsets() {
		if (!this.isValid || this.isOffsetFixed) return [this];
		let e = 864e5, t = 6e4, n = Nn(this.c), r = this.zone.offset(n - e), i = this.zone.offset(n + e), a = this.zone.offset(n - r * t), o = this.zone.offset(n - i * t);
		if (a === o) return [this];
		let s = n - a * t, c = n - o * t, l = ta(s, a), u = ta(c, o);
		return l.hour === u.hour && l.minute === u.minute && l.second === u.second && l.millisecond === u.millisecond ? [$i(this, { ts: s }), $i(this, { ts: c })] : [this];
	}
	get isInLeapYear() {
		return An(this.year);
	}
	get daysInMonth() {
		return Mn(this.year, this.month);
	}
	get daysInYear() {
		return this.isValid ? jn(this.year) : NaN;
	}
	get weeksInWeekYear() {
		return this.isValid ? Fn(this.weekYear) : NaN;
	}
	get weeksInLocalWeekYear() {
		return this.isValid ? Fn(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
	}
	resolvedLocaleOptions(e = {}) {
		let { locale: t, numberingSystem: n, calendar: r } = q.create(this.loc.clone(e), e).resolvedOptions(this);
		return {
			locale: t,
			numberingSystem: n,
			outputCalendar: r
		};
	}
	toUTC(e = 0, t = {}) {
		return this.setZone(F.instance(e), t);
	}
	toLocal() {
		return this.setZone(R.defaultZone);
	}
	setZone(t, { keepLocalTime: n = !1, keepCalendarTime: r = !1 } = {}) {
		if (t = I(t, R.defaultZone), t.equals(this.zone)) return this;
		if (t.isValid) {
			let e = this.ts;
			if (n || r) {
				let n = t.offset(this.ts), r = this.toObject();
				[e] = na(r, n, t);
			}
			return $i(this, {
				ts: e,
				zone: t
			});
		} else return e.invalid(Xi(t));
	}
	reconfigure({ locale: e, numberingSystem: t, outputCalendar: n } = {}) {
		let r = this.loc.clone({
			locale: e,
			numberingSystem: t,
			outputCalendar: n
		});
		return $i(this, { loc: r });
	}
	setLocale(e) {
		return this.reconfigure({ locale: e });
	}
	set(e) {
		if (!this.isValid) return this;
		let t = Bn(e, ha), { minDaysInFirstWeek: n, startOfWeek: r } = fn(t, this.loc), i = !V(t.weekYear) || !V(t.weekNumber) || !V(t.weekday), a = !V(t.ordinal), o = !V(t.year), s = !V(t.month) || !V(t.day), c = o || s, l = t.weekYear || t.weekNumber;
		if ((c || a) && l) throw new Fe("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
		if (s && a) throw new Fe("Can't mix ordinal dates with month/day");
		let u;
		i ? u = ln({
			...cn(this.c, n, r),
			...t
		}, n, r) : V(t.ordinal) ? (u = {
			...this.toObject(),
			...t
		}, V(t.day) && (u.day = Math.min(Mn(u.year, u.month), u.day))) : u = dn({
			...un(this.c),
			...t
		});
		let [d, f] = na(u, this.o, this.zone);
		return $i(this, {
			ts: d,
			o: f
		});
	}
	plus(e) {
		if (!this.isValid) return this;
		let t = X.fromDurationLike(e);
		return $i(this, ra(this, t));
	}
	minus(e) {
		if (!this.isValid) return this;
		let t = X.fromDurationLike(e).negate();
		return $i(this, ra(this, t));
	}
	startOf(e, { useLocaleWeeks: t = !1 } = {}) {
		if (!this.isValid) return this;
		let n = {}, r = X.normalizeUnit(e);
		switch (r) {
			case "years": n.month = 1;
			case "quarters":
			case "months": n.day = 1;
			case "weeks":
			case "days": n.hour = 0;
			case "hours": n.minute = 0;
			case "minutes": n.second = 0;
			case "seconds":
				n.millisecond = 0;
				break;
		}
		if (r === "weeks") if (t) {
			let e = this.loc.getStartOfWeek(), { weekday: t } = this;
			t < e && (n.weekNumber = this.weekNumber - 1), n.weekday = e;
		} else n.weekday = 1;
		return r === "quarters" && (n.month = (Math.ceil(this.month / 3) - 1) * 3 + 1), this.set(n);
	}
	endOf(e, t) {
		return this.isValid ? this.plus({ [e]: 1 }).startOf(e, t).minus(1) : this;
	}
	toFormat(e, t = {}) {
		return this.isValid ? q.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : Ji;
	}
	toLocaleString(e = Le, t = {}) {
		return this.isValid ? q.create(this.loc.clone(t), e).formatDateTime(this) : Ji;
	}
	toLocaleParts(e = {}) {
		return this.isValid ? q.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
	}
	toISO({ format: e = "extended", suppressSeconds: t = !1, suppressMilliseconds: n = !1, includeOffset: r = !0, extendedZone: i = !1, precision: a = "milliseconds" } = {}) {
		if (!this.isValid) return null;
		a = ma(a);
		let o = e === "extended", s = oa(this, o, a);
		return da.indexOf(a) >= 3 && (s += "T"), s += sa(this, o, t, n, r, i, a), s;
	}
	toISODate({ format: e = "extended", precision: t = "day" } = {}) {
		return this.isValid ? oa(this, e === "extended", ma(t)) : null;
	}
	toISOWeekDate() {
		return aa(this, "kkkk-'W'WW-c");
	}
	toISOTime({ suppressMilliseconds: e = !1, suppressSeconds: t = !1, includeOffset: n = !0, includePrefix: r = !1, extendedZone: i = !1, format: a = "extended", precision: o = "milliseconds" } = {}) {
		return this.isValid ? (o = ma(o), (r && da.indexOf(o) >= 3 ? "T" : "") + sa(this, a === "extended", t, e, n, i, o)) : null;
	}
	toRFC2822() {
		return aa(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
	}
	toHTTP() {
		return aa(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
	}
	toSQLDate() {
		return this.isValid ? oa(this, !0) : null;
	}
	toSQLTime({ includeOffset: e = !0, includeZone: t = !1, includeOffsetSpace: n = !0 } = {}) {
		let r = "HH:mm:ss.SSS";
		return (t || e) && (n && (r += " "), t ? r += "z" : e && (r += "ZZ")), aa(this, r, !0);
	}
	toSQL(e = {}) {
		return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
	}
	toString() {
		return this.isValid ? this.toISO() : Ji;
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
	}
	valueOf() {
		return this.toMillis();
	}
	toMillis() {
		return this.isValid ? this.ts : NaN;
	}
	toSeconds() {
		return this.isValid ? this.ts / 1e3 : NaN;
	}
	toUnixInteger() {
		return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
	}
	toJSON() {
		return this.toISO();
	}
	toBSON() {
		return this.toJSDate();
	}
	toObject(e = {}) {
		if (!this.isValid) return {};
		let t = { ...this.c };
		return e.includeConfig && (t.outputCalendar = this.outputCalendar, t.numberingSystem = this.loc.numberingSystem, t.locale = this.loc.locale), t;
	}
	toJSDate() {
		return new Date(this.isValid ? this.ts : NaN);
	}
	diff(e, t = "milliseconds", n = {}) {
		if (!this.isValid || !e.isValid) return X.invalid("created by diffing an invalid DateTime");
		let r = {
			locale: this.locale,
			numberingSystem: this.numberingSystem,
			...n
		}, i = Sn(t).map(X.normalizeUnit), a = e.valueOf() > this.valueOf(), o = Ti(a ? this : e, a ? e : this, i, r);
		return a ? o.negate() : o;
	}
	diffNow(t = "milliseconds", n = {}) {
		return this.diff(e.now(), t, n);
	}
	until(e) {
		return this.isValid ? xi.fromDateTimes(this, e) : this;
	}
	hasSame(e, t, n) {
		if (!this.isValid) return !1;
		let r = e.valueOf(), i = this.setZone(e.zone, { keepLocalTime: !0 });
		return i.startOf(t, n) <= r && r <= i.endOf(t, n);
	}
	equals(e) {
		return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
	}
	toRelative(t = {}) {
		if (!this.isValid) return null;
		let n = t.base || e.fromObject({}, { zone: this.zone }), r = t.padding ? this < n ? -t.padding : t.padding : 0, i = [
			"years",
			"months",
			"days",
			"hours",
			"minutes",
			"seconds"
		], a = t.unit;
		return Array.isArray(t.unit) && (i = t.unit, a = void 0), va(n, this.plus(r), {
			...t,
			numeric: "always",
			units: i,
			unit: a
		});
	}
	toRelativeCalendar(t = {}) {
		return this.isValid ? va(t.base || e.fromObject({}, { zone: this.zone }), this, {
			...t,
			numeric: "auto",
			units: [
				"years",
				"months",
				"days"
			],
			calendary: !0
		}) : null;
	}
	static min(...t) {
		if (!t.every(e.isDateTime)) throw new k("min requires all arguments be DateTimes");
		return Cn(t, (e) => e.valueOf(), Math.min);
	}
	static max(...t) {
		if (!t.every(e.isDateTime)) throw new k("max requires all arguments be DateTimes");
		return Cn(t, (e) => e.valueOf(), Math.max);
	}
	static fromFormatExplain(e, t, n = {}) {
		let { locale: r = null, numberingSystem: i = null } = n;
		return Gi(P.fromOpts({
			locale: r,
			numberingSystem: i,
			defaultToEN: !0
		}), e, t);
	}
	static fromStringExplain(t, n, r = {}) {
		return e.fromFormatExplain(t, n, r);
	}
	static buildFormatParser(e, t = {}) {
		let { locale: n = null, numberingSystem: r = null } = t;
		return new Wi(P.fromOpts({
			locale: n,
			numberingSystem: r,
			defaultToEN: !0
		}), e);
	}
	static fromFormatParser(t, n, r = {}) {
		if (V(t) || V(n)) throw new k("fromFormatParser requires an input string and a format parser");
		let { locale: i = null, numberingSystem: a = null } = r, o = P.fromOpts({
			locale: i,
			numberingSystem: a,
			defaultToEN: !0
		});
		if (!o.equals(n.locale)) throw new k(`fromFormatParser called with a locale of ${o}, but the format parser was created for ${n.locale}`);
		let { result: s, zone: c, specificOffset: l, invalidReason: u } = n.explainFromTokens(t);
		return u ? e.invalid(u) : ia(s, c, r, `format ${n.format}`, t, l);
	}
	static get DATE_SHORT() {
		return Le;
	}
	static get DATE_MED() {
		return Re;
	}
	static get DATE_MED_WITH_WEEKDAY() {
		return ze;
	}
	static get DATE_FULL() {
		return Be;
	}
	static get DATE_HUGE() {
		return Ve;
	}
	static get TIME_SIMPLE() {
		return He;
	}
	static get TIME_WITH_SECONDS() {
		return Ue;
	}
	static get TIME_WITH_SHORT_OFFSET() {
		return We;
	}
	static get TIME_WITH_LONG_OFFSET() {
		return Ge;
	}
	static get TIME_24_SIMPLE() {
		return Ke;
	}
	static get TIME_24_WITH_SECONDS() {
		return qe;
	}
	static get TIME_24_WITH_SHORT_OFFSET() {
		return Je;
	}
	static get TIME_24_WITH_LONG_OFFSET() {
		return Ye;
	}
	static get DATETIME_SHORT() {
		return Xe;
	}
	static get DATETIME_SHORT_WITH_SECONDS() {
		return Ze;
	}
	static get DATETIME_MED() {
		return Qe;
	}
	static get DATETIME_MED_WITH_SECONDS() {
		return $e;
	}
	static get DATETIME_MED_WITH_WEEKDAY() {
		return et;
	}
	static get DATETIME_FULL() {
		return tt;
	}
	static get DATETIME_FULL_WITH_SECONDS() {
		return nt;
	}
	static get DATETIME_HUGE() {
		return rt;
	}
	static get DATETIME_HUGE_WITH_SECONDS() {
		return it;
	}
};
function Sa(e) {
	if ($.isDateTime(e)) return e;
	if (e && e.valueOf && H(e.valueOf())) return $.fromJSDate(e);
	if (e && typeof e == "object") return $.fromObject(e);
	throw new k(`Unknown datetime argument: ${e}, of type ${typeof e}`);
}
//#endregion
//#region lib/sun-altitude-path.js
function Ca(e, t, n, r) {
	let i = e.astronomyJS, a = i.getDate(), o, s;
	if (e.timezone) {
		let t = $.fromJSDate(a).setZone(e.timezone);
		s = t.startOf("day").toJSDate(), o = t.hour * 60 + t.minute;
	} else o = a.getHours() * 60 + a.getMinutes(), s = new Date(a.getFullYear(), a.getMonth(), a.getDate());
	let c = n ? 2e3 : 1e3, l = wa(s), u = l.map((e, t) => {
		let n = t / (l.length - 1) * c, r = i.getAltitudeAzimuthCoordinatesForObject("Sun", e).altitude;
		return [n, Ta(r, -90, 90, 950, 50).toFixed(0)];
	}).map(([e, t]) => `${e},${t}`).join(" "), d = i.getAltitudeAzimuthCoordinatesForObject("Sun").altitude, f = Ta(d, -90, 90, 950, 50).toFixed(0), p = ke(d), m = Da(d), h = Ee(m.limit, p.limit, d), g = De(p.bottom, m.bottom, h), _ = d > 0 ? 1 : d < -9 ? 0 : Ee(-9, 0, d), v = De("#808080", "#ffffff", d > -3 ? 1 : d < -9 ? 0 : Ee(-9, -3, d)), y = n ? ae(t, "black") : w(t, "black");
	return y += `
        <rect x="0" y="500" width="${c}" height="500" fill="black" />
        <defs>
            <clipPath id="top-half-clip">
                <rect x="0" y="500" width="${c * 2}" height="500" />
            </clipPath>
            <clipPath id="bottom-half-clip">
                <rect x="0" y="0" width="${c * 2}" height="500" />
            </clipPath>
            <radialGradient id="sun-glow-${d}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * _}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * _}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${.1 * _}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow-${d}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${g}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${g}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${g}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${g}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient-${d}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${v}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${c}" height="500" fill="url(#sky-${d})" />
        <ellipse cx="${Ea(o, c)}" cy="${f}" rx="${1.2 * c}" ry="125" fill="url(#twilight-glow-${d})" />
        <rect x="0" y="500" width="${c}" height="500" fill="black" />
        <polyline fill="none" stroke="url(#sun-line-gradient-${d})" stroke-width="35" points="${u}" clip-path="url(#top-half-clip)"/>
        <polyline fill="none" stroke="url(#sun-line-gradient-${d})" stroke-width="35" points="${u}" clip-path="url(#bottom-half-clip)"/>
        <line x1="0" y1="500" x2="${c}" y2="500" stroke="${v}" stroke-width="15" />
        <circle cx="${Ea(o, c)}"
            cy="${f}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${Ea(o, c)}"
            cy="${f}" r="150" fill="url(#sun-glow-${d})" clip-path="url(#bottom-half-clip)" />
           `, y += Oe(d), r && (y += be(a.toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	}))), y += T(), y;
}
function wa(e) {
	let t = [];
	for (let n = 0; n < 48; n++) {
		let r = new Date(e.getTime() + n * 30 * 60 * 1e3);
		t.push(r);
	}
	return t;
}
function Ta(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function Ea(e, t) {
	return e / 1440 * t;
}
function Da(e) {
	return e <= -18 ? {
		top: "#0b0c1a",
		bottom: "#101734",
		limit: -90
	} : e <= -15 ? {
		top: "#171c27",
		bottom: "#282e3c",
		limit: -18
	} : e <= -12 ? {
		top: "#171c29",
		bottom: "#525662",
		limit: -15
	} : e <= -9 ? {
		top: "#4e545f",
		bottom: "#b9a76c",
		limit: -12
	} : e <= -6 ? {
		top: "#909798",
		bottom: "#f9d92b",
		limit: -9
	} : e <= -3 ? {
		top: "#b6d8ed",
		bottom: "#f6da3f",
		limit: -6
	} : e <= 0 ? {
		top: "#bcd6fc",
		bottom: "#98d5fc",
		limit: -3
	} : {
		top: "#cce8fd",
		bottom: "#98d5fc",
		limit: 0
	};
}
//#endregion
//#region lib/celestial-body-altitude-path.js
function Oa(e, t, n, r, i) {
	let a = e.astronomyJS, o = a.getDate(), s;
	s = e.timezone ? $.fromJSDate(o).setZone(e.timezone).startOf("day").toJSDate() : new Date(o.getFullYear(), o.getMonth(), o.getDate());
	let c = r ? 2e3 : 1e3, l = ka(s), u = -100, d = 180;
	for (let e of l) {
		let n = a.getAltitudeAzimuthCoordinatesForObject(t, e);
		n.altitude > u && (u = n.altitude, d = n.azimuth);
	}
	let f = (d % 360 + 360) % 360, p = Math.min(f, 360 - f) < Math.abs(f - 180) ? 0 : 180, m = [], h = [];
	for (let e = 0; e < l.length; e++) {
		let n = l[e], r = a.getAltitudeAzimuthCoordinatesForObject(t, n), i = parseFloat(ja(r.azimuth, c, p).toFixed(2)), o = parseFloat(Aa(r.altitude, -90, 90, 950, 50).toFixed(2));
		if (h.length > 0) {
			let e = h[h.length - 1].x;
			Math.abs(i - e) > c / 2 && (m.push(h.map((e) => `${e.x},${e.y}`).join(" ")), h = []);
		}
		h.push({
			x: i,
			y: o
		});
	}
	h.length > 0 && m.push(h.map((e) => `${e.x},${e.y}`).join(" "));
	let g = a.getAltitudeAzimuthCoordinatesForObject("Sun"), _ = g.altitude, v = g.azimuth, y = a.getAltitudeAzimuthCoordinatesForObject(t), b = a.getIlluminatedFractionForObject(t), ee = a.getIlluminatedFractionForObject(t, new Date(o.getTime() + 300 * 1e3)) > b, x = Aa(_, -90, 90, 950, 50).toFixed(0), S = Aa(y.altitude, -90, 90, 950, 50).toFixed(0), te = ke(_), ne = Ma(_), re = Ee(ne.limit, te.limit, _), C = De(te.bottom, ne.bottom, re), ie = _ > 0 ? 1 : _ < -9 ? 0 : Ee(-9, 0, _), oe = De("#808080", "#ffffff", _ > -3 ? 1 : _ < -9 ? 0 : Ee(-9, -3, _)), se = ja(0, c, p), ce = ja(180, c, p), le = se >= ce ? "N" : "S", ue = se >= ce ? se : ce, de = r ? ae(n, "black") : w(n, "black");
	return de += `
        <rect x="0" y="500" width="${c}" height="500" fill="black" />
        <defs>
            <clipPath id="top-half-clip">
                <rect x="0" y="500" width="${c * 2}" height="500" />
            </clipPath>
            <clipPath id="bottom-half-clip">
                <rect x="0" y="0" width="${c * 2}" height="500" />
            </clipPath>
            <radialGradient id="sun-glow-${_}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=" ${1 * ie}" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity=" ${1 * ie}" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity=" ${.1 * ie}" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="twilight-glow-${_}" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="${C}" stop-opacity="0.5" />
                <stop offset="50%" stop-color="${C}" stop-opacity="0.15" />
                <stop offset="90%" stop-color="${C}" stop-opacity="0.1" />
                <stop offset="100%" stop-color="${C}" stop-opacity="0.0" />
            </radialGradient>
            <linearGradient id="sun-line-gradient-${_}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="80%" stop-color="${oe}" stop-opacity="1" />
                <stop offset="100%" stop-color="#808080" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="${c}" height="500" fill="url(#sky-${_})" />
        <ellipse cx="${ja(v, c, p)}" cy="${x}" rx="${1.2 * c}" ry="125" fill="url(#twilight-glow-${_})" />
        ${m.map((e) => `
            <polyline fill="none" stroke="url(#sun-line-gradient-${_})" stroke-width="35" points="${e}" clip-path="url(#top-half-clip)"/>
            <polyline fill="none" stroke="url(#sun-line-gradient-${_})" stroke-width="35" points="${e}" clip-path="url(#bottom-half-clip)"/>
        `).join("")}
        <line x1="0" y1="500" x2="${c}" y2="500" stroke="${oe}" stroke-width="15" />
        <g fill="white" font-size="60" font-family="Verdana" text-anchor="middle" dominant-baseline="middle">
            <text x="${ue}" y="550">${le}</text>
        </g>
        <circle cx="${ja(v, c, p)}"
            cy="${x}" r="50" stroke="#808080" stroke-width="20" clip-path="url(#top-half-clip)" />
        <circle cx="${ja(v, c, p)}"
            cy="${x}" r="150" fill="url(#sun-glow-${_})" clip-path="url(#bottom-half-clip)" />
        <g transform="translate(${ja(y.azimuth, c, p) - 500}, ${S - 278})
                translate(500, 278) scale(0.5) translate(-500, -278)">
            ${E(t, {
		illuminatedFraction: b,
		isWaxing: ee
	})}
        </g>
           `, de += Oe(_), i && (de += be(o.toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	}))), de += T(), de;
}
function ka(e) {
	let t = [];
	for (let n = 0; n < 48; n++) {
		let r = new Date(e.getTime() + n * 30 * 60 * 1e3);
		t.push(r);
	}
	return t;
}
function Aa(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function ja(e, t, n = 180) {
	let r;
	return r = n === 0 ? (180 - e + 360) % 360 : (e - (n - 180) + 360) % 360, r / 360 * t;
}
function Ma(e) {
	return e <= -18 ? {
		top: "#0b0c1a",
		bottom: "#101734",
		limit: -90
	} : e <= -15 ? {
		top: "#171c27",
		bottom: "#282e3c",
		limit: -18
	} : e <= -12 ? {
		top: "#171c29",
		bottom: "#525662",
		limit: -15
	} : e <= -9 ? {
		top: "#4e545f",
		bottom: "#b9a76c",
		limit: -12
	} : e <= -6 ? {
		top: "#909798",
		bottom: "#f9d92b",
		limit: -9
	} : e <= -3 ? {
		top: "#b6d8ed",
		bottom: "#f6da3f",
		limit: -6
	} : e <= 0 ? {
		top: "#bcd6fc",
		bottom: "#98d5fc",
		limit: -3
	} : {
		top: "#cce8fd",
		bottom: "#98d5fc",
		limit: 0
	};
}
//#endregion
//#region lib/celestial-body-rise-time.js
function Na(e, t, n) {
	let r = e.astronomyJS, i = r.getEphemerisDateForObject(t, r.getDate(), t === "Sun" ? "SUNRISE" : "RISE"), a = r.getIlluminatedFractionForObject(t), o = w(n, "black");
	return o += E(t, {
		illuminatedFraction: a,
		isWaxing: r.getIlluminatedFractionForObject(t, new Date(r.getDate().getTime() + 300 * 1e3)) > a
	}), o += D("Rise"), o += O(i ? i.toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	}) : "-"), o += T(o), o;
}
//#endregion
//#region lib/celestial-body-set-time.js
function Pa(e, t, n) {
	let r = e.astronomyJS, i = r.getEphemerisDateForObject(t, r.getDate(), t === "Sun" ? "SUNSET" : "SET"), a = r.getIlluminatedFractionForObject(t), o = w(n, "black");
	return o += E(t, {
		illuminatedFraction: a,
		isWaxing: r.getIlluminatedFractionForObject(t, new Date(r.getDate().getTime() + 300 * 1e3)) > a
	}), o += D("Set"), o += O(i ? i.toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	}) : "-"), o += T(o), o;
}
//#endregion
//#region lib/celestial-body-visibility.js
function Fa(e, t, n) {
	let r = e.astronomyJS, i = r.getAltitudeAzimuthCoordinatesForObject(t), a = r.getIlluminatedFractionForObject(t), o = w(n, "black");
	if (i.altitude < 0) {
		o += E(t, {
			drawNotVisibleSymbol: !0,
			illuminatedFraction: a,
			isWaxing: r.getIlluminatedFractionForObject(t, new Date(r.getDate().getTime() + 300 * 1e3)) > a
		});
		let n = r.getEphemerisDateForObject(t, r.getDate(), t === "Sun" ? "SUNRISE" : "RISE");
		o += D("Visible at"), o += O(n ? n.toLocaleTimeString(e.locale ?? void 0, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: !1,
			...e.timezone ? { timeZone: e.timezone } : {}
		}) : "-");
	} else {
		let e = r.getAltitudeAzimuthCoordinatesForObject(t, /* @__PURE__ */ new Date(r.getDate().getTime() - 300 * 1e3)).altitude;
		o += D(_e(i.altitude, e)), o += O(ve(i.azimuth)), o += E(t, {
			illuminatedFraction: a,
			isWaxing: r.getIlluminatedFractionForObject(t, new Date(r.getDate().getTime() + 300 * 1e3)) > a
		});
	}
	return o += T(o), o;
}
//#endregion
//#region lib/celestial-body-visibility-map.js
function Ia(e, t, n, r) {
	let i = e.astronomyJS, a = i.getAltitudeAzimuthCoordinatesForObject("Sun").altitude, o = i.getAltitudeAzimuthCoordinatesForObject(t), s = i.getIlluminatedFractionForObject(t), c = w(n, "black");
	if (o.altitude < 0) {
		c += E(t, {
			illuminatedFraction: s,
			isWaxing: i.getIlluminatedFractionForObject(t, new Date(i.getDate().getTime() + 300 * 1e3)) > s
		});
		let n = i.getEphemerisDateForObject(t, i.getDate(), "RISE");
		c += D("Visible at"), c += O(n ? n.toLocaleTimeString(e.locale ?? void 0, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: !1,
			...e.timezone ? { timeZone: e.timezone } : {}
		}) : "-");
	} else {
		let e = 380 * (1 - o.altitude / 90), n = (o.azimuth - 90) * (Math.PI / 180), l = 500 + e * Math.cos(n), u = 520 + e * Math.sin(n);
		c += `<rect x="0" y="0" width="1000" height="1000" fill="url(#sky-${a})" />`, r !== void 0 && r !== 0 ? c += `
            <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="500" y="80">${r}</text>
          </g>
          <g transform="rotate(${360 - r} 500 520)">
        ` : c += "<g>", c += `
          <circle cx="500" cy="520" r="380" fill="none" stroke="white" stroke-width="15" />
          <circle cx="500" cy="520" r="${380 / 2}" fill="none" stroke="white" stroke-width="8" />
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
            <text x="500" y="80">N</text>
          </g>
        `, c += `<g transform="translate(${l - 500}, ${u - 279})
                translate(500, 279) scale(0.3) translate(-500, -279)">`, c += E(t, {
			illuminatedFraction: s,
			isWaxing: i.getIlluminatedFractionForObject(t, new Date(i.getDate().getTime() + 300 * 1e3)) > s
		}), c += "</g></g>";
	}
	return c += Oe(a), c += T(c), c;
}
//#endregion
//#region lib/multi-celestial-body-visibility-map.js
function La(e, t, n, r) {
	let i = e.astronomyJS, a = i.getAltitudeAzimuthCoordinatesForObject("Sun").altitude, o = w(n, "black");
	o += `<rect x="0" y="0" width="1000" height="1000" fill="url(#sky-${a})" />`, r !== void 0 && r !== 0 ? o += `
          <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
          <text x="500" y="80">${r}</text>
        </g>
        <g transform="rotate(${360 - r} 500 520)">
      ` : o += "<g>", o += `
        <circle cx="500" cy="520" r="380" fill="none" stroke="white" stroke-width="15" />
        <circle cx="500" cy="520" r="${380 / 2}" fill="none" stroke="white" stroke-width="8" />
        <g fill="white" font-size="70" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
          <text x="500" y="80">N</text>
        </g>
      `;
	for (let e of t) {
		let t = i.getAltitudeAzimuthCoordinatesForObject(e), n = i.getIlluminatedFractionForObject(e);
		if (t.altitude < 0) continue;
		let r = 380 * (1 - t.altitude / 90), a = (t.azimuth - 90) * (Math.PI / 180), s = 500 + r * Math.cos(a), c = 520 + r * Math.sin(a);
		o += `<g transform="translate(${s - 500}, ${c - 279})
              translate(500, 279) scale(0.3) translate(-500, -279)">`, o += E(e, {
			illuminatedFraction: n,
			isWaxing: i.getIlluminatedFractionForObject(e, new Date(i.getDate().getTime() + 300 * 1e3)) > n
		}), o += "</g>";
	}
	return o += "</g>", o += Oe(a), o += T(o), o;
}
//#endregion
//#region lib/draw-current-time.js
function Ra(e, t) {
	let n = e.astronomyJS.getDate(), r = w(t, "black");
	return r += Ba(e), r += D(n.toLocaleDateString(e.locale ?? void 0, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		...e.timezone ? { timeZone: e.timezone } : {}
	})), r += O(n.toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	})), r += T(r), r;
}
function za(e, t) {
	let n = e.astronomyJS.getDate(), r = ae(t, "black");
	return r += "<g transform=\"translate(500,500) scale(2) translate(-500,-278)\">", r += Ba(e), r += "</g>", r += ye(n.toLocaleDateString(e.locale ?? void 0, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		...e.timezone ? { timeZone: e.timezone } : {}
	}), 1500, 420), r += ye(n.toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	}), 1500, 620), r += T(r), r;
}
function Ba(e) {
	let t = e.astronomyJS.getDate().toLocaleTimeString(e.locale ?? void 0, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !1,
		...e.timezone ? { timeZone: e.timezone } : {}
	}), n = `<!-- Clock circle -->
    <circle cx="500" cy="278" r="180" stroke="#fff" stroke-width="4" />
    <g transform="rotate(${(parseInt(t.split(":")[0]) % 12 + t.split(":")[1] / 60) * 30}, 500, 278)">
    <line id="hour-hand" x1="500" y1="278" x2="500" y2="188" stroke="#fff" stroke-width="15" stroke-linecap="round" />
    </g>
    <g transform="rotate(${parseInt(t.split(":")[1]) * 6}, 500, 278)">
    <line id="minute-hand" x1="500" y1="278" x2="500" y2="138" stroke="#fff" stroke-width="12" stroke-linecap="round" />
    </g>
    <circle cx="500" cy="278" r="10" fill="#fff" />`;
	for (let e = 0; e < 12; e++) {
		let t = e * 30;
		n += `
    <g transform="rotate(${t}, 500, 278)">
      <line x1="500" y1="98" x2="500" y2="118" stroke="#fff" stroke-width="6" />
    </g>
  `;
	}
	return n;
}
//#endregion
//#region index.js
var Va = class e {
	applicationContext = {
		astronomyJS: null,
		locale: null,
		timezone: null
	};
	constructor() {
		this.applicationContext.astronomyJS = new ie();
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
		this.applicationContext.astronomyJS.setLocation("Earth", e, t, 0);
	}
	getLocation() {
		return this.applicationContext.astronomyJS.getLatitudeLongitudeCoordinates();
	}
	static initialize(t, n) {
		let r = new e();
		return r.setDate(/* @__PURE__ */ new Date()), r.setLocation(t, n), r;
	}
	drawAzimuth(e, t) {
		return xe(this.applicationContext, e, t);
	}
	drawAltitude(e, t) {
		return Se(this.applicationContext, e, t);
	}
	drawSunAltitudePath(e, t, n = !1) {
		return Ca(this.applicationContext, e, t, n);
	}
	drawCelestialBodyAltitudePath(e, t, n, r = !1) {
		return Oa(this.applicationContext, e, t, n, r);
	}
	drawCelestialBodyRiseTime(e, t) {
		return Na(this.applicationContext, e, t);
	}
	drawCelestialBodySettingTime(e, t) {
		return Pa(this.applicationContext, e, t);
	}
	drawCelestialBodyVisibility(e, t) {
		return Fa(this.applicationContext, e, t);
	}
	drawCurrentTime(e) {
		return Ra(this.applicationContext, e);
	}
	drawCurrentTimeWide(e) {
		return za(this.applicationContext, e);
	}
	drawCelestialBodyVisibilityMap(e, t, n) {
		return Ia(this.applicationContext, e, t, n);
	}
	drawMultiCelestialBodyVisibilityMap(e, t, n) {
		return La(this.applicationContext, e, t, n);
	}
};
function Ha(e, t) {
	return Va.initialize(e, t);
}
//#endregion
export { Va as AstronomySVG, Ha as initialize };
