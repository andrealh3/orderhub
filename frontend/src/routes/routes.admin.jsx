import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Error404 } from '../pages/Error404';
import { BasicLayout } from '../layout/BasicLayout';
import { PedidosAdmin } from '../pages/Admin/PedidosAdmin';
import { CategoriasAdmin } from '../pages/Admin/CategoriasAdmin';
import { ProductosAdmin } from '../pages/Admin/ProductosAdmin';
import { UserAdmin } from '../pages/Admin/UserAdmin';
import { PagosAdmin } from '../pages/Admin/PagosAdmin';
import { MesasAdmin } from '../pages/Admin/MesasAdmin';
import { DetallesMesaPedido } from '../components/Admin/Pedidos/DetallesMesaPedido';
import { MenuPage } from '../components/Admin/SideMenu';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/orders" element={<PedidosAdmin />} />
      <Route path="/users" element={<UserAdmin />} />
      <Route path="/categories" element={<CategoriasAdmin />} />
      <Route path="/products" element={<ProductosAdmin />} />
      <Route path="/payments-history" element={<PagosAdmin />} />
      <Route path="/tables" element={<MesasAdmin />} />
      <Route path="/table/:id" element={<DetallesMesaPedido/>} />
      <Route path="*" element={
        <BasicLayout>
          <Error404 />
        </BasicLayout>
      } />
    </Routes>
  );
};