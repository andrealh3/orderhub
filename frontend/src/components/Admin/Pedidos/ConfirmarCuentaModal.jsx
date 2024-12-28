import { ModalBasic } from "../../Common/ModalBasic";
import { Button } from "react-bootstrap";

export const ConfirmarCuentaModal = ({ show, onClose, onConfirm }) => (
  <ModalBasic show={show} size="sm" onClose={onClose} title="Confirmar Generación de Cuenta">
    <p>¿Estás seguro de generar la cuenta de la mesa?</p>
    <div className="d-flex justify-content-end gap-2">
      <Button variant="secondary" onClick={onClose}>
        Cancelar
      </Button>
      <Button variant="primary" onClick={onConfirm}>
        Confirmar
      </Button>
    </div>
  </ModalBasic>
);