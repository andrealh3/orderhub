import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Cliente/Home';
import { Error404 } from '../pages/Error404';
import { BasicLayout } from '../layout/BasicLayout';

export const ClienteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={
        <BasicLayout>
          <Error404 />
        </BasicLayout>
      } />
    </Routes>
  );
};