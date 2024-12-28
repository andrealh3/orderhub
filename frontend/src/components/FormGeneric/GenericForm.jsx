import React, { useEffect, useState } from 'react';
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
  const [valoresFormulario, setValoresFormulario] = useState(initialValues);

  useEffect(() => {
    const { password, ...rest } = valoresFormulario; // Excluyendo el campo de password
    if (nombreValoresFormularios === "") {
      sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(rest));
    } // Guardar en sessionStorage
  }, [valoresFormulario]);

  // Manejar cambios en los campos
  const handleInputChange = (name, value) => {
    setValoresFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (onChange) {
      onChange(name, value); // Llamamos a la función onChange externa
    }
  };

  // Renderizar un campo según su tipo
  const renderField = (campo) => {
    const { name, label, type, options, searchable, placeholder, accept, onchange } = campo;

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
        return renderTextField(name, label, type);
      case 'number':
        return renderNumberField(name, label);
      case 'file':
        return renderFileField(name, label, accept, onchange);
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
        value={valoresFormulario[name] || ''}
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
        value={valoresFormulario[name] || ''}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={label}
      />
    </Form.Group>
  );

  // Renderizar campo de archivo
  const renderFileField = (name, label, accept, onchange) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        accept={accept}
        onChange={(e) => {
          handleInputChange(name, e.target.files[0])
          if (onchange) onchange(e)
        }}
      />
    </Form.Group>
  );

  // Renderizar checkbox
  const renderCheckboxField = (name, label) => (
    <Form.Group as={Col} controlId={name} key={name}>
      <Form.Check
        type="checkbox"
        label={label}
        checked={valoresFormulario[name] || false}
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
        value={valoresFormulario[name] || ''}
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
          value={valoresFormulario[name] || ''}
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
          value={valoresFormulario[name] || ''}
          onChange={(selectedOption) => handleInputChange(name, selectedOption)}
          options={options}
          // placeholder={placeholder}
          isSearchable={false}
          isClearable
        />
      )}
    </Form.Group>
  );

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(valoresFormulario);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {campos.map((campo) => renderField(campo))}
      {campos
      .filter(campo => campo.renderExtraAction)  // Filtramos los campos que tienen `renderExtraAction`
      .map((campo, index) => (
        <div key={index} className="extra-actions">
          {campo.renderExtraAction()}  {/* Llamamos a la función `renderExtraAction` */}
        </div>
      ))}
      <Button variant="primary" type="submit" disabled={disabled}>
        {infoBoton}
      </Button>
    </Form>
  );
};