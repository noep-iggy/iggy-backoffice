import { AuthWall, SeoHead } from '@/container/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';
import { PageBaseProps, GetStaticPath } from '@/types';
import { ROUTES } from '@/routing';
import { DetailAnimalPage } from '@/container/pages/Animals';

type HousePageProps = {
  idPage: string;
};

export default function HousePage(
  props: HousePageProps
): React.JSX.Element {
  const { idPage } = props;
  return (
    <AuthWall>
      <SeoHead />
      {idPage ? <DetailAnimalPage idPage={idPage} /> : <FullPageLoader selected={ROUTES.houses.list}/>}
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
