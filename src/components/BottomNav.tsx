'use client';


import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const navItems = [
  { path: '/dashboard', icon: '??', label: 'Home' },
  { path: '/battle', icon: '??', label: 'Battle' },
  { path: '/units', icon: '??', label: 'Units' },
  { path: '/economy', icon: '??', label: 'Economy' },
  { path: '/valor', icon: '?', label: 'Valor' },
];

export function BottomNav({ currentPath = '/dashboard', onNavigate }: BottomNavProps) {
  // using plain text labels

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? 'default' : 'ghost'}
            size="icon"
            className={cn(
              'flex flex-col items-center justify-center h-full',
              currentPath === item.path 
                ? 'text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => onNavigate?.(item.path)}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
