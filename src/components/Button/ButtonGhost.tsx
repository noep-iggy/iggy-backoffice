import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseText,
} from './internal/ButtonBase';

export interface ButtonGhostProps extends ButtonBaseProps {
  outlined?: boolean;
}

export function ButtonGhost(props: ButtonGhostProps): React.JSX.Element {
  const { children, isLoading, outlined, ...remainingProps } = props;

  return (
    <ButtonGhostStyled
      loaderClassName='fill-blue-700'
      isLoading={isLoading}
      $outlined={outlined}
      {...remainingProps}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonGhostStyled>
  );
}

interface ButtonGhostStyleProps {
  $outlined?: boolean;
}


const ButtonGhostStyled = tw(ButtonBase)<ButtonGhostStyleProps>`
  text-gray-700
  bg-gray-50
  hover:bg-gray-200
  hover:text-gray-800
  disabled:bg-gray-25
  disabled:text-gray-300
  hover:shadow-none
  ${({ $outlined }) => ($outlined && 'border border-gray-300')}
`;
