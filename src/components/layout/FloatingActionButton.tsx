import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-28 right-6 z-50 w-16 h-16 bg-gradient-to-br from-accent to-kawaii-rose rounded-2xl shadow-float flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse-glow group"
      style={{
        animation: 'pulse-glow 3s ease-in-out infinite',
      }}
    >
      <Plus className="w-8 h-8 text-accent-foreground group-hover:rotate-90 transition-transform duration-300" />
      
      {/* Decorative ring */}
      <div className="absolute inset-0 rounded-2xl border-4 border-accent-foreground/20 animate-ping" style={{ animationDuration: '2s' }} />
    </button>
  );
};

export default FloatingActionButton;
