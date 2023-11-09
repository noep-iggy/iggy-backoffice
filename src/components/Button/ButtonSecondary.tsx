import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseText,
} from './internal/ButtonBase';

export interface ButtonSecondaryProps extends ButtonBaseProps {}

export function ButtonSecondary(
  props: ButtonSecondaryProps
): React.JSX.Element {
  const { children, isLoading, ...remainingProps } = props;

  return (
    <ButtonSecondaryStyled
      loaderClassName='fill-blue-700'
      isLoading={isLoading}
      {...remainingProps}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonSecondaryStyled>
  );
}

const ButtonSecondaryStyled = tw(ButtonBase)`
  bg-primary-200
  text-primary-600
  hover:bg-primary-100
  disabled:bg-primary-50
  disabled:text-primary-200
`;
