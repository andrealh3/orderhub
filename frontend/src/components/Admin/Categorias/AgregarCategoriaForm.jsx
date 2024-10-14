import { useState } from "react";
import { GenericForm } from "../../GenericForm";
import { actualizarCategoriasApi, agregarCategoriasApi } from "../../../services/CategoriaService";

export const AgregarCategoriaForm = ({ onClose, onRefetch, categoria }) => {
  const [error, setError] = useState(""); // Estado para manejar mensajes de error
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [previewImage, setPreviewImage] = useState(categoria?.imagen || null); // Previsualización de la imagen
  const [imagenFile, setImagenFile] = useState(null);

  // Función para manejar la previsualización de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Previsualizar imagen seleccionada
      setImagenFile(file);
    }
  };

  // Definición de campos del formulario
  const campos = [
    { name: "imagen", label: "Imagen", type: "file", accept: "image/*", onChange: handleImageChange },
    { name: "nombre", label: "Nombre categoría", type: "text" },
    { name: "descripcion", label: "Descripcion categoría", type: "text" },
  ];

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (valores) => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("nombre", valores.nombre);
    if (imagenFile) {
      formData.append("imagen", imagenFile); // Usar el archivo almacenado
    }
    formData.append("descripcion", valores.descripcion);

    // Lógica para actualizar o agregar una categoría
    const action = categoria
      ? actualizarCategoriasApi(categoria.id, formData) // Actualizar si ya existe
      : agregarCategoriasApi(formData); // Crear una nueva

    action
      .then(() => {
        onRefetch();
        onClose();
      })
      .catch((error) => {
        setError(error.message || "Error al procesar la solicitud");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <GenericForm
          campos={campos}
          loading={loading}
          onSubmit={handleSubmit}
          infoBoton={loading ? "Cargando..." : categoria ? "Actualizar categoría" : "Crear categoría"}
          initialValues={initialValues(categoria)}
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

// Valores iniciales del formulario, para creación o actualización
const initialValues = (categoria) => {
  return {
    imagen: null,
    nombre: categoria?.nombre || "",
    descripcion: categoria?.descripcion || "",
  };
};
