import { clone } from 'ramda';
import { IReducerAction } from '../../../Types';
import { IResource } from '../../../Types/Metadata';
import DataActionTypes from './DataActionTypes';

export interface IDataState {
  resources?: IResource[];
  currentResource?: IResource;
}

const dataDefaultState: IDataState = { };

// eslint-disable-next-line default-param-last
const DataReducer = (state: IDataState = dataDefaultState, action: IReducerAction): any => {
  const newState = clone(state);

  if (action.type === DataActionTypes.SET_RESOURCES && action.params) {
    newState.resources = action.params.resources;
  } else if (action.type === DataActionTypes.SET_CURRENT_RESOURCE && action.params) {
    newState.currentResource = action.params.resource;
  }

  return state;
};

export default DataReducer;
