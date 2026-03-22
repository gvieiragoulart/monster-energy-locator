import type { EnergyDrinkLocation } from '@/types/location';

export const locationService = {
  getLocations: async (lat?: number, lng?: number): Promise<EnergyDrinkLocation[]> => {
    if (lat == null || lng == null) return [];

    const params = new URLSearchParams({
      lat: String(lat),
      lng: String(lng),
    });

    const res = await fetch(`/api/locations?${params}`);
    if (!res.ok) throw new Error('Failed to fetch locations');

    const json = await res.json();
    return json.data;
  },
};
