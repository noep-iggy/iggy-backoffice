import { AvatarUser, Col, P12, P14, Row } from '@/components';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/routing';
import { HomeIcon, TagIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import tw from 'tailwind-styled-components';

interface NavBarProps {
  className?: string;
  selected?: string;
}

export function NavBar(props: NavBarProps): React.JSX.Element {
  const { className, selected } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useAuthContext();

  return (
    <Main className={className}>
      <Logo src="logo.png" onClick={() => router.push(ROUTES.home)} />
      <Separator />
      <Content>
        <Navigation $selected={ROUTES.home === selected}  onClick={() => router.push(ROUTES.home)}>
          <LogoNavigation $selected={ROUTES.home === selected}>
            <HomeIcon />
          </LogoNavigation>
          <P14>{t('home.name')}</P14>
        </Navigation>
        <Navigation $selected={ROUTES.dynamicPage === selected}  onClick={() => router.push(ROUTES.dynamicPage)}>
          <LogoNavigation $selected={ROUTES.dynamicPage === selected}>
            <TagIcon />
          </LogoNavigation>
          <P14>{t('dynamicPage.title')}</P14>
        </Navigation>
      </Content>
      <Separator />
      <UserContainer $selected={ROUTES.user.detail === selected} onClick={()=> router.push(ROUTES.user.detail)}>
        <AvatarUser user={currentUser} />
        <Col className='ml-2'>
          <P12>{currentUser?.email}</P12>
          <Row className=''>
            <P12>{currentUser?.firstName}</P12>
            <P12 className='ml-1'>{currentUser?.lastName}</P12>
          </Row>
        </Col>
      </UserContainer>
    </Main>
  );
}

const Main = tw.div`
  w-[calc(11rem)]
  h-[calc(100vh-2rem)]
  top-[1rem]
  left-[1rem]
  flex
  flex-col
  items-center
  justify-center
  pt-5
  bg-gray-50
  shadow-md
  rounded-md
  fixed
  z-10
`;

const Content = tw.div`
  flex 
  flex-col
  w-full
  h-full
  items-center
  px-2
  mt-5
`;

const UserContainer = tw.div<{ $selected: boolean }>`
  flex
  flex-row
  items-center
  justify-start
  w-full
  px-2
  py-3
  hover:bg-gray-200
  cursor-pointer
  transition
  duration-300
  ${(props : { $selected: boolean }) => (props.$selected && 'bg-gray-200')}
`;

const Logo = tw.img`
  w-40
  h-8
  object-cover
  cursor-pointer
  mb-4
`;

const Separator = tw.div`
  w-full
  h-px
  bg-gray-200
`;

const Navigation = tw.div<{ $selected: boolean }>`
  w-full
  flex
  items-center
  justify-start
  cursor-pointer
  bg-gray-50
  p-2
  mb-2
  rounded-md
  transition
  duration-300
  hover:bg-gray-200
  ${(props : { $selected: boolean }) => (props.$selected ? 'bg-gray-200 shadow-sm' : 'opacity-50')}
`;

const LogoNavigation = tw.div<{ $selected: boolean }>`
  ${(props : { $selected: boolean }) => (props.$selected ? 'opacity-100 shadow-sm' : 'opacity-50')}
  w-6
  h-6
  mr-2
`;