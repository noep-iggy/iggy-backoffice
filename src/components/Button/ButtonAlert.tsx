import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseText,
} from './internal/ButtonBase';

export interface ButtonAlertProps extends ButtonBaseProps {}

export function ButtonAlert(props: ButtonAlertProps): React.JSX.Element {
  const { children, isLoading, ...remainingProps } = props;

  return (
    <ButtonAlertStyled
      loaderClassName='fill-cyan-100'
      isLoading={isLoading}
      {...remainingProps}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonAlertStyled>
  );
}

const ButtonAlertStyled = tw(ButtonBase)`
  bg-red-600
  text-white
  hover:bg-red-700
  disabled:bg-red-200
`;
