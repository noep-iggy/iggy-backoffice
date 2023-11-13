import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import {
  IconContainer,
  InputContainer,
  InputStyled,
  LabelStyled,
  MainContainer,
} from './InputCommon';
import { useTranslation } from 'next-i18next';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  disabled?: boolean;
  left?: JSX.Element;
  right?: JSX.Element;
  hasError?: boolean;
  inputContainerClassName?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
}

export function Input(props: InputProps): React.JSX.Element {
  const {
    left,
    right,
    disabled = false,
    hasError = false,
    inputContainerClassName,
    error,
    register,
    className,
  } = props;
  const { t } = useTranslation();
  return (
    <MainContainer className={className}>
      {props.label && <LabelStyled>{props.label}</LabelStyled>}
      <InputContainer
        $disabled={disabled}
        $hasError={hasError}
        className={inputContainerClassName}
      >
        {left && <IconContainer className='ml-2.5'>{left}</IconContainer>}
        <InputStyled disabled={disabled} type='text' {...register} {...props} />
        {right && <IconContainer className='mr-2.5'>{right}</IconContainer>}
      </InputContainer>
      {error && (
        <ErrorMessage className='mt-0.5' icon>
          {t(error)}
        </ErrorMessage>
      )}
    </MainContainer>
  );
}
