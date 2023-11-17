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
  renderBoolean,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { UserDto } from '@/types';
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

export function ListUsersPage(): React.JSX.Element {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof UserDto>('firstName');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const { t } = useTranslation();

  async function fetchUsers() {
    const fetchedUsers = await ApiService.users.getAll({
      orderType,
      orderBy,
      search,
      page,
      pageSize: 10,
    });
    if (fetchedUsers.length === 0 && page > 0) {
      setPage(page - 1);
    }
    setUsers(fetchedUsers);
  }

  useEffect(() => {
    fetchUsers();
  }, [orderBy, orderType, search, page]);

  function handleSort(by: keyof UserDto) {
    if (orderBy === by) {
      setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setOrderType('ASC');
    }
    setOrderBy(by);
  }

  const nbColumns = 'grid-cols-6';

  return (
    <Layout selected={ROUTES.users.list}>
      <H2 className='mb-7'>{t('users.list.title')}</H2>
      <Input
        left={<MagnifyingGlassIcon />}
        className='w-50'
        placeholder={t('users.list.search')}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <TableHeader className={`${nbColumns} mt-2`}>
        <TableHeaderItem
          $isFocus={orderBy === 'firstName'}
          onClick={() => handleSort('firstName')}
        >
          {t('users.list.table.firstName')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'firstName'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'lastName'}
          onClick={() => handleSort('lastName')}
        >
          {t('users.list.table.lastName')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'lastName'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'email'}
          onClick={() => handleSort('email')}
        >
          {t('users.list.table.email')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'email'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'role'}
          onClick={() => handleSort('role')}
        >
          {t('users.list.table.role')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'role'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'house'}
          onClick={() => handleSort('house')}
        >
          {t('users.list.table.house')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'house'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'isAdmin'}
          onClick={() => handleSort('isAdmin')}
        >
          {t('users.list.table.admin')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'isAdmin'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
      </TableHeader>
      {users.length > 0 ? (
        users.map((user: UserDto) => (
          <TableRow
            className={nbColumns}
            onMouseEnter={() => setRowTableHover(user.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={user.id}
            onClick={() => router.push(ROUTES.users.detail(user.id))}
          >
            <Cellule
              $isFocus={orderBy === 'firstName' || rowTableHover === user.id}
            >
              {user.firstName}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'lastName' || rowTableHover === user.id}
            >
              {user.lastName}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'email' || rowTableHover === user.id}
            >
              {user.email}
            </Cellule>
            <Cellule
              $isEnum
              $isFocus={orderBy === 'role' || rowTableHover === user.id}
            >
              {t(`enums.role.${user.role}`)}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'house' || rowTableHover === user.id}
            >
              {user.house?.name}
            </Cellule>
            <Cellule
              className='justify-center'
              $isFocus={orderBy === 'isAdmin' || rowTableHover === user.id}
            >
              {renderBoolean(user.isAdmin)}
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
