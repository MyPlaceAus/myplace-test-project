import { useRef, useEffect } from 'react';
import { cn } from 'src/lib/utils';
import { Popover, PopoverAnchor, PopoverContent } from 'src/components/ui/popover';

// ----------------------------------------------------------------------

export type NavDropdownProps = React.ComponentProps<typeof Popover> & {
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  children: React.ReactNode;
};

export function NavDropdown({ open, onClose, anchorEl, children, ...other }: NavDropdownProps) {
  const anchorRef = useRef<HTMLDivElement>(null);

  // Sync anchor element position with anchorEl
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (anchorEl && anchorRef.current && open) {
      const updatePosition = () => {
        if (anchorEl && anchorRef.current) {
          const rect = anchorEl.getBoundingClientRect();
          anchorRef.current.style.position = 'fixed';
          anchorRef.current.style.left = `${rect.left}px`;
          anchorRef.current.style.top = `${rect.top}px`;
          anchorRef.current.style.width = `${rect.width}px`;
          anchorRef.current.style.height = `${rect.height}px`;
          anchorRef.current.style.pointerEvents = 'none';
          anchorRef.current.style.visibility = 'visible';
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [anchorEl, open]);

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
      {...other}
    >
      {anchorEl && (
        <PopoverAnchor asChild>
          <div ref={anchorRef} aria-hidden="true" style={{ visibility: 'hidden' }} />
        </PopoverAnchor>
      )}
      <PopoverContent
        className={cn(
          'pointer-events-none min-w-[180px] overflow-visible bg-transparent p-0 shadow-none backdrop-blur-none',
          open && 'pointer-events-auto'
        )}
        align="start"
        side="right"
        sideOffset={0}
        onPointerDownOutside={(e) => {
          // Prevent closing when clicking inside the popover
          const target = e.target as HTMLElement;
          if (anchorEl && anchorEl.contains(target)) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export const NavDropdownPaper = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('bg-card border-border min-w-[180px] rounded-lg border shadow-md', className)}
    {...props}
  >
    {children}
  </div>
);
