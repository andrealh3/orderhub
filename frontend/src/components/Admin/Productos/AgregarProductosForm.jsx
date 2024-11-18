import { useEffect, useState } from "react";
import { GenericForm } from "../../FormGeneric/GenericForm";
import { useCategorias } from "../../../hooks/useCategorias";
import { useProductos } from "../../../hooks/useProductos";

export const AgregarProductosForm = ({ onClose, onRefresh, producto, agregarCategoria, nombreValoresFormularios }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(producto?.imagen || null);
  const [imagenFile, setImagenFile] = useState(null);

  const { categorias } = useCategorias();
  const { agregarProducto, actualizarProducto } = useProductos();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImagenFile(file);
    }
  };

  const campos = [
    { name: "imagen", label: "Imagen", type: "file", accept: "image/*", onChange: handleImageChange },
    { name: "nombre", label: "Nombre del producto", type: "text" },
    { name: "descripcion", label: "Descripción del producto", type: "text" },
    { name: "precio", label: "Precio", type: "number" },
    { name: "activo", label: "Activo", type: "checkbox" },
    { 
      name: "categoria", 
      label: "Categoría", 
      type: "select", 
      options: categorias.map(categoria => ({ value: categoria.id, label: categoria.nombre })),
      renderExtraAction: () => (
        <button type="button" onClick={() => {
          onClose();
          agregarCategoria();
        }}>
          Nueva categoría
        </button>
      )
    }
  ];

  const handleSubmit = async (valores) => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("nombre", valores.nombre);
    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }
    formData.append("descripcion", valores.descripcion);
    formData.append("precio", valores.precio);
    formData.append("activo", valores.activo ? "true" : "false");
    if (valores.categoria) {
      formData.append("categoria", parseInt(valores.categoria));
    }

    try {
      if (producto) {
        await actualizarProducto(producto.id, formData);
      } else {
        await agregarProducto(formData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      setError(error.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? "Cargando..." : producto ? "Actualizar producto" : "Crear producto"}
          initialValues={initialValues(producto)}
          nombreValoresFormularios={nombreValoresFormularios}
        />
      </div>
      {previewImage && (
        <div>
          <img src={previewImage} alt="Previsualización" style={{ maxWidth: "50%", marginTop: "10px" }} />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
    </>
  );
};

// Valores iniciales del formulario
const initialValues = (producto) => {
  return {
    imagen: producto?.imagen || null,
    nombre: producto?.nombre || "",
    descripcion: producto?.descripcion || "",
    precio: producto?.precio || "",
    activo: producto?.activo ?? true,
    categoria: producto?.categoria || null
  };
};

// import { useEffect, useState } from "react";
// import { GenericForm } from "../../GenericForm";
// import { useCategorias } from "../../../hooks/useCategorias";
// import { useProductos } from "../../../hooks/useProductos";

// export const AgregarProductosForm = ({ onClose, onRefresh, producto, mostrarModal, nombreValoresFormularios }) => {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(producto?.imagen || null);
//   const [imagenFile, setImagenFile] = useState(null);

//   const { categorias } = useCategorias();
//   const { agregarProducto, actualizarProducto } = useProductos();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreviewImage(URL.createObjectURL(file));
//       setImagenFile(file);
//     }
//   };

//   const campos = [
//     { name: "imagen", label: "Imagen", type: "file", accept: "image/*", onChange: handleImageChange },
//     { name: "nombre", label: "Nombre del producto", type: "text" },
//     { name: "descripcion", label: "Descripción del producto", type: "text" },
//     { name: "precio", label: "Precio", type: "number" },
//     { name: "activo", label: "Activo", type: "checkbox" },
//     { 
//       name: "categoria", 
//       label: "Categoría", 
//       type: "select", 
//       options: categorias.map(categoria => ({ value: categoria.id, label: categoria.nombre })),
//       renderExtraAction: () => (
//         <button type="button" onClick={() => {
//           onClose();
//           mostrarModal();
//         }}>
//           Nueva categoría
//         </button>
//       )
//     }
//   ];

//   const handleSubmit = async (valores) => {
//     setLoading(true);
//     setError("");

//     const formData = new FormData();
//     formData.append("nombre", valores.nombre);
//     if (imagenFile) {
//       formData.append("imagen", imagenFile);
//     }
//     formData.append("descripcion", valores.descripcion);
//     formData.append("precio", valores.precio);
//     formData.append("activo", valores.activo ? "true" : "false");
//     if (valores.categoria) {
//       formData.append("categoria", parseInt(valores.categoria));
//     }

//     try {
//       if (producto) {
//         await actualizarProducto(producto.id, formData);
//       } else {
//         await agregarProducto(formData);
//       }
//       onRefresh();
//       onClose();
//     } catch (error) {
//       setError(error.message || "Error al procesar la solicitud");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div>
//         <GenericForm
//           campos={campos}
//           loading={loading}
//           onSubmit={handleSubmit}
//           infoBoton={loading ? "Cargando..." : producto ? "Actualizar producto" : "Crear producto"}
//           initialValues={initialValues(producto)}
//           nombreValoresFormularios={nombreValoresFormularios}
//         />
//       </div>
//       {previewImage && (
//         <div>
//           <img src={previewImage} alt="Previsualización" style={{ maxWidth: "50%", marginTop: "10px" }} />
//         </div>
//       )}
//       {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
//     </>
//   );
// };

// // Valores iniciales del formulario
// const initialValues = (producto) => {
//   return {
//     imagen: producto?.imagen || null,
//     nombre: producto?.nombre || "",
//     descripcion: producto?.descripcion || "",
//     precio: producto?.precio || "",
//     activo: producto?.activo ?? true,
//     categoria: producto?.categoria || null
//   };
// };
