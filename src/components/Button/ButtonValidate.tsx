import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseText,
  ButtonBaseProps,
} from './internal/ButtonBase';

export interface ButtonValidateProps extends ButtonBaseProps {}

export function ButtonValidate(props: ButtonValidateProps): React.JSX.Element {
  const { children, isLoading, ...remainingProps } = props;

  return (
    <ButtonValidateStyled
      loaderClassName='fill-cyan-100'
      isLoading={isLoading}
      {...remainingProps}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonValidateStyled>
  );
}

const ButtonValidateStyled = tw(ButtonBase)`
  bg-green-600
  text-white
  hover:bg-green-700
  disabled:bg-green-200
`;
