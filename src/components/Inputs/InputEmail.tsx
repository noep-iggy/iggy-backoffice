import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import Validator from 'validator';
import { P12 } from '../Texts';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface InputEmailProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  className?: string;
  value: string[];
  onChange?: (value: string[]) => void;
}

export function InputEmail(props: InputEmailProps): JSX.Element {
  const { className, value, label, onChange } = props;
  const [newEmail, setNewEmail] = useState<string>('');

  useEffect(() => {
    const newEmail = removeEmailFromValues(value);
    setNewEmail(newEmail);
  }, []);

  function getEmailsFromValues(values: string[]): string[] {
    const emails = values?.filter((value) => value.includes('@'));
    return emails;
  }

  function removeEmailFromValues(values: string[]): string {
    const emails = values.filter((value) => !value.includes('@'));
    return emails[0];
  }

  function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setNewEmail(value);
  }

  return (
    <>
      {label && <P2Styled>{label}</P2Styled>}
      <InputContainer className={className} $isEmpty={value.length === 0}>
        <EmailContainer>
          {getEmailsFromValues(value)?.map((email, index) => (
            <Email key={email}>
              <UserIconStyled />
              <EmailLabel>{email}</EmailLabel>
              <RemoveIconStyled
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={(e: any) => {
                  e.preventDefault();
                  onChange?.(value.filter((_, i) => i !== index));
                }}
              />
            </Email>
          ))}
        </EmailContainer>
        <InputStyled
          type='text'
          {...props}
          value={newEmail}
          onChange={onHandleChange}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              if (Validator.isEmail(newEmail)) {
                onChange?.([...getEmailsFromValues(value), newEmail]);
                setNewEmail('');
              }
            }
            if (event.key === 'Backspace' && newEmail === '') {
              event.preventDefault();
              setNewEmail(value[value.length - 1]);
              onChange?.(value.slice(0, value.length - 1));
            }
          }}
        />
      </InputContainer>
    </>
  );
}

const InputContainer = tw.div<{ $isEmpty: boolean }>`
  rounded-lg
  w-full 
  border
  ${(props: { $isEmpty: boolean }) =>
    props.$isEmpty ? 'border-gray-300' : 'border-gray-600'}
  hover:border-primary-700
  focus:border-primary-500
  focus:ring-primary-500
  focus:outline-none
  disabled:bg-gray-200
  disabled:border-none
  transition
  block
  h-40
  p-2
`;

const InputStyled = tw.input`
  h-7
  ml-1
  border-0
  placeholder-gray-400
  hover:border-0
  focus:border-0
  focus:ring-0
  focus:outline-none
  text-gray-700
  min-w-82
  text-xs

  `;

const P2Styled = tw(P12)`
  mb-1
  font-bold
`;

const EmailContainer = tw.div`
  flex
  justify-start
  items-start
  flex-wrap
  w-full
  h-min
`;

const Email = tw.div`
  border
  border-gray-300
  rounded
  mr-1
  mb-1
  px-2
  flex items-center
  justify-center
  h-7
  last:mr-0

`;

const EmailLabel = tw(P12)`
  text-gray-900
  text-sm
  font-mono
`;

const UserIconStyled = tw(UserIcon)`
  w-4
  text-gray-700
  mr-1
`;

const RemoveIconStyled = tw(XMarkIcon)`
  w-4
  text-gray-700
  ml-2
  cursor-pointer
`;
