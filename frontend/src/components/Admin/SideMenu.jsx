import React from 'react';
import { Nav } from "react-bootstrap"; 
import { useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SideMenu = ({ children }) => {
  return (
    <div className="d-flex" style={{ marginTop: '56px' }}>
      {/* Menu lateral */}
      <MenuLeft />

      {/* Contenido principal */}
      <div className="content p-3" style={{ marginLeft: '20%', width: '80%' }}>
        {children}
      </div>
    </div>
  );
}

export const MenuLeft = () => {
  const { auth } = useAuth(); // Hook de autenticación para saber si el usuario tiene privilegios
  
  // Menú para admin
  const adminMenuItems = [
    { to: "/admin/", label: "Pedidos", icon: "bi bi-house" },
    { to: "/admin/tables", label: "Mesas", icon: "bi bi-table" },
    { to: "/admin/payments-history", label: "Historial de pagos", icon: "bi bi-clock-history" },
    { to: "/admin/categories", label: "Categorías", icon: "bi bi-folder" },
    { to: "/admin/products", label: "Productos", icon: "bi bi-cart" },
    { to: "/admin/users", label: "Usuarios", icon: "bi bi-person" },
  ];

  // Menú para cliente
  const clienteMenuItems = [
    { to: "/", label: "Inicio", icon: "bi bi-house" },
    // Agrega otros elementos del menú para cliente aquí
  ];

  // Determina qué menú mostrar basado en el rol
  const menuItems = auth.me.role === 'admin' ? adminMenuItems : clienteMenuItems;

  return (
    <Nav className="flex-column bg-light p-3 position-fixed" style={{ left: 0, height: '100vh', width: '20%' }}>
      {menuItems.map(item => (
        <Nav.Item key={item.to}>
          <Nav.Link
            as={NavLink}
            to={item.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className={item.icon} /> {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
