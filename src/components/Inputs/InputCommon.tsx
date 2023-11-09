import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { P14 } from '../Texts';
import { Col, RowBetween } from '@/components/Helpers';

export interface InputContainerProps {
  $disabled: boolean;
  $hasError: boolean;
}

export const MainContainer = tw(Col)`
  w-full
`;

export const InputContainer = tw(RowBetween)<InputContainerProps>`
  w-full
  rounded-lg
  border
  bg-white
  transition
  relative
  items-center
  justify-between
  h-10
  max-h-10
  border-gray-300
  group

  ${({ $disabled }: InputContainerProps) => {
    if ($disabled) return 'bg-gray-25';
    if (!$disabled) return 'hover:border-gray-600';
  }}

  ${({ $hasError }: InputContainerProps) => {
    if ($hasError) return 'border-error-300 hover:border-error-600';
  }}
`;

export const IconContainer = styled.div`
  z-index: 1;
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const InputStyled = tw.input`
  text-xs
  placeholder-gray-400
  text-gray-900
  px-2.5
  outline-none
  border-none
  focus:ring-0
  w-full
  h-full
  bg-transparent
  disabled:cursor-not-allowed
`;

export const LabelStyled = tw(P14)`
  mb-1
  font-semibold
`;
