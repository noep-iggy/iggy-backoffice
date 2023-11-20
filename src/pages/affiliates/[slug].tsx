import { AuthWall, SeoHead } from '@/container/components';
import { DetailAffiliatePage } from '@/container/pages';
import { ROUTES } from '@/routing';
import { GetStaticPath, PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';

type AffiliatePageProps = {
  idPage: string;
};

export default function AffiliatePage(
  props: AffiliatePageProps
): React.JSX.Element {
  const { idPage } = props;
  return (
    <AuthWall>
      <SeoHead />
      {idPage ? (
        <DetailAffiliatePage idPage={idPage} />
      ) : (
        <FullPageLoader selected={ROUTES.houses.list} />
      )}
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
