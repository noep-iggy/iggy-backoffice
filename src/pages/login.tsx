import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SeoHead } from '../container/components';
import { PageBaseProps } from '../types';
import LoginPage from '@/container/pages/LoginPage';

export default function Login(): React.JSX.Element {
  return (
    <>
      <SeoHead />
      <LoginPage />
    </>
  );
}

export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<PageBaseProps> {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
