import { Layout } from '@/components';
import LoaderAnimation from '@public/animations/loader.json';
import Lottie from 'lottie-react';
import tw from 'tailwind-styled-components';

interface LoaderProps {
  className?: string;
  isLoaded?: boolean;
  selected: string;
}

export function FullPageLoader(props: LoaderProps): React.JSX.Element {
  const { className, isLoaded, selected } = props;

  return (
    <Layout selected={selected} className={`justify-center items-center ${className}`}>
      <Loader $isLoaded={isLoaded}>
        <Lottie animationData={LoaderAnimation} />
      </Loader>
    </Layout>
  );
}

const Loader = tw.div<{ $isLoaded?: boolean }>`
  w-44
  h-44
  transition-all
  duration-500
  ease-in-out
  ${({ $isLoaded }) => ($isLoaded ? 'opacity-0' : 'opacity-100')}
`;
