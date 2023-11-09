import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { InputCommonEdit, P2Edit } from './InputCommonEdit';
import { InputImage, InputImageProps } from '../Inputs';
import { MediaDto } from '@web-template/types';

interface InputImageEditProps extends InputImageProps {
  onHandleSubmit: (e: React.MouseEvent) => void;
}

export function InputImageEdit(props: InputImageEditProps): JSX.Element {
  const { className, label, value, onHandleSubmit, register, placeholder } =
    props;
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState<MediaDto>();

  useEffect(() => {
    if (newImage) {
      register?.onChange({
        target: {
          name: register.name,
          value: newImage.id,
        },
      });
    }
  }, [newImage]);

  return (
    <InputCommonEdit
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
        <InputImage name='profilePicture' onChange={setNewImage} {...props} />
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
