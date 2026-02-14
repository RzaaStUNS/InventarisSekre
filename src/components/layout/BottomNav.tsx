import React from 'react';
import { Home, Package, BarChart3, Settings, Briefcase } from 'lucide-react';
import { StarDecor } from '@/components/icons/KawaiiIcons';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Beranda' },
    { id: 'inventory', icon: Package, label: 'Inventaris' },
    { id: 'stats', icon: BarChart3, label: 'Statistik' },
    { id: 'settings', icon: Briefcase, label: 'Peminjaman' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="bg-card/95 backdrop-blur-lg rounded-3xl shadow-float border-2 border-border/50 p-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground scale-110' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-2 -right-1">
                      <StarDecor size={16} className="animate-wiggle" />
                    </div>
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce-gentle' : ''}`} />
                  <span className="text-xs font-semibold mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
