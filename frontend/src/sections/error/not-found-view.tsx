import { m } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from 'src/components/ui/button';

const bounceIn = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      bounce: 0.5,
      duration: 0.8,
    },
  },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function NotFoundView() {
  return (
    <div
      className="bg-background flex min-h-screen items-center justify-center p-4"
      style={
        {
          '--primary': '#00A76F',
        } as React.CSSProperties
      }
    >
      <m.div
        className="w-full max-w-md space-y-8 text-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <m.div variants={bounceIn}>
          <h1 className="text-3xl font-bold tracking-tight">Sorry, page not found!</h1>
        </m.div>

        <m.div variants={bounceIn}>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve
            mistyped the URL? Be sure to check your spelling.
          </p>
        </m.div>

        <m.div variants={bounceIn} className="py-8">
          <svg
            className="mx-auto h-auto w-full max-w-sm"
            viewBox="0 0 480 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle cx="240" cy="180" r="160" fill="hsl(var(--primary))" opacity="0.1" />

            {/* 404 Text */}
            <text
              x="240"
              y="200"
              fontSize="120"
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
              opacity="0.2"
            >
              404
            </text>

            {/* Magnifying glass */}
            <circle
              cx="200"
              cy="160"
              r="50"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              fill="none"
            />
            <line
              x1="238"
              y1="198"
              x2="280"
              y2="240"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Question mark inside magnifying glass */}
            <text
              x="200"
              y="175"
              fontSize="48"
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
            >
              ?
            </text>
          </svg>
        </m.div>

        <m.div variants={bounceIn}>
          <Button size="lg" asChild>
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to home
            </a>
          </Button>
        </m.div>
      </m.div>
    </div>
  );
}
