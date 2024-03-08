import {
  ArrowsUpDownStyled,
  AvatarUser,
  Cellule,
  H2,
  Input,
  Layout,
  Loader,
  Pagination,
  TableHeader,
  TableHeaderItem,
  TableRow,
  renderBoolean,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { hiddenText } from '@/services/utils';
import { UserDto } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

export function ListUsersPage(): React.JSX.Element {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof UserDto>('firstName');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  async function fetchUsers() {
    setIsLoading(true);
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
    setIsLoading(false);
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
      {users.length > 0 &&
        !isLoading &&
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
              <AvatarUser user={user} className='mr-2' />
              {hiddenText(user.firstName, rowTableHover === user.id)}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'lastName' || rowTableHover === user.id}
            >
              {hiddenText(user.lastName, rowTableHover === user.id)}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'email' || rowTableHover === user.id}
            >
              {hiddenText(user.email, rowTableHover === user.id)}
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
              {hiddenText(user.house?.name, rowTableHover === user.id)}
            </Cellule>
            <Cellule
              className='justify-center'
              $isFocus={orderBy === 'isAdmin' || rowTableHover === user.id}
            >
              {renderBoolean(user.isAdmin)}
            </Cellule>
          </TableRow>
        ))}
      {isLoading && (
        <TableRow className={nbColumns}>
          {Array(6)
            .fill(null)
            .map((e) => (
              <Cellule key={e}>
                <Loader size={5} />
              </Cellule>
            ))}
        </TableRow>
      )}
      {users.length === 0 && !isLoading && (
        <TableRow className={nbColumns}>
          <Cellule>{t('users.list.noResult')}</Cellule>
        </TableRow>
      )}
      <Pagination page={page} setPage={setPage} className='mt-5' />
    </Layout>
  );
}
