import { AuthWall, SeoHead } from '@/container/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';
import { PageBaseProps, GetStaticPath } from '@/types';
import { DetailUserPage } from '@/container/pages';
import { ROUTES } from '@/routing';

type UserPageProps = {
  idPage: string;
};

export default function UserPage(
  props: UserPageProps
): React.JSX.Element {
  const { idPage } = props;
  return (
    <AuthWall>
      <SeoHead />
      {idPage ? <DetailUserPage idPage={idPage} /> : <FullPageLoader selected={ROUTES.users.list} />}
    </AuthWall>
  );
}

export async function getStaticProps({
  locale,
  params,
}: {
  locale: string;
  params: { slug: string };
}): Promise<PageBaseProps> {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      idPage: params.slug,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPath> {
  return {
    paths: [],
    fallback: true,
  };
}
