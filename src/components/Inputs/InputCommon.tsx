import { Col, Row, RowBetween } from '@/components/Helpers';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { ButtonGhost } from '../Button';
import { P14 } from '../Texts';

export interface InputContainerProps {
  $disabled: boolean;
  $hasError: boolean;
  $filled?: boolean;
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

export const LabelRow = tw(Row)`
  items-center
  gap-1.5
  mb-1.5
`;

interface IncrementContainer extends InputContainerProps {}

export const IncrementContainer = tw(Col)<IncrementContainer>`
  h-full
  w-7.5
  border-l
  transition
  
  overflow-hidden
  rounded-tr-lg
  rounded-br-lg
  relative

  after:content-['']
  after:w-full
  after:h-px
  after:absolute
  after:transition
  after:top-[19px]
  after:left-0
  z-10

  ${({ $filled, $hasError }: IncrementContainer) => {
    if ($hasError)
      return 'after:bg-error-300 border-error-300 group-hover/input:after:bg-error-600 group-hover/input:border-error-600';
    if ($filled)
      return 'border-gray-300 after:bg-gray-300 group-hover/input:border-gray-400 group-hover/input:after:bg-gray-400';
    if (!$filled) return 'after:bg-gray-300 border-gray-300';
  }}
`;

export const ChevronContainer = tw(ButtonGhost)`
  w-full
  max-h-[50%]
  min-h-[50%]
  p-0
  rounded-none
  text-gray-600
`;

export const ChevronUpIconStyled = tw(ChevronUpIcon)`
  w-3 
  h-3
`;

export const ChevronDownIconStyled = tw(ChevronDownIcon)`
  w-3 
  h-3
`;

export const NumberInputStyled = tw(InputStyled)`
  [-moz-appearance:_textfield]
  [&::-webkit-outer-spin-button]:m-0
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:m-0
  [&::-webkit-inner-spin-button]:appearance-none
`;
