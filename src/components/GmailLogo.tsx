import React from 'react';

interface GmailLogoProps {
  className?: string;
  size?: number;
}

export const GmailLogo: React.FC<GmailLogoProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} shrink-0`}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Official Google Gmail multi-color vector shape */}
      <path
        fill="#4285F4"
        d="M21.5 19.5h-3.75V11.25L12 15.75 6.25 11.25V19.5H2.5A1.5 1.5 0 0 1 1 18V6c0-1.88 2.14-2.95 3.64-1.82L12 9.75l7.36-5.57C20.86 3.05 23 4.12 23 6v12a1.5 1.5 0 0 1-1.5 1.5z"
      />
      <path
        fill="#34A853"
        d="M21.5 19.5H18V11.25l4.5-3.38V18a1.5 1.5 0 0 1-1 1.5z"
      />
      <path
        fill="#EA4335"
        d="M18 6.5l-6 4.5-6-4.5V6a1.5 1.5 0 0 1 2.4-1.2L12 7.5l3.6-2.7A1.5 1.5 0 0 1 18 6v.5z"
      />
      <path
        fill="#FBBC04"
        d="M6 6.5L1.5 9.87V6a1.5 1.5 0 0 1 2.4-1.2L6 6.5z"
      />
      <path
        fill="#C5221F"
        d="M18 6.5l4.5 3.37V6a1.5 1.5 0 0 0-2.4-1.2L18 6.5z"
      />
    </svg>
  );
};
