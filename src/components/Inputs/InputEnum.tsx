import { OptionDescriptor } from '@/types';
import tw from 'tailwind-styled-components';
import { LabelStyled, MainContainer } from './InputCommon';
import { useTranslation } from 'next-i18next';
import { ErrorMessage } from '../ErrorMessage';
import { P12 } from '../Texts';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputEnumProps extends React.HTMLProps<HTMLInputElement> {
  options: OptionDescriptor[];
  error?: string;
  register?: UseFormRegisterReturn;
  className?: string;
  inputContainerClassName?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
}

export function InputEnum(props: InputEnumProps): JSX.Element {
  const { className, options, value, error, register, inputContainerClassName,} = props;
  const { t } = useTranslation();


  return <MainContainer className={className}>
    {props.label && <LabelStyled>{props.label}</LabelStyled>}
    <ItemsContainer className={inputContainerClassName}>
      {options.map((option) => (
        <Item
          htmlFor={option.value}
          key={option.value}
          $isSelected={value === option.value}
        >
          <input
            {...register}
            className='hidden'
            type='radio'
            id={option.value}
            value={option.value}
          />
          <P12>{t(option.label)}</P12>
        </Item>
      ))}
    </ItemsContainer>
    {error && (
      <ErrorMessage className='mt-0.5' icon>
        {t(error)}
      </ErrorMessage>
    )}
  </MainContainer>;
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
  ${({ $isSelected }) => ($isSelected ? 'text-primary border-primary bg-primary-100' : 'text-gray-400')}
`;

