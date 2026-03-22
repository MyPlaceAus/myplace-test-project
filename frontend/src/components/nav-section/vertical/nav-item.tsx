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

  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  const isDark = document.documentElement.classList.contains('dark');
  const isRootItem = navItem.rootItem;

  const rootItemStyles = cn(
    'min-h-[var(--nav-item-root-height)]',
    // Active state takes priority with hover
    active && [
      'text-[var(--nav-item-root-active-color)]',
      'bg-[var(--nav-item-root-active-bg)]',
      'hover:bg-[var(--nav-item-root-active-hover-bg)]',
      isDark && 'text-[var(--nav-item-root-active-color-on-dark)]',
    ],
    // Open state only if not active
    !active &&
      open && ['text-[var(--nav-item-root-open-color)]', 'bg-[var(--nav-item-root-open-bg)]']
  );

  const subItemStyles = cn(
    'min-h-[var(--nav-item-sub-height)] relative',
    "before:content-[''] before:absolute before:left-0",
    'before:w-[var(--nav-bullet-size)] before:h-[var(--nav-bullet-size)]',
    'before:bg-[var(--nav-bullet-light-color)]',
    isRtl
      ? 'before:translate-x-[calc(var(--nav-bullet-size)*1)] before:translate-y-[calc(var(--nav-bullet-size)*-0.4)] before:scale-x-[-1]'
      : 'before:translate-x-[calc(var(--nav-bullet-size)*-1)] before:translate-y-[calc(var(--nav-bullet-size)*-0.4)]',
    isDark && 'before:bg-[var(--nav-bullet-dark-color)]',
    // Active state
    active && ['text-[var(--nav-item-sub-active-color)]', 'bg-[var(--nav-item-sub-active-bg)]'],
    // Open state only if not active
    !active && open && ['text-[var(--nav-item-sub-open-color)]', 'bg-[var(--nav-item-sub-open-bg)]']
  );
  const Comp = (navItem.baseProps ? navItem.baseProps.component : 'div') as JSX.ElementType;
  return (
    <Comp
      aria-label={title}
      disabled={disabled}
      {...navItem.baseProps}
      className={cn(
        'flex w-full items-center no-underline',
        'rounded-(--nav-item-radius)',
        'text-(--nav-item-color)',
        'hover:bg-(--nav-item-hover-bg)',
        isRootItem ? rootItemStyles : subItemStyles,
        disabled && navItemStyles.disabled,
        cn([navSectionClasses.item.root, className], {
          [navSectionClasses.state.open]: open,
          [navSectionClasses.state.active]: active,
          [navSectionClasses.state.disabled]: disabled,
        })
      )}
      style={{
        paddingTop: 'var(--nav-item-pt)',
        paddingRight: 'var(--nav-item-pr)',
        paddingBottom: 'var(--nav-item-pb)',
        paddingLeft: 'var(--nav-item-pl)',
        textDecoration: 'none',
        ...(active && isRootItem
          ? {
              color: 'var(--nav-item-root-active-color)',
              backgroundColor: 'var(--nav-item-root-active-bg)',
            }
          : active && !isRootItem
            ? {
                color: 'var(--nav-item-sub-active-color)',
                backgroundColor: 'var(--nav-item-sub-active-bg)',
              }
            : open && isRootItem
              ? {
                  color: 'var(--nav-item-root-open-color)',
                  backgroundColor: 'var(--nav-item-sub-active-bg)',
                }
              : open && !isRootItem
                ? {
                    color: 'var(--nav-item-sub-open-color)',
                    backgroundColor: 'var(--nav-item-sub-active-bg)',
                  }
                : {}),
      }}
      {...other}
    >
      {icon && (
        <span
          className={cn(
            navItemStyles.icon,
            'm-[var(--nav-icon-margin)] h-[var(--nav-icon-size)] w-[var(--nav-icon-size)]',
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
            navItemStyles.texts,
            navSectionClasses.item.texts,
            slotProps?.texts?.className,
            'mr-auto'
          )}
        >
          <span
            className={cn(
              navItemStyles.title,
              'text-left text-sm font-medium',
              active && 'font-semibold',
              navSectionClasses.item.title,
              slotProps?.title?.className
            )}
          >
            {title}
          </span>

          {caption && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      navItemStyles.captionText,
                      'text-(--nav-item-caption-color)',
                      navSectionClasses.item.caption,
                      slotProps?.caption?.className
                    )}
                  >
                    {caption}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" align="start">
                  {caption}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </span>
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
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          className={cn(
            navItemStyles.arrow,
            navSectionClasses.item.arrow,
            slotProps?.arrow?.className
          )}
        />
      )}
    </Comp>
  );
}
