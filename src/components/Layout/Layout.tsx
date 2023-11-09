import { Footer, NavBar } from '@/container/components';
import React, { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  selected?: string;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className, selected } = props;

  return (
    <Main>
      <NavBar selected={selected} />
      <Content>
        <Page className={className}>{children}</Page>
        <Footer />
      </Content>
    </Main>
  );
}

const Main = tw.div`
  flex
  flex-row
  h-screen
  w-full
  justify-end
`;

const Content = tw.div`
  flex
  flex-col
  w-[calc(100vw-14rem)]
  mr-[1rem]
  mt-[1rem]
`;

const Page = tw.div`
  flex
  flex-col
  items-start
  justify-start
  z-0
  min-h-screen
  w-full
  mt-5 md:mt-10
  mb-5 md:mb-20
  px-5 md:px-10
`;
