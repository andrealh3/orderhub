import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { TIPO_PAGO } from "../../../utils/constants";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IoEye } from "react-icons/io5";
import { ModalBasic } from "../../Common/ModalBasic"
import { useState } from "react";
import { ListarPedidosPagos } from "./ListarPedidosPagos";

export const ListarPagos = ({ pagos }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ titleModal, setTitleModal ] = useState(null);
  const [ contentModal, setContentModal ] = useState(null);

  // Ordenar pagos por fecha
  const pagosOrdenados = Array.isArray(pagos) 
    ? pagos.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en)) 
    : [];;

  // Agrupar pagos por mes y año
  const pagosPorMes = pagosOrdenados.reduce((acc, pago) => {
    const mesAno = format(new Date(pago.creado_en), 'yyyy-MM'); // Formato 'YYYY-MM'
    if (!acc[mesAno]) {
      acc[mesAno] = [];
    }
    acc[mesAno].push(pago);
    return acc;
  }, {});

  // Función para seleccionar el icono del tipo de pago
  const seleccionIcono = (key) => {
    if (key === TIPO_PAGO.TARJETA) return <FaCcMastercard />;
    if (key === TIPO_PAGO.EFECTIVO) return <FaRegMoneyBillAlt />;
    return null;
  };

  const openCloseModal= () => setShowModal((prev) => !prev);

  const verDetalles = (pago) => {
    console.log(pago);
    setTitleModal(`Pedidos con sus productos`);
    setContentModal(<ListarPedidosPagos pedidos={pago.mesa_data.pedidos_data} />);
    openCloseModal();
  }

  return (
    <>
      <Container fluid>
        <Row>
          {Object.keys(pagosPorMes).length > 0 ? (
            Object.keys(pagosPorMes).map((mesAno) => (
              <div key={mesAno}>
                <h4 className="text-center mb-3">
                  {format(new Date(`${mesAno}-01`), 'MMMM yyyy', { locale: es }).charAt(0).toUpperCase() + format(new Date(`${mesAno}-01`), 'MMMM yyyy', { locale: es }).slice(1)}
                </h4>
                <Row>
                  {pagosPorMes[mesAno].map((pago) => (
                    <Col xs={12} sm={6} lg={4} key={pago.id} className="mb-4">
                      <Card className="shadow-sm border-light">
                        <Card.Header className="bg-primary text-white">
                          <strong>Mesa {pago.mesa}</strong>
                        </Card.Header>
                        <Card.Body className="">
                          <Row className="">
                            <Col xs={12} sm={10}>
                              <Card.Text className="m-0">
                                <strong>Total: </strong>
                                <span>{pago.total_pago} €</span>
                              </Card.Text>
                              <Card.Text className="m-0">
                                <strong>Pago: </strong>
                                <span>{seleccionIcono(pago.tipo_pago)}</span>
                              </Card.Text>
                              <Card.Text className="m-0">
                                <strong>Estado: </strong>
                                <span className={`${pago.estado_pago === "PAGADO" ? "text-success" : "text-warning"}`}>
                                  {pago.estado_pago}
                                </span>
                              </Card.Text>
                              <Card.Text className="m-0">
                                <strong>Fecha: </strong>
                                <span>
                                  {format(new Date(pago.creado_en), 'dd/MM/yyyy - HH:mm')}
                                </span>
                              </Card.Text>
                            </Col>
                            <Col xs={12} sm={2} className="d-flex align-items-center justify-content-center m-0 p-0">
                              <Button
                                variant="info"
                                onClick={() => verDetalles(pago)}
                                className="w-100"
                              >
                                <IoEye size={20} />
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>No hay pagos disponibles.</p>
            </Col>
          )}
        </Row>
      </Container>
      <ModalBasic 
        show={showModal} 
        onClose={openCloseModal} 
        title={titleModal} 
        children={contentModal}
        size="md"
      />
    </>
  );
};