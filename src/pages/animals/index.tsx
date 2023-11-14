import { AuthWall, SeoHead } from '@/container/components';
import { ListAnimalsPage } from '@/container/pages/Animals';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function index(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <ListAnimalsPage />
    </AuthWall>
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
