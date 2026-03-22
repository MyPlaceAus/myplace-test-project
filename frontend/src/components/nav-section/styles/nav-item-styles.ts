// ----------------------------------------------------------------------

// Tailwind CSS classes for nav item styles
export const navItemStyles = {
  icon: 'w-[22px] h-[22px] shrink-0 inline-flex [&>:first-of-type:not(style):not(:first-of-type~*),&>style+*]:w-full [&>:first-of-type:not(style):not(:first-of-type~*),&>style+*]:h-full',
  texts: 'flex-1 inline-flex flex-col',
  title: 'line-clamp-1 flex-1',
  info: 'text-xs shrink-0 font-semibold ml-1.5 leading-[1.5] inline-flex',
  arrow: 'w-4 h-4 shrink-0 ml-1.5 inline-flex rtl:scale-x-[-1]',
  captionIcon: 'w-4 h-4',
  captionText: 'line-clamp-1 text-xs',
  disabled: 'opacity-48 pointer-events-none',
};
