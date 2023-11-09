import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import tw from 'tailwind-styled-components';

interface ModalProps extends ReactModal.Props {
  children?: ReactNode;
  contentClassName?: string;
}

export function Modal(props: ModalProps): React.JSX.Element {
  const { children, contentClassName } = props;

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
