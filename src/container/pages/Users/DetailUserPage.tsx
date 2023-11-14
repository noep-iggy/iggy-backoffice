import {
  Col,
  ErrorMessage,
  InputEdit,
  InputEnumEdit,
  InputImageEdit,
  Layout,
  PageLoader,
  renderBoolean,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { UserDto, UpdateUserApi, UserRoleEnum } from '@/types';
import { userValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatApiErrorMessage, formatValidationErrorMessage } from '@/services/error';
import router from 'next/router';
import { ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BackDetailPage, ButtonDeleteDetailPage, DeleteModal, DetailPage, FormDetailPage, InfosDetailPage, LabelRowInfosDetailPage, RowInfosDetailPage, TitleDetailPage, ValueRowInfosDetailPage } from '@/container/components';
import { formatDate } from '@/services/utils';
import { useAuthContext } from '@/contexts';

interface DetailUserPageProps {
  idPage: string;
}

export function DetailUserPage(props: DetailUserPageProps): React.JSX.Element {
  const { idPage } = props;
  const { t } = useTranslation();
  const [ user, setUser ] = useState<UserDto>();
  const [errorApi, setErrorApi] = useState<string>('');
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ toggleAdminLoading, setToggleAdminLoading ] = useState<boolean>(false);
  const { currentUser } = useAuthContext(); 
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    watch,
  } = useForm<UpdateUserApi>({
    resolver: yupResolver(userValidation.update),
    values: {
      role: user?.role
    }
  });

  async function fetchUser() {
    const user = await ApiService.users.getOne(idPage);
    setUser(user);
  }

  async function toggleAdmin() {
    try {
      setToggleAdminLoading(true);
      await ApiService.users.toggleAdminStatus(idPage);
      router.reload();
      setToggleAdminLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  async function onSubmit(data: UpdateUserApi) {
    try {
      if(!user) return;
      await ApiService.users.updateOne(user.id,{
        ...data,
      });
      router.reload();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  return <Layout selected={currentUser?.id !== router.query.slug ? ROUTES.users.list : undefined}>
    <BackDetailPage onClick={() => router.push(ROUTES.users.list)}>
      <ArrowLeftIcon className='mr-1 w-4' />
      <LabelRowInfosDetailPage>{t('generics.back')}</LabelRowInfosDetailPage>
    </BackDetailPage>
    <DetailPage>
      <TitleDetailPage className='mt-5'>{t('users.detail.title')}</TitleDetailPage>
      {user ? (
        <>
          <FormDetailPage onSubmit={handleSubmit(onSubmit)}>
            <InputImageEdit
              label={t('fields.profilePicture.label')}
              value={user.profilePicture}
              onHandleSubmit={handleSubmit(onSubmit)}
              error={errors.profilePicture?.message}
              placeholder={t('fields.profilePicture.placeholder')}
              register={register('profilePicture')}
            />
            <InputEdit
              value={watch('firstName')}
              label={t('fields.firstName.label')}
              defaultValue={user.firstName}
              register={register('firstName')}
              placeholder={t('fields.firstName.placeholder')}
              onHandleSubmit={handleSubmit(onSubmit)}
              error={errors.firstName?.message}
            />
            <InputEdit
              value={watch('lastName')}
              label={t('fields.lastName.label')}
              defaultValue={user.lastName}
              register={register('lastName')}
              placeholder={t('fields.lastName.placeholder')}
              onHandleSubmit={handleSubmit(onSubmit)}
              error={errors.lastName?.message}
            />
            <InputEdit
              value={watch('email')}
              label={t('fields.email.label')}
              defaultValue={user.email}
              register={register('email')}
              placeholder={t('fields.email.placeholder')}
              onHandleSubmit={handleSubmit(onSubmit)}
              error={errors.email?.message}
            />
            <InputEnumEdit
              label={t('fields.role.label')}
              options={Object.values(UserRoleEnum).map((v)=> {
                return {
                  label: v,
                  value: v
                }
              })}
              register={register('role')}
              error={errors.role?.message}
              value={watch('role')}
              defaultValue={user.role}
              onHandleSubmit={handleSubmit(onSubmit)}
            />
            {errorApi && (
              <ErrorMessage className='mt-0.5 w-full' icon>
                {errorApi}
              </ErrorMessage>
            )}
          </FormDetailPage>
          <TitleDetailPage>{t('users.detail.general.title')}</TitleDetailPage>
          <InfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('users.detail.general.createAt')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{formatDate(user.createdAt)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('users.detail.general.updateAt')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{formatDate(user.updatedAt)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage 
              onClick={() => user.house && router.push(ROUTES.houses.detail(user.house.id))}
            >
              <LabelRowInfosDetailPage>{t('users.detail.general.house')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage 
                className={user.house && 'underline cursor-pointer'}
              >
                {user.house?.name ?? t('generics.empty')}
              </ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('users.detail.general.admin')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{renderBoolean(user.isAdmin)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
          </InfosDetailPage>
          <TitleDetailPage>{t('users.detail.actions')}</TitleDetailPage>
          <InfosDetailPage className='border-red-300'>
            <RowInfosDetailPage>
              <Col className='w-1/2'>
                <LabelRowInfosDetailPage>
                  {t('users.detail.delete.title')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage className='mt-1'>
                  {t('users.detail.delete.ifDelete')}
                </ValueRowInfosDetailPage>
              </Col>
              <ButtonDeleteDetailPage 
                outlined 
                leftIcon={<TrashIcon/>} 
                onClick={()=> setIsDeleteModalOpen(true)}
              >
                {t('generics.delete')}
              </ButtonDeleteDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <Col className='w-1/2'>
                <LabelRowInfosDetailPage>{t('users.detail.changeAdminStatus.label')}</LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage 
                  className='mt-1'>
                  {user.isAdmin 
                    ? t('users.detail.changeAdminStatus.ifRemove') 
                    : t('users.detail.changeAdminStatus.ifAdd')
                  }
                </ValueRowInfosDetailPage>
              </Col>
              {user.isAdmin ? (
                <ButtonDeleteDetailPage 
                  isLoading={toggleAdminLoading} 
                  onClick={()=>toggleAdmin()} 
                  outlined 
                  leftIcon={<MinusCircleIcon/>}
                >
                  {t('users.detail.changeAdminStatus.remove')}
                </ButtonDeleteDetailPage>
              ) : (
                <ButtonDeleteDetailPage 
                  isLoading={toggleAdminLoading} 
                  onClick={()=>toggleAdmin()} 
                  outlined 
                  leftIcon={<PlusCircleIcon/>}
                >
                  {t('users.detail.changeAdminStatus.add')}
                </ButtonDeleteDetailPage>
              )}
            </RowInfosDetailPage>
          </InfosDetailPage>
        </>
      ): (<PageLoader/>)}
    </DetailPage>
    <DeleteModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      description={t('users.detail.delete.content')}
      name={`${user?.firstName} ${user?.lastName}` ?? ''}
      onDelete={async () => {
        if(!user) return;
        await ApiService.users.deleteOne(user.id);
        router.push(ROUTES.users.list);
      }}
    />
  </Layout>
 
}
