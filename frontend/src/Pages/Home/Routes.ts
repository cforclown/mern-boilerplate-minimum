import React from 'react';
import { IRouteItem } from '../../Types';

const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
// const Users = React.lazy(() => import("./views/users"));
// const CreateEditUser = React.lazy(() => import("./views/users/create-edit"));
// const Roles = React.lazy(() => import("./views/roles"));
// const Profile = React.lazy(() => import("./views/profile"));
// const ContentNotFound = React.lazy(() => import("./views/content-not-found"));

const routes: IRouteItem[] = [
  {
    path: '/',
    name: 'Dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  // {
  //   path: "/students",
  //   exact: false,
  //   name: "Students",
  //   component: Dashboard
  // },
  // { path: "/master-data/users", exact: false, name: "Users", component: Users },
  // { path: "/master-data/users/create-edit/:userId", exact: false, name: "Users", component: CreateEditUser },
  // { path: "/master-data/roles", exact: false, name: "Roles", component: Roles },
  // { path: "/profile", exact: false, name: "Profile", component: Profile },

  // { path: "*", name: "404 Page Not Found", component: ContentNotFound },
];

export default routes;
