import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';
import useAction from '@/hooks/useAction';
import { deleteUserContext as deleteUserContextAction } from '@/store/reducers/user-context';
import { RowsIcon } from '@radix-ui/react-icons';

interface IHeaderProps extends IWithUserContext{
  showSidebarToggler: boolean;
  onToggleSidebar: ()=>void;
  className?: string;
}

export const HeaderBase = ({ showSidebarToggler, onToggleSidebar, className, userContext, t }: IHeaderProps): JSX.Element => {
  const deleteUserContext = useAction(deleteUserContextAction);

  const onToggleSidebarClick = (): void => {
    if (!onToggleSidebar) return;
    onToggleSidebar();
  };

  const logout = () => {
    deleteUserContext();
  };

  return (
    <div className={className}>
      <div id="cl-header">
        <div className="cl-header-left">
          {showSidebarToggler && (
            <div className="cl-header-sidebar-toggle-btn" onClick={onToggleSidebarClick}>
              <RowsIcon className="h-[24px]" />
            </div>
          )}
        </div>
        <div className="cl-header-center" />
        <div className="cl-header-right" >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar src={userContext.user.avatar} size="md" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>
                {t('common.account')}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                {t('common.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t('common.settings')}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logout}>
                {t('common.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default withUserContext(HeaderBase);
