import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SelectionDropdown } from './SelectionDropdown';  // Producto Selección
import { SuperuserStaffCheckbox } from './SuperuserStaffCheckbox'; // Superuser / Staff Checkbox
import { FileUpload } from './FileUpload';  // Carga de archivos
import { SearchableDropdown } from './SearchableDropdown';  // Dropdown con búsqueda
import "../../styles/LoginForm.scss";

export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {}, nombreValoresFormularios = "", onChange }) => {
  const [valoresFormulario, setValoresFormulario] = useState(initialValues);
  useEffect(() => {
    if (Object.keys(initialValues).length > 0) {
      setValoresFormulario(initialValues);
    }
  }, [initialValues]);

  useEffect(() => {
    if (nombreValoresFormularios !== "") {
      const { password, ...rest } = valoresFormulario;
      sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(rest));
    }
  }, [valoresFormulario]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setValoresFormulario((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(valoresFormulario);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {campos.map((campo) => (
        <Form.Group key={campo.name} controlId={campo.name}>
          {(campo.type !=='dropdown' && campo.type !== 'select') && <Form.Label>{campo.label}</Form.Label>}

          {campo.type === 'checkbox' ? (
            <Form.Check
              type="checkbox"
              name={campo.name}
              checked={valoresFormulario[campo.name] || false}
              onChange={(e) => {
                handleChange(e);
                if (campo.onChange) campo.onChange(e);
              }}
              label={campo.label}
            />
          ) : campo.type === 'file' ? (
            <FileUpload
              name={campo.name}
              accept={campo.accept}
              onChange={(e) => {
                handleChange(e);
                if (campo.onChange) campo.onChange(e);
              }}
            />
          ) : campo.type === 'select' ? (
            <SearchableDropdown
              campo={campo}
              valoresFormulario={valoresFormulario}
            />
          ) : campo.type === 'dropdown' && campo.searchable ? (
            <SelectionDropdown
              label={campo.label}
              options={campo.options}
              selectedItems={valoresFormulario[campo.name] || []}
              onChange={onChange}
            />
          ) : campo.name === 'is_superuser' || campo.name === 'is_staff' ? (
            <SuperuserStaffCheckbox
              isSuperuser={valoresFormulario.is_superuser || false}
              isStaff={valoresFormulario.is_staff || false}
              onChange={(newState) => setValoresFormulario({ ...valoresFormulario, ...newState })}
            />
          ) : (
            <Form.Control
              type={campo.type}
              name={campo.name}
              value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
              onChange={(e) => {
                handleChange(e);
                if (campo.onChange) campo.onChange(e);
              }}
              readOnly={campo.readOnly}
              className='mb-4 text-center'
            />
          )}
          {campo.renderExtraAction && campo.renderExtraAction()}
        </Form.Group>
      ))}

      <Button type="submit" disabled={loading} variant="primary">
        {infoBoton}
      </Button>
    </Form>
  );
};


// import React, { useState, useEffect } from 'react';
// import { Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
// import { Search } from 'react-bootstrap-icons';

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
// export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {}, nombreValoresFormularios = "", onChange }) => {
//   const [valoresFormulario, setValoresFormulario] = useState(initialValues);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   useEffect(() => {
//     if (Object.keys(initialValues).length > 0) {
//       setValoresFormulario(initialValues);
//     }
//   }, [initialValues]);

//   useEffect(() => {
//     const { password, ...rest } = valoresFormulario;
//     sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(rest));
//   }, [valoresFormulario]);

//   const handleChange = (e) => {
//     const { name, type, value, checked, files } = e.target;

//     setValoresFormulario((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
//     }));

//     if (name === 'is_superuser' && checked === true) {
//       setValoresFormulario((prev) => ({
//         ...prev,
//         is_staff: true,
//       }));
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(valoresFormulario);
//   };

//   // Custom Toggle for Dropdown
//   const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <a
//       href=""
//       ref={ref}
//       onClick={(e) => {
//         e.preventDefault();
//         onClick(e);
//       }}
//     >
//       {children} &#x25bc;
//     </a>
//   ));

//   // Custom Menu for Dropdown with Search
//   const CustomMenu = React.forwardRef(
//     ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
//       const [value, setValue] = useState('');

//       return (
//         <div
//           ref={ref}
//           style={style}
//           className={className}
//           aria-labelledby={labeledBy}
//         >
//           <Form.Control
//             autoFocus
//             className="mx-3 my-2 w-auto"
//             placeholder="Buscar..."
//             onChange={(e) => setValue(e.target.value)}
//             value={value}
//           />
//           <ul className="list-unstyled">
//             {React.Children.toArray(children).filter(
//               (child) =>
//                 !value || child.props.children.toLowerCase().startsWith(value),
//             )}
//           </ul>
//         </div>
//       );
//     },
//   );

//   return (
//     <Form onSubmit={handleSubmit} encType="multipart/form-data">
//       {campos.map((campo) => (
//         <Form.Group key={campo.name} controlId={campo.name}>
//           {!campo.searchable && <Form.Label>{campo.label}</Form.Label>}
//           {campo.type === 'checkbox' ? (
//             <Form.Check
//               type="checkbox"
//               name={campo.name}
//               checked={valoresFormulario[campo.name] || false}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser}
//               label={campo.label}
//             />
//           ) : campo.type === 'file' ? (
//             <Form.Control
//               type="file"
//               name={campo.name}
//               accept={campo.accept || 'image/*'}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//             />
//           ) : campo.type === 'select' ? (
//             <div>
//               {campo.searchable ? (
//                 <Dropdown>
//                 <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
//                   {valoresFormulario[campo.name] && valoresFormulario[campo.name].length > 0
//                     ? valoresFormulario[campo.name].map((item) => (
//                         <div key={item.value}>
//                           {item.label || item.nombre || item.value} {/* Mostrar el label o cualquier otra propiedad relevante */}
//                         </div>
//                       ))
//                     : `${campo.label}`}
//                 </Dropdown.Toggle>
            
//                 <Dropdown.Menu as={CustomMenu}>
//                   {campo.options?.map((option) => (
//                     <Dropdown.Item
//                       key={option.value}
//                       eventKey={option.value}
//                       onClick={() => campo.onChange([option])}  // Llamada directa a `onChange` con el elemento seleccionado
//                     >
//                       {/* Puedes renderizar cualquier propiedad del objeto completo */}
//                       {option.label || option.nombre || option.value} {/* Muestra la propiedad más relevante */}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             ) : (
//               <Form.Control
//                 as="select"
//                 name={campo.name}
//                 value={valoresFormulario[campo.name] || ''}
//                 onChange={(e) => {
//                   handleChange(e);
//                   if (campo.onChange) campo.onChange(e);
//                 }}
//               >
//                 <option value="">Seleccione una opción</option>
//                 {campo.options?.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label || option.nombre || option.value} {/* Muestra la propiedad más relevante */}
//                   </option>
//                 ))}
//               </Form.Control>
//               )}
//             </div>
//           ) : (
//             <Form.Control
//               type={campo.type}
//               name={campo.name}
//               value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               readOnly={campo.readOnly}
//             />
//           )}
//           {campo.renderExtraAction && campo.renderExtraAction()}
//         </Form.Group>
//       ))}
//       <Button type="submit" disabled={loading} variant="primary">
//         {infoBoton}
//       </Button>
//     </Form>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import { Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
// import { Search } from 'react-bootstrap-icons';

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
// export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {}, nombreValoresFormularios = "", onChange }) => {
//   const [valoresFormulario, setValoresFormulario] = useState(initialValues);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   useEffect(() => {
//     if (Object.keys(initialValues).length > 0) {
//       setValoresFormulario(initialValues);
//     }
//   }, [initialValues]);

//   useEffect(() => {
//     const { password, ...rest } = valoresFormulario;
//     sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(rest));
//   }, [valoresFormulario]);

//   const handleChange = (e) => {
//     const { name, type, value, checked, files } = e.target;

//     setValoresFormulario((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
//     }));

//     if (name === 'is_superuser' && checked === true) {
//       setValoresFormulario((prev) => ({
//         ...prev,
//         is_staff: true,
//       }));
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(valoresFormulario);
//   };

//   // Custom Toggle for Dropdown
//   const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <a
//       href=""
//       ref={ref}
//       onClick={(e) => {
//         e.preventDefault();
//         onClick(e);
//       }}
//     >
//       {children} &#x25bc;
//     </a>
//   ));

//   // Custom Menu for Dropdown with Search
//   const CustomMenu = React.forwardRef(
//     ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
//       const [value, setValue] = useState('');

//       return (
//         <div
//           ref={ref}
//           style={style}
//           className={className}
//           aria-labelledby={labeledBy}
//         >
//           <Form.Control
//             autoFocus
//             className="mx-3 my-2 w-auto"
//             placeholder="Buscar..."
//             onChange={(e) => setValue(e.target.value)}
//             value={value}
//           />
//           <ul className="list-unstyled">
//             {React.Children.toArray(children).filter(
//               (child) =>
//                 !value || child.props.children.toLowerCase().startsWith(value),
//             )}
//           </ul>
//         </div>
//       );
//     },
//   );

//   // Función para manejar la adición de productos seleccionados
//   const handleProductSelection = (producto) => {
//     // Obtener productos seleccionados del estado
//     const selectedProducts = valoresFormulario.productos || [];
  
//     // Comprobar si el producto ya está seleccionado
//     const productoExistente = selectedProducts.find(item => item.value === producto.value);
  
//     if (productoExistente) {
//       // Si ya está seleccionado, lo eliminamos de la lista
//       const updatedProducts = selectedProducts.filter((item) => item.value !== producto.value);
//       setValoresFormulario((prev) => ({
//         ...prev,
//         productos: updatedProducts,
//       }));
//       onChange(updatedProducts); // Pasamos el array actualizado de productos seleccionados al componente padre
//     } else {
//       // Si no está seleccionado, lo agregamos
//       const updatedProducts = [...selectedProducts, { id: producto.value, imagen: producto.imagen, nombre: producto.label, cantidad:1 }];
//       setValoresFormulario((prev) => ({
//         ...prev,
//         productos: updatedProducts,
//       }));
//       onChange(updatedProducts); // Pasamos el array actualizado de productos seleccionados al componente padre
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} encType="multipart/form-data">
//       {campos.map((campo) => (
//         <Form.Group key={campo.name} controlId={campo.name}>
//           <Form.Label>{campo.label}</Form.Label>
//           {campo.type === 'checkbox' ? (
//             <Form.Check
//               type="checkbox"
//               name={campo.name}
//               checked={valoresFormulario[campo.name] || false}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser}
//               label={campo.label}
//             />
//           ) : campo.type === 'file' ? (
//             <Form.Control
//               type="file"
//               name={campo.name}
//               accept={campo.accept || 'image/*'}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//             />
//           ) : campo.type === 'select' ? (
//             <div>
//               {campo.searchable ? (
//                 <Dropdown>
//                   <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
//                     {valoresFormulario.productos && valoresFormulario.productos.length > 0
//                     ? valoresFormulario.productos.map((producto) => (
//                         <div key={producto.id}>
//                           <img src={producto.imagen} alt={producto.nombre} />
//                           {producto.nombre}
//                         </div>
//                       ))
//                     : 'Seleccione productos'}
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu as={CustomMenu}>
//                     {campo.options?.map((option) => (
//                       <Dropdown.Item
//                         key={option.value}
//                         eventKey={option.value}
//                         onClick={() => handleProductSelection(option)}
//                       >
//                         <img src={option.imagen} alt={option.label} style={{ width: '2rem', height: '2rem', marginRight: '1rem' }} />
//                         {option.label}
//                       </Dropdown.Item>
//                     ))}
//                   </Dropdown.Menu>
//                 </Dropdown>
//               ) : (
//                 <Form.Control
//                   as="select"
//                   name={campo.name}
//                   value={valoresFormulario[campo.name] || ''}
//                   onChange={(e) => {
//                     handleChange(e);
//                     if (campo.onChange) campo.onChange(e);
//                   }}
//                 >
//                   <option value="">Seleccione una opción</option>
//                   {campo.options?.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </Form.Control>
//               )}
//             </div>
//           ) : (
//             <Form.Control
//               type={campo.type}
//               name={campo.name}
//               value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               readOnly={campo.readOnly}
//             />
//           )}
//           {campo.renderExtraAction && campo.renderExtraAction()}
//         </Form.Group>
//       ))}
//       <Button type="submit" disabled={loading} variant="primary">
//         {infoBoton}
//       </Button>
//     </Form>
//   );
// };





