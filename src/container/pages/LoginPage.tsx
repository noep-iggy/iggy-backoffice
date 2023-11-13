import { ButtonPrimary, Card, ErrorMessage, H4, Input, InputPassword } from '@/components';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/routing';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useForm } from 'react-hook-form';
import {
  formatApiErrorMessage,
  formatValidationErrorMessage,
} from '@/services/error';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthLoginApi } from '@/types';
import { userValidation } from '@/validations';
import { ApiService } from '@/services/api';

export default function LoginPage(): React.JSX.Element {
  const { t } = useTranslation();
  const { currentUser, setToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState<string>('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthLoginApi>({
    resolver: yupResolver(userValidation.login),
  });

  useEffect(() => {
    if (!currentUser) return;
    router.push(ROUTES.home);
  }, [currentUser]);

  async function onSubmit(data: AuthLoginApi) {
    try {
      setIsLoading(true);
      const token = await ApiService.auth.login(data);
      setToken(token);
      setIsLoading(false);
      router.push(ROUTES.home);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorApi(formatApiErrorMessage(e?.data?.message, t));
      formatValidationErrorMessage(e?.data?.message, setError);
      setIsLoading(false);
    }
  }

  return (
    <Main>
      <CardStyled>
        <H4 className='mb-6 text-center login-title'>
          {process.env.NEXT_PUBLIC_DEFAULT_META_TITLE}
        </H4>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t('fields.email.label')}
            placeholder={t('fields.email.placeholder')}
            register={register('email')}
            error={errors.email?.message}
          />
          <InputPassword
            label={t('fields.password.label')}
            placeholder={t('fields.password.placeholder')}
            register={register('password')}
            error={errors.password?.message}
          />
          <ButtonPrimary isLoading={isLoading} className='mt-6' type='submit'>
            {t('generics.login')}
          </ButtonPrimary>
          {errorApi && (
            <ErrorMessage className='mt-0.5' icon>
              {errorApi}
            </ErrorMessage>
          )}
        </Form>
      </CardStyled>
      <Background src='/images/splash.png' alt='header' />
    </Main>
  );
}

const Main = tw.div`
  px-4
  h-screen
  w-screen
  flex
  justify-center
  items-center
  font-sans
`;

const Background = tw.img`
  absolute
  top-0
  right-0
  w-full
  h-full
  object-cover
  object-center
  opacity-70
`;

const CardStyled = tw(Card)`
  bg-white
  border-none
  py-12
  px-8
  lg:w-2/5
  md:w-3/5
  w-full
  mx-4
  lg:mx-0
  shadow-lg
  transition
  animate-in
  fade-in
  duration-1000
  z-10
`;

const Form = tw.form`
  flex
  flex-col
  items-start
  w-full
  gap-2
`;
