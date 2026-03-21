import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Zap } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onLocationClick?: () => void;
  isLoadingLocation?: boolean;
}

export function SearchBar({
  onSearch,
  onLocationClick,
  isLoadingLocation = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

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
        onClick={onLocationClick}
        disabled={isLoadingLocation}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white border border-purple-400 glow-on-hover"
      >
        <MapPin className="w-4 h-4 mr-2" />
        {isLoadingLocation ? 'Localizando...' : 'Usar Minha Localização'}
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="border-green-400 text-green-400 hover:bg-green-400/10 hover:border-cyan-400"
        >
          <Zap className="w-4 h-4 mr-2" />
          Original
        </Button>
        <Button
          variant="outline"
          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-green-400"
        >
          <Zap className="w-4 h-4 mr-2" />
          Ultra
        </Button>
      </div>
    </div>
  );
}
