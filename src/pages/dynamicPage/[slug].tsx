import { AuthWall, SeoHead } from '@/container/components';
import { DetailPage } from '@/container/pages';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';
import { PageBaseProps, GetStaticPath } from '@/types';

type DynamicPageExempleProps = {
  idPage: string;
};

export default function DynamicPageExemple(
  props: DynamicPageExempleProps
): React.JSX.Element {
  const { idPage } = props;
  return (
    <AuthWall>
      <SeoHead />
      {idPage ? <DetailPage idPage={idPage} /> : <FullPageLoader />}
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
