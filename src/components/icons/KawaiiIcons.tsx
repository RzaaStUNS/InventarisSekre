import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Cute laptop icon
export const LaptopIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="10" width="36" height="24" rx="4" fill="#A8D0EF" stroke="#99C3E4" strokeWidth="2"/>
    <rect x="10" y="14" width="28" height="16" rx="2" fill="#E3F1FB"/>
    <path d="M2 34h44c0 4-4 6-8 6H10c-4 0-8-2-8-6z" fill="#C1E4F3" stroke="#99C3E4" strokeWidth="2"/>
    <circle cx="24" cy="22" r="3" fill="#FFE485"/>
  </svg>
);

// Cute mouse icon
export const MouseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="28" rx="14" ry="16" fill="#E3F1FB" stroke="#99C3E4" strokeWidth="2"/>
    <line x1="24" y1="12" x2="24" y2="24" stroke="#99C3E4" strokeWidth="2"/>
    <ellipse cx="24" cy="18" rx="4" ry="6" fill="#C1E4F3" stroke="#99C3E4" strokeWidth="2"/>
    <path d="M16 6c0-2 4-4 8-4s8 2 8 4" stroke="#99C3E4" strokeWidth="2" fill="none"/>
  </svg>
);

// Cute keyboard icon
export const KeyboardIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="14" width="40" height="22" rx="4" fill="#E3F1FB" stroke="#99C3E4" strokeWidth="2"/>
    <rect x="8" y="18" width="6" height="5" rx="1" fill="#A8D0EF"/>
    <rect x="16" y="18" width="6" height="5" rx="1" fill="#A8D0EF"/>
    <rect x="24" y="18" width="6" height="5" rx="1" fill="#A8D0EF"/>
    <rect x="32" y="18" width="8" height="5" rx="1" fill="#FFE485"/>
    <rect x="8" y="26" width="32" height="5" rx="1" fill="#C1E4F3"/>
  </svg>
);

// Cute spoon icon
export const SpoonIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="14" rx="10" ry="8" fill="#FFE485" stroke="#E16F94" strokeWidth="2"/>
    <rect x="22" y="20" width="4" height="22" rx="2" fill="#FFE485" stroke="#E16F94" strokeWidth="2"/>
    <circle cx="24" cy="12" r="3" fill="#FFF9E6"/>
  </svg>
);

// Cute fork icon
export const ForkIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="22" y="24" width="4" height="18" rx="2" fill="#99C3E4" stroke="#C1E4F3" strokeWidth="2"/>
    <path d="M16 8v12c0 2 2 4 4 4h8c2 0 4-2 4-4V8" stroke="#99C3E4" strokeWidth="2" fill="#E3F1FB"/>
    <line x1="18" y1="8" x2="18" y2="18" stroke="#99C3E4" strokeWidth="2"/>
    <line x1="24" y1="8" x2="24" y2="18" stroke="#99C3E4" strokeWidth="2"/>
    <line x1="30" y1="8" x2="30" y2="18" stroke="#99C3E4" strokeWidth="2"/>
  </svg>
);

// Cute glass icon
export const GlassIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M14 8h20l-4 32h-12L14 8z" fill="#C1E4F3" stroke="#99C3E4" strokeWidth="2"/>
    <ellipse cx="24" cy="8" rx="10" ry="3" fill="#E3F1FB" stroke="#99C3E4" strokeWidth="2"/>
    <path d="M16 16c4 2 12 2 16 0" stroke="#A8D0EF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Cute plate icon
export const PlateIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="28" rx="18" ry="8" fill="#FFF9E6" stroke="#E16F94" strokeWidth="2"/>
    <ellipse cx="24" cy="26" rx="14" ry="6" fill="#FFE485" stroke="#E16F94" strokeWidth="2"/>
    <ellipse cx="24" cy="24" rx="8" ry="3" fill="#FFF9E6"/>
  </svg>
);

// Cute pen icon
export const PenIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="20" y="4" width="8" height="32" rx="2" fill="#A8D0EF" stroke="#99C3E4" strokeWidth="2"/>
    <path d="M20 36l4 8 4-8" fill="#C94D71"/>
    <rect x="20" y="4" width="8" height="6" rx="1" fill="#C94D71"/>
    <circle cx="24" cy="20" r="2" fill="#FFF9E6"/>
  </svg>
);

