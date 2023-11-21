import { useState } from 'react';
import tw from 'tailwind-styled-components';
import { InputImage, InputImageProps } from '../Inputs';
import { InputCommonEdit, P2Edit } from './InputCommonEdit';

interface InputImageEditProps extends InputImageProps {
  onHandleSubmit: (e: React.MouseEvent) => void;
  isLoading?: boolean;
}

export function InputImageEdit(props: InputImageEditProps): JSX.Element {
  const { className, label, value, isLoading, onHandleSubmit, placeholder } =
    props;
  const [isEditing, setIsEditing] = useState(false);

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
      isAdd={!value || value.filename === ''}
      className={className}
    >
      {!isEditing ? (
        <P2Edit $isEmpty={!value || value.filename === ''} $isOpen={true}>
          {value && value.filename !== '' ? (
            <Image src={value.url} alt='profile picture' />
          ) : (
            placeholder
          )}
        </P2Edit>
      ) : (
        <InputImage {...props} />
      )}
    </InputCommonEdit>
  );
}

const Image = tw.img`
  object-cover
  scale-125
  w-18
  h-18
  rounded-full
  border
  border-gray-300
  m-3
`;
