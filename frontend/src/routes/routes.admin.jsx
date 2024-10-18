import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Error404 } from '../pages/Error404';
import { BasicLayout } from '../layout/BasicLayout';
import { HomeAdmin } from '../pages/Admin/HomeAdmin';
import { UserAdmin } from '../components/Admin/Users/UserAdmin';
import { CategoriasAdmin } from '../components/Admin/Categorias/CategoriasAdmin';
import { ProductosAdmin } from '../pages/Admin/ProductosAdmin';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeAdmin />} />
      <Route path="/users" element={<UserAdmin />} />
      <Route path="/categories" element={<CategoriasAdmin />} />
      <Route path="/products" element={<ProductosAdmin />} />
      <Route path="*" element={
        <BasicLayout>
          <Error404 />
        </BasicLayout>
      } />
    </Routes>
  );
};