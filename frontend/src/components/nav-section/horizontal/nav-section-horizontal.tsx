import type { NavGroupProps, NavSectionProps } from '../types';

import { cn } from 'src/lib/utils';

import { NavList } from './nav-list';
import { Scrollbar } from '../../scrollbar';
import { Nav, NavUl, NavLi } from '../components';
import { navSectionClasses, navSectionCssVars } from '../styles';

// ----------------------------------------------------------------------

export function NavSectionHorizontal({
  data,
  render,
  className,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: NavSectionProps) {
  const cssVars = { ...navSectionCssVars.horizontal(), ...overridesVars };

  return (
    <Scrollbar
      className="h-full"
      slotProps={{
        content: { className: 'h-full flex items-center' },
      }}
    >
      <Nav
        className={cn([navSectionClasses.horizontal, className])}
        style={
          {
            ...cssVars,
            height: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            minHeight: 'var(--nav-height)',
          } as React.CSSProperties
        }
        {...other}
      >
        <NavUl className="flex-row gap-[var(--nav-item-gap)]">
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
    </Scrollbar>
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
      <NavUl className="flex-row gap-[var(--nav-item-gap)]">
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
