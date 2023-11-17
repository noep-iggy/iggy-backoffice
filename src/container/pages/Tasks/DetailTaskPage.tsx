/* eslint-disable indent */
import {
  Col,
  ErrorMessage,
  InputEdit,
  InputEnumEdit,
  Layout,
  P14,
  PageLoader,
} from '@/components';
import {
  BackDetailPage,
  ButtonDeleteDetailPage,
  DeleteModal,
  DetailPage,
  FormDetailPage,
  InfosDetailPage,
  LabelRowInfosDetailPage,
  RowInfosDetailPage,
  TitleDetailPage,
  ValueRowInfosDetailPage,
} from '@/container/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import {
  formatApiErrorMessage,
  formatValidationErrorMessage,
} from '@/services/error';
import { formatDate } from '@/services/utils';
import {
  TaskDto,
  TaskRecurrenceEnumUi,
  TaskStatusEnum,
  UpdateTaskApi,
} from '@/types';
import { taskValidation } from '@/validations';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DetailTaskPageProps {
  idPage: string;
}

export function DetailTaskPage(props: DetailTaskPageProps): React.JSX.Element {
  const { idPage } = props;
  const { t } = useTranslation();
  const [task, setTask] = useState<TaskDto>();
  const [errorApi, setErrorApi] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    setError,
    register,
    watch,
  } = useForm<UpdateTaskApi>({
    resolver: yupResolver(taskValidation.update),
    values: {
      status: task?.status,
      recurrence: task?.recurrence,
    },
  });

  async function fetchTask() {
    const task = await ApiService.tasks.getOne(idPage);
    setTask(task);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  async function onSubmit(data: UpdateTaskApi) {
    try {
      if (!task) return;
      await ApiService.tasks.updateOne(task.id, {
        ...data,
      });
      router.reload();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  async function removeRecurrence() {
    await ApiService.tasks.removeRecurrence(idPage);
    router.reload();
  }

  useEffect(() => {
    if (
      (watch('recurrence.type') as unknown as TaskRecurrenceEnumUi) ===
      TaskRecurrenceEnumUi.NULL
    ) {
      removeRecurrence();
    }
  }, [isSubmitted]);

  return (
    <Layout selected={ROUTES.tasks.list}>
      <BackDetailPage onClick={() => router.push(ROUTES.tasks.list)}>
        <ArrowLeftIcon className='w-4 mr-1' />
        <P14 className='font-semibold'>{t('generics.back')}</P14>
      </BackDetailPage>
      <DetailPage>
        <TitleDetailPage className='mt-5'>
          {t('tasks.detail.title')}
        </TitleDetailPage>
        {task ? (
          <>
            <FormDetailPage onSubmit={handleSubmit(onSubmit)}>
              <InputEdit
                value={watch('title')}
                label={t('fields.title.label')}
                defaultValue={task.title}
                register={register('title')}
                placeholder={t('fields.title.placeholder')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.title?.message}
              />
              <InputEnumEdit
                label={t('fields.status.label')}
                options={Object.values(TaskStatusEnum).map((v) => {
                  return {
                    label: t(`enums.status.${v}`),
                    value: v,
                  };
                })}
                register={register('status')}
                placeholder={t('fields.status.placeholder')}
                error={errors.status?.message}
                value={watch('status')}
                defaultValue={task.status}
                onHandleSubmit={handleSubmit(onSubmit)}
              />
              <InputEnumEdit
                label={t('fields.recurrence.label')}
                options={Object.values(TaskRecurrenceEnumUi).map((v) => {
                  return {
                    label: t(`enums.recurrence.type.${v}`),
                    value: v,
                  };
                })}
                register={register('recurrence.type')}
                error={errors.recurrence?.message}
                value={watch('recurrence.type') ?? TaskRecurrenceEnumUi.NULL}
                defaultValue={task.recurrence?.type}
                placeholder={t('fields.recurrence.placeholder')}
                onHandleSubmit={handleSubmit(onSubmit)}
              />
              {errorApi && (
                <ErrorMessage className='mt-0.5 w-full' icon>
                  {errorApi}
                </ErrorMessage>
              )}
            </FormDetailPage>
            <TitleDetailPage>{t('tasks.detail.general.title')}</TitleDetailPage>
            <InfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('tasks.detail.general.id')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>{task.id}</ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('tasks.detail.general.createAt')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {formatDate(task.createdAt)}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('tasks.detail.general.updateAt')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {formatDate(task.updatedAt)}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('tasks.detail.general.animals')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {task.animals
                    ? task.animals.map((animal, index) => (
                        <span
                          className='underline cursor-pointer'
                          onClick={() =>
                            router.push(ROUTES.animals.detail(animal.id))
                          }
                          key={animal.id}
                        >
                          {animal.name}
                          {index !== task.animals.length - 1 && ', '}
                        </span>
                      ))
                    : t('generics.empty')}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('tasks.detail.general.users')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {task.users
                    ? task.users.map((user, index) => {
                        return (
                          <span
                            className='underline cursor-pointer'
                            onClick={() =>
                              router.push(ROUTES.users.detail(user.id))
                            }
                            key={user.id}
                          >
                            {user.firstName}
                            {index !== task.users.length - 1 && ', '}
                          </span>
                        );
                      })
                    : t('generics.empty')}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
            </InfosDetailPage>
            <TitleDetailPage>{t('tasks.detail.actions')}</TitleDetailPage>
            <InfosDetailPage className='border-red-300'>
              <RowInfosDetailPage>
                <Col className='w-1/2'>
                  <LabelRowInfosDetailPage>
                    {t('tasks.detail.delete.title')}
                  </LabelRowInfosDetailPage>
                  <ValueRowInfosDetailPage className='mt-1'>
                    {t('tasks.detail.delete.ifDelete')}
                  </ValueRowInfosDetailPage>
                </Col>
                <ButtonDeleteDetailPage
                  outlined
                  leftIcon={<TrashIcon />}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  {t('generics.delete')}
                </ButtonDeleteDetailPage>
              </RowInfosDetailPage>
            </InfosDetailPage>
          </>
        ) : (
          <PageLoader />
        )}
      </DetailPage>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        description={t('tasks.detail.delete.content')}
        name={task?.title ?? ''}
        onDelete={async () => {
          if (!task) return;
          await ApiService.tasks.deleteOne(task.id);
          router.push(ROUTES.tasks.list);
        }}
      />
    </Layout>
  );
}
