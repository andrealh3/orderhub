import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/**
 * Componente para manejar la selección de opciones generales (productos, servicios, etc.).
 * 
 * @param {Array} props.options - Opciones disponibles para seleccionar (pueden ser productos, servicios, etc.).
 * @param {Array} props.selectedItems - Elementos actualmente seleccionados.
 * @param {Function} props.onChange - Función para manejar el cambio en la selección de opciones.
 */
export const SelectionDropdown = ({ label, options, selectedItems, onChange }) => {
  const handleItemSelection = (item) => {
    const itemExists = selectedItems.find(existingItem => existingItem.value === item.id);
    
    if (itemExists) {
      // Eliminar opción si ya está seleccionada
      const updatedItems = selectedItems.filter(existingItem => existingItem.value !== item.id);
      onChange(updatedItems);
    } else {
      // Agregar opción a la lista de seleccionados
      const updatedItems = [...selectedItems, item];
      onChange(updatedItems);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-custom">
        {selectedItems.length > 0 ? selectedItems.map(item => item.name).join(', ') : `${label}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item
            key={option.id}
            onClick={() => handleItemSelection(option)}
          >
            <img src={option.imagen} alt={option.label} style={{ width: '2rem', height: '2rem', marginRight: '1rem' }} />
            {option.nombre}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
