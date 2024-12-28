import { ModalBasic } from "../../Common/ModalBasic";
import { AgregarPedidoForm } from "./AgregarPedidoForm";

export const PedidoModal = ({ show, onClose, idMesa, onReloadPedidos }) => (
  <ModalBasic show={show} size="lg" onClose={onClose} title="Añadir productos">
    <AgregarPedidoForm idMesa={idMesa} openCloseModal={onClose} onReloadPedidos={onReloadPedidos} />
  </ModalBasic>
);