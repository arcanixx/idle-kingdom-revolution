content = """\'use client\';

import { cn } from \'@/lib/utils\';
import { Button } from \'@/components/ui/button\';

interface BottomNavProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const navItems = [
  { path: \'/dashboard\', icon: \'\\ud83c\\udfe0\', label: \'Home\' },
  { path: \'/game/battle\', icon: \'\\u2694\\ufe0f\', label: \'Battle\' },
  { path: \'/game/army\', icon: \'\\ud83d\\udc82\', label: \'Army\' },
  { path: \'/game/shop\', icon: \'\\ud83d\\uded2\', label: \'Shop\' },
  { path: \'/game/valor\', icon: \'\\ud83c\\udfc5\\ufe0f\', label: \'Valor\' },
];

export function BottomNav({ currentPath = \'/dashboard\', onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? \'default\' : \'ghost\'}
            size="icon"
            className={cn(
              \'flex flex-col items-center justify-center h-full\',
              currentPath === item.path 
                ? \'text-primary-foreground\' 
                : \'text-muted-foreground hover:text-foreground\'
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
"""
with open("src/components/BottomNav.tsx", "w", encoding="utf8") as f:
    f.write(content)
print("Written")
