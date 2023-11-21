import { useTranslation } from 'next-i18next';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { ErrorMessage } from '../ErrorMessage';
import {
  IconContainer,
  InputContainer,
  LabelStyled,
  MainContainer,
} from './InputCommon';

export interface InputMultilineProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  value?: string;
  disabled?: boolean;
  left?: JSX.Element;
  right?: JSX.Element;
  hasError?: boolean;
  inputContainerClassName?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  rows?: number;
}

export function InputMultiline(props: InputMultilineProps): React.JSX.Element {
  const {
    left,
    right,
    disabled = false,
    hasError = false,
    inputContainerClassName,
    error,
    register,
    className,
    rows = 5,
  } = props;
  const { t } = useTranslation();
  return (
    <MainContainer className={className}>
      {props.label && <LabelStyled>{props.label}</LabelStyled>}
      <InputContainerStyled
        $disabled={disabled}
        $hasError={hasError}
        className={inputContainerClassName}
      >
        {left && <IconContainer className='ml-2.5'>{left}</IconContainer>}
        <InputStyled
          disabled={disabled}
          type='text'
          rows={rows}
          {...register}
          {...props}
        />
        {right && <IconContainer className='mr-2.5'>{right}</IconContainer>}
      </InputContainerStyled>
      {error && (
        <ErrorMessage className='mt-0.5' icon>
          {t(error)}
        </ErrorMessage>
      )}
    </MainContainer>
  );
}

const InputContainerStyled = tw(InputContainer)`
  min-h-10
  h-fit
  max-h-fit
`;

const InputStyled = tw.textarea`
  min-h-10
  text-xs
  placeholder-gray-400
  text-gray-900
  p-2.5
  outline-none
  border-none
  focus:ring-0
  w-full
  h-full
  bg-transparent
  disabled:cursor-not-allowed
`;
