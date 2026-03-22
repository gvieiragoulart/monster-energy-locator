import { useQuery } from '@tanstack/react-query';
import { EnergyDrinkLocation, UseLocationsResult } from '@/types/location';
import { locationService } from '@/services/locationService';

export function useLocations(lat?: number, lng?: number): UseLocationsResult {
  const { data, isLoading, error } = useQuery<EnergyDrinkLocation[], Error>({
    queryKey: ['locations', lat, lng],
    queryFn: () => locationService.getLocations(lat, lng),
    enabled: lat != null && lng != null,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  return {
    locations: data ?? [],
    isLoading,
    error: error ?? null,
  };
}
