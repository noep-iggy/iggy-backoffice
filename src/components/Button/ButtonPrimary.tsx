import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseText,
} from './internal/ButtonBase';

export interface ButtonPrimaryProps extends ButtonBaseProps {}

export function ButtonPrimary(props: ButtonPrimaryProps): React.JSX.Element {
  const { children, isLoading, ...remainingProps } = props;

  return (
    <ButtonPrimaryStyled
      loaderClassName='fill-cyan-100'
      isLoading={isLoading}
      {...remainingProps}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonPrimaryStyled>
  );
}

const ButtonPrimaryStyled = tw(ButtonBase)`
  text-white
  bg-primary-600
  hover:bg-primary-500
  disabled:text-white
  disabled:bg-primary-100
`;
