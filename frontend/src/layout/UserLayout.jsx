import { LoginUser } from '../pages/LoginUser'
import { Menu } from '../components/Admin/Menu';
import { SideMenu } from '../components/Admin/SideMenu';
import { useAuth } from '../hooks/useAuth';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { CreateUser } from '../pages/CreateUser';

export const UserLayout = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation(); // Obtiene la ubicación actual

  if (!auth ) {
    if (location.pathname !== '/crear') {
      return <LoginUser />;
    } else {
      return <CreateUser />;
    }    
  }

  return (
    <>
      <Container>
        <div>
          <Menu />
        </div>
        <div>
          <SideMenu>
            {children}
          </SideMenu>
        </div>
      </Container>
    </>
  );
};