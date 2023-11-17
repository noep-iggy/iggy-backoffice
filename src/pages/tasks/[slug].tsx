import { AuthWall, SeoHead } from '@/container/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';
import { PageBaseProps, GetStaticPath } from '@/types';
import { ROUTES } from '@/routing';
import { DetailTaskPage } from '@/container/pages';

type TaskPageProps = {
  idPage: string;
};

export default function TaskPage(
  props: TaskPageProps
): React.JSX.Element {
  const { idPage } = props;
  return (
    <AuthWall>
      <SeoHead />
      {idPage ? <DetailTaskPage idPage={idPage} /> : <FullPageLoader selected={ROUTES.houses.list}/>}
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
