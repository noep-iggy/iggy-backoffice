/* eslint-disable indent */
import {
  Col,
  ErrorMessage,
  InputEdit,
  InputEnumMultipleEdit,
  InputImageEdit,
  InputNumberEdit,
  Layout,
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
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import {
  formatApiErrorMessage,
  formatValidationErrorMessage,
} from '@/services/error';
import { formatDate } from '@/services/utils';
import { AffiliateDto, AnimalTypeEnum, UpdateAffiliateApi } from '@/types';
import { affiliateValidation } from '@/validations';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DetailAffiliatePageProps {
  idPage: string;
}

export function DetailAffiliatePage(
  props: DetailAffiliatePageProps
): React.JSX.Element {
  const { idPage } = props;
  const { t } = useTranslation();
  const [affiliate, setAffiliate] = useState<AffiliateDto>();
  const [errorApi, setErrorApi] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    register,
    watch,
  } = useForm<UpdateAffiliateApi>({
    resolver: yupResolver(affiliateValidation.update),
    values: {
      title: affiliate?.title,
      description: affiliate?.description,
      brand: affiliate?.brand,
      animals: affiliate?.animals,
      basePrice: affiliate?.basePrice,
      discountPrice: affiliate?.discountPrice,
      url: affiliate?.url,
    },
  });

  async function fetchAffiliate() {
    const affiliate = await ApiService.affiliates.getOne(idPage);
    setAffiliate(affiliate);
  }

  useEffect(() => {
    fetchAffiliate();
  }, []);

  async function onSubmit(data: UpdateAffiliateApi) {
    try {
      if (!affiliate) return;
      await ApiService.affiliates.updateOne(affiliate.id, {
        ...data,
      });
      router.reload();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  return (
    <Layout
      selected={
        currentUser?.id !== router.query.slug
          ? ROUTES.affiliates.list
          : undefined
      }
    >
      <BackDetailPage onClick={() => router.push(ROUTES.affiliates.list)}>
        <ArrowLeftIcon className='w-4 mr-1' />
        <LabelRowInfosDetailPage>{t('generics.back')}</LabelRowInfosDetailPage>
      </BackDetailPage>
      <DetailPage>
        <TitleDetailPage className='mt-5'>
          {t('affiliates.detail.title')}
        </TitleDetailPage>
        {affiliate ? (
          <>
            <FormDetailPage onSubmit={handleSubmit(onSubmit)}>
              <InputImageEdit
                label={t('fields.image.label')}
                value={affiliate.image}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.image?.message}
                placeholder={t('fields.image.placeholder')}
                register={register('image')}
              />
              <InputEdit
                label={t('fields.title.label')}
                value={watch('title')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.title?.message}
                placeholder={t('fields.title.placeholder')}
                register={register('title')}
                defaultValue={affiliate.title}
              />
              <InputEdit
                value={watch('description')}
                label={t('fields.description.label')}
                defaultValue={affiliate.description}
                register={register('description')}
                placeholder={t('fields.description.placeholder')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.description?.message}
              />
              <InputEdit
                value={watch('brand')}
                label={t('fields.brand.label')}
                defaultValue={affiliate.brand}
                register={register('brand')}
                placeholder={t('fields.brand.placeholder')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.brand?.message}
              />
              <InputEdit
                value={watch('url')}
                label={t('fields.url.label')}
                defaultValue={affiliate.url}
                register={register('url')}
                placeholder={t('fields.url.placeholder')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.url?.message}
              />
              <InputEnumMultipleEdit
                value={watch('animals') as unknown as string[]}
                options={Object.values(AnimalTypeEnum).map((v) => {
                  return {
                    label: `enums.type.${v}`,
                    value: v,
                  };
                })}
                onChange={(v) => setValue('animals', v as AnimalTypeEnum[])}
                label={t('fields.animals.label')}
                defaultValue={affiliate.animals}
                register={register('animals')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.animals?.message}
                placeholder='fields.animals.placeholder'
              />
              <InputNumberEdit
                value={watch('basePrice') as unknown as string}
                label={t('fields.basePrice.label')}
                defaultValue={affiliate.basePrice + '€'}
                register={register('basePrice')}
                placeholder={t('fields.basePrice.placeholder')}
                error={errors.basePrice?.message}
                step={0.1}
                min={0}
                onHandleSubmit={handleSubmit(onSubmit)}
              />
              <InputNumberEdit
                value={watch('discountPrice') as unknown as string}
                label={t('fields.discountPrice.label')}
                defaultValue={affiliate.discountPrice + '€'}
                register={register('discountPrice')}
                placeholder={t('fields.discountPrice.placeholder')}
                error={errors.discountPrice?.message}
                step={0.1}
                min={0}
                onHandleSubmit={handleSubmit(onSubmit)}
              />
              {errorApi && (
                <ErrorMessage className='mt-0.5 w-full' icon>
                  {errorApi}
                </ErrorMessage>
              )}
            </FormDetailPage>
            <TitleDetailPage>
              {t('affiliates.detail.general.title')}
            </TitleDetailPage>
            <InfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('affiliates.detail.general.id')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {affiliate.id}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('affiliates.detail.general.createAt')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {formatDate(affiliate.createdAt)}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('affiliates.detail.general.updateAt')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {formatDate(affiliate.updatedAt)}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
            </InfosDetailPage>
            <TitleDetailPage>{t('affiliates.detail.actions')}</TitleDetailPage>
            <InfosDetailPage className='border-red-300'>
              <RowInfosDetailPage>
                <Col className='w-1/2'>
                  <LabelRowInfosDetailPage>
                    {t('affiliates.detail.delete.title')}
                  </LabelRowInfosDetailPage>
                  <ValueRowInfosDetailPage className='mt-1'>
                    {t('affiliates.detail.delete.ifDelete')}
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
        description={t('affiliates.detail.delete.content')}
        name={`${affiliate?.title}` ?? ''}
        onDelete={async () => {
          if (!affiliate) return;
          await ApiService.affiliates.deleteOne(affiliate.id);
          router.push(ROUTES.affiliates.list);
        }}
      />
    </Layout>
  );
}
