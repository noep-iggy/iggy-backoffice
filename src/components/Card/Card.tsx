import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

interface CardProps {
  children?: ReactNode;
  className?: string;
}

export function Card(props: CardProps): React.JSX.Element {
  const { children, className } = props;

  return <CardStyled className={className}>{children}</CardStyled>;
}

const CardStyled = tw.div`
  p-4
  border
  border-gray-300
  rounded-lg
  transition
  ease-in-out
  w-fit
`;
