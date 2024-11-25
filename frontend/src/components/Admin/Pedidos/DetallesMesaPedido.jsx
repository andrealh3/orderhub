import { useState, useEffect } from "react";
import { usePedido } from "../../../hooks/usePedido";
import { useParams } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { HeaderPage } from "../HeaderPage";
import { ListaPedidos } from "./ListaPedidos";
import { ModalBasic } from "../../Common/ModalBasic";
import { AgregarPedidoForm } from "./AgregarPedidoForm";
import { GenericForm } from "../../FormGeneric/GenericForm";
import { useUsuarios } from "../../../hooks/useUsuarios";
import { useMesas } from "../../../hooks/useMesas";
import { ESTADO_PAGO, TIPO_PAGO } from "../../../utils/constants";
import { usePago } from "../../../hooks/usePago";

export const DetallesMesaPedido = () => {
  const [reloadPedidos, setReloadPedidos] = useState(false);
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [showGenerarCuentaModal, setShowGenerarCuentaModal] = useState(false); // Modal de confirmación cuenta
  const [showMetodoPagoModal, setShowMetodoPagoModal] = useState(false); // Modal de selección de método de pago
  const [clienteAsignado, setClienteAsignado] = useState(null);
  const [empleadoAsignado, setEmpleadoAsignado] = useState(null);
  const [formValues, setFormValues] = useState({ cliente: "", empleado: "" });
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(""); // Para almacenar el tipo de pago seleccionado
  const { id } = useParams();
  const [mesa, setMesa] = useState(null);
  const { loading, pedidos, obtenerPedidosPorMesa } = usePedido();
  const { usuarios } = useUsuarios();
  const { actualizarMesa, obtenerMesa } = useMesas();
  const { crearPago } = usePago();

  const fetchMesaData = async () => {
    const mesaData = await obtenerMesa(id);  // Obtenemos los datos completos de la mesa
    if (mesaData) {
      setMesa(mesaData);  // Guardamos la mesa completa en el estado
      
      // Si la mesa tiene cliente y empleado asignados, actualizamos esos valores
      if (mesaData?.cliente && mesaData?.empleado) {
        setClienteAsignado(mesaData.cliente);
        setEmpleadoAsignado(mesaData.empleado);
        await obtenerPedidosPorMesa(id, "", "estado_orden,fecha,-hora");
      } else {
        setShowAsignarModal(true);  // Si no tiene cliente/empleado asignados, mostramos el modal
      }
    }
  };

  useEffect(() => {
    fetchMesaData();
  }, [id, reloadPedidos]);

  const onReloadPedidos = () => setReloadPedidos((prev) => !prev);

  const openPedidoModal = () => setShowPedidoModal((prev) => !prev);
  const closePedidoModal = () => setShowPedidoModal(false);
  const closeAsignarModal = () => setShowAsignarModal(false);
  const closeGenerarCuentaModal = () => setShowGenerarCuentaModal(false);
  const closeMetodoPagoModal = () => setShowMetodoPagoModal(false);

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAsignarDatos = async () => {
    const { cliente, empleado } = formValues;
    const newValues = {
      cliente: formValues.cliente.value,
      empleado: formValues.empleado.value,
    };
    if (cliente && empleado) {
      setClienteAsignado(cliente);
      setEmpleadoAsignado(empleado);
      closeAsignarModal();
      await actualizarMesa(id, newValues);
      onReloadPedidos();
    }
  };

  const onGenerarCuenta = () => {
    setShowGenerarCuentaModal(true);
  };

  const handleConfirmarGenerarCuenta = async () => {
    setShowGenerarCuentaModal(false);
    setShowMetodoPagoModal(true);
  };

  const handleMetodoPago = async(tipoPago) => {
    setMetodoPagoSeleccionado(tipoPago);
    // setShowMetodoPagoModal(false); // Cierra el modal de selección de método de pago

    // Lógica para manejar el pago con el tipo de pago seleccionado
    const totalPrecio = pedidos.flatMap((pedido) => pedido.detalles_pedido_data)
      .reduce((total, { producto_data: { precio } }) => total + Number(precio), 0)
      .toFixed(2);

    const metodoPago = {
      mesa: mesa.id,
      total_pago: totalPrecio,
      tipo_pago: tipoPago,
      estado_pago: ESTADO_PAGO.PENDIENTE,
    };

    const pago = await crearPago(metodoPago);
    console.log(pago)
    console.log("Método de pago:", metodoPago);
    console.log("Total precio:", totalPrecio);
    console.log("Pedidos:", pedidos);
  };

  const tieneProductos = pedidos?.some(
    (pedido) => pedido.detalles_pedido_data && pedido.detalles_pedido_data.length > 0
  );
  return (
    <div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <div>
          <HeaderPage 
            title={`Mesa ${mesa?.numero || ""}`} 
            btnNuevo="Añadir pedido" 
            btnClickNuevo={openPedidoModal} 
            btnDos="Generar cuenta" 
            btnClickDos={onGenerarCuenta}
            btnDisabledDos={!tieneProductos}
          />
          <ListaPedidos pedidos={pedidos} onReloadPedidos={onReloadPedidos} />
        </div>
      )}

      {/* Modal para asignar cliente y empleado */}
      <ModalBasic 
        show={showAsignarModal} 
        size="lg" 
        onClose={closeAsignarModal} 
        title="Asignar Cliente y Empleado"
      >
        <GenericForm
          campos={[
            {
              name: "cliente",
              label: "Elige cliente",
              type: "dropdown",
              searchable: true,
              placeholder: "Selecciona cliente",
              options: usuarios.map((usuario) => ({
                value: usuario.id,
                label: usuario.username,
              })),
            },
            {
              name: "empleado",
              label: "Elige empleado",
              type: "dropdown",
              searchable: true,
              placeholder: "Selecciona empleado",
              options: usuarios.map((usuario) => ({
                value: usuario.id,
                label: usuario.username,
              })),
            },
          ]}
          loading={false}
          onSubmit={handleAsignarDatos}
          infoBoton="Asignar Datos"
          onChange={handleChange}
        />
      </ModalBasic>

      {/* Modal para agregar un nuevo pedido */}
      {clienteAsignado && empleadoAsignado && (
        <ModalBasic 
          show={showPedidoModal} 
          size="lg" 
          onClose={closePedidoModal} 
          title="Generar pedido"
        >
          <AgregarPedidoForm idMesa={id} openCloseModal={closePedidoModal} onReloadPedidos={onReloadPedidos} />
        </ModalBasic>
      )}

      {/* Modal de confirmación para generar cuenta */}
      <ModalBasic 
        show={showGenerarCuentaModal} 
        size="sm" 
        onClose={closeGenerarCuentaModal} 
        title="Confirmar Generación de Cuenta"
      >
        <p>¿Estás seguro de generar la cuenta de la mesa?</p>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={closeGenerarCuentaModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmarGenerarCuenta}>
            Confirmar
          </Button>
        </div>
      </ModalBasic>

      {/* Modal para seleccionar el método de pago */}
      <ModalBasic 
        show={showMetodoPagoModal} 
        size="sm" 
        onClose={closeMetodoPagoModal} 
        title="Seleccionar Método de Pago"
      >
        <div className="d-flex justify-content-center gap-3">
          <Button variant="outline-primary" onClick={() => handleMetodoPago(TIPO_PAGO.EFECTIVO)}>
            Efectivo
          </Button>
          <Button variant="outline-primary" onClick={() => handleMetodoPago(TIPO_PAGO.TARJETA)}>
            Tarjeta
          </Button>
        </div>
      </ModalBasic>
    </div>
  );
};