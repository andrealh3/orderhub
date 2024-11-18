import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Componente para manejar los campos de tipo checkbox (`is_superuser`, `is_staff`).
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isSuperuser - El estado del checkbox `is_superuser`.
 * @param {boolean} props.isStaff - El estado del checkbox `is_staff`.
 * @param {Function} props.onChange - Función para manejar el cambio de valores.
 */
export const SuperuserStaffCheckbox = ({ isSuperuser, isStaff, onChange }) => {
  const handleSuperuserChange = (e) => {
    const { checked } = e.target;
    onChange({ is_superuser: checked, is_staff: checked ? true : isStaff });
  };

  return (
    <div>
      <Form.Check
        type="checkbox"
        label="Es superusuario"
        checked={isSuperuser}
        onChange={handleSuperuserChange}
      />
      <Form.Check
        type="checkbox"
        label="Es staff"
        checked={isStaff}
        onChange={(e) => onChange({ is_staff: e.target.checked })}
        disabled={isSuperuser}
      />
    </div>
  );
};
