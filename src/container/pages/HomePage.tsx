import { H1, Layout } from '@/components';
import { ROUTES } from '@/routing';
import { useTranslation } from 'next-i18next';
import tw from 'tailwind-styled-components';
export function HomePage(): React.JSX.Element {
  const { t }= useTranslation()



  return (
    <Layout selected={ROUTES.home}>
      <Main>
        <H1>{t('home.name')}</H1>
      </Main>
    </Layout>
  );
}

const Main = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full
  h-full
`;