import { Link, P14 } from '@/components/Texts';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import tw from 'tailwind-styled-components';

interface FooterProps {
  className?: string;
}

export function Footer(props: FooterProps): React.JSX.Element {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Main className={className}>
      <InfosContainer>
        <LinkStyled href='mailto:noephilippe29@gmail.com' target='_blank'>
          {t('iggyapp@gmail.com')}
        </LinkStyled>
      </InfosContainer>
      <SocialMediasContainer>
        <SocialLogo
          url='https://www.facebook.com/Iggyapp'
          target='_blank'
          network='facebook'
        />
        <SocialLogo
          url='https://www.instagram.com/iggy_app/'
          target='_blank'
          network='instagram'
        />
      </SocialMediasContainer>
      <CopyRight>{t('generics.copyright')}</CopyRight>
    </Main>
  );
}

const Main = tw.div`
  flex
  items-center
  bg-gray-100
  w-full
  flex-col
`;

const SocialMediasContainer = tw.div`
  flex
  p-4
`;

const SocialLogo = tw(SocialIcon)`
  w-5
  h-5
  mx-2
  hover:scale-105
  transition
  duration-100
  ease-in-out
  opacity-90
  hover:opacity-100
  cursor-pointer
`;

const CopyRight = tw(P14)`
  text-center
  text-gray-500
  w-3/4
  mb-4
`;

const InfosContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
  mb-2
  mt-8
`;

const LinkStyled = tw(Link)`
  text-gray-500
`;
