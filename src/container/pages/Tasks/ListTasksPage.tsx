import {
  ArrowsUpDownStyled,
  Cellule,
  H2,
  Input,
  Layout,
  Loader,
  Pagination,
  Row,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { AnimalDto, TaskDto, UserDto } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

export function ListTasksPage(): React.JSX.Element {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [orderBy, setOrderBy] = useState<keyof TaskDto>('title');
  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const [houseId, setHouseId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  async function fetchTasks() {
    setIsLoading(true);
    const filters = {
      orderType,
      orderBy,
      search,
      page,
      pageSize: 10,
    };
    const fetchedTasks =
      houseId !== ''
        ? await ApiService.tasks.getTasksByHouseId(houseId, filters)
        : await ApiService.tasks.getAll(filters);
    if (fetchedTasks.length === 0 && page > 0) {
      setPage(page - 1);
    }
    setTasks(fetchedTasks);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, [orderBy, orderType, search, page, houseId]);

  function handleSortPlace(by: keyof TaskDto) {
    if (orderBy === by) {
      setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setOrderType('ASC');
    }
    setOrderBy(by);
  }

  const nbColumns = 'grid-cols-5';

  return (
    <Layout selected={ROUTES.tasks.list}>
      <H2 className='mb-7'>{t('tasks.list.title')}</H2>
      <Row className='gap-2'>
        <Input
          left={<MagnifyingGlassIcon />}
          className='w-50'
          placeholder={t('tasks.list.search')}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <Input
          className='w-50'
          placeholder={t('tasks.list.houseId')}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setHouseId(e.target.value)
          }
          value={houseId}
        />
      </Row>
      <TableHeader className={`${nbColumns} mt-2`}>
        <TableHeaderItem
          $isFocus={orderBy === 'title'}
          onClick={() => handleSortPlace('title')}
        >
          {t('tasks.list.table.title')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'title'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'users'}
          onClick={() => handleSortPlace('users')}
        >
          {t('tasks.list.table.users')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'users'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'animals'}
          onClick={() => handleSortPlace('animals')}
        >
          {t('tasks.list.table.animals')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'animals'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'recurrence'}
          onClick={() => handleSortPlace('recurrence')}
        >
          {t('tasks.list.table.recurrence')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'recurrence'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
        <TableHeaderItem
          $isFocus={orderBy === 'status'}
          onClick={() => handleSortPlace('status')}
        >
          {t('tasks.list.table.status')}
          <ArrowsUpDownStyled
            $isFocus={orderBy === 'status'}
            $direction={orderType === 'ASC'}
          />
        </TableHeaderItem>
      </TableHeader>
      {tasks.length > 0 &&
        !isLoading &&
        tasks.map((task: TaskDto) => (
          <TableRow
            className={nbColumns}
            onMouseEnter={() => setRowTableHover(task.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={task.id}
            onClick={() => router.push(ROUTES.tasks.detail(task.id))}
          >
            <Cellule
              $isFocus={orderBy === 'title' || rowTableHover === task.id}
            >
              {task.title}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'users' || rowTableHover === task.id}
            >
              {task.users?.map((user: UserDto) => user.firstName).join(', ')}
            </Cellule>
            <Cellule
              $isFocus={orderBy === 'animals' || rowTableHover === task.id}
            >
              {task.animals?.map((animal: AnimalDto) => animal.name).join(', ')}
            </Cellule>
            <Cellule
              $isEnum
              $isFocus={orderBy === 'recurrence' || rowTableHover === task.id}
            >
              {t(`enums.recurrence.type.${task.recurrence?.type ?? 'NULL'}`)}
            </Cellule>
            <Cellule
              $isEnum
              $isFocus={orderBy === 'status' || rowTableHover === task.id}
            >
              {t(`enums.status.${task.status}`)}
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
      {tasks.length === 0 && !isLoading && (
        <TableRow className={nbColumns}>
          <Cellule>{t('tasks.list.noResult')}</Cellule>
        </TableRow>
      )}
      <Pagination page={page} setPage={setPage} className='mt-5' />
    </Layout>
  );
}
