import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { MonsterFlavor } from '@/types/location';

interface FlavorFilterProps {
  selectedFlavor?: MonsterFlavor;
  onFlavorSelect?: (flavor: MonsterFlavor | undefined) => void;
}

const FLAVORS = [
  { value: MonsterFlavor.Original, label: 'Original', color: 'text-green-400 border-green-400' },
  { value: MonsterFlavor.Ultra, label: 'Ultra', color: 'text-cyan-400 border-cyan-400' },
  { value: MonsterFlavor.Zero, label: 'Zero', color: 'text-purple-400 border-purple-400' },
  { value: MonsterFlavor.MangoLoco, label: 'Mango Loco', color: 'text-yellow-400 border-yellow-400' },
  { value: MonsterFlavor.Nitro, label: 'Nitro', color: 'text-orange-400 border-orange-400' },
  { value: MonsterFlavor.UltraSunrise, label: 'Ultra Sunrise', color: 'text-amber-400 border-amber-400' },
];

export function FlavorFilter({ selectedFlavor, onFlavorSelect }: FlavorFilterProps) {
  return (
    <div className="space-y-3">      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onFlavorSelect?.(undefined)}
          variant={selectedFlavor === undefined ? 'default' : 'outline'}
          className={`text-xs h-8 ${
            selectedFlavor === undefined
              ? 'bg-green-600 border-green-400 text-white'
              : 'border-gray-600 text-gray-400 hover:border-green-400'
          }`}
        >
          Todos
        </Button>
        
        {FLAVORS.map((flavor) => (
          <Button
            key={flavor.value}
            onClick={() => onFlavorSelect?.(flavor.value)}
            variant={selectedFlavor === flavor.value ? 'default' : 'outline'}
            className={`text-xs h-8 ${
              selectedFlavor === flavor.value
                ? `bg-transparent border-2 ${flavor.color}`
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
          >
            {flavor.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
