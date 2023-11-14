import { ButtonGhost } from '@/components/Button';
import { Col, Row, RowBetween } from '@/components/Helpers';
import { H3, P12, P14 } from '@/components/Texts';
import tw from 'tailwind-styled-components';


export const DetailPage = tw(Col)`
  w-full
  h-full
  ml-4
`;

export const FormDetailPage = tw.form` 
  w-2/3
  mt-5
  border
  p-5
  rounded-md
`;

export const BackDetailPage = tw(Row)`
  cursor-pointer
`

export const TitleDetailPage = tw(H3)`
  mt-10
`;

export const InfosDetailPage = tw(Col)`
  w-2/3
  mt-5
  border
  p-5
  rounded-md
`;

export const RowInfosDetailPage = tw(RowBetween)`
  items-center
  py-5
  first:pt-0
  last:pb-0
  border-t
  first:border-none
`

export const LabelRowInfosDetailPage = tw(P14)`
  font-semibold
`;

export const ValueRowInfosDetailPage = tw(P12)`
  text-gray-500
`;

export const ButtonDeleteDetailPage = tw(ButtonGhost)`
   text-red-600
   hover:bg-red-600
   hover:text-white
`;