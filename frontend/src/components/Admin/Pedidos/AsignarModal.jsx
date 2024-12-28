import { GenericForm } from "../../FormGeneric/GenericForm";
import { ModalBasic } from "../../Common/ModalBasic";
import { useUsuarios } from "../../../hooks/useUsuarios";
import { useMesas } from "../../../hooks/useMesas";

export const AsignarModal = ({ show, onClose, mesaId, onAsignar }) => {
  const { usuarios } = useUsuarios();
  const { actualizarMesa } = useMesas();

  const handleSubmit = async (formValues) => {
    const { cliente, empleado } = formValues;
    await actualizarMesa(mesaId, { cliente: cliente.value, empleado: empleado.value });
    onAsignar();
  };

  return (
    <ModalBasic show={show} size="lg" onClose={onClose} title="Asignar Cliente y Empleado">
      <GenericForm
        campos={[
          {
            name: "cliente",
            label: "Elige cliente",
            type: "dropdown",
            options: usuarios.map(({ id, username }) => ({ value: id, label: username })),
          },
          {
            name: "empleado",
            label: "Elige empleado",
            type: "dropdown",
            options: usuarios.map(({ id, username }) => ({ value: id, label: username })),
          },
        ]}
        onSubmit={handleSubmit}
        infoBoton="Asignar Datos"
      />
    </ModalBasic>
  );
};