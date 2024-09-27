import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Error404 } from '../pages/Error404';
import { BasicLayout } from '../layout/BasicLayout';
import { HomeAdmin } from '../pages/Admin/HomeAdmin';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeAdmin />} />
      <Route path="*" element={
        <BasicLayout>
          <Error404 />
        </BasicLayout>
      } />
    </Routes>
  );
};