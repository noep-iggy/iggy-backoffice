import { Layout, P18 } from '@/components';
import { ROUTES } from '@/routing';
import tw from 'tailwind-styled-components';

interface DetailHousePageProps {
  idPage: string;
}

export function DetailHousePage(props: DetailHousePageProps): React.JSX.Element {
  const { idPage } = props;

  return (
    <Layout selected={ROUTES.houses.list}>
      <Main>
        <P18>{`Ceci est la page d'id : ${idPage}`}</P18>
      </Main>
    </Layout>
  );
}

const Main = tw.div`
 
`;
