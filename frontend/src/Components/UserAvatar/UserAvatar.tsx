import { BootstrapSize } from '../../Types';

export interface IUserAvatar {
  userId: string;
  size: BootstrapSize | number;
  img?: string;
  className?: string;
}
export const UserAvatarBase = ({
  userId, img, className,
}: IUserAvatar): JSX.Element => {
  const errorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.src = '/images/default-avatar.png';
  };

  return (
    <div className={className}>
      <img
        src={img ?? (userId ? `${process.env.API_URL}/api/users/avatar/${userId}` : '/images/default-avatar.png')}
        alt="/images/default-avatar.png"
        onError={errorHandler}
      />
    </div>
  );
};
