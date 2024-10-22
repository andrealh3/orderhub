import { useEffect, useState } from "react";
import { GenericForm } from "../../GenericForm";
import { actualizarMesasApi, agregarMesasApi, obtenerSiguienteNumeroMesaApi } from "../../../services/MesaService";


export const AgregarMesaForm = ({ onClose, onRefetch, mesa }) => {
  const [error, setError] = useState(""); // Estado para manejar mensajes de error
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga

  const estadoMesa = {
    libre: "Libre",
    ocupada: "Ocupada",
    reservada: "Reservada"
  };

  // Definición de campos del formulario readOnly: true, value: mesa ? mesa.numero : numero
  const campos = [
    { name: "numero", label: "Numero de mesa", type: "number"},
    { name: "capacidad", label: "Capacidad de personas", type: "number" },
    { name: "estado", label: "Estado mesa", type: "select", 
      options: Object.entries(estadoMesa).map(([value, label]) => ({ value, label }))
    },
  ];

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (valores) => {
    setLoading(true);
    setError("");

    // Lógica para actualizar o agregar una categoría
    const action = mesa
      ? actualizarMesasApi(mesa.id, valores) // Actualizar si ya existe
      : agregarMesasApi(valores); // Crear una nueva

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
          infoBoton={loading ? "Cargando..." : mesa ? "Actualizar mesa" : "Crear mesa"}
          initialValues={initialValues(mesa)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
    </>
  );
};

// Valores iniciales del formulario, para creación o actualización
const initialValues = (mesa) => {
  return {
    numero: mesa ? mesa.numero : "", // Se mostrará el número automáticamente
    capacidad: mesa?.capacidad || "",
    estado: mesa?.estado || "", // Valor por defecto
  };
};
