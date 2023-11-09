import { Loader } from '@/components/Loaders';
import tw from 'tailwind-styled-components';

interface ButtonLoaderProps {
  loaderClassName?: string;
}

export function ButtonLoader(props: ButtonLoaderProps): React.JSX.Element {
  const { loaderClassName } = props;
  return (
    <LoaderContainer>
      <Loader className={loaderClassName} />
    </LoaderContainer>
  );
}

const LoaderContainer = tw.div`
  absolute
  top-0
  left-0
  w-full
  h-full
  grid
  justify-center
  content-center
`;
