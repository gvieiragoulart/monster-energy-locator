import { EnergyDrinkLocation } from '@/types/location';

const MOCK_LOCATIONS: EnergyDrinkLocation[] = [
  {
    id: '1',
    name: 'Loja Center',
    flavor: 'Monster Original',
    latitude: -23.5505,
    longitude: -46.6333,
    address: 'Av. Paulista, 1000 - São Paulo, SP',
  },
  {
    id: '2',
    name: 'Supermercado XYZ',
    flavor: 'Monster Ultra',
    latitude: -23.5525,
    longitude: -46.6350,
    address: 'Rua Augusta, 2500 - São Paulo, SP',
  },
  {
    id: '3',
    name: 'Conveniência 24h',
    flavor: 'Monster Zero',
    latitude: -23.5480,
    longitude: -46.6310,
    address: 'Rua Consolação, 1500 - São Paulo, SP',
  },
  {
    id: '4',
    name: 'Mercado Premium',
    flavor: 'Monster Mango Loco',
    latitude: -23.5560,
    longitude: -46.6380,
    address: 'Av. Brasil, 3000 - São Paulo, SP',
  },
  {
    id: '5',
    name: 'Posto de Gasolina',
    flavor: 'Monster Nitro',
    latitude: -23.5450,
    longitude: -46.6290,
    address: 'Rua Vergueiro, 800 - São Paulo, SP',
  },
  {
    id: '6',
    name: 'Farmácia do Bairro',
    flavor: 'Monster Original',
    latitude: -23.5490,
    longitude: -46.6360,
    address: 'Rua Bandeira, 500 - São Paulo, SP',
  },
  {
    id: '7',
    name: 'Bar do Zé',
    flavor: 'Monster Ultra',
    latitude: -23.5540,
    longitude: -46.6300,
    address: 'Rua Pamplona, 1200 - São Paulo, SP',
  },
  {
    id: '8',
    name: 'Café Gourmet',
    flavor: 'Monster Zero',
    latitude: -23.5470,
    longitude: -46.6340,
    address: 'Av. Rebouças, 2000 - São Paulo, SP',
  },
  {
    id: '9',
    name: 'Loja de Conveniência',
    flavor: 'Monster Mango Loco',
    latitude: -20.484037816113002,
    longitude: -47.4086904122417,
    address: 'Rua Pedro Capel Berdu, 2051 - Franca, SP',
  },
  {
    id: '10',
    name: 'Supermercado Tiãozinho',
    flavor: 'Monster Nitro',
    latitude: -20.483508,
    longitude: -47.402289,
    address: 'Av. Ricarte Soares Silva, 1151 - Res - Jardim Cambuí, Franca - SP, 14409-648',
  },
  {
    id: '11',
    name: 'Mini Box Cambuí',
    flavor: 'Monster Ultra Sunrise',
    latitude: -20.482366,
    longitude: -47.407499,
    address: 'R. Dr. Delmar de Figueiredo, 613-563 - Jardim Cambuí',
  },
];

export const locationService = {
  // TODO: replace mock with real API call
  getLocations: async (): Promise<EnergyDrinkLocation[]> => {
    return Promise.resolve(MOCK_LOCATIONS);
  },
};
