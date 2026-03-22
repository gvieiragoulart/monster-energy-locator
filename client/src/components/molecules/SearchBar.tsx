import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useUserLocation } from '@/contexts/UserLocationContext';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { isLoadingLocation, handleGetUserLocation } = useUserLocation();

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 pointer-events-none" />
        <Input
          placeholder="Buscar sabor ou local..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-card border-green-400 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/30"
        />
      </div>

      <Button
        onClick={handleGetUserLocation}
        disabled={isLoadingLocation}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white border border-purple-400 glow-on-hover"
      >
        <MapPin className="w-4 h-4 mr-2" />
        {isLoadingLocation ? 'Localizando...' : 'Usar Minha Localização'}
      </Button>
    </div>
  );
}
