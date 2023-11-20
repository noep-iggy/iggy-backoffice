import { useTranslation } from 'next-i18next';
import { ErrorMessage } from '../ErrorMessage';
import { InputProps } from './Input';
import {
  IconContainer,
  InputContainer,
  InputStyled,
  LabelStyled,
  MainContainer,
} from './InputCommon';

export interface InputNumberProps extends InputProps {}

export function InputNumber(props: InputNumberProps): JSX.Element {
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
        <InputStyled
          type='number'
          disabled={disabled}
          {...register}
          {...props}
        />
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