// import React, { useState, useEffect } from 'react';
// import { Form, Button, InputGroup } from 'react-bootstrap';
// import { Search } from 'react-bootstrap-icons';

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
// export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {}, nombreValoresFormularios = "" }) => {
//   const [valoresFormulario, setValoresFormulario] = useState(initialValues);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     if (Object.keys(initialValues).length > 0) {
//       setValoresFormulario(initialValues);
//     }
//   }, [initialValues]);

//   useEffect(() => {
//     const { password, ...rest } = valoresFormulario;
//     sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(rest));
//   }, [valoresFormulario]);

//   const handleChange = (e) => {
//     const { name, type, value, checked, files } = e.target;

//     setValoresFormulario((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
//     }));

//     if (name === 'is_superuser' && checked === true) {
//       setValoresFormulario((prev) => ({
//         ...prev,
//         is_staff: true,
//       }));
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(valoresFormulario);
//   };

//   return (
//     <Form onSubmit={handleSubmit} encType="multipart/form-data">
//       {campos.map((campo) => (
//         <Form.Group key={campo.name} controlId={campo.name}>
//           <Form.Label>{campo.label}</Form.Label>
//           {campo.type === 'checkbox' ? (
//             <Form.Check
//               type="checkbox"
//               name={campo.name}
//               checked={valoresFormulario[campo.name] || false}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser}
//               label={campo.label}
//             />
//           ) : campo.type === 'file' ? (
//             <Form.Control
//               type="file"
//               name={campo.name}
//               accept={campo.accept || 'image/*'}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//             />
//           ) : campo.type === 'select' ? (
//             <div>
//               {campo.searchable ? (
//                 <>
//                   <InputGroup className="mb-2">
//                     <Form.Control
//                       type="text"
//                       placeholder="Buscar..."
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                     />
//                     <InputGroup.Text>
//                       <Search />
//                     </InputGroup.Text>
//                   </InputGroup>
                  
