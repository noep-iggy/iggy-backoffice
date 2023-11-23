import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import ReactModal from 'react-modal';
import tw from 'tailwind-styled-components';
import { RowBetween } from '../Helpers';
import { P14 } from '../Texts';

interface ModalProps extends Omit<ReactModal.Props, 'children'> {
  children?: React.ReactNode;
  contentClassName?: string;
  title?: string;
}

export function Modal(props: Readonly<ModalProps>): React.JSX.Element {
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
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      {...props}
    >
      <>
        <Header>
          <P14 className='font-semibold'>{title}</P14>
          <CloseIcon onClick={props.onRequestClose} />
        </Header>
        <ModalContainer className={contentClassName}>{children}</ModalContainer>
      </>
    </ReactModal>
  );
}

const Header = tw(RowBetween)`
  fixed
  top-0
  z-10
  items-center
  w-full
  px-4
  bg-white
  border-b
  h-15
`;

const ModalContainer = tw.div`
  flex
  flex-col
  w-full
  p-10
  overflow-scroll
  mt-15
`;

const CloseIcon = tw(XMarkIcon)`
  text-gray-400
  w-5
  cursor-pointer
  hover:text-gray-800
  transition
  duration-300
`;
