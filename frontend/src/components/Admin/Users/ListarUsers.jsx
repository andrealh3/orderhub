import { Button, Table } from "react-bootstrap";
import { BsCheck, BsPencil, BsX } from 'react-icons/bs';

export const ListarUsers = ({users, actualizarUsuario, eliminarUsuario, currentUserId }) => {

  return (
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Active</th>
            <th>Staff</th>
            <th>Superusuario</th>

            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              // Ordena los usuarios por ID antes de mapear
              users.sort((a, b) => a.id - b.id).map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_active ? <BsCheck color="green" /> : <BsX color="red" />}</td>
                  <td>{user.is_staff ? <BsCheck color="green" /> : <BsX color="red" />}</td>
                  <td>{user.is_superuser ? <BsCheck color="green" /> : <BsX color="red" />}</td>
                  <td>{user.role}</td>
                  <Editar user={user} actualizarUsuario={actualizarUsuario} eliminarUsuario={eliminarUsuario} currentUserId={currentUserId} />
                </tr>
              ))
            ) : (
            <tr>
                <td colSpan="3" className="text-center">
                No hay usuarios
                </td>
            </tr>
            )}
        </tbody>
    </Table>
  )
}

const Editar = ({user, actualizarUsuario, eliminarUsuario, currentUserId }) => {
  return (
    <td>
<<<<<<< HEAD:frontend/src/components/Admin/TableUsers.jsx
      <>
        <Button variant="outline-primary" onClick={() => actualizarUsuario(user)} className="me-2"> {/* Espaciado con 'me-2' */}
          <BsPencil /> 
        </Button>
        {user.id !== currentUserId && (
          <Button variant="outline-danger" onClick={() => eliminarUsuario(user)} >
            <BsX />
          </Button>
        )}
      </>
=======
      {user.id !== currentUserId && (
        <>
          <Button variant="outline-primary" onClick={() => actualizarUsuario(user)} className="me-2"> {/* Espaciado con 'me-2' */}
            <BsPencil /> 
          </Button>
          <Button variant="outline-danger" onClick={() => eliminarUsuario(user)} >
            <BsX />
          </Button>
        </>
      )}
>>>>>>> d400243 (Modificación de archivos, variables y carpetas):frontend/src/components/Admin/Users/ListarUsers.jsx
    </td>  
  )
}