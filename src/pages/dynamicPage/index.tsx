import { AuthWall, SeoHead } from '@/container/components';
import { DynamicPages } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function index(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <DynamicPages />
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
