import { useQuery } from '@tanstack/react-query';
import { EnergyDrinkLocation, UseLocationsResult } from '@/types/location';
import { locationService } from '@/services/locationService';

export function useLocations(): UseLocationsResult {
  const { data, isLoading, error } = useQuery<EnergyDrinkLocation[], Error>({
    queryKey: ['locations'],
    queryFn: () => locationService.getLocations(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchInterval: 1000 * 60 * 5, // re-fetch a cada 5 minutos
  });

  return { 
    locations: data ?? [], 
    isLoading, 
    error: error ?? null 
  };
}
