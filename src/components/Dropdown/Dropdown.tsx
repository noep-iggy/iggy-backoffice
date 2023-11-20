import Tippy, { TippyProps } from '@tippyjs/react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { Col } from '../Helpers';

interface DropdownProps extends TippyProps {
  needRefHolder?: boolean;
}

// @see docs: https://www.npmjs.com/package/@tippyjs/react
export function Dropdown(props: DropdownProps): JSX.Element {
  const {
    children,
    animation = 'perspective-extreme',
    needRefHolder = true,
  } = props;

  return (
    <StyledDropdown
      animation={animation}
      appendTo={() => document.body}
      {...props}
    >
      {needRefHolder ? (
        <div className='tooltip-ref-holder'>{children}</div>
      ) : (
        children
      )}
    </StyledDropdown>
  );
}

const StyledDropdown = styled(Tippy)`
  border-radius: 0.5rem;
  background: white;

  .tippy-content {
    padding: 0;
  }
`;

// Dropdowns common style
export const DropdownButtons = tw(Col)`
  gap-1.5
  border
  border-gray-300
  rounded-md
  p-1.5
`;

export const DropdownButton = tw.div`
  cursor-pointer
  rounded-md
  p-2
  w-full
  text-right
  hover:bg-gray-50
  text-gray-700
  text-xs
  font-semibold
`;
