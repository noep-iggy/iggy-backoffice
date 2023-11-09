import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import { P12 } from '../Texts';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  children?: ReactNode;
  className?: string;
  icon?: boolean;
}

export function ErrorMessage(props: ErrorMessageProps): React.JSX.Element {
  const { children, className, icon } = props;

  return (
    <Main className={className}>
      {icon && <Icon />}
      <PStyled>{children}</PStyled>
    </Main>
  );
}

const Main = tw.div`
  flex 
  flex-row 
  items-center
`;

const PStyled = tw(P12)`
  text-red-500
`;

const Icon = tw(ExclamationTriangleIcon)`
  w-4 
  h-4 
  mr-2 
  text-red-500
`;
