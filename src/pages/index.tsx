import { AuthWall, SeoHead } from '@/container/components';
import { ListHousesPage } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function IndexPage(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <ListHousesPage />
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
