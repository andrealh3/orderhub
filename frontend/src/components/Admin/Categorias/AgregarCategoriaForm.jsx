import { useEffect, useState } from "react";
import { GenericForm } from "../../FormGeneric/GenericForm";
import { useCategorias } from "../../../hooks/useCategorias"; // Asegúrate de que la ruta sea correcta

export const AgregarCategoriaForm = ({ onClose, onRefresh, categoria, nombreValoresFormularios }) => {
  const { agregarCategoria, actualizarCategoria } = useCategorias();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(categoria?.imagen || null);
  const [imagenFile, setImagenFile] = useState(null);

  const obtenerArchivoImagen = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], decodeURIComponent(url.split('/').pop()), { type: blob.type });
    return file;
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImagenFile(file);
    }
  };


  // Definición de campos del formulario
  const campos = [
    { name: "imagen", label: "Imagen", type: "file", accept: "image/*", onchange: handleImageChange },
    { name: "nombre", label: "Nombre categoría", type: "text" },
    { name: "descripcion", label: "Descripcion categoría", type: "text" },
  ];

  // Manejar envío del formulario
  const handleSubmit = async (valores) => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("nombre", valores.nombre);
    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }
    formData.append("descripcion", valores.descripcion);

    try {
      if (categoria) {
        await actualizarCategoria(categoria.id, formData); // Actualizar si existe
      } else {
        await agregarCategoria(formData); // Crear nueva
      }
      onRefresh(); // Refrescar la lista
      onClose(); // Cerrar el formulario
    } catch (error) {
      setError(error.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cargarImagen = async () => {
      console.log(JSON.stringify(categoria?.imagen) === '{}')
      if (categoria?.imagen && JSON.stringify(categoria?.imagen) !== '{}') {
        const file = await obtenerArchivoImagen(categoria.imagen);
        setImagenFile(file);
        setPreviewImage(categoria.imagen);
      }
    };
    
    cargarImagen();
  }, [categoria]);

  return (
    <>
      <div>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? "Cargando..." : categoria ? "Actualizar categoría" : "Crear categoría"}
          initialValues={initialValues(categoria)}
          nombreValoresFormularios={nombreValoresFormularios}
        />
      </div>
      {previewImage && (
        <div>
          <p>
            {imagenFile ? `Archivo cargado: ${imagenFile.name}` : "No hay archivo cargado"}
          </p>
          {imagenFile &&
            <img src={previewImage} alt="Previsualización" style={{ maxWidth: "50%", marginTop: "10px" }} />
          }
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
    </>
  );
};

// Valores iniciales del formulario
const initialValues = (categoria) => {
  return {
    imagen: categoria?.imagen || null,
    nombre: categoria?.nombre || "",
    descripcion: categoria?.descripcion || "",
  };
};