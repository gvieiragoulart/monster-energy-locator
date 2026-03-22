export interface EnergyDrinkLocation {
  id: string;
  name: string;
  flavor: string;
  latitude: number;
  longitude: number;
  address: string;
  distance?: number;
}

export interface UseLocationsResult {
  locations: EnergyDrinkLocation[];
  isLoading: boolean;
  error: Error | null;
}
