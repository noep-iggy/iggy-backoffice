import { Layout, Link } from '@/components';
import { ROUTES } from '@/routing';
import React from 'react';
import tw from 'tailwind-styled-components';

export function DynamicPages(): React.JSX.Element {
  return (
    <Layout selected={ROUTES.dynamicPage}>
      <Main>
        <Link href={`${ROUTES.dynamicPage}/${1}`}>{'Page 1'}</Link>
        <Link href={`${ROUTES.dynamicPage}/${2}`}>{'Page 2'}</Link>
      </Main>
    </Layout>
  );
}

const Main = tw.div`
  
`;
