import type { JSX } from 'react';
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
    'text-center flex-col relative',
    'min-h-[var(--nav-item-root-height)] p-[var(--nav-item-root-padding)]',
    'flex items-center justify-center',
    !active && !open && 'hover:bg-[var(--nav-item-hover-bg)]',
    open && 'text-[var(--nav-item-root-open-color)] bg-[var(--nav-item-root-open-bg)]',
    active && [
      'text-[var(--nav-item-root-active-color)] bg-[var(--nav-item-root-active-bg)]',
      'hover:bg-[var(--nav-item-root-active-hover-bg)]',
      isDark && 'text-[var(--nav-item-root-active-color-on-dark)]',
    ]
  );

  const subItemStyles = cn(
    'min-h-[var(--nav-item-sub-height)]',
    'px-[var(--nav-item-sub-padding)] py-1.5',
    'text-muted-foreground',
    'flex items-center',
    open && 'text-[var(--nav-item-sub-open-color)] bg-[var(--nav-item-sub-open-bg)]',
    active && 'text-[var(--nav-item-sub-active-color)] bg-[var(--nav-item-sub-active-bg)]'
  );
  const Comp = (navItem.baseProps ? navItem.baseProps.component : 'div') as JSX.ElementType;
  return (
    <Comp
      type="button"
      aria-label={title}
      disabled={disabled}
      {...navItem.baseProps}
      className={cn(
        'w-full no-underline',
        'rounded-[var(--nav-item-radius)] text-[var(--nav-item-color)]',
        'transition-colors',
        !isRootItem && !active && !open && 'hover:bg-[var(--nav-item-hover-bg)]',
        isRootItem ? rootItemStyles : subItemStyles,
        disabled && navItemStyles.disabled,
        cn([navSectionClasses.item.root, className], {
          [navSectionClasses.state.open]: open,
          [navSectionClasses.state.active]: active,
          [navSectionClasses.state.disabled]: disabled,
        })
      )}
      style={{
        textDecoration: 'none',
        ...other.style,
      }}
      {...other}
    >
      {isRootItem ? (
        <div className="relative flex w-full flex-col items-center">
          <div className="flex flex-col items-center">
            {icon && (
              <span
                className={cn(
                  navItemStyles.icon,
                  'h-[var(--nav-icon-size)] w-[var(--nav-icon-size)]',
                  'm-[var(--nav-icon-root-margin)]',
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
                  'text-center text-[10px] leading-4 font-semibold',
                  active && 'font-bold',
                  navSectionClasses.item.title,
                  slotProps?.title?.className
                )}
              >
                {title}
              </span>
            )}
          </div>

          {hasChild && (
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              className={cn(
                navItemStyles.arrow,
                'absolute top-[11px] right-1.5 m-0',
                navSectionClasses.item.arrow,
                slotProps?.arrow?.className
              )}
            />
          )}
        </div>
      ) : (
        <div className="flex w-full items-center">
          {icon && (
            <span
              className={cn(
                navItemStyles.icon,
                'h-[var(--nav-icon-size)] w-[var(--nav-icon-size)]',
                'm-[var(--nav-icon-sub-margin)]',
                'flex-shrink-0',
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
                'flex-1 text-sm font-medium',
                active && 'font-semibold',
                navSectionClasses.item.title,
                slotProps?.title?.className
              )}
            >
              {title}
            </span>
          )}

          {hasChild && (
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              className={cn(
                navItemStyles.arrow,
                'ml-auto flex-shrink-0',
                navSectionClasses.item.arrow,
                slotProps?.arrow?.className
              )}
            />
          )}
        </div>
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
                  isRootItem && 'absolute top-[11px] left-1.5',
                  navSectionClasses.item.caption,
                  slotProps?.caption?.className
                )}
              />
            </TooltipTrigger>
            <TooltipContent side="right">{caption}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {info && navItem.subItem && (
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

      {hasChild && !isRootItem && (
        <Iconify
          icon="eva:arrow-ios-forward-fill"
          className={cn(
            navItemStyles.arrow,
            '-mr-2',
            navSectionClasses.item.arrow,
            slotProps?.arrow?.className
          )}
        />
      )}
    </Comp>
  );
}
