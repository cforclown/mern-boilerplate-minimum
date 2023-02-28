import { IAppState } from '..';
import { IResource } from '../../Types/Metadata';

export const selectResources = (state: IAppState): IResource[] | undefined => state.data.resources;
export const selectResource = (): (state: IAppState) => IResource | undefined => (state: IAppState): IResource | undefined => state.data.currentResource;
