import { AuthWall, SeoHead } from '@/container/components';
import { ListUsersPage } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function index(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <ListUsersPage />
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
