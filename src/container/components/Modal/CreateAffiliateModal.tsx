import {
  ButtonPrimary,
  ErrorMessage,
  Input,
  InputEnumMulitple,
  InputImage,
  InputMultiline,
  InputNumber,
  Modal,
} from '@/components';
import { ApiService } from '@/services/api';
import {
  formatApiErrorMessage,
  formatValidationErrorMessage,
} from '@/services/error';
import { AnimalTypeEnum, CreateAffiliateApi, MediaDto } from '@/types';
import { affiliateValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';

interface CreateAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAffiliateModal(
  props: CreateAffiliateModalProps
): JSX.Element {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const [errorApi, setErrorApi] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    watch,
    setValue,
  } = useForm<CreateAffiliateApi>({
    resolver: yupResolver(affiliateValidation.create),
    defaultValues: {
      animals: [],
    },
  });

  async function onSubmit(data: CreateAffiliateApi) {
    try {
      setIsLoading(true);
      await ApiService.affiliates.createOne(data);
      setIsLoading(false);
      router.reload();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      title={t('affiliates.create.title')}
      contentClassName='w-[calc(42rem)] h-150'
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputImage
          value={watch('image') as unknown as MediaDto}
          label={t('fields.image.label')}
          error={errors.image?.message}
          placeholder={t('fields.image.placeholder')}
          register={register('image')}
        />
        <Input
          value={watch('title')}
          label={t('fields.title.label')}
          error={errors.title?.message}
          placeholder={t('fields.title.placeholder')}
          register={register('title')}
        />
        <InputMultiline
          value={watch('description')}
          label={t('fields.description.label')}
          register={register('description')}
          placeholder={t('fields.description.placeholder')}
          error={errors.description?.message}
        />
        <Input
          value={watch('brand')}
          label={t('fields.brand.label')}
          register={register('brand')}
          placeholder={t('fields.brand.placeholder')}
          error={errors.brand?.message}
        />
        <Input
          value={watch('url')}
          label={t('fields.url.label')}
          register={register('url')}
          placeholder={t('fields.url.placeholder')}
          error={errors.url?.message}
        />
        <InputEnumMulitple
          options={Object.values(AnimalTypeEnum).map((v) => {
            return {
              label: `enums.type.${v}`,
              value: v,
            };
          })}
          onChange={(v) => setValue('animals', v as AnimalTypeEnum[])}
          value={watch('animals')}
          label={t('fields.animals.label')}
          error={errors.animals?.message}
        />
        <InputNumber
          value={watch('basePrice') as unknown as string}
          label={t('fields.basePrice.label')}
          register={register('basePrice')}
          placeholder={t('fields.basePrice.placeholder')}
          error={errors.basePrice?.message}
          step={0.1}
          min={0}
        />
        <InputNumber
          value={watch('discountPrice') as unknown as string}
          label={t('fields.discountPrice.label')}
          register={register('discountPrice')}
          placeholder={t('fields.discountPrice.placeholder')}
          error={errors.discountPrice?.message}
          step={0.1}
          min={0}
        />
        <ButtonPrimary isLoading={isLoading} type='submit' className='my-4'>
          {t('affiliates.create.title')}
        </ButtonPrimary>
        {errorApi && (
          <ErrorMessage className='mt-0.5 w-full' icon>
            {errorApi}
          </ErrorMessage>
        )}
      </Form>
    </Modal>
  );
}

const Form = tw.form`
  flex flex-col
  gap-2
`;
