import tw from 'tailwind-styled-components';
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseText,
  ButtonSize,
} from './internal/ButtonBase';

export type ButtonLinkVariant = 'primary' | 'alert' | 'black';

export interface ButtonLinkProps extends ButtonBaseProps {
  variant?: ButtonLinkVariant;
}

export function ButtonLink(props: ButtonLinkProps): React.JSX.Element {
  const { children, isLoading, variant = 'primary', size = 'm' } = props;

  return (
    <ButtonLinkStyled
      $size={size}
      $variant={variant}
      isLoading={isLoading}
      {...props}
    >
      <ButtonBaseText $isLoading={isLoading ?? false}>
        {children}
      </ButtonBaseText>
    </ButtonLinkStyled>
  );
}

interface ButtonLinkStyleProps {
  $variant: ButtonLinkVariant;
  $size: ButtonSize;
}

const ButtonLinkStyled = tw(ButtonBase)<ButtonLinkStyleProps>`
  normal-case
  px-0
  max-h-fit
  min-h-fit
  h-fit
  max-w-fit
  min-w-fit
  w-fit
  hover:shadow-none

  ${({ $variant }: ButtonLinkStyleProps) => {
    if ($variant === 'primary')
      return `
        text-primary-600
        hover:text-primary-800
        disabled:text-primary-300
      `;
    if ($variant === 'alert')
      return `
        text-red-600
        hover:text-red-700
        disabled:text-red-300
      `;
    if ($variant === 'black')
      return `
        text-gray-900
        hover:text-gray-600
        disabled:text-gray-300
      `;
  }}
`;
