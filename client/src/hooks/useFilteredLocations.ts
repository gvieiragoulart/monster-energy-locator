import { useState, useMemo } from 'react';
import { EnergyDrinkLocation, MonsterFlavor } from '@/types/location';
import { useLocations } from '@/hooks/useLocations';
import { useUserLocation } from '@/contexts/UserLocationContext';

interface UseFilteredLocationsResult {
  locations: EnergyDrinkLocation[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFlavor: MonsterFlavor | undefined;
  setSelectedFlavor: (flavor: MonsterFlavor | undefined) => void;
}

export function useFilteredLocations(): UseFilteredLocationsResult {
  const { userLocation } = useUserLocation();
  const { locations: fetchedLocations, isLoading, error } = useLocations(
    userLocation?.lat,
    userLocation?.lng,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState<MonsterFlavor | undefined>();

  const locations = useMemo(() => {
    // Server already returns sorted by distance with distance field
    let result = fetchedLocations;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.flavors.some((f) => f.toLowerCase().includes(q)) ||
          loc.address.toLowerCase().includes(q)
      );
    }

    if (selectedFlavor) {
      result = result.filter((loc) => loc.flavors.includes(selectedFlavor));
    }

    return result;
  }, [fetchedLocations, searchQuery, selectedFlavor]);

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
