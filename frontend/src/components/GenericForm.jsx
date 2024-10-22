import React, { useState, useEffect } from 'react';

/**
 * Componente para crear o actualizar un formulario genérico con campos dinámicos.
 * 
 * @param {Array} props.campos - Lista de objetos que describen los campos del formulario.
 * @param {boolean} props.loading - Estado que indica si el formulario está siendo enviado.
 * @param {function} props.onSubmit - Función que se ejecuta al enviar el formulario.
 * @param {string} props.infoBoton - Texto que se mostrará en el botón de envío del formulario.
 * @param {object} props.initialValues - Valores iniciales para actualizar el formulario (opcional).
 * 
 * @returns {JSX.Element} - Un formulario con campos definidos dinámicamente.
 */
export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {} }) => {
  // Estado para almacenar los valores del formulario, inicializado con initialValues
  const [valoresFormulario, setValoresFormulario] = useState(initialValues);

  // Actualiza los valores del formulario cuando initialValues cambia (para edición)
  useEffect(() => {
    if (Object.keys(initialValues).length > 0) {
      setValoresFormulario(initialValues);
    }
  }, [initialValues]);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setValoresFormulario((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));

    // Si se marca 'is_superuser', también marca 'is_staff'
    if (name === 'is_superuser' && checked === true) {
      setValoresFormulario((prev) => ({
        ...prev,
        is_staff: true,
      }));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(valoresFormulario);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {campos.map((campo) => (
        <div key={campo.name}>
          <label htmlFor={campo.name}>{campo.label}: </label>
          {campo.type === 'checkbox' ? (
            <input
              type="checkbox"
              name={campo.name}
              id={campo.name}
              checked={valoresFormulario[campo.name] || false}
              onChange={(e) => {
                handleChange(e);
                if (campo.onChange) campo.onChange(e);
              }}
              disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser}
            />
          ) : campo.type === 'file' ? (
            <input
              type="file"
              name={campo.name}
              id={campo.name}
              accept={campo.accept || 'image/*'}
              onChange={(e) => {
                handleChange(e);
                if (campo.onChange) campo.onChange(e);
              }}
            />
          ) : campo.type === 'select' ? (
            <div>
              <select
                name={campo.name}
                id={campo.name}
                value={valoresFormulario[campo.name] || ''}
                onChange={(e) => {
                  handleChange(e);
                  if (campo.onChange) campo.onChange(e);
                }}
              >
                <option value="">Seleccione una opción</option>
                {campo.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {campo.renderExtraAction && (
                <div>
                  {campo.renderExtraAction()}
                </div>
              )}
            </div>
          ) : (
            <input
              type={campo.type}
              name={campo.name}
              id={campo.name}
              value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
              onChange={(e) => {
                handleChange(e);
                if (campo.onChange) campo.onChange(e);
              }}
              readOnly={campo.readOnly}
            />
          )}
        </div>
      ))}
      <button type="submit" disabled={loading}>
        {infoBoton}
      </button>
    </form>
  );
};