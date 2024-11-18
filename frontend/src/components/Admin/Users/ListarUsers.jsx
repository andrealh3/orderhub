import { Button, Card, Col, Row } from "react-bootstrap";
import { BsCheck, BsPencil, BsX } from 'react-icons/bs';

export const ListarUsers = ({ users, actualizarUsuario, eliminarUsuario, currentUserId }) => {
  return (
    <Row className="g-3 justify-content-center">
      {Array.isArray(users) && users.length > 0 ? (
        users.sort((a, b) => a.id - b.id).map((user) => (
          <Col xs={12} sm={6} md={4} key={user.id}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Active:</strong> {user.is_active ? <BsCheck color="green" /> : <BsX color="red" />}
                  <br />
                  <strong>Staff:</strong> {user.is_staff ? <BsCheck color="green" /> : <BsX color="red" />}
                  <br />
                  <strong>Superusuario:</strong> {user.is_superuser ? <BsCheck color="green" /> : <BsX color="red" />}
                  <br />
                  <strong>Role:</strong> {user.role}
                </Card.Text>
                <Editar 
                  user={user} 
                  actualizarUsuario={actualizarUsuario} 
                  eliminarUsuario={eliminarUsuario} 
                  currentUserId={currentUserId} 
                />
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <div className="text-center">
            <h4>No hay usuarios disponibles</h4>
          </div>
        </Col>
      )}
    </Row>
  );
};

const Editar = ({ user, actualizarUsuario, eliminarUsuario, currentUserId }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button variant="outline-primary" onClick={() => actualizarUsuario(user)} className="me-2">
        <BsPencil />
      </Button>
      {user.id !== currentUserId && (
        <Button variant="outline-danger" onClick={() => eliminarUsuario(user.id)}>
          <BsX />
        </Button>
      )}
    </div>
  );
};