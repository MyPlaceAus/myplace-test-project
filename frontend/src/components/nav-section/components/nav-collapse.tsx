import { cn } from 'src/lib/utils';

import { navSectionClasses } from '../styles';

// ----------------------------------------------------------------------

export type NavCollapseProps = React.ComponentProps<'div'> & {
  in?: boolean;
  depth?: number;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  'data-group'?: string;
};

export const NavCollapse = ({
  in: isOpen,
  depth,
  mountOnEnter,
  unmountOnExit,
  className,
  style,
  children,
  ...other
}: NavCollapseProps) => {
  const isDark = document.documentElement.classList.contains('dark');

  if (unmountOnExit && !isOpen) {
    return null;
  }

  const shouldApplyDepthStyles = depth && depth + 1 !== 1;

  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        shouldApplyDepthStyles && 'pl-[calc(var(--nav-item-pl)+var(--nav-icon-size)/2)]',
        className
      )}
      data-nav-depth={shouldApplyDepthStyles ? 'nested' : undefined}
      style={style}
      {...other}
    >
      {shouldApplyDepthStyles && (
        <style>{`
          [data-nav-depth="nested"] .${navSectionClasses.ul} {
            position: relative;
            padding-left: var(--nav-bullet-size);
          }
          [data-nav-depth="nested"] .${navSectionClasses.ul}::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            background-color: ${isDark ? 'var(--nav-bullet-dark-color)' : 'var(--nav-bullet-light-color)'};
            bottom: calc(var(--nav-item-sub-height) - 2px - var(--nav-bullet-size) / 2);
          }
        `}</style>
      )}
      {children}
    </div>
  );
};
