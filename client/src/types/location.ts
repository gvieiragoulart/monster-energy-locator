export { MonsterFlavor, EnergyDrinkLocation } from '@shared/types';
import type { EnergyDrinkLocation } from '@shared/types';

export interface UseLocationsResult {
  locations: EnergyDrinkLocation[];
  isLoading: boolean;
  error: Error | null;
}
