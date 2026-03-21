import { useState, useEffect } from 'react';
import { MapComponent } from '@/components/MapContainer';
import { LocationCard } from '@/components/LocationCard';
import { LocationDetails } from '@/components/LocationDetails';
import { SearchBar } from '@/components/SearchBar';
import { FlavorFilter } from '@/components/FlavorFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap } from 'lucide-react';

interface EnergyDrinkLocation {
  id: string;
  name: string;
  flavor: string;
  latitude: number;
  longitude: number;
  address: string;
  distance?: number;
}

// Mock data - sabores de Monster Energy
const MOCK_LOCATIONS: EnergyDrinkLocation[] = [
  {
    id: '1',
    name: 'Loja Center',
    flavor: 'Monster Original',
    latitude: -23.5505,
    longitude: -46.6333,
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    distance: 0.5,
  },
  {
    id: '2',
    name: 'Supermercado XYZ',
    flavor: 'Monster Ultra',
    latitude: -23.5525,
    longitude: -46.6350,
    address: 'Rua Augusta, 2500 - São Paulo, SP',
    distance: 1.2,
  },
  {
    id: '3',
    name: 'Conveniência 24h',
    flavor: 'Monster Zero',
    latitude: -23.5480,
    longitude: -46.6310,
    address: 'Rua Consolação, 1500 - São Paulo, SP',
    distance: 0.8,
  },
  {
    id: '4',
    name: 'Mercado Premium',
    flavor: 'Monster Mango Loco',
    latitude: -23.5560,
    longitude: -46.6380,
    address: 'Av. Brasil, 3000 - São Paulo, SP',
    distance: 2.1,
  },
  {
    id: '5',
    name: 'Posto de Gasolina',
    flavor: 'Monster Nitro',
    latitude: -23.5450,
    longitude: -46.6290,
    address: 'Rua Vergueiro, 800 - São Paulo, SP',
    distance: 1.5,
  },
  {
    id: '6',
    name: 'Farmácia do Bairro',
    flavor: 'Monster Original',
    latitude: -23.5490,
    longitude: -46.6360,
    address: 'Rua Bandeira, 500 - São Paulo, SP',
    distance: 1.1,
  },
  {
    id: '7',
    name: 'Bar do Zé',
    flavor: 'Monster Ultra',
    latitude: -23.5540,
    longitude: -46.6300,
    address: 'Rua Pamplona, 1200 - São Paulo, SP',
    distance: 0.9,
  },
  {
    id: '8',
    name: 'Café Gourmet',
    flavor: 'Monster Zero',
    latitude: -23.5470,
    longitude: -46.6340,
    address: 'Av. Rebouças, 2000 - São Paulo, SP',
    distance: 1.3,
  },
];

export default function Home() {
  const [locations, setLocations] = useState<EnergyDrinkLocation[]>(MOCK_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<EnergyDrinkLocation | undefined>();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Filter locations based on search query and flavor
  useEffect(() => {
    let filtered = MOCK_LOCATIONS;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply flavor filter
    if (selectedFlavor) {
      filtered = filtered.filter((loc) => loc.flavor.includes(selectedFlavor));
    }

    setLocations(filtered);
  }, [searchQuery, selectedFlavor]);

  // Get user location
  const handleGetUserLocation = () => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Calculate distances from user location
          const locationsWithDistance = MOCK_LOCATIONS.map((loc) => {
            const distance = calculateDistance(latitude, longitude, loc.latitude, loc.longitude);
            return { ...loc, distance };
          });

          // Sort by distance
          locationsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          setLocations(locationsWithDistance);
          setIsLoadingLocation(false);
        },
        () => {
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
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
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="border-b border-green-400/30 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6 text-black font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-bold neon-text">Monster Locator</h1>
              <p className="text-xs text-gray-400">Encontre sabores perto de você</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-400">{locations.length} locais encontrados</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-green-400/30 bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
          {/* Search Section */}
          <div className="p-4 border-b border-green-400/20 space-y-4">
            <SearchBar
              onSearch={setSearchQuery}
              onLocationClick={handleGetUserLocation}
              isLoadingLocation={isLoadingLocation}
            />
            <FlavorFilter
              selectedFlavor={selectedFlavor}
              onFlavorSelect={setSelectedFlavor}
            />
          </div>

          {/* Locations List or Details */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {selectedLocation ? (
                <LocationDetails
                  name={selectedLocation.name}
                  flavor={selectedLocation.flavor}
                  address={selectedLocation.address}
                  distance={selectedLocation.distance}
                />
              ) : null}
              
              {locations.length > 0 ? (
                <div className="space-y-3">
                  {locations.map((location) => (
                    <LocationCard
                      key={location.id}
                      name={location.name}
                      flavor={location.flavor}
                      address={location.address}
                      distance={location.distance}
                      isSelected={selectedLocation?.id === location.id}
                      onClick={() => setSelectedLocation(location)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>Nenhum local encontrado</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer Info */}
          <div className="p-4 border-t border-green-400/20 text-xs text-gray-400">
            <p>💡 Clique em um local para ver no mapa</p>
          </div>
        </aside>

        {/* Map Section */}
        <main className="flex-1 overflow-hidden">
          <MapComponent
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            userLocation={userLocation}
          />
        </main>
      </div>
    </div>
  );
}
