import { Routes, Route } from 'react-router-dom';
import { Error404 } from '../pages/Error404';
import { ClienteRoutes } from './routes.client';
import { AdminRoutes } from './routes.admin';
import { BasicLayout } from '../layout/BasicLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<ClienteRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={
        <BasicLayout>
          <Error404 />
        </BasicLayout>
      } />
    </Routes>
  );
};
