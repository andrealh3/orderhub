import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

/**
 * Renderiza un dropdown con búsqueda basado en las opciones proporcionadas.
 * 
 * @param {Object} campo - Configuración del campo (name, label, options, onChange, etc.).
 * @param {Object} valoresFormulario - Valores actuales del formulario.
 * @returns {JSX.Element} El componente dropdown con búsqueda.
 */
export const SearchableDropdown = ( { campo, valoresFormulario } ) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // Estado para manejar la opción seleccionada

  const handleSearchChange = (e) => {
    // Permite modificar el valor de búsqueda solo si no se ha seleccionado una opción
    if (!selectedOption) {
      setSearchTerm(e.target.value);
    }
  };

  const handleSelect = (option) => {
    // Establece el valor de la opción seleccionada en el campo de búsqueda
    setSearchTerm(option.label);
    setSelectedOption(option); // Marca como seleccionada la opción
    campo.onChange([option]); // Llama a la función onChange proporcionada en el campo
  };

  const handleClearSelection = () => {
    setSearchTerm(''); // Limpia el campo de búsqueda
    setSelectedOption(null); // Restablece la selección
    campo.onChange([]); // Limpia la selección en el formulario
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id={`dropdown-${campo.name}`} disabled={selectedOption}>
        {selectedOption
          ? selectedOption.label
          : valoresFormulario[campo.name]?.map(
              (item) => item.label || item.nombre || item.value
            ).join(', ') || `${campo.label}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Form.Control
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          disabled={selectedOption} // Deshabilita la búsqueda si ya hay una opción seleccionada
        />
        {campo.options
          .filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label || option.nombre || option.value}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
      {selectedOption && (
        <button
          onClick={handleClearSelection}
          style={{ marginTop: '5px', padding: '5px' }}
        >
          Limpiar selección
        </button>
      )}
    </Dropdown>
  );
};
