import classNames from 'classnames';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface ProgressBarProps {
  className?: string;
  barClassName?: string;
  value?: number;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element {
  const { className, value, barClassName } = props;

  if (value === undefined) return <></>;

  return (
    <Main className={className}>
      <Bar $value={value} className={classNames(barClassName)}></Bar>
    </Main>
  );
}

const Main = tw.div`
  w-full
  h-2
  bg-gray-100
  rounded-2xl
`;

interface BarProps {
  $value?: number;
}

const TwBar = tw.div<BarProps>`
  h-full
  bg-primary-700
  rounded-2xl
`;

const Bar = styled(TwBar)<BarProps>`
  ${(props) => `width: ${props.$value}%`}
`;
