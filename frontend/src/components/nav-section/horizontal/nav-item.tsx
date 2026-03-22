import type { NavItemProps } from '../types';

import { cn } from 'src/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from 'src/components/ui/tooltip';

import { Iconify } from '../../iconify';
import { createNavItem } from '../utils';
import { navItemStyles, navSectionClasses } from '../styles';

// ----------------------------------------------------------------------

export function NavItem({
  path,
  icon,
  info,
  title,
  caption,
  /********/
  open,
  active,
  disabled,
  /********/
  depth,
  render,
  hasChild,
  slotProps,
  className,
  externalLink,
  enabledRootRedirect,
  ...other
}: NavItemProps) {
  const navItem = createNavItem({
    path,
    icon,
    info,
    depth,
    render,
    hasChild,
    externalLink,
    enabledRootRedirect,
  });

  const isDark = document.documentElement.classList.contains('dark');
  const isRootItem = navItem.rootItem;

  const rootItemStyles = cn(
    'p-[var(--nav-item-root-padding)] min-h-[var(--nav-item-root-height)]',
    open && 'text-[var(--nav-item-root-open-color)] bg-[var(--nav-item-root-open-bg)]',
    active && [
      'text-[var(--nav-item-root-active-color)] bg-[var(--nav-item-root-active-bg)]',
      'hover:bg-[var(--nav-item-root-active-hover-bg)]',
      isDark && 'text-[var(--nav-item-root-active-color-on-dark)]',
    ]
  );

  const subItemStyles = cn(
    'p-[var(--nav-item-sub-padding)] min-h-[var(--nav-item-sub-height)]',
    'text-muted-foreground',
    open && 'text-[var(--nav-item-sub-open-color)] bg-[var(--nav-item-sub-open-bg)]',
    active && 'text-[var(--nav-item-sub-active-color)] bg-[var(--nav-item-sub-active-bg)]'
  );

  return (
    <button
      type="button"
      aria-label={title}
      disabled={disabled}
      {...navItem.baseProps}
      className={cn(
        'w-full shrink-0',
        'rounded-[var(--nav-item-radius)] text-[var(--nav-item-color)]',
        'hover:bg-[var(--nav-item-hover-bg)]',
        isRootItem ? rootItemStyles : subItemStyles,
        disabled && navItemStyles.disabled,
        cn([navSectionClasses.item.root, className], {
          [navSectionClasses.state.open]: open,
          [navSectionClasses.state.active]: active,
          [navSectionClasses.state.disabled]: disabled,
        })
      )}
      {...other}
    >
      {icon && (
        <span
          className={cn(
            navItemStyles.icon,
            'h-[var(--nav-icon-size)] w-[var(--nav-icon-size)]',
            isRootItem ? 'm-[var(--nav-icon-root-margin)]' : 'm-[var(--nav-icon-sub-margin)]',
            navSectionClasses.item.icon,
            slotProps?.icon?.className
          )}
        >
          {navItem.renderIcon}
        </span>
      )}

      {title && (
        <span
          className={cn(
            navItemStyles.title,
            'text-sm font-medium whitespace-nowrap',
            active && 'font-semibold',
            navSectionClasses.item.title,
            slotProps?.title?.className
          )}
        >
          {title}
        </span>
      )}

      {caption && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Iconify
                icon="eva:info-outline"
                className={cn(
                  navItemStyles.captionIcon,
                  'text-[var(--nav-item-caption-color)]',
                  isRootItem && 'ml-3',
                  navSectionClasses.item.caption,
                  slotProps?.caption?.className
                )}
              />
            </TooltipTrigger>
            <TooltipContent>{caption}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {info && (
        <span
          className={cn(
            navItemStyles.info,
            navSectionClasses.item.info,
            slotProps?.info?.className
          )}
        >
          {navItem.renderInfo}
        </span>
      )}

      {hasChild && (
        <Iconify
          icon={navItem.subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'}
          className={cn(
            navItemStyles.arrow,
            navItem.subItem && '-mr-2',
            navSectionClasses.item.arrow,
            slotProps?.arrow?.className
          )}
        />
      )}
    </button>
  );
}
