import { faWpexplorer } from '@fortawesome/free-brands-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconShape, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IAppState } from '../../../Store';
import { IResource } from '../../../Types/Metadata';

export interface ISidebarMenu {
  collapsed: boolean;
  resource: IResource;
}
function SidebarMenu({ collapsed, resource }: ISidebarMenu): JSX.Element {
  const sidebarItemIconShape = useSelector<IAppState>((state) => state.layout.sidebarIconShape) as IconShape;
  const navigate = useNavigate();

  const dashboardItems = resource.dashboards.map((dashboard) => (
    <MenuItem
      key={dashboard._id}
      onClick={() => navigate(`${resource._id}/dashboard/${dashboard._id}`)}
      icon={<FontAwesomeIcon icon={faChartPie} />}
      popperarrow
    >
      {dashboard.label}
    </MenuItem>
  ));
  const dashboardLabel = collapsed && (
    <div className="cl-sidebar-section-label text-center">
      Dashboard
    </div>
  );

  const exploreItems = resource.views.map((view) => (
    <MenuItem
      key={view._id}
      onClick={() => navigate(`${resource._id}/explore/${view._id}`)}
      icon={<FontAwesomeIcon icon={faWpexplorer} />}
      popperarrow
    >
      {view.label.plural}
    </MenuItem>
  ));
  const exploreLabel = collapsed && (
    <div className="cl-sidebar-section-label text-center">
      Explore
    </div>
  );

  return (
    <Menu iconShape={sidebarItemIconShape ?? 'round'}>
      <SubMenu title="Dashboard" icon={<FontAwesomeIcon icon={faChartPie} />}>
        {dashboardLabel}
        {dashboardItems}
      </SubMenu>
      <SubMenu title="Explore" icon={<FontAwesomeIcon icon={faWpexplorer} />}>
        {exploreLabel}
        {exploreItems}
      </SubMenu>
    </Menu>
  );
}

export default SidebarMenu;
