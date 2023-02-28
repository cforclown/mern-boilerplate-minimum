import { IResourceChildProps } from '../../Pages/Resource/Resource';
import Explore from './Explore.style';

export type IExplorer = IResourceChildProps

function Explorer({ resource, metadata }: IExplorer): JSX.Element {
  return <Explore resource={resource} metadata={metadata} />;
}

export default Explorer;
