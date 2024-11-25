import { Routes, Route } from 'react-router-dom';
import { Error404 } from '../pages/Error404';
import { ClienteRoutes } from './routes.client';
import { AdminRoutes } from './routes.admin';
import { BasicLayout } from '../layout/BasicLayout';
import { useAuth } from '../hooks/useAuth';
import { UserLayout } from '../layout/UserLayout';
import { CreateUser } from '../pages/CreateUser';

export const AppRoutes = () => {
  const { auth } = useAuth();

  const isCliente = auth && auth.me.role === 'cliente';
  const isAdmin = auth && auth.me.role === 'admin';
  
  return (
    <UserLayout>
      <Routes>
        <Route path="/crear" element={<CreateUser />} />
        {isCliente && <Route path="/*" element={<ClienteRoutes />} />}
        {isAdmin && <Route path="/admin/*" element={<AdminRoutes />} />}
        <Route path="*" element={
          <BasicLayout>
            <Error404 />
          </BasicLayout>
        } />
      </Routes>
    </UserLayout>
  );
};