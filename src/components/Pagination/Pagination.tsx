import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import tw from 'tailwind-styled-components';
import { RowCenter } from '../Helpers';
import { P18 } from '../Texts';

interface PaginationProps {
  className?: string;
  page: number;
  setPage: (page: number) => void;
}

export function Pagination(props: PaginationProps): JSX.Element {
  const { className, page, setPage } = props;

  return (
    <RowCenter className={`justify-center w-full ${className}`}>
      <Icon
        className='mr-2'
        $disabled={page < 5}
        onClick={() => page >= 5 && setPage(page - 5)}
      >
        <ChevronDoubleLeftIcon />
      </Icon>
      <Icon
        className='ml-2'
        $disabled={page < 1}
        onClick={() => page >= 1 && setPage(page - 1)}
      >
        <ChevronLeftIcon />
      </Icon>
      <CurrentPage>{page + 1}</CurrentPage>
      <Icon className='mr-2' onClick={() => setPage(page + 1)}>
        <ChevronRightIcon />
      </Icon>
      <Icon className='ml-2' onClick={() => setPage(page + 5)}>
        <ChevronDoubleRightIcon />
      </Icon>
    </RowCenter>
  );
}

const CurrentPage = tw(P18)`
  mx-2
  px-2
  text-gray-800
  cursor-default
`;

const Icon = tw.div<{ $disabled?: boolean }>`
  w-5
  h-5
  cursor-pointer
  transition
  duration-200
  ease-in-out
  ${({ $disabled }) =>
    $disabled
      ? 'text-gray-300 cursor-not-allowed'
      : 'text-gray-800 hover:text-gray-900'}
`;
