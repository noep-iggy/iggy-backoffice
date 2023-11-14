import tw from 'tailwind-styled-components';
import LoaderAnimation from '@public/animations/loader.json';
import Lottie from 'lottie-react';

interface PageLoaderProps {
  className?: string;
  isLoaded?: boolean;
}

export function PageLoader(props: PageLoaderProps): JSX.Element {
  const {  className, isLoaded } = props;

  return <Loader $isLoaded={isLoaded} className={className}>
    <Lottie animationData={LoaderAnimation} />
  </Loader>;
}


const Loader = tw.div<{ $isLoaded?: boolean }>`
  w-44
  h-44
  transition-all
  duration-500
  ease-in-out
  ${({ $isLoaded }) => ($isLoaded ? 'opacity-0' : 'opacity-100')}
`;
