import { useState } from 'react';
import { MapComponent } from '@/components/organisms/MapContainer';
import { LocationCard } from '@/components/molecules/LocationCard';
import { LocationDetails } from '@/components/organisms/LocationDetails';
import { SearchBar } from '@/components/molecules/SearchBar';
import { FlavorFilter } from '@/components/molecules/FlavorFilter';
import { MainLayout } from '@/components/templates/MainLayout';
import { useFilteredLocations } from '@/hooks/useFilteredLocations';
import { EnergyDrinkLocation } from '@/types/location';

export default function Home() {
  const {
    locations,
    setSearchQuery,
    selectedFlavor,
    setSelectedFlavor,
  } = useFilteredLocations();

  const [selectedLocation, setSelectedLocation] = useState<EnergyDrinkLocation | undefined>();

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-green-400/20 space-y-4">
        <SearchBar onSearch={setSearchQuery} />
        <FlavorFilter
          selectedFlavor={selectedFlavor}
          onFlavorSelect={setSelectedFlavor}
        />
      </div>

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
    </>
  );

  return (
    <MainLayout locationCount={locations.length} sidebar={sidebarContent}>
      <MapComponent
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />
    </MainLayout>
  );
}
