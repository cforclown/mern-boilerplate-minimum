import { combineReducers, createStore } from 'redux';
import UserContextReducer, { IUserContextState } from './Reducers/UserContext/UserContext';
import LayoutReducer, { ILayoutState } from './Reducers/Layout/Layout';
import DataReducer, { IDataState } from './Reducers/Data/Data';

export interface IAppState {
  layout: ILayoutState;
  userContext?: IUserContextState;
  data: IDataState;
}

const reducers = combineReducers({
  layout: LayoutReducer,
  userContext: UserContextReducer,
  data: DataReducer,
});

const Store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default Store;
