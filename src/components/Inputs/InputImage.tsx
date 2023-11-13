/* eslint-disable indent */
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import { MediaDto } from '@web-template/types';
import { ErrorMessage } from '../ErrorMessage';
import { P12 } from '../Texts';
import { LabelStyled } from './InputCommon';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ApiService } from '@/services/api/userService';
import { formatApiErrorMessage } from '@/services/error';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputImageProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  onChange?: (file: MediaDto) => void;
  value?: MediaDto;
  accept?: string;
  label?: string;
  classNameInput?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

export function InputImage(props: InputImageProps): JSX.Element {
  const {
    accept = 'image/*',
    label,
    className,
    classNameInput,
    placeholder,
    value,
    error,
    onChange,
  } = props;
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [, setIsLoading] = useState(false);
  const [media, setMedia] = useState<MediaDto | null>(value ?? null);
  const [inputHover, setInputHover] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.value) {
      setMedia(props.value);
    }
  }, [value]);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.[0]) {
      if (e.target.files[0].size > 10000000) {
        setErrorMessage(t('errors.forms.size'));
      } else {
        setErrorMessage('');
        onImageUpload(e.target.files[0]);
      }
    }
  };

  async function onImageUpload(file: File) {
    try {
      setIsLoading(true);
      const fileUpload = await ApiService.media.upload(file);
      setMedia(fileUpload);
      onChange?.(fileUpload);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorMessage(formatApiErrorMessage(e?.data?.message, t));
      setIsLoading(false);
      return 'Failed';
    }
  }

  return (
    <Container className={className}>
      {label && <LabelStyled>{label}</LabelStyled>}
      <input
        type='file'
        className='hidden'
        ref={inputRef}
        onChange={handleImageChange}
        multiple={false}
        accept={accept}
        name='profilePicture'
      />
      <AddImage
        onMouseEnter={() => setInputHover(true)}
        onMouseLeave={() => setInputHover(false)}
        onClick={handleUploadClick}
        className={classNameInput}
      >
        {media ? (
          <Image src={media.url} alt={media?.filename} />
        ) : (
          <ChooseFile>
            <PlusIcon className='w-5 text-gray-400' />
            <P12 className='text-center text-gray-400'>
              {placeholder ?? t('fields.generics.chooseImage')}
            </P12>
          </ChooseFile>
        )}
        {inputHover && (
          <ChooseFile className='absolute z-50 opacity-70'>
            <PlusIcon className='w-5 text-gray-600' />
            <P12 className='text-center text-gray-600'>
              {placeholder ?? t('fields.generics.chooseImage')}
            </P12>
          </ChooseFile>
        )}
      </AddImage>
      {errorMessage && (
        <ErrorMessage className='mt-0.5' icon>
          {errorMessage}
        </ErrorMessage>
      )}
      {error && (
        <ErrorMessage className='mt-0.5' icon>
          {t(error)}
        </ErrorMessage>
      )}
    </Container>
  );
}

const Image = tw.img`
  object-cover
  w-full
  h-full
`;

const Container = tw.div`
  flex
  flex-col
  items-center
  align-center
`;

const AddImage = tw.a`
    relative
  overflow-hidden
  flex
  items-center
  justify-center
  flex-col
  w-30
  h-30
  rounded-full
  transition 
  duration-150 
  ease-in-out 
  bg-white 
  border
  border-gray-300
  shadow-sm 
  cursor-pointer
`;

const ChooseFile = tw.div`
    w-full 
    h-full
    flex
    items-center
    justify-center
    bg-gray-100
    flex-col
`;
