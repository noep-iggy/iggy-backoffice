import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseText,
} from './internal/ButtonBase';

export interface ButtonGhostProps extends ButtonBaseProps {}

export function ButtonGhost(props: ButtonGhostProps): React.JSX.Element {
  const { children, isLoading, ...remainingProps } = props;

  return (
    <ButtonGhostStyled
      loaderClassName='fill-blue-700'
      isLoading={isLoading}
      {...remainingProps}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonGhostStyled>
  );
}

const ButtonGhostStyled = tw(ButtonBase)`
  text-gray-700
  bg-gray-50
  hover:bg-gray-200
  hover:text-gray-800
  disabled:bg-gray-25
  disabled:text-gray-300
  border-gray-400
  border
  hover:shadow-none
`;
