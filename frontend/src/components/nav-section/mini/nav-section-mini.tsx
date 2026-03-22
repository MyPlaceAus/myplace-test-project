import type { NavGroupProps, NavSectionProps } from '../types';

import { cn } from 'src/lib/utils';

import { NavList } from './nav-list';
import { Nav, NavUl, NavLi } from '../components';
import { navSectionClasses, navSectionCssVars } from '../styles';

// ----------------------------------------------------------------------

export function NavSectionMini({
  data,
  render,
  className,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: NavSectionProps) {
  const cssVars = { ...navSectionCssVars.mini(), ...overridesVars };

  return (
    <Nav
      className={cn([navSectionClasses.mini, className])}
      style={cssVars as React.CSSProperties}
      {...other}
    >
      <NavUl className="flex-1 gap-(--nav-item-gap)">
        {data.map((group) => (
          <Group
            key={group.subheader ?? group.items[0].title}
            render={render}
            cssVars={cssVars}
            items={group.items}
            slotProps={slotProps}
            checkPermissions={checkPermissions}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Nav>
  );
}

// ----------------------------------------------------------------------

function Group({
  items,
  render,
  cssVars,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
}: NavGroupProps) {
  return (
    <NavLi>
      <NavUl className="gap-(--nav-item-gap)">
        {items.map((list) => (
          <NavList
            key={list.title}
            depth={1}
            data={list}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            checkPermissions={checkPermissions}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </NavLi>
  );
}
