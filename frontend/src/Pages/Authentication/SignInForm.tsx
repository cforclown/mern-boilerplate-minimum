import { useState } from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validateFormValues from '../../Utils/validate-schema';
import { callMainAPI, getAuthEndpoint } from '../../Utils/api-service';
import Loader from '../../Components/Loader/Loader.style';
import { SetAccessToken } from '../../Store/Reducers/UserContext/UserContextActions';
import CallApiService from '../../Components/Utils/CallApiHandler';

const loginValidationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onSubmit = CallApiService(async (values) => {
    const data = await callMainAPI(
      getAuthEndpoint('/login', 'POST'),
      values,
    );
    dispatch(SetAccessToken(data));
    // navigate('/');
  }, setLoading);

  return (
    <Formik
      initialValues={{
        username: undefined,
        password: undefined,
      }}
      validate={validateFormValues(loginValidationSchema)}
      onSubmit={onSubmit}
    >
      <Form className="content auth-form">
        <h3>Sign In Here</h3>

        <label className="mt-4">Username</label>
        <Field type="text" placeholder="Username" name="username" />
        <label className="validation-error mt-0"><ErrorMessage name="username" /></label>

        <label className="mt-3">Password</label>
        <Field type="password" placeholder="Password" name="password" />
        <label className="validation-error mt-0"><ErrorMessage name="password" /></label>

        <button className="submit-button mt-3" type="submit">Log In</button>

        <label className="auth-form-footer mt-4">
          Don&apos;t have an account?
          {' '}
          <Link to="/auth/signup"><span>Sign Up</span></Link>
        </label>
        {loading && <Loader />}
      </Form>
    </Formik>
  );
}

export default SignIn;
