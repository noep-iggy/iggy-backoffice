import { AnimalIcon, AvatarUser, Col, P12, P14, Row } from '@/components';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/routing';
import {
  CurrencyEuroIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
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
      <Logo src='logo.png' onClick={() => router.push(ROUTES.home)} />
      <Separator />
      <Content>
        <Navigation
          $selected={ROUTES.houses.list === selected}
          onClick={() => router.push(ROUTES.houses.list)}
        >
          <LogoNavigation $selected={ROUTES.houses.list === selected}>
            <HomeIcon />
          </LogoNavigation>
          <P14>{t('houses.list.name')}</P14>
        </Navigation>
        <Navigation
          $selected={ROUTES.users.list === selected}
          onClick={() => router.push(ROUTES.users.list)}
        >
          <LogoNavigation $selected={ROUTES.users.list === selected}>
            <UserIcon />
          </LogoNavigation>
          <P14>{t('users.list.name')}</P14>
        </Navigation>
        <Navigation
          $selected={ROUTES.animals.list === selected}
          onClick={() => router.push(ROUTES.animals.list)}
        >
          <LogoNavigation $selected={ROUTES.animals.list === selected}>
            <AnimalIcon />
          </LogoNavigation>
          <P14>{t('animals.list.name')}</P14>
        </Navigation>
        <Navigation
          $selected={ROUTES.tasks.list === selected}
          onClick={() => router.push(ROUTES.tasks.list)}
        >
          <LogoNavigation $selected={ROUTES.tasks.list === selected}>
            <WrenchScrewdriverIcon />
          </LogoNavigation>
          <P14>{t('tasks.list.name')}</P14>
        </Navigation>
        <Navigation
          $selected={ROUTES.affiliates.list === selected}
          onClick={() => router.push(ROUTES.affiliates.list)}
        >
          <LogoNavigation $selected={ROUTES.affiliates.list === selected}>
            <ShoppingBagIcon />
          </LogoNavigation>
          <P14>{t('affiliates.list.name')}</P14>
        </Navigation>
        <Navigation
          $selected={ROUTES.billingPlans.list === selected}
          onClick={() => router.push(ROUTES.billingPlans.list)}
        >
          <LogoNavigation $selected={ROUTES.billingPlans.list === selected}>
            <CurrencyEuroIcon />
          </LogoNavigation>
          <P14>{t('billingPlans.list.name')}</P14>
        </Navigation>
      </Content>
      <Separator />
      <UserContainer
        $selected={router.query.slug === currentUser?.id}
        onClick={() =>
          currentUser && router.push(ROUTES.users.detail(currentUser.id))
        }
      >
        <AvatarUser className='border border-white' user={currentUser} />
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
  overflow-hidden
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
  hover:bg-primary-200
  cursor-pointer
  transition
  duration-300
  ${(props: { $selected: boolean }) =>
    props.$selected && 'bg-primary text-white hover:bg-primary'}
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
  ${(props: { $selected: boolean }) =>
    props.$selected
      ? 'bg-primary shadow-sm text-white'
      : 'hover:bg-primary-200'}
`;

const LogoNavigation = tw.div<{ $selected: boolean }>`
  w-5
  h-5
  mr-2
`;
