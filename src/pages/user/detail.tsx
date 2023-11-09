import { AuthWall, SeoHead } from '@/container/components';
import { UserDetailPage } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function index(): React.JSX.Element {
  return (
    <AuthWall>
      <SeoHead />
      <UserDetailPage />
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
