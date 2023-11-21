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
import { AnimalDto } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

export function ListAnimalsPage(): React.JSX.Element {
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof AnimalDto>('name');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  async function fetchAnimals() {
    setIsLoading(true);
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
    setIsLoading(false);
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
      {animals.length > 0 &&
        !isLoading &&
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
      {animals.length === 0 && !isLoading && (
        <TableRow className={nbColumns}>
          <Cellule>{t('animals.list.noResult')}</Cellule>
        </TableRow>
      )}
      <Pagination page={page} setPage={setPage} className='mt-5' />
    </Layout>
  );
}
