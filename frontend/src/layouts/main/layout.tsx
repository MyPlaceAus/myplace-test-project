import React from 'react';

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => (
  <div className="flex min-h-dvh w-full flex-col items-center justify-center">{children}</div>
);

export default MainLayout;
