import {
  ArrowsUpDownStyled,
  ButtonPrimary,
  Cellule,
  H2,
  Input,
  Layout,
  Loader,
  P18,
  Row,
  RowBetween,
  RowCenter,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from '@/components';
import { CreateAffiliateModal } from '@/container/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { AffiliateDto } from '@/types';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

export function ListAffiliatePage(): React.JSX.Element {
  const [affiliates, setAffiliates] = useState<AffiliateDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof AffiliateDto>('title');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const { t } = useTranslation();
  const [isModalCreateAffiliateOpen, setIsModalCreateAffiliateOpen] =
    useState<boolean>(false);

  async function fetchAffiliates() {
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
      {affiliates.length > 0 ? (
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
      <CreateAffiliateModal
        isOpen={isModalCreateAffiliateOpen}
        onClose={() => setIsModalCreateAffiliateOpen(false)}
      />
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
