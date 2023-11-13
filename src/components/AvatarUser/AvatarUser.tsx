import tw from 'tailwind-styled-components';
import { AvatarProps, Avatar, AvatarSize } from '../Avatar/Avatar';
import { UserDto } from '@/types';

export interface AvatarUserProps extends Partial<AvatarProps> {
  user: UserDto | null;
}

export function AvatarUser(props: AvatarUserProps): React.ReactElement {
  const { user, className, ...avatarProps } = props;

  if (!user) return <></>;

  return user?.profilePicture?.url ? (
    <Avatar
      className={className}
      {...avatarProps}
      src={user.profilePicture.url}
    />
  ) : (
    <Main
      onClick={avatarProps.onClick}
      className={className}
      $size={avatarProps.size ?? 'm'}
    >
      {user.firstName[0]}
      {user.lastName && user.lastName[0]}
    </Main>
  );
}

interface MainStyleProps {
  $size: AvatarSize;
}

const Main = tw.div<MainStyleProps>`
  rounded-full
  flex
  items-center
  justify-center
  bg-primary-600
  text-white
  uppercase
  
  ${({ $size }: MainStyleProps) => {
    if ($size === 'l')
      return 'w-10 h-10 min-w-10 max-w-10 min-h-10 max-h-10 text-base';
    if ($size === 'm') return 'w-8 h-8 min-w-8 max-w-8 min-h-8 max-h-8 text-sm';
    if ($size === 's')
      return 'w-6 h-6 min-w-6 max-w-6 min-h-6 max-h-6 text-2xs';
  }}
`;
