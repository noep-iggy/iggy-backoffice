import {
  ArrowsUpDownStyled,
  Cellule,
  H2,
  Input,
  Layout,
  Loader,
  Pagination,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { hiddenText } from '@/services/utils';
import { AnimalDto, HouseDto, UserDto } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

export function ListHousesPage(): React.JSX.Element {
  const [houses, setHouses] = useState<HouseDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof HouseDto>('name');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  async function fetchHouses() {
    setIsLoading(true);
    const fetchedHouses = await ApiService.houses.getAll({
      orderType,
      orderBy,
      search,
      page,
      pageSize: 10,
    });
    if (fetchedHouses.length === 0 && page > 0) {
      setPage(page - 1);
    }
    setHouses(fetchedHouses);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchHouses();
  }, [orderBy, orderType, search, page]);

  function handleSortPlace(by: keyof HouseDto) {
    if (orderBy === by) {
      setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setOrderType('ASC');
    }
    setOrderBy(by);
  }

  const nbColumns = 'grid-cols-4';

  return (
    <Layout selected={ROUTES.houses.list}>
      <H2 className='mb-7'>{t('houses.list.title')}</H2>
      <Input
        left={<MagnifyingGlassIcon />}
        className='w-50'
        placeholder={t('houses.list.search')}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <TableHeader className={`${nbColumns} mt-2`}>
        <TableHeaderItem
          $isFocus={orderBy === 'name'}
          onClick={() => handleSortPlace('name')}
        >
          {t('houses.list.table.name')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'name'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'users'}
          onClick={() => handleSortPlace('users')}
        >
          {t('houses.list.table.users')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'users'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'animals'}
          onClick={() => handleSortPlace('animals')}
        >
          {t('houses.list.table.animals')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'animals'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'billingPlan'}
          onClick={() => handleSortPlace('billingPlan')}
        >
          {t('houses.list.table.billingPlan')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'billingPlan'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
      </TableHeader>
      {houses.length > 0 &&
        !isLoading &&
        houses.map((house: HouseDto) => (
          <TableRow
            className={nbColumns}
            onMouseEnter={() => setRowTableHover(house.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={house.id}
            onClick={() => router.push(ROUTES.houses.detail(house.id))}
          >
            <Cellule
              $isFocus={orderBy === 'name' || rowTableHover === house.id}
            >
              {hiddenText(house.name, rowTableHover === house.id)}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'users' || rowTableHover === house.id}
            >
              {house.users
                ?.map((user: UserDto) =>
                  hiddenText(user.firstName, rowTableHover === house.id)
                )
                .join(', ')}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'animals' || rowTableHover === house.id}
            >
              {house.animals
                ?.map((animal: AnimalDto) =>
                  hiddenText(animal.name, rowTableHover === house.id)
                )
                .join(', ')}
            </Cellule>
            <Cellule
              $isEnum
              $isFocus={orderBy === 'billingPlan' || rowTableHover === house.id}
            >
              {t(`enums.billingPlan.${house.billingPlan}`)}
            </Cellule>
          </TableRow>
        ))}
      {isLoading && (
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
      {houses.length === 0 && !isLoading && (
        <TableRow className={nbColumns}>
          <Cellule>{t('houses.list.noResult')}</Cellule>
        </TableRow>
      )}
      <Pagination page={page} setPage={setPage} className='mt-5' />
    </Layout>
  );
}
