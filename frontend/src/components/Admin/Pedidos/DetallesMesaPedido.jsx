import { useState, useEffect } from "react";
import { usePedido } from "../../../hooks/usePedido";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { HeaderPage } from "../HeaderPage";
import { ListaPedidos } from "./ListaPedidos";
import { ModalBasic } from "../../Common/ModalBasic";
import { AgregarPedidoForm } from "./AgregarPedidoForm";
import { GenericForm } from "../../FormGeneric/GenericForm";
import { useUsuarios } from "../../../hooks/useUsuarios";
import { useMesas } from "../../../hooks/useMesas";

export const DetallesMesaPedido = () => {
  const [reloadPedidos, setReloadPedidos] = useState(false);
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [clienteAsignado, setClienteAsignado] = useState(null); // Guardamos el cliente seleccionado
  const [empleadoAsignado, setEmpleadoAsignado] = useState(null); // Guardamos el empleado seleccionado
  const nombreValoresFormularios = "clienteEmpleado"
  const [formValues, setFormValues] = useState({ cliente: "", empleado: "" }); // Estado para los valores del formulario
  const { id } = useParams();
  const { loading, pedidos, obtenerPedidosPorMesa } = usePedido();
  const { usuarios } = useUsuarios();
  const { actualizarMesa, obtenerMesa } = useMesas();

  const fetchMesaData = async () => {
    const mesa = await obtenerMesa(id);
    if (mesa?.cliente && mesa?.empleado) {
      setClienteAsignado(mesa.cliente);
      setEmpleadoAsignado(mesa.empleado);
      await obtenerPedidosPorMesa(id, "", "estado_orden,fecha,-hora");
    } else {
      setShowAsignarModal(true);
    }
  };

  useEffect(() => {
    fetchMesaData();
  }, [id, reloadPedidos]);

  const onReloadPedidos = () => setReloadPedidos((prev) => !prev);

  const openPedidoModal = () => setShowPedidoModal((prev) => !prev);
  const closePedidoModal = () => setShowPedidoModal(false);
  const closeAsignarModal = () => setShowAsignarModal(false);

  // Función para manejar los cambios en el formulario de asignación
  const handleChange = (name, persona) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: persona }));
  };

  // Función que maneja la asignación de cliente y empleado desde el formulario
  const handleAsignarDatos = async () => {
    const { cliente, empleado } = formValues;
    if (cliente && empleado) {
      setClienteAsignado(cliente);
      setEmpleadoAsignado(empleado);
      closeAsignarModal();
      await actualizarMesa(id, formValues);
      onReloadPedidos();
    }
  };

  const onGenerarCuenta = async() => {
    const resultado = confirm(`¿Estas seguro de generar la cuenta de la mesa?`);
    if (resultado) {
      const totalPrecio = pedidos.flatMap(pedido => pedido.detalles_pedido_data)
                           .reduce((total, { producto_data: { precio } }) => total + Number(precio), 0)
                           .toString();
      const metodoPago = {
        mesa: (await obtenerMesa(id)).id,
        total_pago: totalPrecio,
        tipo_pago: "",
        estado_pago: ""
      }
      console.log(metodoPago);
      console.log(totalPrecio);
      console.log(pedidos);
    }
  }

  return (
    <div>
      <HeaderPage title={`Mesa ${id}`} btnNuevo="Añadir pedido" btnClickNuevo={openPedidoModal} btnDos="Generar cuenta" btnClickDos={onGenerarCuenta}/>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListaPedidos pedidos={pedidos} onReloadPedidos={onReloadPedidos} />
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
              searchable: true, 
              type: "select",
              placeholder: 'Selecciona cliente',
              options: usuarios.map(usuario => ({ 
                value: usuario.id,
                label: usuario.username
              })),
              onChange: (value) => {
                const persona = value && value[0];
                handleChange("cliente", persona);
              }
            },
            {
              name: "empleado", 
              label: "Elige empleado",  
              searchable: true, 
              type: "select", 
              placeholder: 'Selecciona empleado',
              options: usuarios.map(usuario => ({ 
                value: usuario.id, 
                label: usuario.username
              })),
              onChange: (value) => {
                const persona = value && value[0];
                handleChange("empleado", persona);
              }
            },
          ]}
          loading={false}
          onSubmit={handleAsignarDatos}
          infoBoton="Asignar Datos"
          nombreValoresFormularios={nombreValoresFormularios}
          onChange={handleChange}
        />
      </ModalBasic>

      {/* Modal para generar un nuevo pedido */}
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
    </div>
  );
};




// import { useEffect } from "react";
// import { usePedido } from "../../../hooks/usePedido"
// import { useParams } from "react-router-dom";
// import { Spinner } from "react-bootstrap";
// import { HeaderPage } from "../HeaderPage";
// import { ListaPedidos } from "./ListaPedidos";
// import { useState } from "react";
// import { ModalBasic } from "../../Common/ModalBasic";
// import { AgregarPedidoForm } from "./AgregarPedidoForm";

// export const DetallesMesaPedido = () => {
//   const [reloadPedidos, setReloadPedidos] = useState(false)
//   const { id } = useParams();
//   const [showModal, setShowModal ] = useState(false);

//   const { loading, pedidos, obtenerPedidosPorMesa} = usePedido();

//   useEffect(() => {
//     obtenerPedidosPorMesa(id, "", "ordering=-estado,hora");
//   }, [reloadPedidos]);
  
//   const onReloadPedidos = () => setReloadPedidos((prev)=> !prev);

//   const openCloseModal = () => setShowModal((prev) => !prev);

//   return (
//     <div>
//       <HeaderPage title={`Mesa ${id}`} btnNuevo="Añadir pedido" btnClickNuevo={openCloseModal} />
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Cargando...</span>
//           </Spinner>
//           <p>Cargando...</p>
//         </div>
//       ): (
//         <ListaPedidos pedidos={pedidos} onReloadPedidos={onReloadPedidos} />
//       )}
//       <ModalBasic show={showModal} size="lg" onClose={openCloseModal} title="Generar pedido">
//         <AgregarPedidoForm idMesa={id} openCloseModal={openCloseModal} />
//       </ModalBasic>
//     </div>
//   )
// }
