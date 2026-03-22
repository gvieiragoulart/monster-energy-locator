import { ReactNode } from 'react';
import { Zap } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MainLayoutProps {
  locationCount: number;
  sidebar: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function MainLayout({ locationCount, sidebar, children, footer }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="border-b border-green-400/30 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold neon-text">Monster Locator</h1>
              <p className="text-xs text-gray-400">Encontre sabores perto de você</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-green-400/30 bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 min-h-0">
            {sidebar}
          </ScrollArea>

          {/* Footer Info */}
          <div className="p-4 border-t border-green-400/20 text-xs text-gray-400">
            {footer ?? <p>💡 Clique em um local para ver no mapa</p>}
          </div>
        </aside>

        {/* Map Section */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
