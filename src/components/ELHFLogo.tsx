import React from 'react';

interface ELHFLogoProps {
  variant?: 'emblem' | 'white-emblem' | 'horizontal' | 'full-crest' | 'white-horizontal' | 'white-crest';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ELHFLogo: React.FC<ELHFLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const getEmblemSize = () => {
    switch (size) {
      case 'sm':
        return 'w-7 h-7';
      case 'lg':
        return 'w-14 h-14';
      case 'xl':
        return 'w-20 h-20';
      case 'md':
      default:
        return 'w-9 h-9';
    }
  };

  const isWhite =
    variant === 'white-horizontal' ||
    variant === 'white-crest' ||
    variant === 'white-emblem';

  const primaryColor = isWhite ? '#FFFFFF' : '#491C63';
  const innerHeartFill = isWhite ? '#491C63' : '#FFFFFF';
  const textColor = isWhite ? 'text-white' : 'text-[#491C63]';
  const subTextColor = isWhite ? 'text-purple-200' : 'text-purple-900';

  // SVG Emblem based on Ella 6: Stylized Purple Heart with Parent & Child Silhouette & Cupped Hand Base
  const Emblem = ({ customSize }: { customSize?: string }) => (
    <svg
      viewBox="0 0 200 200"
      className={`${customSize || getEmblemSize()} shrink-0 transition-transform duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Outer Heart Silhouette */}
        <path
          d="M100 178 C70 155 32 120 22 84 C14 54 28 24 58 20 C76 17 93 28 100 42 C107 28 124 17 142 20 C172 24 186 54 178 84 C168 120 130 155 100 178 Z"
          fill={primaryColor}
        />
        {/* Inner Heart Cutout */}
        <path
          d="M100 160 C74 140 44 110 36 80 C29 55 41 34 62 30 C78 28 92 37 98 48 C99 50 101 50 102 48 C108 37 122 28 138 30 C159 34 171 55 164 80 C156 110 126 140 100 160 Z"
          fill={innerHeartFill}
        />
        {/* Inner Parent (Adult) & Child Silhouettes */}
        <circle cx="91" cy="62" r="10" fill={primaryColor} />
        {/* Parent Curved Torso */}
        <path
          d="M71 110 C69 86 81 77 95 77 C87 89 87 103 95 113 C87 115 75 114 71 110 Z"
          fill={primaryColor}
        />
        {/* Child Head */}
        <circle cx="114" cy="80" r="7.5" fill={primaryColor} />
        {/* Child Body Arc */}
        <path
          d="M103 91 C112 87 122 93 124 104 C116 108 107 104 103 91 Z"
          fill={primaryColor}
        />
        {/* Base Cupped Cradle Hand */}
        <path
          d="M66 124 C83 138 116 140 138 118 C131 135 103 145 78 137 C72 134 68 129 66 124 Z"
          fill={primaryColor}
        />
      </g>
    </svg>
  );

  if (variant === 'emblem' || variant === 'white-emblem') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <Emblem />
      </div>
    );
  }

  if (variant === 'full-crest' || variant === 'white-crest') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <Emblem customSize={size === 'xl' ? 'w-24 h-24' : size === 'lg' ? 'w-18 h-18' : 'w-14 h-14'} />
        
        <div className="mt-3">
          <h2
            className={`font-serif tracking-[0.18em] font-bold uppercase text-base sm:text-lg md:text-xl ${textColor} leading-snug`}
          >
            Ella Langley
          </h2>
          
          <div className="flex items-center justify-center gap-2 my-1">
            <span className={`h-px w-6 sm:w-8 ${isWhite ? 'bg-purple-300/60' : 'bg-purple-900/30'}`} />
            <span
              className={`text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase ${subTextColor}`}
            >
              Hope Foundation
            </span>
            <span className={`h-px w-6 sm:w-8 ${isWhite ? 'bg-purple-300/60' : 'bg-purple-900/30'}`} />
          </div>

          <p
            className={`text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase mt-1.5 ${
              isWhite ? 'text-purple-200' : 'text-purple-800'
            }`}
          >
            Bringing Hope • Changing Lives • Building Futures
          </p>
        </div>
      </div>
    );
  }

  // Default 'horizontal' or 'white-horizontal'
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <Emblem />
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className={`font-serif font-bold text-sm sm:text-base tracking-wide uppercase ${textColor}`}>
            Ella Langley
          </span>
          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded leading-none ${isWhite ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#491C63]'}`}>
            ELHF
          </span>
        </div>
        <span className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase ${subTextColor} mt-0.5`}>
          Hope Foundation
        </span>
      </div>
    </div>
  );
};