// Cute pencil icon
export const PencilIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="20" y="6" width="8" height="28" rx="1" fill="#FFE485" stroke="#E16F94" strokeWidth="2"/>
    <path d="M20 34l4 10 4-10" fill="#FFF9E6" stroke="#E16F94" strokeWidth="2"/>
    <rect x="20" y="6" width="8" height="4" fill="#E16F94"/>
    <line x1="24" y1="12" x2="24" y2="30" stroke="#FFF9E6" strokeWidth="2"/>
  </svg>
);

// Cute eraser icon
export const EraserIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="20" width="32" height="14" rx="4" fill="#E16F94" stroke="#C94D71" strokeWidth="2"/>
    <rect x="8" y="20" width="12" height="14" rx="4" fill="#FFE485"/>
    <line x1="12" y1="24" x2="12" y2="30" stroke="#E16F94" strokeWidth="2"/>
  </svg>
);

// Cute box icon
export const BoxIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="14" width="36" height="28" rx="4" fill="#E3F1FB" stroke="#99C3E4" strokeWidth="2"/>
    <path d="M6 14l18-8 18 8" fill="#C1E4F3" stroke="#99C3E4" strokeWidth="2"/>
    <line x1="24" y1="6" x2="24" y2="28" stroke="#99C3E4" strokeWidth="2"/>
    <ellipse cx="24" cy="28" rx="6" ry="4" fill="#FFE485"/>
  </svg>
);

// Status icons
export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#A8E6CF" stroke="#52C788" strokeWidth="2"/>
    <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CrossIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FFB3BA" stroke="#E16F94" strokeWidth="2"/>
    <path d="M9 9l6 6M15 9l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Decorative elements
export const StarDecor: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.4-6.3-4.6-6.3 4.6 2.3-7.4-6-4.4h7.6L12 2z" fill="#FFE485" stroke="#E16F94" strokeWidth="1"/>
  </svg>
);

export const HeartDecor: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E16F94"/>
  </svg>
);

export const RibbonDecor: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 8c-6 0-8 4-8 4s2-4 8-4 8 4 8 4-2-4-8-4z" fill="#E16F94"/>
    <path d="M8 12c-2 6 2 8 2 8l6-4-6-4z" fill="#C94D71"/>
    <path d="M24 12c2 6-2 8-2 8l-6-4 6-4z" fill="#C94D71"/>
    <circle cx="16" cy="12" r="4" fill="#FFE485"/>
  </svg>
);

export const FlowerDecor: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="10" r="5" fill="#C1E4F3"/>
    <circle cx="10" cy="16" r="5" fill="#E3F1FB"/>
    <circle cx="22" cy="16" r="5" fill="#E3F1FB"/>
    <circle cx="12" cy="22" r="5" fill="#C1E4F3"/>
    <circle cx="20" cy="22" r="5" fill="#C1E4F3"/>
    <circle cx="16" cy="16" r="4" fill="#FFE485"/>
  </svg>
);

export const CloudDecor: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <ellipse cx="16" cy="18" rx="10" ry="6" fill="#E3F1FB"/>
    <circle cx="10" cy="14" r="6" fill="#C1E4F3"/>
    <circle cx="22" cy="14" r="5" fill="#C1E4F3"/>
    <circle cx="16" cy="12" r="7" fill="#E3F1FB"/>
  </svg>
);

// Category icon mapper
export const getCategoryIcon = (category: string, size = 32): React.ReactNode => {
  switch (category) {
    case 'Elektronik':
      return <LaptopIcon size={size} />;
    case 'Alat Makan':
      return <SpoonIcon size={size} />;
    case 'Alat Tulis':
      return <PenIcon size={size} />;
    default:
      return <BoxIcon size={size} />;
  }
};

export const getSubCategoryIcon = (subCategory: string, size = 28): React.ReactNode => {
  switch (subCategory) {
    case 'Laptop':
      return <LaptopIcon size={size} />;
    case 'Mouse':
      return <MouseIcon size={size} />;
    case 'Keyboard':
      return <KeyboardIcon size={size} />;
    case 'Sendok':
      return <SpoonIcon size={size} />;
    case 'Garpu':
      return <ForkIcon size={size} />;
    case 'Gelas':
      return <GlassIcon size={size} />;
    case 'Piring':
      return <PlateIcon size={size} />;
    case 'Bolpoin':
      return <PenIcon size={size} />;
    case 'Pensil':
      return <PencilIcon size={size} />;
    case 'Penghapus':
      return <EraserIcon size={size} />;
    default:
      return <BoxIcon size={size} />;
  }
};
