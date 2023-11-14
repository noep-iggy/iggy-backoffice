import {
  ArrowsUpDownStyled,
  Cellule, H2,
  Input,
  Layout, Loader, P18,
  RowCenter,
  TableHeader,
  TableHeaderItem,
  TableRow
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { AnimalDto, HouseDto, UserDto } from '@/types';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, useEffect, useState } from 'react';
import router from 'next/router';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import tw from 'tailwind-styled-components';

export function ListHousesPage(): React.JSX.Element {
  const [ houses, setHouses ] = useState<HouseDto[]>([]);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [ search, setSearch ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const { t } = useTranslation();

  async function fetchHouses() {
    const fetchedHouses = await ApiService.houses.getAll(
      {
        orderType,
        orderBy,
        search,
        page,
        pageSize: 10,
      }
    );
    if(fetchedHouses.length === 0 && page > 0) {
      setPage(page-1);
    }
    setHouses(fetchedHouses);
  }

  useEffect(() => {
    fetchHouses();
  }, [orderBy, orderType, search, page])

  function handleSortPlace(by: string) {
    if (orderBy === by) {
      setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setOrderType('ASC');
    }
    setOrderBy(by);
  }

  return (
    <Layout selected={ROUTES.houses.list}>
      <H2 className='mb-7'>{t('houses.list.title')}</H2>
      <Input left={<MagnifyingGlassIcon/>} className='w-50' placeholder={t('houses.list.search')} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
      <TableHeader className='grid-cols-4 mt-2'>
        <TableHeaderItem $isFocus={orderBy === 'name'} onClick={() => handleSortPlace('name')}>
          {t('houses.list.table.name')}
          {orderBy === 'name' && <ArrowsUpDownStyled $direction={orderType === 'ASC'} />}
        </TableHeaderItem>
        <TableHeaderItem $isFocus={orderBy === 'users'} onClick={() => handleSortPlace('users')}>
          {t('houses.list.table.users')}
          {orderBy === 'users' && <ArrowsUpDownStyled $direction={orderType === 'ASC'} />}
        </TableHeaderItem>
        <TableHeaderItem $isFocus={orderBy === 'animals'} onClick={() => handleSortPlace('animals')}>
          {t('houses.list.table.animals')}
          {orderBy === 'animals' && <ArrowsUpDownStyled $direction={orderType === 'ASC'} />}
        </TableHeaderItem>
        <TableHeaderItem $isFocus={orderBy === 'billingPlan'} onClick={() => handleSortPlace('billingPlan')}>
          {t('houses.list.table.billingPlan')}
          {orderBy === 'billingPlan' && <ArrowsUpDownStyled $direction={orderType === 'ASC'} />}
        </TableHeaderItem>
      </TableHeader>
      {houses.length > 0 ?
        houses.map((house: HouseDto) => (
          <TableRow
            className='grid-cols-4'
            onMouseEnter={() => setRowTableHover(house.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={house.id}
            onClick={() => router.push(ROUTES.houses.detail(house.id))}
          >
            <Cellule
              $isFocus={orderBy === 'name' || rowTableHover === house.id}
            >
              {house.name}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'users' || rowTableHover === house.id}
            >
              {house.users?.map((user: UserDto) => user.firstName).join(', ')}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'animals' || rowTableHover === house.id}
            >
              {house.animals?.map((animal: AnimalDto) => animal.name).join(', ')}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'billingPlan' || rowTableHover === house.id}
            >
              {house.billingPlan}
            </Cellule>
          </TableRow>
        )) : <TableRow className='grid-cols-4'>{Array(4).fill(null).map((e)=> <Cellule key={e}><Loader size={5}/></Cellule>)}</TableRow>}
      <RowCenter className='mt-5 justify-center w-full'>
        <Icon className='mr-2' $disabled={page < 5} onClick={() => page >= 5 && setPage(page-5)}>
          <ChevronDoubleLeftIcon />
        </Icon>
        <Icon className='ml-2' $disabled={page < 1} onClick={()=> page >= 1 && setPage(page-1)}>
          <ChevronLeftIcon />
        </Icon>
        <CurrentPage>{page+1}</CurrentPage>
        <Icon className='mr-2' onClick={()=> setPage(page+1)}>
          <ChevronRightIcon />
        </Icon>
        <Icon className='ml-2' onClick={()=> setPage(page+5)}>
          <ChevronDoubleRightIcon />
        </Icon>
      </RowCenter>
    </Layout>
  );
}

const CurrentPage = tw(P18)`
  mx-2
  px-2
  text-gray-800
  cursor-default
`;

const Icon = tw.div<{ $disabled?: boolean }>`
  w-5
  h-5
  cursor-pointer
  transition
  duration-200
  ease-in-out
  ${({ $disabled }) =>
    $disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:text-gray-900'}
`;
