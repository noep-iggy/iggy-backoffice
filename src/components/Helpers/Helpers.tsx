import { PencilIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import tw from 'tailwind-styled-components';
import { P18 } from '../Texts';

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


export const Table = tw.div`
  grid
  gap-4
  px-4
  py-4
`;

export const TableHeader = tw(Table)`
  bg-primary
  rounded-t-lg
  w-full
`;

export const TableRow = tw(Table)`
  w-full
  cursor-pointer
  hover:bg-gray-100
  transition
  duration-200
  ease-in-out
  border-b
  border-gray-300
`;

export const Cellule = tw(P18) <{ $isFocus?: boolean }>`
  col-span-1
  flex
  items-center
  justify-start
  text-gray-600
  transition
  duration-200
  ease-in-out
  opacity-60
  ${({ $isFocus }) =>
    $isFocus &&
    `
    opacity-100
  `}
`;

export const TableHeaderItem = tw(Cellule) <{ $isFocus?: boolean }>`
  font-bold
  text-gray-100
  cursor-pointer
  hover:text-gray-200
`;

export const EditIconStyled = tw(PencilIcon)`
  h-5
  w-5
  text-gray-500
`;

export const ArrowsUpDownStyled = tw(ArrowDownIcon) <{ $direction?: boolean }>`
  h-5
  w-5
  transition
  duration-200
  ease-in-out
  ml-1
  ${({ $direction }) =>
    $direction &&
    `
    rotate-180
  `}
`;