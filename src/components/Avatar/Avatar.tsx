import { useTranslation } from 'next-i18next';
import { LegacyRef, forwardRef } from 'react';
import tw from 'tailwind-styled-components';
import { P12 } from '../Texts';

export type AvatarSize = 's' | 'm' | 'l';

export interface AvatarProps {
  className?: string;
  src: string;
  size?: AvatarSize;
  isBordered?: boolean;
  number?: number;
  onClick?: () => void;
}

export const Avatar = forwardRef(function (
  props: AvatarProps,
  ref: LegacyRef<HTMLDivElement>
) {
  const {
    src,
    className,
    size = 'm',
    isBordered = false,
    number,
    onClick,
  } = props;
  const { t } = useTranslation();

  return (
    <Main
      ref={ref}
      className={className}
      onClick={onClick}
      $number={number}
      $isBordered={isBordered}
      $size={size}
      $pointer={onClick !== undefined}
    >
      <ImageStyled $number={number} $isBordered={isBordered} src={src} />
      {number && (
        <NumberDisplay>{`${t('symbols.plus')}${number}`}</NumberDisplay>
      )}
    </Main>
  );
});

Avatar.displayName = 'Avatar';

interface ImageStyledProps {
  $isBordered: boolean;
  $number?: number;
}

interface MainStyledProps {
  $size: AvatarSize;
  $isBordered: boolean;
  $pointer: boolean;
  $number?: number;
}

const Main = tw.div<MainStyledProps>`
  rounded-full
  overflow-hidden
  flex
  items-center
  justify-center
  relative
  ${({ $size }: MainStyledProps) => {
    if ($size === 'l') return 'w-10 h-10 min-w-10 max-w-10 min-h-10 max-h-10';
    if ($size === 'm') return 'w-8 h-8 min-w-8 max-w-8 min-h-8 max-h-8';
    if ($size === 's') return 'w-6 h-6 min-w-6 max-w-6 min-h-6 max-h-6';
  }}
  
  ${({ $isBordered, $number }: MainStyledProps) =>
    $isBordered && !$number ? 'border-2 border-primary-700' : ''}

  ${({ $pointer }: MainStyledProps) => ($pointer ? 'cursor-pointer' : '')}
`;

const ImageStyled = tw.img<ImageStyledProps>`
  bg-white
  rounded-full
  w-full
  h-full
  ${({ $isBordered, $number }: ImageStyledProps) => {
    if ($number) return 'brightness-50';
    if ($isBordered) return 'p-px';
  }}
`;

const NumberDisplay = tw(P12)`
  absolute
  w-full
  text-center
  font-mono
  text-white
  select-none
`;
