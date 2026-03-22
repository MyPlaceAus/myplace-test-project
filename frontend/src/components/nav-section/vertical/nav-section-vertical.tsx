import type { NavGroupProps, NavSectionProps } from '../types';

import { useBoolean } from 'src/hooks/use-boolean';
import { cn } from 'src/lib/utils';

import { NavList } from './nav-list';
import { Nav, NavUl, NavLi, NavSubheader } from '../components';
import { navSectionClasses, navSectionCssVars } from '../styles';

// ----------------------------------------------------------------------

export function NavSectionVertical({
  data,
  render,
  className,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: NavSectionProps) {
  const cssVars = { ...navSectionCssVars.vertical(), ...overridesVars };

  return (
    <Nav
      className={cn([navSectionClasses.vertical, className])}
      style={cssVars as React.CSSProperties}
      {...other}
    >
      <NavUl className="flex-1 gap-[var(--nav-item-gap)]">
        {data.map((group) => (
          <Group
            key={group.subheader ?? group.items[0].title}
            subheader={group.subheader}
            items={group.items}
            render={render}
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
  subheader,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
}: NavGroupProps) {
  const groupOpen = useBoolean(true);

  const renderContent = () => (
    <NavUl className="gap-[var(--nav-item-gap)]">
      {items.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={1}
          slotProps={slotProps}
          checkPermissions={checkPermissions}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );

  return (
    <NavLi>
      {subheader ? (
        <>
          <NavSubheader
            data-title={subheader}
            open={groupOpen.value}
            onClick={groupOpen.onToggle}
            className={slotProps?.subheader?.className}
          >
            {subheader}
          </NavSubheader>

          <div
            className={cn(
              'overflow-hidden transition-all',
              groupOpen.value ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {renderContent()}
          </div>
        </>
      ) : (
        renderContent()
      )}
    </NavLi>
  );
}
