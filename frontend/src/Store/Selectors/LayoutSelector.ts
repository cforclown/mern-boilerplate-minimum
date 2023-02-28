import { ILayoutState, ILayoutStateSidebarStatus } from '../Reducers/Layout/Layout';
import { IAppState } from '..';

export const selectLayout = (state: IAppState): ILayoutState => state.layout;

export const selectSidebarState = (): (state: IAppState) => ILayoutStateSidebarStatus => (state) => {
  console.log(state);
  return selectLayout(state).sidebar;
};
