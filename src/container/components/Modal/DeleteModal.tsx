import { ButtonAlert, ButtonGhost, H4, Input, Modal, P14, RowBetween } from '@/components';
import { Trans, useTranslation } from 'next-i18next';
import { ChangeEvent, useState } from 'react';

interface DeleteModalProps {
  onDelete: () => void;
  description: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteModal(props: DeleteModalProps): JSX.Element {
  const { onDelete, description, name, isOpen, onClose } = props;
  const { t } = useTranslation();
  const [ confirmName, setConfirmName ] = useState<string>('');

  return  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    title={`${t('generics.delete')} ${name}`}
    contentClassName='w-[calc(32rem)]'
  >
    <H4>{description}</H4>
    <P14 className='mt-6 mb-1'>
      <Trans i18nKey='fields.confirmDelete.label' values={{ name: name }} components={{ b: <span className='font-semibold' /> }}/>
    </P14>
    <Input 
      placeholder={t('fields.confirmDelete.placeholder', { name: name })}
      value={confirmName}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmName(e.target.value)}
    />
    <RowBetween className='mt-6'>
      <ButtonGhost outlined onClick={onClose}>{t('generics.cancel')}</ButtonGhost>
      <ButtonAlert
        disabled={confirmName !== name}
        onClick={onDelete}
      >
        {t('generics.delete')}
      </ButtonAlert>
    </RowBetween>
  </Modal>;
}
