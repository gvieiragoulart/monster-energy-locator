import { useState, useMemo } from 'react';
import { EnergyDrinkLocation } from '@/types/location';
import { useLocations } from '@/hooks/useLocations';
import { useUserLocation } from '@/contexts/UserLocationContext';

interface UseFilteredLocationsResult {
  locations: EnergyDrinkLocation[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFlavor: string | undefined;
  setSelectedFlavor: (flavor: string | undefined) => void;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useFilteredLocations(): UseFilteredLocationsResult {
  const { locations: fetchedLocations, isLoading, error } = useLocations();
  const { userLocation } = useUserLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>();

  const locations = useMemo(() => {
    let result = fetchedLocations;

    if (userLocation) {
      result = result
        .map((loc) => ({
          ...loc,
          distance: calculateDistance(userLocation.lat, userLocation.lng, loc.latitude, loc.longitude),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.flavor.toLowerCase().includes(q) ||
          loc.address.toLowerCase().includes(q)
      );
    }

    if (selectedFlavor) {
      result = result.filter((loc) => loc.flavor.includes(selectedFlavor));
    }

    return result;
  }, [fetchedLocations, searchQuery, selectedFlavor, userLocation]);

  return {
    locations,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedFlavor,
    setSelectedFlavor,
  };
}
