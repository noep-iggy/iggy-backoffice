import { Col, ErrorMessage, InputEdit, InputEnumEdit, Layout, P14, PageLoader } from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { BillingPlanTypeEnum, HouseDto, UpdateHouseApi } from '@/types';
import { houseValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatApiErrorMessage, formatValidationErrorMessage } from '@/services/error';
import router from 'next/router';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { BackDetailPage, ButtonDeleteDetailPage, DeleteModal, DetailPage, FormDetailPage, InfosDetailPage, LabelRowInfosDetailPage, RowInfosDetailPage, TitleDetailPage, ValueRowInfosDetailPage } from '@/container/components';
import { formatDate } from '@/services/utils';
interface DetailHousePageProps {
  idPage: string;
}

export function DetailHousePage(props: DetailHousePageProps): React.JSX.Element {
  const { idPage } = props;
  const { t } = useTranslation();
  const [ house, setHouse ] = useState<HouseDto>();
  const [errorApi, setErrorApi] = useState<string>('');
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    getValues,
    watch,
  } = useForm<UpdateHouseApi>({
    resolver: yupResolver(houseValidation.update),
    values: {
      billingPlan: house?.billingPlan
    }
  });

  async function fetchHouse() {
    const house = await ApiService.houses.getOne(idPage);
    setHouse(house);
  }

  useEffect(() => {
    fetchHouse();
  }, [])

  async function onSubmit(data: UpdateHouseApi) {
    try {
      if(!house) return;
      await ApiService.houses.updateOne(house.id,{
        ...data,
      });
      router.reload();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  return <Layout selected={ROUTES.houses.list}>
    <BackDetailPage onClick={() => router.push(ROUTES.houses.list)}>
      <ArrowLeftIcon className='mr-1 w-4' />
      <P14 className='font-semibold'>{t('generics.back')}</P14>
    </BackDetailPage>
    <DetailPage>
      <TitleDetailPage className='mt-5'>{t('houses.detail.title')}</TitleDetailPage>
      {house ? (
        <>
          <FormDetailPage onSubmit={handleSubmit(onSubmit)}>
            <InputEdit
              value={getValues('name')}
              label={t('fields.name.label')}
              defaultValue={house.name}
              register={register('name')}
              placeholder={t('fields.name.placeholder')}
              onHandleSubmit={handleSubmit(onSubmit)}
              error={errors.name?.message}
            />
            <InputEnumEdit
              label={t('fields.billingPlan.label')}
              options={Object.values(BillingPlanTypeEnum).map((v)=> {
                return {
                  label: v,
                  value: v
                }
              })}
              register={register('billingPlan')}
              error={errors.billingPlan?.message}
              value={watch('billingPlan')}
              defaultValue={house.billingPlan}
              onHandleSubmit={handleSubmit(onSubmit)}
            />
            {errorApi && (
              <ErrorMessage className='mt-0.5 w-full' icon>
                {errorApi}
              </ErrorMessage>
            )}
          </FormDetailPage>
          <TitleDetailPage>{t('houses.detail.general.title')}</TitleDetailPage>
          <InfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('houses.detail.general.createAt')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{formatDate(house.createdAt)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('houses.detail.general.updateAt')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{formatDate(house.updatedAt)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('houses.detail.general.animals')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>
                {house.animals 
                  ? house.animals
                    .map(
                      (animal, index) => 
                        <span 
                          className='underline cursor-pointer' 
                          onClick={()=> router.push(ROUTES.animals.detail(animal.id))} 
                          key={animal.id}
                        >
                          {animal.name}
                          {index !== house.animals.length - 1 && ', '}
                        </span>
                    )
                    .join(', ')  
                  : 
                  t('generics.empty')
                }
              </ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('houses.detail.general.users')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>
                {house.users 
                  ? house.users
                    .map(
                      (user, index) => {
                        return <span 
                          className='underline cursor-pointer' 
                          onClick={()=> router.push(ROUTES.users.detail(user.id))} 
                          key={user.id}
                        >
                          {user.firstName}
                          {index !== house.users.length - 1 && ', '}
                        </span>
                      })
                  : 
                  t('generics.empty')
                }
              </ValueRowInfosDetailPage>
            </RowInfosDetailPage>
          </InfosDetailPage>
          <TitleDetailPage>{t('houses.detail.actions')}</TitleDetailPage>
          <InfosDetailPage className='border-red-300'>
            <RowInfosDetailPage>
              <Col className='w-1/2'>
                <LabelRowInfosDetailPage>
                  {t('houses.detail.delete.title')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage className='mt-1'>
                  {t('houses.detail.delete.ifDelete')}
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
          </InfosDetailPage>
        </>
      ): (<PageLoader/>)}
    </DetailPage>
    <DeleteModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      description={t('houses.detail.delete.content')}
      name={house?.name ?? ''}
      onDelete={async () => {
        if(!house) return;
        await ApiService.houses.deleteOne(house.id);
        router.push(ROUTES.houses.list);
      }}
    />
  </Layout>
 
}
