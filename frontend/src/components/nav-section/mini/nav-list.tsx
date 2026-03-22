import type { NavListProps, NavSubListProps } from '../types';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'src/routes/hooks';
import { usePopoverHover } from 'src/hooks/use-popover-hover';
import { isExternalLink } from 'src/utils/url';
import { isActiveLink } from 'src/utils/active-link';

import { cn } from 'src/lib/utils';

import { NavItem } from './nav-item';
import { navSectionClasses } from '../styles';
import { NavUl, NavLi, NavDropdown, NavDropdownPaper } from '../components';

// ----------------------------------------------------------------------

export function NavList({
  data,
  depth,
  render,
  cssVars,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
}: NavListProps) {
  const pathname = usePathname();

  const isActive = isActiveLink(pathname, data.path, data.deepMatch ?? !!data.children);

  const {
    open,
    onOpen,
    onClose,
    anchorEl,
    elementRef: navItemRef,
  } = usePopoverHover<HTMLButtonElement>();

  const id = open ? `${data.title}-popover` : undefined;

  useEffect(() => {
    // If the pathname changes, close the menu
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      aria-describedby={id}
      // slots
      path={data.path}
      icon={data.icon}
      info={data.info}
      title={data.title}
      caption={data.caption}
      // state
      active={isActive}
      open={open}
      disabled={data.disabled}
      // options
      depth={depth}
      render={render}
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      enabledRootRedirect={enabledRootRedirect}
      // styles
      slotProps={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      // actions
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown open={open} onClose={onClose} anchorEl={anchorEl}>
        <NavDropdownPaper
          className={cn(navSectionClasses.dropdown.paper, slotProps?.dropdown?.paper?.className)}
          style={cssVars as React.CSSProperties}
          onMouseEnter={handleOpenMenu}
          onMouseLeave={onClose}
        >
          <NavSubList
            data={data.children}
            depth={depth}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            checkPermissions={checkPermissions}
            enabledRootRedirect={enabledRootRedirect}
          />
        </NavDropdownPaper>
      </NavDropdown>
    );

  // Hidden item by role
  if (data.allowedRoles && checkPermissions && checkPermissions(data.allowedRoles)) {
    return null;
  }

  return (
    <NavLi disabled={data.disabled}>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function NavSubList({
  data,
  render,
  cssVars,
  depth = 0,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
}: NavSubListProps) {
  return (
    <NavUl className="gap-2">
      {data.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={depth + 1}
          cssVars={cssVars}
          slotProps={slotProps}
          checkPermissions={checkPermissions}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );
}
