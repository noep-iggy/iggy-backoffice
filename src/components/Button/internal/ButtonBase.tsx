/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { ButtonLoader } from './ButtonLoader';

export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  children: React.ReactNode | string;
  loaderClassName?: string;
}

export function ButtonBase(props: ButtonBaseProps): React.JSX.Element {
  const {
    children,
    isLoading,
    leftIcon,
    rightIcon,
    loaderClassName,
    size = 'm',
    iconOnly = false,
    ...buttonProps
  } = props;

  return (
    <Button $size={size} $iconOnly={iconOnly} {...buttonProps}>
      {leftIcon && (
        <IconContainer $size={size} $isLoading={isLoading}>
          {leftIcon}
        </IconContainer>
      )}

      {iconOnly ? (
        <IconContainer $size={size} $isLoading={isLoading}>
          {children}
        </IconContainer>
      ) : (
        children
      )}

      {rightIcon && (
        <IconContainer $size={size} $isLoading={isLoading}>
          {rightIcon}
        </IconContainer>
      )}
      {isLoading && <ButtonLoader loaderClassName={loaderClassName} />}
    </Button>
  );
}

interface ButtonStyleProps {
  $size: ButtonSize;
  $iconOnly: boolean;
}

interface IconContainerProps {
  $size: ButtonSize;
  $isLoading: boolean | undefined;
}

const IconContainer = styled.div<IconContainerProps>`
  opacity: ${({ $isLoading }: IconContainerProps) => ($isLoading ? 0 : 1)};

  svg {
    width: ${({ $size }: IconContainerProps) => {
      if ($size === 's') return '1rem';
      if ($size === 'm') return '1.25rem';
      if ($size === 'l') return '1.5rem';
      return '';
    }};
    height: ${({ $size }: IconContainerProps) => {
      if ($size === 's') return '1rem';
      if ($size === 'm') return '1.25rem';
      if ($size === 'l') return '1.5rem';
      return '';
    }};
  }
`;

const Button = tw.button<ButtonStyleProps>`
  text-center
  font-semibold
  tracking-wide

  relative
  transition
  w-fit
  gap-2
  rounded-lg
  uppercase
  flex
  flex-row
  justify-center
  items-center

  hover:shadow-sm
  active:shadow-none
  disabled:cursor-not-allowed
  
  ${({ $size }: ButtonStyleProps) => {
    if ($size === 's') return 'h-8 max-h-8 min-h-8 text-[12px]';
    if ($size === 'm') return 'h-9 max-h-9 min-h-9 text-[13px]';
    if ($size === 'l') return 'h-11 max-h-11 min-h-11 text-[14px]';
    return '';
  }}
  
  ${({ $size, $iconOnly }: ButtonStyleProps) => {
    if ($size === 's') return $iconOnly ? 'w-8 max-w-8 min-w-8 p-0' : 'px-3';
    if ($size === 'm') return $iconOnly ? 'w-9 max-w-9 min-w-9 p-0' : 'px-4';
    if ($size === 'l') return $iconOnly ? 'w-11 max-w-11 min-w-11 p-0' : 'px-5';
    return '';
  }}
`;

interface ButtonBaseTextProps {
  $isLoading: boolean;
}

export const ButtonBaseText = tw.span<ButtonBaseTextProps>`
  ${({ $isLoading }: ButtonBaseTextProps) => ($isLoading ? 'opacity-0' : '')}
  leading-none
`;
