import React, { Suspense, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Pages/Home/Home.style';
import { selectTheme } from '../Store/Selectors/ThemeSelector';
import Loader from '../Components/Loader/Loader.style';
import Page404 from '../Pages/404/Page404.style';
import AuthPage from '../Pages/Authentication';

import storageService from '../Utils/storage-service';
import { SetAccessToken } from '../Store/Reducers/UserContext/UserContextActions';
import { IAppState } from '../Store';

interface IApp {
  className?: string;
}

export const AppBase = ({ className }: IApp): React.ReactElement => {
  const userContext = useSelector<IAppState>((state) => state.userContext);
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storage = storageService('session');

  useEffect(() => {
    if (userContext) {
      return;
    }

    try {
      const sessionRaw = storage.getItem('session');
      const session = sessionRaw && JSON.stringify(sessionRaw);
      if (!session) {
        navigate('/auth/signin');
      } else {
        dispatch(SetAccessToken(session));
      }
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={className}>
        <Suspense fallback={Loader}>
          <Routes>
            <Route key="auth" path="/auth/*" element={<AuthPage />} />
            <Route key="404" path="404" element={<Page404 fullscreen />} />
            <Route key="home" path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
};
