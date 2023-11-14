import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import tw from 'tailwind-styled-components';
import { P14 } from '../Texts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RowBetween } from '../Helpers';

interface ModalProps extends ReactModal.Props {
  children?: ReactNode;
  contentClassName?: string;
  title?: string;
}

export function Modal(props: ModalProps): React.JSX.Element {
  const { children, contentClassName, title } = props;

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      padding: '0',
      boxShadow:
        '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <ReactModal
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={customStyles}
      {...props}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <RowBetween className='w-full border-b px-4 py-4'>
        <P14 className='font-semibold'>{title}</P14>
        <CloseIcon onClick={props.onRequestClose} />
      </RowBetween>
      <ModalContainer className={contentClassName}>{children}</ModalContainer>
    </ReactModal>
  );
}

const ModalContainer = tw.div`
  flex
  flex-col
  w-full
  p-10
`;

const CloseIcon = tw(XMarkIcon)`
  text-gray-400
  w-5
  cursor-pointer
  hover:text-gray-800
  transition
  duration-300
`;