import { useMemo, useEffect } from 'react';
import { cn } from 'src/lib/utils';

import { layoutClasses } from './classes';
import { layoutSectionVars } from './css-vars';

// ----------------------------------------------------------------------

export type LayoutSectionProps = React.ComponentProps<'div'> & {
  cssVars?: Record<string, string | number>;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
  sidebarContainerStyle?: React.CSSProperties;
};

export function LayoutSection({
  className,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
  sidebarContainerStyle,
  ...other
}: LayoutSectionProps) {
  const allVars = useMemo(() => {
    const baseVars = layoutSectionVars();
    return { ...baseVars, ...cssVars };
  }, [cssVars]);

  // Set CSS variables on body element (matching original Material-UI implementation)
  useEffect(() => {
    const body = document.body;

    Object.entries(allVars).forEach(([key, value]) => {
      body.style.setProperty(key, String(value));
    });

    return () => {
      Object.keys(allVars).forEach((key) => {
        body.style.removeProperty(key);
      });
    };
  }, [allVars]);

  return (
    <div id="root__layout" className={cn(layoutClasses.root, className, 'h-full')} {...other}>
      {sidebarSection ? (
        <>
          {sidebarSection}
          <div
            className={cn('flex h-full min-w-0 flex-1 flex-col', layoutClasses.sidebarContainer)}
            style={sidebarContainerStyle}
          >
            {headerSection}
            {children}
            {footerSection}
          </div>
        </>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col" style={sidebarContainerStyle}>
          {headerSection}
          {children}
          {footerSection}
        </div>
      )}
    </div>
  );
}
