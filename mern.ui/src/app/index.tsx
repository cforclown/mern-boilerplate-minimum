import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import Loader from '@/components/loader/Loader.style';
import AlertDialogGlobal from '@/components/alert-dialog/AlertDialogGlobal';
import { selectTheme } from '@/store/reducers/layout/theme-selector';
import { ITheme } from '@/themes/Themes';
import { selectUserContext } from '@/store/reducers/user-context/user-context-selector';
import storageService from '@/utils/storage-service';
import { IUserContext, USER_CONTEXT_STORAGE_KEY, setUserContext as setUserContextAction } from '@/store/reducers/user-context';
import { validateAccessToken } from '@/pages/auth/auth.service';
import useAction from '@/hooks/useAction';

const Page404 = lazy(() => import('@/pages/404'));
const Auth = lazy(() => import('@/pages/auth'));
const Home = lazy(() => import('@/pages/home'));

function App() {
  const theme: ITheme = useSelector(selectTheme);
  const [loading, setLoading] = useState(true);
  const userContext = useSelector(selectUserContext());
  const navigate = useNavigate();
  const setUserContext = useAction(setUserContextAction);

  const validateSavedUserContext = async (): Promise<void> => {
    try {
      const savedUserContext = storageService('local').getObject<IUserContext>(USER_CONTEXT_STORAGE_KEY);
      if (!savedUserContext) {
        return navigate('/auth/signin');
      }

      const validateResult = await validateAccessToken({ 
        accessToken: savedUserContext.accessToken, 
        refreshToken: savedUserContext.refreshToken
      });
      setUserContext(validateResult === true ? savedUserContext : validateResult);
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userContext) {
      return;
    }

    validateSavedUserContext();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!userContext) {
      navigate('/auth/login');
    }
  }, [userContext]);

  if (loading) {
    return ( <Loader />);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="w-screen h-screen overflow-hidden m-0 p-0">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route key="404" path="404" element={<Page404 fullscreen msg="Page not found" code={404} />} />
            <Route key="auth" path="auth/*" element={<Auth />} />
            <Route key="home" path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <AlertDialogGlobal />
    </ThemeProvider>
  );
}

export default App;
