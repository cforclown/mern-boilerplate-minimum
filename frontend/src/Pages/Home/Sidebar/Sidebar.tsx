import { useEffect, useRef } from 'react';
import {
  ProSidebar,
  SidebarHeader,
} from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { IResource } from '../../../Types/Metadata';
import { selectTheme } from '../../../Store/Selectors/ThemeSelector';

import 'react-pro-sidebar/dist/css/styles.css';
import SidebarMenu from './SidebarMenu';

export interface ISidebar {
  hidden: boolean;
  collapsed: boolean;
  resource?: IResource;
  className?: string;
}

function SidebarBase({
  hidden, collapsed, resource, className,
}: ISidebar): JSX.Element {
  const theme = useSelector(selectTheme);
  const ismounted = useRef(false);

  useEffect(() => {
    ismounted.current = true;
    return () => {
      ismounted.current = false;
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hidden) hide();
    else show();
  }, [hidden]);

  const hide = (): void => { ref.current?.classList.add('cl-home-sidebar-hidden'); };
  const show = ():void => { ref.current?.classList.remove('cl-home-sidebar-hidden'); };

  return (
    <div className={className}>
      <div id="cl-sidebar" ref={ref}>
        <ProSidebar width="240px" collapsed={collapsed} image={theme.sidebar.img}>
          <SidebarHeader>
            <div className="text-center py-2">
              <img
                src={`/images/${collapsed ? 'sidebar-collapsed-banner.png' : 'sidebar-banner.png'}`}
                style={{ width: collapsed ? '36px' : '80px' }}
                alt="/images/sidebar-collapsed-banner.png"
              />
            </div>
          </SidebarHeader>
          {resource && <SidebarMenu collapsed={collapsed} resource={resource} />}
        </ProSidebar>
      </div>
    </div>
  );
}

export default SidebarBase;
