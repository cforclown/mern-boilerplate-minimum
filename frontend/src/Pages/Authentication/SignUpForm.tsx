import { useState } from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validateFormValues from '../../Utils/validate-schema';
import {
  callMainAPI, getAuthEndpoint,
} from '../../Utils/api-service';

import Loader from '../../Components/Loader/Loader.style';
import { SetAccessToken } from '../../Store/Reducers/UserContext/UserContextActions';
import CallApiService from '../../Components/Utils/CallApiHandler';

const registerValidationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().optional(),
  fullname: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onSubmit = CallApiService(async (values) => {
    const data = await callMainAPI(
      getAuthEndpoint('/register', 'POST'),
      values,
    );
    toast.info('Account succesfully created');
    dispatch(SetAccessToken(data));
    navigate('/');
  }, setLoading);

  return (
    <Formik
      initialValues={{
        username: 'hafis',
        email: 'hafisalrizal@gmail.com',
        fullname: 'hafis alrizal',
        password: 'hahahaha',
        confirmPassword: 'hahahaha',
      }}
      validate={validateFormValues(registerValidationSchema)}
      onSubmit={onSubmit}
    >
      <Form className="content auth-form">
        <h3>Sign Up Here</h3>

        <label className="mt-2">Username</label>
        <Field type="text" placeholder="Username" name="username" />
        <label className="validation-error mt-0"><ErrorMessage name="username" /></label>

        <label className="mt-1">Email</label>
        <Field type="email" placeholder="Email" name="email" />
        <label className="validation-error mt-0"><ErrorMessage name="email" /></label>

        <label className="mt-1">Fullname</label>
        <Field type="text" placeholder="Fullname" name="fullname" />
        <label className="validation-error mt-0"><ErrorMessage name="fullname" /></label>

        <label className="mt-1">Password</label>
        <Field type="password" placeholder="Password" name="password" />
        <label className="validation-error mt-0"><ErrorMessage name="password" /></label>

        <label className="mt-1">Confirmation Password</label>
        <Field type="password" placeholder="Password" name="confirmPassword" />
        <label className="validation-error mt-0"><ErrorMessage name="confirmPassword" /></label>

        <button className="submit-button mt-2" type="submit">Sign Up</button>

        <label className="auth-form-footer mt-4">
          Already have account?
          {' '}
          <Link to="/auth/signin"><span>Sign In</span></Link>
        </label>
        {loading && <Loader />}
      </Form>
    </Formik>
  );
}

export default SignUp;
