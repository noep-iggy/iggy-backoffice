import { ButtonPrimary, Col, ErrorMessage, H3, InputEdit, InputImageEdit, Layout, P14 } from '@/components';
import { useAuthContext } from '@/contexts';
import { ApiService } from '@/services/apiService';
import {
  formatApiErrorMessage,
  formatValidationErrorMessage,
} from '@/services/error';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { UpdateUserApi } from '@/types';
import { userValidation } from '../../../../validations';
import { ROUTES } from '@/routing';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export function UserDetailPage(): React.JSX.Element {
  const { t } = useTranslation();
  const { currentUser,removeToken } = useAuthContext();
  const [errorApi, setErrorApi] = useState<string>('');

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    getValues,
  } = useForm<UpdateUserApi>({
    resolver: yupResolver(userValidation.update),
  });

  async function onSubmit(data: UpdateUserApi) {
    try {
      await ApiService.users.updateMe({
        ...data,
      });
      router.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
    }
  }

  return (
    <Layout selected={ROUTES.user.detail}>
      <Col className='w-full'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <H3>{t('user.detail.general')}</H3>
          <InputImageEdit
            label='Profile picture'
            value={currentUser?.profilePicture}
            onHandleSubmit={handleSubmit(onSubmit)}
            error={errors.profilePicture?.message}
            placeholder={t('fields.profilePicture.placeholder')}
            register={register('profilePicture')}
          />
          <InputEdit
            value={getValues('email')}
            label={t('fields.email.label')}
            defaultValue={currentUser?.email}
            onChange={(e) => {
              register('email');
              return e;
            }}
            placeholder={t('fields.email.placeholder')}
            onHandleSubmit={handleSubmit(onSubmit)}
            error={errors.email?.message}
          />
          <InputEdit
            value={getValues('userName')}
            defaultValue={currentUser?.userName}
            label={t('fields.userName.label')}
            placeholder={t('fields.userName.placeholder')}
            onHandleSubmit={handleSubmit(onSubmit)}
            error={errors.userName?.message}
            register={register('userName')}
          />
          {errorApi && (
            <ErrorMessage className='mt-0.5 w-full' icon>
              {errorApi}
            </ErrorMessage>
          )}
        </Form>
      </Col>
      <ButtonPrimary size='s' className='mt-10' leftIcon={<ArrowRightOnRectangleIcon/>} onClick={()=> removeToken()}>
        <P14>{t('generics.logout')}</P14>
      </ButtonPrimary>
    </Layout>
  );
}



const Form = tw.form` 
  flex
  flex-col
  items-start
  w-2/3
  gap-5
`;
