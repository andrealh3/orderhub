import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

export const GenericForm = ({
  campos,
  loading,
  onSubmit,
  infoBoton,
  initialValues = {},
  nombreValoresFormularios = {},
  onChange,
  disabled
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  // Manejar cambios en los campos
  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (onChange) {
      onChange(name, value); // Llamamos a la función onChange externa
    }
  };

  // Renderizar un campo según su tipo
  const renderField = (campo) => {
    const { name, label, type, options, searchable, placeholder, accept } = campo;

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
        return renderTextField(name, label, type);
      case 'number':
        return renderNumberField(name, label);
      case 'file':
        return renderFileField(name, label, accept);
      case 'checkbox':
        return renderCheckboxField(name, label);
      case 'select':
        return renderSelectField(name, label, options);
      case 'dropdown':
        return renderDropdownField(name, label, options, searchable, placeholder);
      default:
        return null;
    }
  };

  // Renderizar campo de texto
  const renderTextField = (name, label, type) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={formValues[name] || ''}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={label}
      />
    </Form.Group>
  );

  // Renderizar campo numérico
  const renderNumberField = (name, label) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        value={formValues[name] || ''}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={label}
      />
    </Form.Group>
  );

  // Renderizar campo de archivo
  const renderFileField = (name, label, accept) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        accept={accept}
        onChange={(e) => handleInputChange(name, e.target.files[0])}
      />
    </Form.Group>
  );

  // Renderizar checkbox
  const renderCheckboxField = (name, label) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Check
        type="checkbox"
        label={label}
        checked={formValues[name] || false}
        onChange={(e) => handleInputChange(name, e.target.checked)}
      />
    </Form.Group>
  );

  // Renderizar campo de selección (select)
  const renderSelectField = (name, label, options) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={formValues[name] || ''}
        onChange={(e) => handleInputChange(name, e.target.value)}
      >
        <option value="">Selecciona una opción</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );

  // Renderizar dropdown con react-select
  const renderDropdownField = (name, label, options, searchable) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Label>{label}</Form.Label>
      {searchable ? (
        <Select
          value={formValues[name] || ''}
          onChange={(selectedOption) => {
            // Si se deselecciona, restablecer el valor a null o vacío
            handleInputChange(name, selectedOption);
            if (selectedOption && nombreValoresFormularios === 'detalles_pedido') {
              handleInputChange(name, null); // Limpiamos el select después de la selección
            }
          }}
          options={options}
          placeholder={`Seleccione ${label.toLowerCase()}`}
          isSearchable={true}
          isClearable
        />
      ) : (
        <Select
          value={formValues[name] || ''}
          onChange={(selectedOption) => handleInputChange(name, selectedOption)}
          options={options}
          placeholder={placeholder}
          isSearchable={false}
          isClearable
        />
      )}
    </Form.Group>
  );

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {campos.map((campo) => renderField(campo))}
      {campos.renderExtraAction && (
        <div className="extra-actions">
          {renderExtraAction()}
        </div>
      )}
      <Button variant="primary" type="submit" disabled={disabled}>
        {infoBoton}
      </Button>
    </Form>
  );
};