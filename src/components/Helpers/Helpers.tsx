import {
  ArrowDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import tw from 'tailwind-styled-components';
import { P14 } from '../Texts';

export const Grid1 = tw.div`
  grid grid-cols-1 gap-y-5 md:gap-5 w-full
`;

export const Grid2 = tw.div`
  grid md:grid-cols-2 grid-cols-1 gap-y-5  md:gap-5 w-full
`;

export const Grid3 = tw.div`
  grid md:grid-cols-3 grid-cols-1 gap-y-5 md:gap-5 w-full
`;

export const GridCol1 = tw.div`
  col-span-1
`;

export const GridCol2 = tw.div`
  col-span-2
`;

export const GridCol3 = tw.div`
  col-span-3
`;

export const Flex = tw.div`
  flex
`;

export const Col = tw(Flex)`
  flex-col
`;

export const ColCenter = tw(Col)`
  items-center
  w-full
`;

export const ColJustifyCenter = tw(Col)`
  justify-center
  h-full
`;

export const Row = tw(Flex)`
  flex-row
`;

export const RowCenter = tw(Row)`
  items-center
`;

export const RowBetween = tw(Row)`
  justify-between
`;

// TABLE

export function renderBoolean(value: boolean) {
  return value ? <CheckIconStyled /> : <XMarkIconStyled />;
}

export const Table = tw.div`
  grid
  gap-4
  px-4
  py-4
`;

export const TableHeader = tw(Table)`
  bg-gray-50
  w-full
  rounded-lg
  border
  border-gray-300
`;

export const TableRow = tw(Table)`
  w-full
  cursor-pointer
  hover:bg-gray-100
  transition
  duration-200
  ease-in-out
  border-b
  py-2
`;

export const Cellule = tw(P14)<{ $isFocus?: boolean; $isEnum?: boolean }>`
  col-span-1
  flex
  items-center
  justify-start
  text-gray-900
  transition
  duration-200
  ease-in-out
  opacity-50
  ${({ $isFocus }) =>
    $isFocus &&
    `
    opacity-100
  `}
  ${({ $isEnum }) =>
    $isEnum && 'rounded-lg border border-gray-700 w-fit px-2 py-1'}
`;

export const TableHeaderItem = tw(Cellule)<{ $isFocus?: boolean }>`
  font-bold
  text-black
  cursor-pointer
  hover:opacity-80
`;

export const ArrowsUpDownStyled = tw(ArrowDownIcon)<{
  $direction?: boolean;
  $isFocus?: boolean;
}>`
  h-5
  w-5
  transition
  duration-200
  ease-in-out
  ml-1
  ${({ $direction, $isFocus }) =>
    $direction &&
    $isFocus &&
    `
    rotate-180
  `}
`;

export const CheckIconStyled = tw(CheckIcon)`
  h-5
  w-5
  text-green-500
`;

export const XMarkIconStyled = tw(XMarkIcon)`
  h-5
  w-5
  text-red-500
`;
