import {
  ButtonAlert,
  Col,
  ErrorMessage,
  H2,
  InputEdit,
  InputEnumEdit,
  Layout,
  P14,
  PageLoader,
  Row,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { BillingPlanTypeEnum, HouseDto, UpdateHouseApi } from '@/types';
import { houseValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { formatApiErrorMessage, formatValidationErrorMessage } from '@/services/error';
import router from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { DeleteModal } from '@/container/components';
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
    <Back onClick={() => router.push(ROUTES.houses.list)}>
      <ArrowLeftIcon className='mr-1 w-4' />
      <P14 className='font-semibold'>{t('generics.back')}</P14>
    </Back>
    <Main>
      <H2>{t('houses.detail.title')}</H2>
      {house ? (
        <>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
          </Form>
          <ButtonAlert className='mt-10' onClick={()=> setIsDeleteModalOpen(true)}>
            {t('houses.detail.delete.title')}
          </ButtonAlert>
        </>
      ): (<PageLoader/>)}
    </Main>
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

const Main = tw(Col)`
  w-full
  h-full
  mt-5
  ml-4
`;

const Form = tw.form` 
  flex
  flex-col
  items-start
  w-2/3
  gap-5
  mt-5
`;

const Back = tw(Row)`
  cursor-pointer
`