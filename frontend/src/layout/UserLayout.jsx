import { Menu } from '../components/Admin/Menu';
import { useAuth } from '../hooks/useAuth';
import { Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateUser } from '../pages/CreateUser';
import { LoginUser } from '../pages/LoginUser';
import { RxReset } from "react-icons/rx";

export const UserLayout = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!auth) {
    if (location.pathname !== '/crear') {
      return <LoginUser />;
    } else {
      return <CreateUser />;
    }
  }

  const handleBack = () => {
    navigate(-1);
  };

  const isAdminPage = location.pathname.startsWith('/admin/') && location.pathname !== '/admin/';

  return (
    <Container className='p-0'>
      {/* Menu en la parte superior */}
      <Menu />

      {/* Contenedor principal con margen superior */}
      <div className="" >
        {isAdminPage && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="back-tooltip">Volver a la página anterior</Tooltip>}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleBack}
              className="mb-4 align-self-start"
            >
              <RxReset />
            </Button>
          </OverlayTrigger>
        )}

        {/* Contenido centrado */}
        <div className="text-center">
          {children}
        </div>
      </div>
    </Container>
  );
};
