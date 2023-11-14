import { Col, ErrorMessage, InputEdit, InputEnumEdit, Layout, P14, PageLoader } from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import {
  AnimalDto,
  UpdateAnimalApi,
  AnimalGenderEnum,
  AnimalTypeEnum,
  AnimalStatusEnum,
} from '@/types';
import { animalValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatApiErrorMessage, formatValidationErrorMessage } from '@/services/error';
import router from 'next/router';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { BackDetailPage, ButtonDeleteDetailPage, DeleteModal, DetailPage, FormDetailPage, InfosDetailPage, LabelRowInfosDetailPage, RowInfosDetailPage, TitleDetailPage, ValueRowInfosDetailPage } from '@/container/components';
import { formatDate } from '@/services/utils';

interface DetailAnimalPageProps {
  idPage: string;
}

export function DetailAnimalPage(props: DetailAnimalPageProps): React.JSX.Element {
  const { idPage } = props;
  const { t } = useTranslation();
  const [ animal, setAnimal ] = useState<AnimalDto>();
  const [errorApi, setErrorApi] = useState<string>('');
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    getValues,
    watch,
  } = useForm<UpdateAnimalApi>({
    resolver: yupResolver(animalValidation.update),
    values: {
      gender: animal?.gender,
      type: animal?.type,
      status: animal?.status,
    }
  });

  async function fetchAnimal() {
    const animal = await ApiService.animals.getOne(idPage);
    setAnimal(animal);
  }

  useEffect(() => {
    fetchAnimal();
  }, [])

  async function onSubmit(data: UpdateAnimalApi) {
    try {
      if(!animal) return;
      await ApiService.animals.updateOne(animal.id,{
        ...data,
      });
      router.reload();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  return <Layout selected={ROUTES.animals.list}>
    <BackDetailPage onClick={() => router.push(ROUTES.animals.list)}>
      <ArrowLeftIcon className='mr-1 w-4' />
      <P14 className='font-semibold'>{t('generics.back')}</P14>
    </BackDetailPage>
    <DetailPage>
      <TitleDetailPage className='mt-5'>{t('animals.detail.title')}</TitleDetailPage>
      {animal ? (
        <>
          <FormDetailPage onSubmit={handleSubmit(onSubmit)}>
            <InputEdit
              value={getValues('name')}
              label={t('fields.name.label')}
              defaultValue={animal.name}
              register={register('name')}
              placeholder={t('fields.name.placeholder')}
              onHandleSubmit={handleSubmit(onSubmit)}
              error={errors.name?.message}
            />
            <InputEnumEdit
              label={t('fields.gender.label')}
              options={Object.values(AnimalGenderEnum).map((v)=> {
                return {
                  label: v,
                  value: v
                }
              })}
              register={register('gender')}
              error={errors.gender?.message}
              value={watch('gender')}
              defaultValue={animal.gender}
              onHandleSubmit={handleSubmit(onSubmit)}
            />
            <InputEnumEdit
              label={t('fields.type.label')}
              options={Object.values(AnimalTypeEnum).map((v)=> {
                return {
                  label: v,
                  value: v
                }
              })}
              register={register('type')}
              error={errors.type?.message}
              value={watch('type')}
              defaultValue={animal.type}
              onHandleSubmit={handleSubmit(onSubmit)}
            />
            <InputEnumEdit
              label={t('fields.status.label')}
              options={Object.values(AnimalStatusEnum).map((v)=> {
                return {
                  label: v,
                  value: v
                }
              })}
              register={register('status')}
              error={errors.status?.message}
              value={watch('status')}
              defaultValue={animal.status}
              onHandleSubmit={handleSubmit(onSubmit)}
            />
            {errorApi && (
              <ErrorMessage className='mt-0.5 w-full' icon>
                {errorApi}
              </ErrorMessage>
            )}
          </FormDetailPage>
          <TitleDetailPage>{t('animals.detail.general.title')}</TitleDetailPage>
          <InfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('animals.detail.general.createAt')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{formatDate(animal.createdAt)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage>
              <LabelRowInfosDetailPage>{t('animals.detail.general.updateAt')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage>{formatDate(animal.updatedAt)}</ValueRowInfosDetailPage>
            </RowInfosDetailPage>
            <RowInfosDetailPage 
              onClick={() => animal.house && router.push(ROUTES.houses.detail(animal.house.id))}
            >
              <LabelRowInfosDetailPage>{t('animals.detail.general.house')}</LabelRowInfosDetailPage>
              <ValueRowInfosDetailPage 
                className={animal.house && 'underline cursor-pointer'}
              >
                {animal.house?.name ?? t('generics.empty')}
              </ValueRowInfosDetailPage>
            </RowInfosDetailPage>
          </InfosDetailPage>
          <TitleDetailPage>{t('animals.detail.actions')}</TitleDetailPage>
          <InfosDetailPage className='border-red-300'>
            <RowInfosDetailPage>
              <Col className='w-1/2'>
                <LabelRowInfosDetailPage>
                  {t('animals.detail.delete.title')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage className='mt-1'>
                  {t('animals.detail.delete.ifDelete')}
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
      description={t('animals.detail.delete.content')}
      name={animal?.name ?? ''}
      onDelete={async () => {
        if(!animal) return;
        await ApiService.animals.deleteOne(animal.id);
        router.push(ROUTES.animals.list);
      }}
    />
  </Layout>
 
}
