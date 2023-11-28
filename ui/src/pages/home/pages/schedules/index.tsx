
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@/components/loader/Loader.style';

const ScheduleList =  React.lazy(() => import('./ScheduleList'));
const ScheduleDetails =  React.lazy(() => import('./ScheduleDetails'));
const ScheduleForm =  React.lazy(() => import('./ScheduleForm'));

function Content(): JSX.Element {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route key="list" path="/" element={<ScheduleList />} />
        <Route key="details" path="details/:id" element={<ScheduleDetails />} />
        <Route key="form-create" path="form" element={<ScheduleForm />} />
        <Route key="form-update" path="form/:id" element={<ScheduleForm />} />
        <Route key="*" path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default Content;
