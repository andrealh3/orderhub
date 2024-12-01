import { useState } from "react";
import { ListarMesaAdmin } from "./ListarMesaAdmin";
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useMesas } from "../../../hooks/useMesas";
import "../../../styles/ListaMesasAdmin.scss";

export const ListarMesasAdmin = ({ mesas }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [isOccupied, setIsOccupied] = useState(false);

  const { actualizarMesa } = useMesas();
  
  const navigate = useNavigate();

  const handleShowModal = (mesa) => {
    if (mesa.estado !== 'ocupada') { 
      setSelectedMesa(mesa);
      setIsOccupied(mesa.estado === "ocupada");
      setShowModal(true);
    } else {
      navigate(`/admin/table/${mesa.id}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMesa(null);
  };

  const handleSaveState = async() => {
    const nuevoEstado = isOccupied ? {estado: "ocupada"} : {estado: "libre"};
    if (isOccupied) {
      await actualizarMesa(selectedMesa.id, nuevoEstado);
      navigate(`/admin/table/${selectedMesa.id}`);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="listar-mesas-container">
      <Row className="justify-content-center">
        {mesas.map((mesa) => (
          <Col key={mesa.id} xs={12} sm={6} md={4}>
            <Button 
              variant="link" 
              onClick={() => handleShowModal(mesa)} 
              className={`mesa-button ${mesa.estado === 'ocupada' ? 'ocupada' : 'libre'}`}
            >
              <ListarMesaAdmin key={mesa.id} mesa={mesa} />
            </Button>
          </Col>
        ))}
      </Row>

      {/* Modal para cambiar estado de la mesa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Estado de la mesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedMesa ? `¿Deseas marcar la mesa ${selectedMesa.numero} como ocupada?` : ""}</p>
          <Form.Check
            type="switch"
            id="estado-mesa"
            label={isOccupied ? "Desmarcar como libre" : "Marcar como ocupada"}
            checked={isOccupied}
            onChange={() => setIsOccupied(!isOccupied)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="secondary">
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveState}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};