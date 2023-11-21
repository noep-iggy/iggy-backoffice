/* eslint-disable indent */
import {
  Col,
  ErrorMessage,
  InputEdit,
  InputMultilineEdit,
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
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import {
  formatApiErrorMessage,
  formatValidationErrorMessage,
} from '@/services/error';
import { formatDate } from '@/services/utils';
import {
  BillingPlanDto,
  BillingPlanTypeEnum,
  UpdateAffiliateApi,
  UpdateBillingPlanApi,
} from '@/types';
import { billingPlanValidation } from '@/validations';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DetailBillingPlanPageProps {
  type: BillingPlanTypeEnum;
}

export function DetailBillingPlanPage(
  props: DetailBillingPlanPageProps
): React.JSX.Element {
  const { type } = props;
  const { t } = useTranslation();
  const [billingPlan, setBillingPlan] = useState<BillingPlanDto>();
  const [errorApi, setErrorApi] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    watch,
  } = useForm<UpdateBillingPlanApi>({
    resolver: yupResolver(billingPlanValidation.update),
    values: {
      title: billingPlan?.title,
      description: billingPlan?.description,
      price: billingPlan?.price,
    },
  });

  async function fetchBillingPlan() {
    const billingPlan = await ApiService.billingPlans.getOneByType(type);
    setBillingPlan(billingPlan);
  }

  useEffect(() => {
    fetchBillingPlan();
  }, []);

  async function onSubmit(data: UpdateAffiliateApi) {
    try {
      if (!billingPlan) return;
      await ApiService.billingPlans.updateOneByType(billingPlan.type, {
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
    <Layout selected={ROUTES.billingPlans.list}>
      <BackDetailPage onClick={() => router.push(ROUTES.billingPlans.list)}>
        <ArrowLeftIcon className='w-4 mr-1' />
        <LabelRowInfosDetailPage>{t('generics.back')}</LabelRowInfosDetailPage>
      </BackDetailPage>
      <DetailPage>
        <TitleDetailPage className='mt-5'>
          {t('billingPlans.detail.title')}
        </TitleDetailPage>
        {billingPlan ? (
          <>
            <FormDetailPage onSubmit={handleSubmit(onSubmit)}>
              <InputEdit
                label={t('fields.title.label')}
                value={watch('title')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.title?.message}
                placeholder={t('fields.title.placeholder')}
                register={register('title')}
                defaultValue={billingPlan.title}
              />
              <InputMultilineEdit
                value={watch('description')}
                label={t('fields.description.label')}
                defaultValue={billingPlan.description}
                register={register('description')}
                placeholder={t('fields.description.placeholder')}
                onHandleSubmit={handleSubmit(onSubmit)}
                error={errors.description?.message}
              />

              <InputNumberEdit
                value={watch('price') as unknown as string}
                label={t('fields.price.label')}
                defaultValue={billingPlan.price + '€'}
                register={register('price')}
                placeholder={t('fields.price.placeholder')}
                error={errors.price?.message}
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
              {t('billingPlans.detail.general.title')}
            </TitleDetailPage>
            <InfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('billingPlans.detail.general.id')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {billingPlan.id}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('billingPlans.detail.general.createAt')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {formatDate(billingPlan.createdAt)}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
              <RowInfosDetailPage>
                <LabelRowInfosDetailPage>
                  {t('billingPlans.detail.general.updateAt')}
                </LabelRowInfosDetailPage>
                <ValueRowInfosDetailPage>
                  {formatDate(billingPlan.updatedAt)}
                </ValueRowInfosDetailPage>
              </RowInfosDetailPage>
            </InfosDetailPage>
            <TitleDetailPage>
              {t('billingPlans.detail.actions')}
            </TitleDetailPage>
            <InfosDetailPage className='border-red-300'>
              <RowInfosDetailPage>
                <Col className='w-1/2'>
                  <LabelRowInfosDetailPage>
                    {t('billingPlans.detail.delete.title')}
                  </LabelRowInfosDetailPage>
                  <ValueRowInfosDetailPage className='mt-1'>
                    {t('billingPlans.detail.delete.ifDelete')}
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
        description={t('billingPlans.detail.delete.content')}
        name={`${billingPlan?.title}` ?? ''}
        onDelete={async () => {
          if (!billingPlan) return;
          await ApiService.billingPlans.deleteOneByType(billingPlan.type);
          router.push(ROUTES.billingPlans.list);
        }}
      />
    </Layout>
  );
}