//                   <Form.Control
//                     as="select"
//                     name={campo.name}
//                     value={valoresFormulario[campo.name] || ''}
//                     onChange={(e) => {
//                       handleChange(e);
//                       if (campo.onChange) campo.onChange(e);
//                     }}
//                   >
//                     <option value="">Seleccione una opción</option>
//                     {campo.options?.filter(option =>
//                       option.label.toLowerCase().includes(searchTerm.toLowerCase())
//                     ).map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </>
//               ) : (
//                 <Form.Control
//                   as="select"
//                   name={campo.name}
//                   value={valoresFormulario[campo.name] || ''}
//                   onChange={(e) => {
//                     handleChange(e);
//                     if (campo.onChange) campo.onChange(e);
//                   }}
//                 >
//                   <option value="">Seleccione una opción</option>
//                   {campo.options?.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </Form.Control>
//               )}
//             </div>
//           ) : (
//             <Form.Control
//               type={campo.type}
//               name={campo.name}
//               value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               readOnly={campo.readOnly}
//             />
//           )}
//           {campo.renderExtraAction && campo.renderExtraAction()}
//         </Form.Group>
//       ))}
//       <Button type="submit" disabled={loading} variant="primary">
//         {infoBoton}
//       </Button>
//     </Form>
//   );
// };




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
// export const GenericForm = ({ campos, loading, onSubmit, infoBoton, initialValues = {}, nombreValoresFormularios = "" }) => {
//   // Estado para almacenar los valores del formulario, inicializado con initialValues
//   const [valoresFormulario, setValoresFormulario] = useState(initialValues);

