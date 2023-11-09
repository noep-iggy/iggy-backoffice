import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import { LabelStyled } from '../Inputs/InputCommon';
import { P10, P12 } from '../Texts';
import { ButtonGhost, ButtonPrimary } from '@/components/Button';

export interface InputCommonEditProps {
  className?: string;
  isEditing: boolean;
  children: ReactNode;
  label?: string;
  onHandleSubmit: (e: React.MouseEvent) => void;
  isAdd: boolean;
  onCancel: () => void;
  onEdit: () => void;
}

export function InputCommonEdit(props: InputCommonEditProps): JSX.Element {
  const {
    className,
    label,
    children,
    onHandleSubmit,
    isAdd,
    onCancel,
    onEdit,
    isEditing,
  } = props;
  const { t } = useTranslation();

  return (
    <Main className={className}>
      {!isEditing && <Label>{label}</Label>}
      <Row $isEditing={isEditing}>
        <InputContainer>{children}</InputContainer>
        {isEditing ? (
          <ButtonContainer>
            <CancelButton onClick={onCancel}>
              {t('generics.cancel')}
            </CancelButton>
            <ButtonSubmit onClick={onHandleSubmit} type='submit'>
              {t('generics.update')}
            </ButtonSubmit>
          </ButtonContainer>
        ) : (
          <EditButton $isAdd={isAdd} onClick={onEdit}>
            {isAdd ? t('generics.add') : t('generics.update')}
          </EditButton>
        )}
      </Row>
    </Main>
  );
}

const Main = tw.div`
  flex
  flex-col 
  items-start
  justify-center
  w-full
  border-b
  pb-2
  relative
`;

const Label = tw(LabelStyled)`
  mb-0
`;

const Row = tw.div`
  flex
  w-full
  justify-between
  ${(props: { $isEditing: boolean }) =>
    props.$isEditing ? 'flex-col' : 'flex-row'}
`;

const InputContainer = tw.div`
  w-full
  flex-row
  flex
  items-center
  justify-between
bg-white
  md:w-2/3
  lg:w-1/2
`;

export const P2Edit = tw(P12)<{ $isEmpty: boolean; $isOpen: boolean }>`
  w-full
  overflow-hidden
  ${(props: { $isEmpty: boolean }) =>
    props.$isEmpty ? 'text-gray-400 italic' : 'text-black-80'}
  ${(props: { $isOpen: boolean }) =>
    props.$isOpen ? 'max-h-auto' : 'max-h-10'}
`;

export const EditButton = tw(P10)<{ $isAdd?: boolean }>`
  cursor-pointer
  underline
  underline-offset-4
  transition
  duration-300
  ease-in-out
  ml-2
  ${(props: { $isAdd?: boolean }) =>
    props.$isAdd
      ? 'text-red-500 hover:text-red-800'
      : 'text-gray-500 hover:text-gray-800'}
`;

const ButtonContainer = tw.div`
  flex
  flex-row
  items-center
  justify-between
  w-full
  my-2
`;

const CancelButton = tw(ButtonGhost)`
  px-3
  py-1
`;
const ButtonSubmit = tw(ButtonPrimary)`
  px-3
  py-1
`;
