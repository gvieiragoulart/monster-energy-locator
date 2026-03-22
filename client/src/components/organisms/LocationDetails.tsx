import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { MonsterFlavor } from '@/types/location';

interface LocationDetailsProps {
  name: string;
  flavors: MonsterFlavor[];
  address: string;
  distance?: number;
  isOpen?: boolean;
}

export function LocationDetails({
  name,
  flavors,
  address,
  distance,
  isOpen = true,
}: LocationDetailsProps) {
  return (
    <Card className="p-6 space-y-4 border-green-400/50 bg-card/80 backdrop-blur-sm">
      <div>
        <h2 className="text-2xl font-bold neon-text mb-1">{name}</h2>
        <div className="flex flex-wrap gap-1 mt-1">
          {flavors.map((f) => (
            <span key={f} className="text-cyan-400 text-sm bg-cyan-400/10 px-2 py-0.5 rounded">
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-green-400/20 pt-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-300">Endereço</p>
            <p className="text-sm text-gray-400">{address}</p>
          </div>
        </div>

        {distance !== undefined && (
          <div className="flex items-start gap-3">
            <Navigation className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-300">Distância</p>
              <p className="text-sm text-gray-400">{distance.toFixed(1)} km de você</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-300">Horário</p>
            <p className={`text-sm ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
              {isOpen ? 'Aberto agora' : 'Fechado'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-green-400/20 pt-4">
        <Button className="bg-green-600 hover:bg-green-700 text-white border border-green-400 glow-on-hover">
          <Phone className="w-4 h-4 mr-2" />
          Ligar
        </Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400 glow-on-hover">
          <Navigation className="w-4 h-4 mr-2" />
          Rotas
        </Button>
      </div>
    </Card>
  );
}
