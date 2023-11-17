import { AuthWall, SeoHead } from '@/container/components';
import { ListTasksPage } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function index(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <ListTasksPage />
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
