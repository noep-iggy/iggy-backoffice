import { InputEnum, InputEnumProps } from '@/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { EditButton, InputCommonEdit, P2Edit } from './InputCommonEdit';

interface InputEnumEditProps extends InputEnumProps {
  onHandleSubmit: (e: React.MouseEvent) => void;
  isLoading?: boolean;
}

export function InputEnumEdit(props: InputEnumEditProps): JSX.Element {
  const {
    className,
    label,
    placeholder,
    isLoading,
    onHandleSubmit,
    defaultValue,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  return (
    <InputCommonEdit
      isLoading={isLoading}
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
            {defaultValue && defaultValue !== ''
              ? t(`enums.${props.register?.name}.${defaultValue}`)
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
        <InputEnum {...props} />
      )}
    </InputCommonEdit>
  );
}
