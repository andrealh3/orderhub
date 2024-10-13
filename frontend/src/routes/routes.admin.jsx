import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Error404 } from '../pages/Error404';
import { BasicLayout } from '../layout/BasicLayout';
import { HomeAdmin } from '../pages/Admin/HomeAdmin';
import { UserAdmin } from '../components/Admin/UserAdmin';
import { CategoriasAdmin } from '../components/Admin/Categories/CategoriasAdmin';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeAdmin />} />
      <Route path="/users" element={<UserAdmin />} />
      <Route path="/categories" element={<CategoriasAdmin />} />
      <Route path="*" element={
        <BasicLayout>
          <Error404 />
        </BasicLayout>
      } />
    </Routes>
  );
};