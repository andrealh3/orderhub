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






// import React from 'react';
// import { Nav, Button, Container, Row, Col } from "react-bootstrap";
// import { useLocation, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// export const SideMenu = ({ children }) => {
//   return (
//     <div className="d-flex" style={{ marginTop: '56px' }}>
//       {/* Menu lateral */}
//       {/* <MenuLeft /> */}

//       {/* Contenido principal */}
//       <div className="content p-3" style={{ marginLeft: '20%', width: '80%' }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export const MenuLeft = () => {
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   // Menú para admin
//   const adminMenuItems = [
//     { to: "/admin/", label: "Pedidos", icon: "bi bi-house" },
//     { to: "/admin/tables", label: "Mesas", icon: "bi bi-table" },
//     { to: "/admin/payments-history", label: "Historial de pagos", icon: "bi bi-clock-history" },
//     { to: "/admin/categories", label: "Categorías", icon: "bi bi-folder" },
//     { to: "/admin/products", label: "Productos", icon: "bi bi-cart" },
//     { to: "/admin/users", label: "Usuarios", icon: "bi bi-person" },
//   ];

//   // Menú para cliente
//   const clienteMenuItems = [
//     { to: "/", label: "Inicio", icon: "bi bi-house" },
//     // Agrega otros elementos del menú para cliente aquí
//   ];

//   // Determina qué menú mostrar basado en el rol
//   const menuItems = auth.me.role === 'admin' ? adminMenuItems : clienteMenuItems;

//   return (
//     <Nav className="flex-column bg-light p-3 position-fixed" style={{ left: 0, height: '100vh', width: '20%' }}>
//       <Container>
//         {/* Menú de elementos en cuadrícula */}
//         <Row className="gy-3">
//           {menuItems.map(item => (
//             <Col xs={6} md={12} key={item.to}>
//               <Nav.Item>
//                 <Nav.Link
//                   as={NavLink}
//                   to={item.to}
//                   className={({ isActive }) => (isActive ? 'active card p-2 text-center' : 'card p-2 text-center')}
//                   style={{
//                     textDecoration: 'none',
//                     borderRadius: '8px',
//                     boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
//                     transition: 'transform 0.2s',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <i className={`${item.icon} mb-2`} style={{ fontSize: '1.5rem' }}></i>
//                   <span>{item.label}</span>
//                 </Nav.Link>
//               </Nav.Item>
//             </Col>
//           ))}
//         </Row>

//         {/* Botón de volver */}
//         <div className="mt-4 text-center">
//           <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
//         </div>
//       </Container>
//     </Nav>
//   );
// }

// import React from 'react';
// import { Nav } from "react-bootstrap"; 
// import { useLocation, NavLink } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// export const SideMenu = ({ children }) => {
//   return (
//     <div className="d-flex" style={{ marginTop: '56px' }}>
//       {/* Menu lateral */}
//       <MenuLeft />

//       {/* Contenido principal */}
//       <div className="content p-3" style={{ marginLeft: '20%', width: '80%' }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export const MenuLeft = () => {
//   const { auth } = useAuth(); // Hook de autenticación para saber si el usuario tiene privilegios
  
//   // Menú para admin
//   const adminMenuItems = [
//     { to: "/admin/", label: "Pedidos", icon: "bi bi-house" },
//     { to: "/admin/tables", label: "Mesas", icon: "bi bi-table" },
//     { to: "/admin/payments-history", label: "Historial de pagos", icon: "bi bi-clock-history" },
//     { to: "/admin/categories", label: "Categorías", icon: "bi bi-folder" },
//     { to: "/admin/products", label: "Productos", icon: "bi bi-cart" },
//     { to: "/admin/users", label: "Usuarios", icon: "bi bi-person" },
//   ];

//   // Menú para cliente
//   const clienteMenuItems = [
//     { to: "/", label: "Inicio", icon: "bi bi-house" },
//     // Agrega otros elementos del menú para cliente aquí
//   ];

//   // Determina qué menú mostrar basado en el rol
//   const menuItems = auth.me.role === 'admin' ? adminMenuItems : clienteMenuItems;

//   return (
//     <Nav className="flex-column bg-light p-3 position-fixed" style={{ left: 0, height: '100vh', width: '20%' }}>
//       {menuItems.map(item => (
//         <Nav.Item key={item.to}>
//           <Nav.Link
//             as={NavLink}
//             to={item.to}
//             className={({ isActive }) => (isActive ? 'active' : '')}
//           >
//             <i className={item.icon} /> {item.label}
//           </Nav.Link>
//         </Nav.Item>
//       ))}
//     </Nav>
//   );
// }
