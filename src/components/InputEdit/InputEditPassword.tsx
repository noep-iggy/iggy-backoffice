import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { EditButton, InputCommonEdit, P2Edit } from './InputCommonEdit';
import { Input } from '../Inputs';

interface InputEditPasswordProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  className?: string;
  value?: string;
  disabled?: boolean;
  left?: JSX.Element;
  right?: JSX.Element;
  hasError?: boolean;
  inputContainerClassName?: string;
  onChange?: (value: string) => void;
}

export function InputEditPassword(props: InputEditPasswordProps): JSX.Element {
  const { className, label, value, onChange, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.value);
  const { t } = useTranslation();
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value]);

  function onHandleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setIsEditing(false);
    onChange?.(text ?? '');
  }

  return (
    <InputCommonEdit
      isEditing={isEditing}
      label={label}
      onHandleSubmit={onHandleSubmit}
      onEdit={() => setIsEditing(true)}
      onCancel={() => {
        setIsEditing(false);
        setText(value);
      }}
      isAdd={false}
      className={className}
    >
      {!isEditing ? (
        <div className='flex-col'>
          <P2Edit $isOpen={isEllipsisOpen} $isEmpty={!value || value === ''}>
            {t(`fields.generics.${label}.value`)}
          </P2Edit>
          {text && text?.length > 130 && (
            <EditButton
              className='mt-2 ml-0'
              onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}
            >
              {isEllipsisOpen ? t('generics.seeLess') : t('generics.seeMore')}
            </EditButton>
          )}
        </div>
      ) : (
        <Input
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder={t(`fields.generics.${label}.placeholder`)}
          {...rest}
        />
      )}
    </InputCommonEdit>
  );
}
