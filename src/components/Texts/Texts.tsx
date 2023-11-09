import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

interface TextsProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  className?: string;
}

interface LinksProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  className?: string;
  href: string;
  target?: string;
}

export function H1(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <H1Styled className={className} {...textProps}>
      {children}
    </H1Styled>
  );
}

export function H2(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <H2Styled className={className} {...textProps}>
      {children}
    </H2Styled>
  );
}

export function H3(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <H3Styled className={className} {...textProps}>
      {children}
    </H3Styled>
  );
}

export function H4(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <H4Styled className={className} {...textProps}>
      {children}
    </H4Styled>
  );
}

export function P24(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <P24Styled className={className} {...textProps}>
      {children}
    </P24Styled>
  );
}

export function P18(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <P18Styled className={className} {...textProps}>
      {children}
    </P18Styled>
  );
}

export function P14(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <P14Styled className={className} {...textProps}>
      {children}
    </P14Styled>
  );
}

export function P12(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <P12Styled className={className} {...textProps}>
      {children}
    </P12Styled>
  );
}

export function P10(props: TextsProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <P10Styled className={className} {...textProps}>
      {children}
    </P10Styled>
  );
}

export function Link(props: LinksProps): React.JSX.Element {
  const { children, className, ...textProps } = props;
  return (
    <LinkStyled className={className} {...textProps}>
      {children}
    </LinkStyled>
  );
}

const H1Styled = tw.h1`
  text-2xl
  font-mono
  uppercase
`;

const H2Styled = tw.h2`
  text-xl
`;

const H3Styled = tw.h3`
  text-lg
`;

const H4Styled = tw.h4`
  text-[24px]
  font-mono
`;

const P24Styled = tw.p`
  text-[24px]
  font-mono
`;

const P18Styled = tw.p`
  text-base
`;

const P14Styled = tw.p`
  text-sm
`;

const P12Styled = tw.p`
  text-xs
`;

const P10Styled = tw.p`
  text-2xs
`;

const LinkStyled = tw.a`
  text-primary-700
  size-p2
  cursor-pointer
  font-semibold
`;
