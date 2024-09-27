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
  // Estado para almacenar los valores del formulario, inicializado con `initialValues`
  const [valoresFormulario, setValoresFormulario] = useState(initialValues);

  // Actualiza los valores del formulario cuando `initialValues` cambia (para edición)
  useEffect(() => {
    // Asegura que solo se actualicen los valores del formulario si hay datos en initialValues
    if (Object.keys(initialValues).length > 0) {
      setValoresFormulario(initialValues);
    }
  }, [initialValues]);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    // Maneja la entrada de archivos
    if (type === 'file') {
      setValoresFormulario({
        ...valoresFormulario,
        [name]: files[0], // Guarda el archivo seleccionado
      });
    } else {
      setValoresFormulario({
        ...valoresFormulario,
        [name]: type === 'checkbox' ? checked : value, // Maneja el checkbox como booleano
      });
    }

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
    <form onSubmit={handleSubmit}>
      {campos.map((campo) => (
        <div key={campo.name}>
          <label htmlFor={campo.name}>{campo.label}: </label>
          {campo.type === 'checkbox' ? (
            <input
              type="checkbox"
              name={campo.name}
              id={campo.name}
              checked={valoresFormulario[campo.name] || false}
              onChange={handleChange}
              disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser} // Deshabilita si es superusuario
            />
          ) : (
            <input
              type={campo.type}
              name={campo.name}
              id={campo.name}
              value={campo.type === 'file' ? undefined : valoresFormulario[campo.name] || ''}
              onChange={handleChange}
              accept={campo.type === 'file' ? 'image/*' : undefined} // Acepta solo imágenes si es tipo file
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







// import React, { useState, useEffect } from 'react';

// /**
//  * Componente para crear o actualizar un formulario genérico con campos dinámicos.
//  * 
//  * @param {Array} props.campos - Lista de objetos que describen los campos del formulario.
//  * @param {boolean} props.loading - Estado que indica si el formulario está siendo enviado.
//  * @param {function} props.onSubmit - Función que se ejecuta al enviar el formulario.
//  * @param {string} props.infoBoton - Texto que se mostrará en el botón de envío del formulario.
//  * @param {object} props.initialValues - Valores iniciales para actualizar el formulario (opcional).
//  * 
//  * @returns {JSX.Element} - Un formulario con campos definidos dinámicamente.
//  */
// export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {} }) => {
//   // Estado para almacenar los valores del formulario, inicializado con `initialValues`
//   const [valoresFormulario, setValoresFormulario] = useState(initialValues);

//   // Actualiza los valores del formulario cuando `initialValues` cambia (para edición)
//   useEffect(() => {
//     // Asegura que solo se actualicen los valores del formulario si hay datos en initialValues
//     if (Object.keys(initialValues).length > 0) {
//       setValoresFormulario(initialValues);
//     }
//   }, [initialValues]);

//   // Maneja el cambio en los campos del formulario
//   const handleChange = (e) => {
//     const { name, type, value, checked } = e.target;
    
//     // setValoresFormulario({
//     //   ...valoresFormulario,
//     //   [name]: type === 'checkbox' ? checked : value, // Maneja el checkbox como booleano
//     // });
//     let nuevosValores = {
//       ...valoresFormulario,
//       [name]: type === 'checkbox' ? checked : value, // Maneja el checkbox como booleano
//     };

//     // Si se marca 'is_superuser', también marca 'is_staff'
//     if (name === 'is_superuser' && checked === true) {
//       nuevosValores.is_staff = true;
//     }

//     setValoresFormulario(nuevosValores);
//   };

//   // Maneja el envío del formulario
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(valoresFormulario);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {campos.map((campo) => (
//         <div key={campo.name}>
//           <label htmlFor={campo.name}>{campo.label}: </label>
//           {campo.type === 'checkbox' ? (
//             <input
//               type="checkbox"
//               name={campo.name}
//               id={campo.name}
//               checked={valoresFormulario[campo.name] || false}
//               onChange={handleChange}
//               disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser} // Deshabilita si es superusuario
//             />
//           ) : (
//             <input
//               type={campo.type}
//               name={campo.name}
//               id={campo.name}
//               value={valoresFormulario[campo.name] || ''}
//               onChange={handleChange}
//             />
//           )}
//         </div>
//       ))}
//       <button type="submit" disabled={loading}>
//         {infoBoton}
//       </button>
//     </form>
//   );
// };
