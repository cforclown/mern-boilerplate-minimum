import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader.style';
import Auth from './Auth';
import SignIn from './SignInForm';
import SignUp from './SignUpForm';

function AuthPage(): JSX.Element {
  return (
    <Auth>
      <Suspense fallback={Loader}>
        <Routes>
          <Route key="signin" path="signin" element={<SignIn />} />
          <Route key="signup" path="signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="signin" />} />
        </Routes>
      </Suspense>
    </Auth>
  );
}

export default AuthPage;
