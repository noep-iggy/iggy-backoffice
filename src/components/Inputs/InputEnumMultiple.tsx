import { OptionDescriptor } from '@/types';
import { useTranslation } from 'next-i18next';
import tw from 'tailwind-styled-components';
import { ErrorMessage } from '../ErrorMessage';
import { P12 } from '../Texts';
import { LabelStyled, MainContainer } from './InputCommon';

export interface InputEnumMulitpleProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  options: OptionDescriptor[];
  error?: string;
  className?: string;
  inputContainerClassName?: string;
  value: string[];
  disabled?: boolean;
  label?: string;
  onChange: (value: string[]) => void;
}

export function InputEnumMulitple(props: InputEnumMulitpleProps): JSX.Element {
  const {
    className,
    options,
    onChange,
    value,
    error,
    inputContainerClassName,
  } = props;
  const { t } = useTranslation();

  function handleOnChange(newValue: string) {
    if (value.includes(newValue)) {
      onChange(value.filter((v) => v !== newValue));
    } else {
      onChange([...value, newValue]);
    }
  }

  return (
    <MainContainer className={className}>
      {props.label && <LabelStyled>{props.label}</LabelStyled>}
      <ItemsContainer className={inputContainerClassName}>
        {options.map((option) => (
          <Item
            key={option.value}
            $isSelected={value.includes(option.value)}
            onClick={() => handleOnChange(option.value)}
          >
            <P12>{t(option.label)}</P12>
          </Item>
        ))}
      </ItemsContainer>
      {error && (
        <ErrorMessage className='mt-0.5' icon>
          {t(error)}
        </ErrorMessage>
      )}
    </MainContainer>
  );
}

const ItemsContainer = tw.div`
  w-full
  flex
  flex-row
  items-center
  justify-start
  flex-wrap
  gap-2
`;

const Item = tw.label<{ $isSelected: boolean }>`
  cursor-pointer
  transition-all
  duration-300
  ease-in-out
  border
  rounded-md
  px-2
  py-1
  ${({ $isSelected }) =>
    $isSelected
      ? 'text-primary border-primary bg-primary-100'
      : 'text-gray-400'}
`;