//   // Actualiza los valores del formulario cuando initialValues cambia (para edición)
//   useEffect(() => {
//     if (Object.keys(initialValues).length > 0) {
//       setValoresFormulario(initialValues);
//     }
//   }, [initialValues]);

//   // Almacena los valores del formulario en sessionStorage, excluyendo la contraseña
//   useEffect(() => {
//     const { password, ...rest } = valoresFormulario; // Excluyendo el campo de password
//     sessionStorage.setItem(nombreValoresFormularios, JSON.stringify(rest)); // Guardar en sessionStorage
//   }, [valoresFormulario]);

//   // Maneja el cambio en los campos del formulario
//   const handleChange = (e) => {
//     const { name, type, value, checked, files } = e.target;

//     setValoresFormulario((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
//     }));

//     // Si se marca 'is_superuser', también marca 'is_staff'
//     if (name === 'is_superuser' && checked === true) {
//       setValoresFormulario((prev) => ({
//         ...prev,
//         is_staff: true,
//       }));
//     }
//   };

//   // Maneja el envío del formulario
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(valoresFormulario);
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       {campos.map((campo) => (
//         <div key={campo.name}>
//           <label htmlFor={campo.name}>{campo.label}: </label>
//           {campo.type === 'checkbox' ? (
//             <input
//               type="checkbox"
//               name={campo.name}
//               id={campo.name}
//               checked={valoresFormulario[campo.name] || false}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser}
//             />
//           ) : campo.type === 'file' ? (
//             <input
//               type="file"
//               name={campo.name}
//               id={campo.name}
//               accept={campo.accept || 'image/*'}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//             />
//           ) : campo.type === 'select' ? (
//             <div>
//               <select
//                 name={campo.name}
//                 id={campo.name}
//                 value={valoresFormulario[campo.name] || ''}
//                 onChange={(e) => {
//                   handleChange(e);
//                   if (campo.onChange) campo.onChange(e);
//                 }}
//               >
//                 <option value="">Seleccione una opción</option>
//                 {campo.options?.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               {campo.renderExtraAction && (
//                 <div>
//                   {campo.renderExtraAction()}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <input
//               type={campo.type}
//               name={campo.name}
//               id={campo.name}
//               value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               readOnly={campo.readOnly}
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
//   // Estado para almacenar los valores del formulario, inicializado con initialValues
//   const [valoresFormulario, setValoresFormulario] = useState(initialValues);

//   // Actualiza los valores del formulario cuando initialValues cambia (para edición)
//   useEffect(() => {
//     if (Object.keys(initialValues).length > 0) {
//       setValoresFormulario(initialValues);
//     }
//   }, []);

//   // Maneja el cambio en los campos del formulario
//   const handleChange = (e) => {
//     const { name, type, value, checked, files } = e.target;

//     setValoresFormulario((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
//     }));

//     // Si se marca 'is_superuser', también marca 'is_staff'
//     if (name === 'is_superuser' && checked === true) {
//       setValoresFormulario((prev) => ({
//         ...prev,
//         is_staff: true,
//       }));
//     }
//   };

//   // Maneja el envío del formulario
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(valoresFormulario);
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       {campos.map((campo) => (
//         <div key={campo.name}>
//           <label htmlFor={campo.name}>{campo.label}: </label>
//           {campo.type === 'checkbox' ? (
//             <input
//               type="checkbox"
//               name={campo.name}
//               id={campo.name}
//               checked={valoresFormulario[campo.name] || false}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               disabled={campo.name === 'is_staff' && valoresFormulario.is_superuser}
//             />
//           ) : campo.type === 'file' ? (
//             <input
//               type="file"
//               name={campo.name}
//               id={campo.name}
//               accept={campo.accept || 'image/*'}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//             />
//           ) : campo.type === 'select' ? (
//             <div>
//               <select
//                 name={campo.name}
//                 id={campo.name}
//                 value={valoresFormulario[campo.name] || ''}
//                 onChange={(e) => {
//                   handleChange(e);
//                   if (campo.onChange) campo.onChange(e);
//                 }}
//               >
//                 <option value="">Seleccione una opción</option>
//                 {campo.options?.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               {campo.renderExtraAction && (
//                 <div>
//                   {campo.renderExtraAction()}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <input
//               type={campo.type}
//               name={campo.name}
//               id={campo.name}
//               value={campo.value ? campo.value : valoresFormulario[campo.name] || ''}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (campo.onChange) campo.onChange(e);
//               }}
//               readOnly={campo.readOnly}
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