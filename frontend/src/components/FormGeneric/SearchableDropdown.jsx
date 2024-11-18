import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

/**
 * Componente para manejar un dropdown con búsqueda.
 * 
 * @param {Array} props.options - Opciones a mostrar en el dropdown.
 * @param {Function} props.onSelect - Función para manejar la opción seleccionada.
 */
export const SearchableDropdown = ({ label, options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);  // Estado para manejar la opción seleccionada

  const handleSearchChange = (e) => {
    // Permite modificar el valor de búsqueda solo si no se ha seleccionado una opción
    if (!selectedOption) {
      setSearchTerm(e.target.value);
    }
  };

  const handleSelect = (option) => {
    // Establece el valor de la opción seleccionada en el campo de búsqueda
    setSearchTerm(option.label);  
    setSelectedOption(option);  // Marca como seleccionada la opción
    onSelect(option);  // Llama a la función onSelect pasada como prop
  };

  const handleClearSelection = () => {
    onChange();
    setSearchTerm('');  // Limpia el campo de búsqueda
    setSelectedOption(null);  // Restablece la selección
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-searchable" disabled={selectedOption}>
        {selectedOption ? selectedOption.label : `Elige ${label}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Form.Control
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          disabled={selectedOption}  // Deshabilita el campo de búsqueda si ya se ha seleccionado una opción
        />
        {options
          .filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
      {selectedOption && (
        <button onClick={handleClearSelection} style={{ marginTop: '5px', padding: '5px' }}>
          Limpiar selección
        </button>
      )}
    </Dropdown>
  );
};
