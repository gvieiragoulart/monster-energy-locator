import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation } from 'lucide-react';
import { MonsterFlavor } from '@/types/location';

interface LocationCardProps {
  name: string;
  flavors: MonsterFlavor[];
  address: string;
  distance?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function LocationCard({
  name,
  flavors,
  address,
  distance,
  isSelected = false,
  onClick,
}: LocationCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'neon-glow-intense border-green-400 bg-green-400/10'
          : 'glow-on-hover border-border hover:border-green-400'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-green-400 text-lg neon-text">{name}</h3>
            <p className="text-sm text-cyan-400 mt-1">{flavors.join(', ')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-300">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span className="line-clamp-2">{address}</span>
        </div>

        {distance !== undefined && (
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <Badge variant="outline" className="text-cyan-400 border-cyan-400">
              {distance.toFixed(1)} km
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
