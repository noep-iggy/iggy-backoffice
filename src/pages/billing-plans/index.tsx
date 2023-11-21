import { AuthWall, SeoHead } from '@/container/components';
import { ListBillingPlanPage } from '@/container/pages/BillingPlan';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function index(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <ListBillingPlanPage />
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
