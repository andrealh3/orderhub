import { Button } from 'react-bootstrap';

export const HeaderPage = ({ title, btnNuevo, btnClickNuevo, btnDos, btnClickDos, btnDisabledDos }) => {

  return (
    <div>
      <h2>{ title }</h2>
      <div className="d-flex justify-content-center align-items-center m-2">
        { btnNuevo && (
          <Button variant="primary" onClick={ btnClickNuevo }>{ btnNuevo }</Button>
        ) }
        { btnDos && (
          <Button 
            variant="primary" 
            onClick={ btnClickDos } 
            disabled={ btnDisabledDos } // Deshabilitar el botón si btnDisabledDos es true
          >
            { btnDos }
          </Button>
        ) }
      </div>
    </div>
  )
}
