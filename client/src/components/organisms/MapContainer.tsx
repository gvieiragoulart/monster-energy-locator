import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useUserLocation } from '@/contexts/UserLocationContext';
import { EnergyDrinkLocation } from '@/types/location';

interface MapContainerProps {
  locations: EnergyDrinkLocation[];
  selectedLocation?: EnergyDrinkLocation;
  onLocationSelect?: (location: EnergyDrinkLocation) => void;
}

// Custom icon for Monster Energy locations
const createMonsterIcon = (isSelected: boolean = false) => {
  const size = isSelected ? 56 : 48;
  const svgContent = isSelected
    ? 'PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyOCIgY3k9IjI4IiByPSIyNiIgZmlsbD0iIzAwZmY4OCIgb3BhY2l0eT0iMC4zIiBzdHJva2U9IiMwMGZmODgiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjI4IiBjeT0iMjgiIHI9IjE0IiBmaWxsPSIjMDBmZjg4Ii8+PHRleHQgeD0iMjgiIHk9IjM1IiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzBhMGUyNyI+TTwvdGV4dD48L3N2Zz4='
    : 'PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyMiIgZmlsbD0iIzAwZmY4OCIgb3BhY2l0eT0iMC4yIiBzdHJva2U9IiMwMGZmODgiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjEyIiBmaWxsPSIjMDBmZjg4Ii8+PHRleHQgeD0iMjQiIHk9IjMwIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzBhMGUyNyI+TTwvdGV4dD48L3N2Zz4=';
  
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${svgContent}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

// Custom icon for user location
const createUserIcon = () => {
  return L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyMiIgZmlsbD0iIzAwZDRmZiIgb3BhY2l0eT0iMC4yIiBzdHJva2U9IiMwMGQ0ZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjgiIGZpbGw9IiMwMGQ0ZmYiLz48L3N2Zz4=',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });
};

export function MapComponent({
  locations,
  selectedLocation,
  onLocationSelect,
}: MapContainerProps) {
  const { userLocation } = useUserLocation();
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current).setView([-23.5505, -46.6333], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Add user location marker
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    const userMarker = L.marker([userLocation.lat, userLocation.lng], {
      icon: createUserIcon(),
    }).addTo(mapRef.current);

    userMarker.bindPopup(
      '<div class="text-sm font-bold text-cyan-400">Sua Localização</div>'
    );

    mapRef.current.setView([userLocation.lat, userLocation.lng], 14, {
      animate: true,
      duration: 0.8,
    });

    return () => {
      userMarker.remove();
    };
  }, [userLocation]);

  // Add location markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
      markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add new markers
    locations.forEach((location) => {
      const isSelected = selectedLocation?.id === location.id;
      const marker = L.marker([location.latitude, location.longitude], {
        icon: createMonsterIcon(isSelected),
      }).addTo(mapRef.current!);
      
      if (isSelected) {
        marker.openPopup();
      }

      const popupContent = `
        <div class="space-y-2 text-xs">
          <div class="font-bold text-green-400">${location.name}</div>
          <div class="text-cyan-400">${location.flavor}</div>
          <div class="text-gray-300">${location.address}</div>
          ${location.distance ? `<div class="text-purple-400">${location.distance.toFixed(1)} km</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onLocationSelect?.(location);
      });

      markersRef.current.set(location.id, marker);
    });
  }, [locations, onLocationSelect]);

  // Handle selected location
  useEffect(() => {
    if (!mapRef.current || !selectedLocation) return;

    mapRef.current.setView(
      [selectedLocation.latitude, selectedLocation.longitude],
      15,
      { animate: true, duration: 0.5 }
    );

    const marker = markersRef.current.get(selectedLocation.id);
    if (marker) {
      marker.openPopup();
    }
  }, [selectedLocation]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border-2 neon-border">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
