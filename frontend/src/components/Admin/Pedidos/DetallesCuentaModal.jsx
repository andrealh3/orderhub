import React from 'react';
import { ModalBasic } from './ModalBasic'; // Asegúrate de usar la ruta correcta al componente ModalBasic.

export const DetallesCuentaModal = ({ show, onClose, mesa, formaPago, total }) => {
  return (
    <ModalBasic show={show} size="md" title={`Detalles de la Mesa ${mesa?.numero || ''}`} onClose={onClose}>
      <div>
        <p><strong>Mesa:</strong> {mesa?.numero || 'Sin asignar'}</p>
        <p><strong>Forma de Pago:</strong> {formaPago || 'No definida'}</p>
        <p><strong>Total:</strong> ${total?.toFixed(2) || '0.00'}</p>
      </div>
    </ModalBasic>
  );
};