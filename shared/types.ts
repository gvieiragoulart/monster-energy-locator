export enum MonsterFlavor {
  Original = 'Monster Original',
  Ultra = 'Monster Ultra',
  Zero = 'Monster Zero',
  MangoLoco = 'Monster Mango Loco',
  Nitro = 'Monster Nitro',
  UltraSunrise = 'Monster Ultra Sunrise',
}

export interface EnergyDrinkLocation {
  id: string;
  name: string;
  flavors: MonsterFlavor[];
  latitude: number;
  longitude: number;
  address: string;
  distance?: number;
}
