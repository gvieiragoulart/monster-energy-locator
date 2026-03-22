import { getDb } from '../db/connection.js';
import { haversineKm } from '../utils/distance.js';
import type { EnergyDrinkLocation, MonsterFlavor } from '../../shared/types.js';

interface LocationRow {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  flavors: string;
}

function rowToLocation(row: LocationRow): EnergyDrinkLocation {
  return {
    id: row.id,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    address: row.address,
    flavors: JSON.parse(row.flavors) as MonsterFlavor[],
  };
}

export function getLocationsByProximity(
  lat: number,
  lng: number,
  radiusKm = 50,
): EnergyDrinkLocation[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM locations').all() as LocationRow[];

  return rows
    .map((row) => {
      const loc = rowToLocation(row);
      loc.distance = Math.round(haversineKm(lat, lng, loc.latitude, loc.longitude) * 10) / 10;
      return loc;
    })
    .filter((loc) => loc.distance! <= radiusKm)
    .sort((a, b) => a.distance! - b.distance!);
}
