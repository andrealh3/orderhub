import { Button } from 'react-bootstrap';

export const HeaderPage = ({ title, btnNuevo, btnClickNuevo, btnDos, btnClickDos }) => {

  return (
    <div>
      <h2>{ title }</h2>
      <div className="d-flex justify-content-center align-items-center m-2">
        { btnNuevo && (
          <Button variant="primary" onClick={ btnClickNuevo }>{ btnNuevo }</Button>
        ) }
        { btnDos && (
          <Button variant="primary" onClick={ btnClickDos }>{ btnDos }</Button>
        ) }
      </div>
    </div>
  )
}
