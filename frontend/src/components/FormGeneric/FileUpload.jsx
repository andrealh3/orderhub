import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Componente para manejar la carga de archivos.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.name - El nombre del campo del archivo.
 * @param {string} props.accept - Tipos de archivos permitidos.
 * @param {Function} props.onChange - Función para manejar el cambio de archivo.
 */
export const FileUpload = ({ name, accept, onChange }) => {
  return (
    <Form.Control
      type="file"
      name={name}
      accept={accept || 'image/*'}
      onChange={onChange}
    />
  );
};
