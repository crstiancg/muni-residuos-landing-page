import { RUTA_01_COORDINATES } from './ruta-01';
import { RUTA_02_COORDINATES } from './ruta-02';
import { RUTA_03_COORDINATES } from './ruta-03';
import { RUTA_04_COORDINATES } from './ruta-04';
import { RUTA_05_COORDINATES } from './ruta-05';
import { RUTA_06_COORDINATES } from './ruta-06';
import { RUTA_07_COORDINATES } from './ruta-07';
import { RUTA_08_COORDINATES } from './ruta-08';
import { RUTA_09_COORDINATES } from './ruta-09';

/**
 * Mapeo modular de ID de ruta a coordenadas manuales [lat, lng].
 * Rutas 01 a 09 cuentan con trazados validados.
 * Rutas 10 a 29 utilizan fallback genérico.
 */
export const ROUTE_COORDINATES_MAP: Record<string, [number, number][]> = {
  'ruta-01': RUTA_01_COORDINATES,
  'ruta-02': RUTA_02_COORDINATES,
  'ruta-03': RUTA_03_COORDINATES,
  'ruta-04': RUTA_04_COORDINATES,
  'ruta-05': RUTA_05_COORDINATES,
  'ruta-06': RUTA_06_COORDINATES,
  'ruta-07': RUTA_07_COORDINATES,
  'ruta-08': RUTA_08_COORDINATES,
  'ruta-09': RUTA_09_COORDINATES,
};

/**
 * Obtiene las coordenadas manuales de una ruta por su ID.
 * Si no existen, devuelve null.
 */
export function getRouteCoordinates(routeId: string): [number, number][] | null {
  return ROUTE_COORDINATES_MAP[routeId] || null;
}

/**
 * Puntos GPS de anclaje de inicio y fin para las 29 rutas de Puno (usados como fallback).
 */
export const DEFAULT_ROUTE_COORDINATES: Record<
  number,
  { start: [number, number]; end: [number, number]; geojsonFile: string | null }
> = {
  1: { start: [-15.8402, -70.0219], end: [-15.8368, -70.0245], geojsonFile: null },
  2: { start: [-15.8351, -70.0298], end: [-15.8420, -70.0278], geojsonFile: null },
  3: { start: [-15.8402, -70.0219], end: [-15.8350, -70.0168], geojsonFile: null },
  4: { start: [-15.8402, -70.0219], end: [-15.8458, -70.0305], geojsonFile: null },
  5: { start: [-15.8360, -70.0232], end: [-15.8290, -70.0268], geojsonFile: null },
  6: { start: [-15.8390, -70.0210], end: [-15.8460, -70.0155], geojsonFile: null },
  7: { start: [-15.8390, -70.0160], end: [-15.8460, -70.0118], geojsonFile: null },
  8: { start: [-15.8340, -70.0118], end: [-15.8455, -70.0098], geojsonFile: null },
  9: { start: [-15.8290, -70.0160], end: [-15.8235, -70.0210], geojsonFile: null },
  10: { start: [-15.8240, -70.0210], end: [-15.8190, -70.0310], geojsonFile: null },
  11: { start: [-15.8210, -70.0280], end: [-15.8150, -70.0390], geojsonFile: null },
  12: { start: [-15.8270, -70.0310], end: [-15.8200, -70.0420], geojsonFile: null },
  13: { start: [-15.8320, -70.0340], end: [-15.8260, -70.0450], geojsonFile: null },
  14: { start: [-15.8360, -70.0350], end: [-15.8300, -70.0480], geojsonFile: null },
  15: { start: [-15.8410, -70.0360], end: [-15.8350, -70.0490], geojsonFile: null },
  16: { start: [-15.8460, -70.0370], end: [-15.8400, -70.0510], geojsonFile: null },
  17: { start: [-15.8500, -70.0350], end: [-15.8440, -70.0480], geojsonFile: null },
  18: { start: [-15.8520, -70.0180], end: [-15.8600, -70.0120], geojsonFile: null },
  19: { start: [-15.8580, -70.0150], end: [-15.8680, -70.0110], geojsonFile: null },
  20: { start: [-15.8640, -70.0120], end: [-15.8740, -70.0090], geojsonFile: null },
  21: { start: [-15.8600, -70.0080], end: [-15.8700, -70.0020], geojsonFile: null },
  22: { start: [-15.8550, -70.0050], end: [-15.8650, -69.9980], geojsonFile: null },
  23: { start: [-15.8500, -70.0020], end: [-15.8600, -69.9940], geojsonFile: null },
  24: { start: [-15.8480, -70.0420], end: [-15.8560, -70.0490], geojsonFile: null },
  25: { start: [-15.8530, -70.0450], end: [-15.8620, -70.0520], geojsonFile: null },
  26: { start: [-15.8580, -70.0400], end: [-15.8680, -70.0480], geojsonFile: null },
  27: { start: [-15.8650, -70.0350], end: [-15.8750, -70.0420], geojsonFile: null },
  28: { start: [-15.8720, -70.0250], end: [-15.8820, -70.0320], geojsonFile: null },
  29: { start: [-15.8780, -70.0150], end: [-15.8890, -70.0220], geojsonFile: null },
};
