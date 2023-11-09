import { RowCenter, P14 } from '@/components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import tw from 'tailwind-styled-components';
import { ProgressBar } from '@/components/ProgressBar';
import { useState } from 'react';

interface StepperProps {
  className?: string;
  currentIndex: number;
  length: number;
  onPrev?: () => void;
}

export function Stepper(props: StepperProps): JSX.Element {
  const { className, currentIndex, length, onPrev } = props;
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState(false);

  return (
    <Main className={className}>
      <LinearProgress
        value={(Number(currentIndex + 1) / Number(length)) * 100}
        barClassName='rounded-none bg-primary-500'
      />
      <RowCenter
        onMouseEnter={() => setIsHover(currentIndex !== 0)}
        onMouseLeave={() => setIsHover(false)}
        className={`gap-1 w-fit ${currentIndex !== 0 && 'cursor-pointer'}`}
        onClick={onPrev}
      >
        {currentIndex !== 0 && (
          <ArrowLeftIcon className='w-4 h-4 text-gray-300' />
        )}
        <P14
          className={`font-medium text-gray-300 transition ${
            isHover && 'text-gray-500'
          }`}
        >{`${t('generics.step')} ${currentIndex + 1}/${length}`}</P14>
      </RowCenter>
    </Main>
  );
}

const Main = tw.div`
  w-full
`;

const LinearProgress = tw(ProgressBar)`
  rounded-none
  h-1
  bg-gray-50
  mb-3
`;
