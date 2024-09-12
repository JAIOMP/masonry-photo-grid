import { ReactNode } from 'react';
import { StyledLayout } from './LayoutStyle';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children } : LayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
