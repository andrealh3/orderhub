import { Button } from 'react-bootstrap';

export const HeaderPage = ({ title, btnNuevo, btnClickNuevo }) => {

  return (
    <div>
      <h2>{ title }</h2>
      <div>
        { btnNuevo && (
          <Button variant="primary" onClick={ btnClickNuevo }>{ btnNuevo }</Button>
        ) }
      </div>
    </div>
  )
}
