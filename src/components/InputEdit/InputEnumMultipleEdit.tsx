/* eslint-disable indent */
import { InputEnumMulitple, InputEnumMulitpleProps } from '@/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { EditButton, InputCommonEdit, P2Edit } from './InputCommonEdit';

interface InputEnumMultipleEditProps extends InputEnumMulitpleProps {
  onHandleSubmit: (e: React.MouseEvent) => void;
  register?: UseFormRegisterReturn;
}

export function InputEnumMultipleEdit(
  props: InputEnumMultipleEditProps
): JSX.Element {
  const { className, label, placeholder, onHandleSubmit, defaultValue } = props;
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  return (
    <InputCommonEdit
      isEditing={isEditing}
      label={label}
      onHandleSubmit={onHandleSubmit}
      onEdit={() => setIsEditing(true)}
      onCancel={() => {
        setIsEditing(false);
      }}
      isAdd={!defaultValue || defaultValue === ''}
      className={className}
    >
      {!isEditing ? (
        <div className='flex-col'>
          <P2Edit
            $isOpen={isEllipsisOpen}
            $isEmpty={!defaultValue || defaultValue === ''}
          >
            {Array.isArray(defaultValue)
              ? defaultValue
                  .map((value: string) => t(`enums.type.${value}`))
                  .join(', ')
              : placeholder}
          </P2Edit>
          {defaultValue && defaultValue.toString()?.length > 130 && (
            <EditButton
              className='mt-2 ml-0'
              onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}
            >
              {isEllipsisOpen ? t('generics.seeLess') : t('generics.seeMore')}
            </EditButton>
          )}
        </div>
      ) : (
        <InputEnumMulitple {...props} />
      )}
    </InputCommonEdit>
  );
}
