declare module "astronomy-svg" {
    export class AstronomySVG {
        constructor();

        getDate(): Date;

        setDate(newDate: Date): void;

        setLocale(locale: string): void;

        setTimezone(timezone: string): void;

        setLocation(latitude: number, longitude: number): void;

        getLocation(): { latitude: number, longitude: number };

        static initialize(latitude: number, longitude: number): AstronomySVG;

        drawAzimuth(celestialBody: string, width: number): string;

        drawAltitude(celestialBody: string, width: number): string;

        drawSunAltitudePath(width: number, isRectangular?: boolean): string;

        drawCelestialBodyRiseTime(celestialBody: string, width: number): string;

        drawCelestialBodySettingTime(celestialBody: string, width: number): string;

        drawCelestialBodyVisibility(celestialBody: string, width: number): string;

        drawCelestialBodyVisibilityMap(
            celestialBody: string,
            width: number,
            azimuthReference: number
        ): string;

        drawMultiCelestialBodyVisibilityMap(
            celestialBodyList: string[],
            width: number,
            azimuthReference: number
        ): string;
    }
}