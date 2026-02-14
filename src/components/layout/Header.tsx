import React from 'react';
import { Package, Bell } from 'lucide-react';
import { StarDecor, HeartDecor, RibbonDecor } from '@/components/icons/KawaiiIcons';

interface HeaderProps {
  totalItems: number;
}

const Header: React.FC<HeaderProps> = ({ totalItems }) => {
  return (
    <header className="relative z-10 pt-6 pb-4 px-4">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 animate-float">
        <StarDecor size={24} />
      </div>
      <div className="absolute top-12 right-20 animate-wiggle">
        <HeartDecor size={18} />
      </div>
      <div className="absolute top-8 left-6 animate-float-slow">
        <RibbonDecor size={28} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-kawaii-ocean rounded-2xl flex items-center justify-center shadow-kawaii animate-bounce-gentle">
              <Package className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-kawaii-rose bg-clip-text text-transparent">
                Inventaris E-Mailkomp
              </h1>
              <p className="text-sm text-muted-foreground">Kelola barang E-Mailkomp</p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Stats badge */}
            <div className="hidden sm:flex items-center gap-2 bg-card rounded-2xl px-4 py-2 shadow-cute border-2 border-border/50">
              <div className="w-8 h-8 bg-secondary rounded-xl flex items-center justify-center">
                <Package className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Jumlah Jenis Asset</p>
                <p className="text-lg font-bold text-foreground">{totalItems}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
