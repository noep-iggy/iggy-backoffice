import { AuthWall, SeoHead } from '@/container/components';
import { DetailBillingPlanPage } from '@/container/pages/BillingPlan';
import { ROUTES } from '@/routing';
import { BillingPlanTypeEnum, GetStaticPath, PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';

type BillingPlanPageProps = {
  type: BillingPlanTypeEnum;
};

export default function BillingPlanPage(
  props: BillingPlanPageProps
): React.JSX.Element {
  const { type } = props;
  return (
    <AuthWall>
      <SeoHead />
      {type ? (
        <DetailBillingPlanPage type={type} />
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
      type: params.slug,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPath> {
  return {
    paths: [],
    fallback: true,
  };
}
