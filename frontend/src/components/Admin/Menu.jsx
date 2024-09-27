import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export const Menu = () => {
  const { auth, logout } = useAuth();
  
  return (
    <Navbar bg="light" variant="light" fixed="top" >
      <Container>
        <Navbar.Brand>
          <p>iCard Admin</p>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Item className="d-flex align-items-center">
            <span>Hola, {auth.me.username}</span>
          </Nav.Item>
          <Nav.Item className="ms-3" onClick={logout} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}
