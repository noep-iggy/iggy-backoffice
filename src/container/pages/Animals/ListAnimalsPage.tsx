import {
  ArrowsUpDownStyled,
  Cellule,
  H2,
  Input,
  Layout,
  Loader,
  P18,
  RowCenter,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { AnimalDto } from '@/types';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

export function ListAnimalsPage(): React.JSX.Element {
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof AnimalDto>('name');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const { t } = useTranslation();

  async function fetchAnimals() {
    const fetchedAnimals = await ApiService.animals.getAll({
      orderType,
      orderBy,
      search,
      page,
      pageSize: 10,
    });
    if (fetchedAnimals.length === 0 && page > 0) {
      setPage(page - 1);
    }
    setAnimals(fetchedAnimals);
  }

  useEffect(() => {
    fetchAnimals();
  }, [orderBy, orderType, search, page]);

  function handleSortPlace(by: keyof AnimalDto) {
    if (orderBy === by) {
      setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setOrderType('ASC');
    }
    setOrderBy(by);
  }

  const nbColumns = 'grid-cols-4';

  return (
    <Layout selected={ROUTES.animals.list}>
      <H2 className='mb-7'>{t('animals.list.title')}</H2>
      <Input
        left={<MagnifyingGlassIcon />}
        className='w-50'
        placeholder={t('animals.list.search')}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <TableHeader className={`${nbColumns} mt-2`}>
        <TableHeaderItem
          $isFocus={orderBy === 'name'}
          onClick={() => handleSortPlace('name')}
        >
          {t('animals.list.table.name')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'name'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'house'}
          onClick={() => handleSortPlace('house')}
        >
          {t('animals.list.table.house')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'house'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'type'}
          onClick={() => handleSortPlace('type')}
        >
          {t('animals.list.table.type')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'type'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'status'}
          onClick={() => handleSortPlace('status')}
        >
          {t('animals.list.table.status')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'status'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
      </TableHeader>
      {animals.length > 0 ? (
        animals.map((animal: AnimalDto) => (
          <TableRow
            className={nbColumns}
            onMouseEnter={() => setRowTableHover(animal.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={animal.id}
            onClick={() => router.push(ROUTES.animals.detail(animal.id))}
          >
            <Cellule
              $isFocus={orderBy === 'name' || rowTableHover === animal.id}
            >
              {animal.name}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'house' || rowTableHover === animal.id}
            >
              {animal.house?.name}
            </Cellule>
            <Cellule
              $isEnum
              $isFocus={orderBy === 'type' || rowTableHover === animal.id}
            >
              {t(`enums.type.${animal.type}`)}
            </Cellule>
            <Cellule
              $isEnum
              $isFocus={orderBy === 'status' || rowTableHover === animal.id}
            >
              {t(`enums.status.${animal.status}`)}
            </Cellule>
          </TableRow>
        ))
      ) : (
        <TableRow className={nbColumns}>
          {Array(4)
            .fill(null)
            .map((e) => (
              <Cellule key={e}>
                <Loader size={5} />
              </Cellule>
            ))}
        </TableRow>
      )}
      <RowCenter className='justify-center w-full mt-5'>
        <Icon
          className='mr-2'
          $disabled={page < 5}
          onClick={() => page >= 5 && setPage(page - 5)}
        >
          <ChevronDoubleLeftIcon />
        </Icon>
        <Icon
          className='ml-2'
          $disabled={page < 1}
          onClick={() => page >= 1 && setPage(page - 1)}
        >
          <ChevronLeftIcon />
        </Icon>
        <CurrentPage>{page + 1}</CurrentPage>
        <Icon className='mr-2' onClick={() => setPage(page + 1)}>
          <ChevronRightIcon />
        </Icon>
        <Icon className='ml-2' onClick={() => setPage(page + 5)}>
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
    $disabled
      ? 'text-gray-300 cursor-not-allowed'
      : 'text-gray-800 hover:text-gray-900'}
`;
