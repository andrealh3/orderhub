import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MdTableRestaurant, MdNoFood } from "react-icons/md";
import { FaHistory, FaFolder, FaCartPlus, FaUser, FaHome } from 'react-icons/fa';
import { BiSolidCategory } from "react-icons/bi";

export const MenuPage = ({ children }) => {
  const { auth } = useAuth();

  const adminMenuItems = [
    { to: '/admin/orders', label: 'Pedidos', icon: <FaCartPlus className="text-primary" /> },
    { to: '/admin/tables', label: 'Mesas', icon: <MdTableRestaurant className="text-primary" />},
    { to: '/admin/payments-history', label: 'Historial de pagos', icon: <FaHistory className="text-primary" /> },
    { to: '/admin/categories', label: 'Categorías', icon: <BiSolidCategory className="text-primary" /> },
    { to: '/admin/products', label: 'Productos', icon: <MdNoFood className="text-primary" /> },
    { to: '/admin/users', label: 'Usuarios', icon: <FaUser className="text-primary" /> },
  ];

  const clienteMenuItems = [
    { to: '/', label: 'Inicio', icon: <FaHome className="text-primary" /> },
  ];

  const menuItems = auth?.me?.role === 'admin' ? adminMenuItems : clienteMenuItems;

  return (
    <Container>
      <Row className="g-3 justify-content-center">
        {menuItems.map((item) => (
          <Col xs={12} sm={6} md={4} key={item.to}>
            <Link
              to={item.to}
              className="card p-4 text-center w-100 bg-secondary"
              style={{
                textDecoration: 'none',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'block',
              }}
            >
              {/* Colocamos el componente del icono directamente */}
              <div className="mb-2" style={{ fontSize: '1.5rem' }}>
                {item.icon}
              </div>
              <span className="text-primary">{item.label}</span>
            </Link>
          </Col>
        ))}
        {children}
      </Row>
    </Container>
  );
};