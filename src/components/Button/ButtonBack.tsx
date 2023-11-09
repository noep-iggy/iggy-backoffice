import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React from 'react';
import tw from 'tailwind-styled-components';

export interface ButtonBackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ButtonBack(props: ButtonBackProps): React.JSX.Element {
  const { children } = props;

  return (
    <ButtonBackStyled {...props}>
      <ArrowLeftIcon className='w-6 h-6 mr-2' /> {children}
    </ButtonBackStyled>
  );
}

const ButtonBackStyled = tw.button`
  text-center
  font-semibold
  font-sans
  flex flex-row
  hover:text-secondary-500
  disabled:text-gray-800
  transition
`;
