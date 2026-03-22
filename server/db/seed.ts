import { getDb } from './connection.js';
import { MonsterFlavor } from '../../shared/types.js';

const F = MonsterFlavor;

const SEED_LOCATIONS = [
  {
    id: '1',
    name: 'Loja Center',
    flavors: [F.Original, F.Ultra, F.MangoLoco],
    latitude: -23.5505,
    longitude: -46.6333,
    address: 'Av. Paulista, 1000 - São Paulo, SP',
  },
  {
    id: '2',
    name: 'Supermercado XYZ',
    flavors: [F.Ultra, F.Zero],
    latitude: -23.5525,
    longitude: -46.6350,
    address: 'Rua Augusta, 2500 - São Paulo, SP',
  },
  {
    id: '3',
    name: 'Conveniência 24h',
    flavors: [F.Zero, F.Original],
    latitude: -23.5480,
    longitude: -46.6310,
    address: 'Rua Consolação, 1500 - São Paulo, SP',
  },
  {
    id: '4',
    name: 'Mercado Premium',
    flavors: [F.MangoLoco, F.Nitro, F.Ultra],
    latitude: -23.5560,
    longitude: -46.6380,
    address: 'Av. Brasil, 3000 - São Paulo, SP',
  },
  {
    id: '5',
    name: 'Posto de Gasolina',
    flavors: [F.Nitro],
    latitude: -23.5450,
    longitude: -46.6290,
    address: 'Rua Vergueiro, 800 - São Paulo, SP',
  },
  {
    id: '6',
    name: 'Farmácia do Bairro',
    flavors: [F.Original, F.UltraSunrise],
    latitude: -23.5490,
    longitude: -46.6360,
    address: 'Rua Bandeira, 500 - São Paulo, SP',
  },
  {
    id: '7',
    name: 'Bar do Zé',
    flavors: [F.Ultra, F.MangoLoco],
    latitude: -23.5540,
    longitude: -46.6300,
    address: 'Rua Pamplona, 1200 - São Paulo, SP',
  },
  {
    id: '8',
    name: 'Café Gourmet',
    flavors: [F.Zero, F.Nitro, F.Original],
    latitude: -23.5470,
    longitude: -46.6340,
    address: 'Av. Rebouças, 2000 - São Paulo, SP',
  },
  {
    id: '9',
    name: 'Loja de Conveniência',
    flavors: [F.MangoLoco, F.Zero],
    latitude: -20.484037816113002,
    longitude: -47.4086904122417,
    address: 'Rua Pedro Capel Berdu, 2051 - Franca, SP',
  },
  {
    id: '10',
    name: 'Supermercado Tiãozinho',
    flavors: [F.Nitro, F.Ultra, F.UltraSunrise],
    latitude: -20.483508,
    longitude: -47.402289,
    address: 'Av. Ricarte Soares Silva, 1151 - Jardim Cambuí, Franca - SP',
  },
  {
    id: '11',
    name: 'Mini Box Cambuí',
    flavors: [F.UltraSunrise, F.Original, F.MangoLoco],
    latitude: -20.482366,
    longitude: -47.407499,
    address: 'R. Dr. Delmar de Figueiredo, 613-563 - Jardim Cambuí',
  },
];

export function seedIfEmpty(): void {
  const db = getDb();
  const count = db.prepare('SELECT COUNT(*) as count FROM locations').get() as { count: number };

  if (count.count > 0) return;

  const insert = db.prepare(
    'INSERT INTO locations (id, name, latitude, longitude, address, flavors) VALUES (?, ?, ?, ?, ?, ?)'
  );

  const tx = db.transaction(() => {
    for (const loc of SEED_LOCATIONS) {
      insert.run(loc.id, loc.name, loc.latitude, loc.longitude, loc.address, JSON.stringify(loc.flavors));
    }
  });

  tx();
  console.log(`Seeded ${SEED_LOCATIONS.length} locations`);
}
