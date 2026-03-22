import { useId } from 'react';
import { Link, type LinkProps } from 'react-router';

import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

export type LogoProps = Omit<LinkProps, 'to'> & {
  href?: string;
  isSingle?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Logo({
  disabled,
  className,
  href = '/',
  isSingle = true,
  ...other
}: LogoProps) {
  const uniqueId = useId();

  // Gradient colors: purple to blue
  const PURPLE = '#9333EA'; // Vibrant purple
  const BLUE = '#2563EB'; // Deep blue
  const TEXT_COLOR = 'var(--foreground)';

  const singleLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${uniqueId}-gradient`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={BLUE} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill={`url(#${uniqueId}-gradient)`} />
      <text
        x="20"
        y="20"
        fill="white"
        fontSize="24"
        fontWeight="700"
        fontFamily="Inter, system-ui, sans-serif"
        textAnchor="middle"
        dominantBaseline="central"
      >
        C
      </text>
    </svg>
  );

  const fullLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${uniqueId}-gradient-full`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={BLUE} />
        </linearGradient>
      </defs>
      <rect
        width="40"
        height="40"
        rx="8"
        fill={`url(#${uniqueId}-gradient-full)`}
      />
      <text
        x="20"
        y="20"
        fill="white"
        fontSize="24"
        fontWeight="700"
        fontFamily="Inter, system-ui, sans-serif"
        textAnchor="middle"
        dominantBaseline="central"
      >
        C
      </text>
      <text
        x="56"
        y="26"
        fill={TEXT_COLOR}
        fontSize="20"
        fontWeight="700"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-0.01em"
      >
        Colin AI
      </text>
    </svg>
  );

  const sizeClasses = isSingle ? 'h-10 w-10' : 'h-9 w-35';
  const stateClasses = disabled ? 'pointer-events-none' : '';

  return (
    <Link
      to={href}
      aria-label="Colin AI"
      className={cn(
        'inline-flex shrink-0 items-center align-middle text-transparent',
        sizeClasses,
        stateClasses,
        className
      )}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </Link>
  );
}
