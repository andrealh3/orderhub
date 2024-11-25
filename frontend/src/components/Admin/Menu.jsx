import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';

export const Menu = () => {
  const { auth, logout } = useAuth();

  return (
    <Navbar variant="light">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="Logo de la app" style={{ width: '4.5rem', height: '4.5rem' }} />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Item className="d-flex align-items-center">
            <span>Hola, {auth?.me?.username}</span>
          </Nav.Item>
          <Nav.Item className="ms-3" onClick={logout} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};