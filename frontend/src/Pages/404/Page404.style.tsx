import styled from 'styled-components';
import { IPage404, Page404Base } from './Page404';

const Page404 = styled(Page404Base)<IPage404>`
  ${(props) => (props.fullscreen ? 'width: 100vw; height: 100vh;' : 'width: 100%; height: 100%;')}
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.6rem;
    font-weight: bold;
    span {
      color: red;
    }
  }
`;
Page404.displayName = 'Page404';

export default Page404;
