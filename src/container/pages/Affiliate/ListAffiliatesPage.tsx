import {
  ArrowsUpDownStyled,
  ButtonPrimary,
  Cellule,
  H2,
  Input,
  Layout,
  Loader,
  Pagination,
  Row,
  RowBetween,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from '@/components';
import { CreateAffiliateModal } from '@/container/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { AffiliateDto } from '@/types';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

export function ListAffiliatePage(): React.JSX.Element {
  const [affiliates, setAffiliates] = useState<AffiliateDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof AffiliateDto>('title');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const { t } = useTranslation();
  const [isModalCreateAffiliateOpen, setIsModalCreateAffiliateOpen] =
    useState<boolean>(false);

  async function fetchAffiliates() {
    setIsLoading(true);
    const fetchedaffiliates = await ApiService.affiliates.getAll({
      orderType,
      orderBy,
      search,
      page,
      pageSize: 10,
    });
    if (fetchedaffiliates.length === 0 && page > 0) {
      setPage(page - 1);
    }
    setAffiliates(fetchedaffiliates);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAffiliates();
  }, [orderBy, orderType, search, page]);

  function handleSort(by: keyof AffiliateDto) {
    if (orderBy === by) {
      setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setOrderType('ASC');
    }
    setOrderBy(by);
  }

  const nbColumns = 'grid-cols-5';

  return (
    <Layout selected={ROUTES.affiliates.list}>
      <H2 className='mb-7'>{t('affiliates.list.title')}</H2>
      <RowBetween className='items-end w-full'>
        <Input
          left={<MagnifyingGlassIcon />}
          className='w-50'
          placeholder={t('affiliates.list.search')}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />

        <ButtonPrimary
          onClick={() => setIsModalCreateAffiliateOpen(true)}
          leftIcon={<PlusCircleIcon />}
        >
          {t('affiliates.create.title')}
        </ButtonPrimary>
      </RowBetween>
      <TableHeader className={`${nbColumns} mt-2`}>
        <TableHeaderItem
          $isFocus={orderBy === 'title'}
          onClick={() => handleSort('title')}
        >
          {t('affiliates.list.table.title')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'title'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'animals'}
          onClick={() => handleSort('animals')}
        >
          {t('affiliates.list.table.animals')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'animals'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'brand'}
          onClick={() => handleSort('brand')}
        >
          {t('affiliates.list.table.brand')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'brand'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'basePrice'}
          onClick={() => handleSort('basePrice')}
        >
          {t('affiliates.list.table.basePrice')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'basePrice'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'discountPrice'}
          onClick={() => handleSort('discountPrice')}
        >
          {t('affiliates.list.table.discountPrice')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'discountPrice'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
      </TableHeader>
      {affiliates.length > 0 &&
        !isLoading &&
        affiliates.map((affiliate: AffiliateDto) => (
          <TableRow
            className={nbColumns}
            onMouseEnter={() => setRowTableHover(affiliate.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={affiliate.id}
            onClick={() => router.push(ROUTES.affiliates.detail(affiliate.id))}
          >
            <Cellule
              $isFocus={orderBy === 'title' || rowTableHover === affiliate.id}
            >
              {affiliate.title}
            </Cellule>
            <Row className='gap-1'>
              {affiliate.animals.map((animal) => (
                <Cellule
                  $isFocus={
                    orderBy === 'animals' || rowTableHover === affiliate.id
                  }
                  $isEnum
                  key={animal}
                >
                  {animal}
                </Cellule>
              ))}
            </Row>
            <Cellule
              $isFocus={orderBy === 'brand' || rowTableHover === affiliate.id}
            >
              {affiliate.brand}
            </Cellule>
            <Cellule
              $isFocus={
                orderBy === 'basePrice' || rowTableHover === affiliate.id
              }
            >
              {`${affiliate.basePrice}€`}
            </Cellule>
            <Cellule
              $isFocus={
                orderBy === 'discountPrice' || rowTableHover === affiliate.id
              }
            >
              {`${affiliate.discountPrice}€`}
            </Cellule>
          </TableRow>
        ))}
      {isLoading && (
        <TableRow className={nbColumns}>
          {Array(5)
            .fill(null)
            .map((e) => (
              <Cellule key={e}>
                <Loader size={5} />
              </Cellule>
            ))}
        </TableRow>
      )}
      {affiliates.length === 0 && !isLoading && (
        <TableRow className={nbColumns}>
          <Cellule>{t('affiliates.list.noResult')}</Cellule>
        </TableRow>
      )}
      <Pagination page={page} setPage={setPage} className='mt-5' />
      <CreateAffiliateModal
        isOpen={isModalCreateAffiliateOpen}
        onClose={() => setIsModalCreateAffiliateOpen(false)}
      />
    </Layout>
  );
}
