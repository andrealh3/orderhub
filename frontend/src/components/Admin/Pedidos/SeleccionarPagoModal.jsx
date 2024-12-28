import { useState } from "react";
import { ModalBasic } from "../../Common/ModalBasic";
import { Button, Table, Form } from "react-bootstrap";
import { ESTADO_PAGO, TIPO_PAGO } from "../../../utils/constants";
import { usePago } from "../../../hooks/usePago";
import { FaCcMastercard } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { usePedido } from "../../../hooks/usePedido";
import { useNavigate } from "react-router-dom";

export const SeleccionarPagoModal = ({ show, onClose, mesa, pedido, onPagoProcesado }) => {
  console.log(pedido)
  const { crearPago, obtenerPagoPorMesa, actualizarPago, cerrarPago } = usePago(); // Añadido cerrarPago
  const navigate = useNavigate();
  const { cerrarPedido } = usePedido();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [formaPago, setFormaPago] = useState("");
  const [montoRecibido, setMontoRecibido] = useState(0);
  const [cambio, setCambio] = useState(0);
  const [idPago, setIdPago] = useState(null); // Para guardar el ID del pago creado o actualizado.

  const seleccionIcono = (key) => {
    if (key === TIPO_PAGO.TARJETA) return <FaCcMastercard />;
    if (key === TIPO_PAGO.EFECTIVO) return <FaRegMoneyBillAlt />;
    return null;
  };

  const actualizarPedidos = async (pedido) => {
    console.log(pedido)
    // try {
    //   // Recorrer cada pedido
    //   for (const pedido of pedidos) {
    //     // Modificar cada pedido
    //     const actualizado = await cerrarPedido(pedido.id);
  
    //     console.log(`Pedido ${pedido.id} actualizado:`, actualizado);
    //   }
    //   console.log("Todos los pedidos han sido actualizados correctamente.");
    // } catch (error) {
    //   console.error("Error actualizando los pedidos:", error);
    //   alert("Hubo un problema actualizando los pedidos. Inténtalo de nuevo.");
    // }
  };

  const handleMetodoPago = async (tipoPago) => {
    try {
      // Calcular el total
      const total = pedido
        .flatMap((pedido) => pedido.detalles_pedido_data)
        .reduce((sum, { producto_data: { precio } }) => sum + Number(precio), 0)
        .toFixed(2);

      setTotalPrecio(total);
      setFormaPago(tipoPago === TIPO_PAGO.EFECTIVO ? TIPO_PAGO.EFECTIVO : TIPO_PAGO.TARJETA);

      const pagos = await obtenerPagoPorMesa(mesa.id);
      const pagoExistente = pagos[0];
      let pago;

      if (pagoExistente?.estado_pago === ESTADO_PAGO.PENDIENTE) {
        pago = await actualizarPago(pagoExistente.id, {
          tipo_pago: tipoPago,
          total_pago: total,
        });
      } else {
        pago = await crearPago({
          mesa: mesa.id,
          total_pago: total,
          tipo_pago: tipoPago,
          estado_pago: ESTADO_PAGO.PENDIENTE,
        });
      }

      setIdPago(pago.id); // Guardar el ID del pago.
      onPagoProcesado();
      setShowInfoModal(true);
    } catch (error) {
      console.error("Error procesando el pago:", error);
      alert("Hubo un problema procesando el pago. Inténtalo de nuevo.");
    }
  };

  const finalizarPago = async () => {
    if (idPago) {
      try {
        await cerrarPago(idPago); // Llamar a cerrarPago con el ID del pago.
        await actualizarPedidos(pedido);
        setShowInfoModal(false);
        onClose(); // Cerrar el modal principal.
        navigate(`/admin/payments-history`);
      } catch (error) {
        console.error("Error cerrando el pago:", error);
        alert("Hubo un problema al cerrar el pago. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <>
      {/* Modal para seleccionar método de pago */}
      <ModalBasic show={show} size="sm" onClose={onClose} title="Seleccionar Método de Pago">
        <div className="d-flex justify-content-center gap-3">
          <Button variant="outline-primary" onClick={() => handleMetodoPago(TIPO_PAGO.EFECTIVO)}>
            {seleccionIcono(formaPago)} Efectivo
          </Button>
          <Button variant="outline-primary" onClick={() => handleMetodoPago(TIPO_PAGO.TARJETA)}>
            {seleccionIcono(formaPago)} Tarjeta
          </Button>
        </div>
      </ModalBasic>

      {/* Modal informativo */}
      <ModalBasic
        show={showInfoModal}
        size="md"
        onClose={() => setShowInfoModal(false)}
        title={`Información del pago de la mesa ${mesa?.numero || ""}`}
      >
        <Table striped>
          <tbody>
            <tr>
              <td>Mesa:</td>
              <td>{mesa?.numero}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>{totalPrecio} €</td>
            </tr>
            <tr>
              <td>Forma de Pago:</td>
              <td>
                {seleccionIcono(formaPago)}
              </td>
            </tr>
            {formaPago === TIPO_PAGO.EFECTIVO && (
              <>
                <tr>
                  <td>Monto Recibido:</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="0"
                      value={montoRecibido || ""}
                      onChange={(e) => {
                        const recibido = parseFloat(e.target.value);
                        setMontoRecibido(recibido);
                        setCambio((recibido - totalPrecio).toFixed(2));
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Cambio:</td>
                  <td>{cambio >= 0 ? `${cambio} €` : "Monto insuficiente"}</td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
        <div className="text-center">
          <Button
            className="mt-3"
            variant="success"
            onClick={finalizarPago}
            disabled={formaPago === TIPO_PAGO.EFECTIVO && montoRecibido < totalPrecio}
          >
            Pago Hecho
          </Button>
        </div>
      </ModalBasic>
    </>
  );
};



// import { useState } from "react";
// import { ModalBasic } from "../../Common/ModalBasic";
// import { Button, Table } from "react-bootstrap";
// import { ESTADO_PAGO, TIPO_PAGO } from "../../../utils/constants";
// import { usePago } from "../../../hooks/usePago";
// import { FaCcMastercard } from "react-icons/fa6";
// import { FaRegMoneyBillAlt } from "react-icons/fa";

// export const SeleccionarPagoModal = ({ show, onClose, mesa, pedidos, onPagoProcesado }) => {
//   const { crearPago, obtenerPagoPorMesa, actualizarPago } = usePago();
//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const [totalPrecio, setTotalPrecio] = useState(0);
//   const [formaPago, setFormaPago] = useState("");

//   const seleccionIcono = (key) => {
//     if (key === 'Tarjeta') return <FaCcMastercard />;
//     if (key === 'Efectivo') return <FaRegMoneyBillAlt />;
//     return null;
//   }

//   const handleMetodoPago = async (tipoPago) => {
//     try {
//       // Calcular el total
//       const total = pedidos
//         .flatMap((pedido) => pedido.detalles_pedido_data)
//         .reduce((sum, { producto_data: { precio } }) => sum + Number(precio), 0)
//         .toFixed(2);

//       setTotalPrecio(total);
//       setFormaPago(tipoPago === TIPO_PAGO.EFECTIVO ? "Efectivo" : "Tarjeta");

//       // Verificar si ya existe un pago pendiente
//       const pagos = await obtenerPagoPorMesa(mesa.id);
//       const pagoExistente = pagos[0];

//       if (pagoExistente?.estado_pago === ESTADO_PAGO.PENDIENTE) {
//         await actualizarPago(pagoExistente.id, {
//           tipo_pago: tipoPago,
//           total_pago: total,
//         });
//       } else {
//         await crearPago({
//           mesa: mesa.id,
//           total_pago: total,
//           tipo_pago: tipoPago,
//           estado_pago: ESTADO_PAGO.PENDIENTE,
//         });
//       }

//       // Llamar al callback y mostrar el modal de información
//       onPagoProcesado();
//       setShowInfoModal(true);
//     } catch (error) {
//       console.error("Error procesando el pago:", error);
//       alert("Hubo un problema procesando el pago. Inténtalo de nuevo.");
//     }
//   };

//   return (
//     <>
//       {/* Modal para seleccionar método de pago */}
//       <ModalBasic show={show} size="sm" onClose={onClose} title="Seleccionar Método de Pago">
//         <div className="d-flex justify-content-center gap-3">
//           <Button variant="outline-primary" onClick={() => handleMetodoPago(TIPO_PAGO.EFECTIVO)}>
//             Efectivo
//           </Button>
//           <Button variant="outline-primary" onClick={() => handleMetodoPago(TIPO_PAGO.TARJETA)}>
//             Tarjeta
//           </Button>
//         </div>
//       </ModalBasic>

//       {/* Modal informativo */}
//       <ModalBasic
//         show={showInfoModal}
//         size="md"
//         onClose={() => setShowInfoModal(false)}
//         title={`Información del pago de la mesa ${mesa?.numero || ""}`}
//       >
//         <Table striped>
//           <tbody>
//             <tr>
//               <td>Mesa:</td>
//               <td>{mesa?.numero}</td>
//             </tr>
//             <tr>
//               <td>Total:</td>
//               <td>{totalPrecio} €</td>
//             </tr>
//             <tr>
//               <td>Forma de Pago:</td>
//               <td>
//                 {seleccionIcono(formaPago)}
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//         <Button onClick={()=> console.log("cerrar mesa")}>
//           Marcar como pagado y cerrar mesa
//         </Button>
//       </ModalBasic>
//     </>
//   );
// };
