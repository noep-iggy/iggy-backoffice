import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import {
  IconContainer,
  InputContainer,
  InputStyled,
  LabelStyled,
  MainContainer,
} from './InputCommon';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import { useTranslation } from 'next-i18next';

interface InputPasswordProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  hasError?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
}

export function InputPassword(props: InputPasswordProps): JSX.Element {
  const { icon, disabled = false, hasError = false, error, register } = props;
  const [isShowing, setIsShowing] = useState(false);
  const { t } = useTranslation();

  function toggleIsShowing() {
    if (!disabled) {
      setIsShowing(!isShowing);
    }
  }

  return (
    <MainContainer>
      {props.label && <LabelStyled>{props.label}</LabelStyled>}
      <InputContainer $disabled={disabled} $hasError={hasError}>
        {!!icon && <IconContainer className='ml-2.5'>{icon}</IconContainer>}
        <InputStyled
          type={isShowing ? 'text' : 'password'}
          {...register}
          {...props}
        />
        <div onClick={() => toggleIsShowing()}>
          {isShowing ? (
            <IconContainer className='mr-2.5 cursor-pointer'>
              <EyeIcon />
            </IconContainer>
          ) : (
            <IconContainer className='mr-2.5 cursor-pointer'>
              <EyeSlashIcon />
            </IconContainer>
          )}
        </div>
      </InputContainer>
      {error && (
        <ErrorMessage className='mt-0.5' icon>
          {t(error)}
        </ErrorMessage>
      )}
    </MainContainer>
  );
}
