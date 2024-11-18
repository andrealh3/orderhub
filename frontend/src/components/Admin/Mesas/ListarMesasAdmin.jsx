import { useEffect, useState } from "react";
import { ListarMesaAdmin } from "./ListarMesaAdmin";
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { LuRefreshCw } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useMesas } from "../../../hooks/useMesas";
import "../../../styles/ListaMesasAdmin.scss";

export const ListarMesasAdmin = ({ mesas }) => {
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(() => {
    const savedAutoReload = sessionStorage.getItem("autoReload");
    return savedAutoReload ? JSON.parse(savedAutoReload) : false;
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [isOccupied, setIsOccupied] = useState(false);

  const { actualizarMesa } = useMesas();
  
  const navigate = useNavigate();

  const onReload = () => setReload(prev => !prev);

  useEffect(() => {
    let intervalId;

    if (autoReload) {
      intervalId = setInterval(onReload, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoReload]);

  const onChangeAutoReload = (e) => {
    const isChecked = e.target.checked;
    setAutoReload(isChecked);
    sessionStorage.setItem("autoReload", JSON.stringify(isChecked));
  };

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
      {/* Contenedor flex para los botones en la misma línea */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Form.Check 
          type="switch"
          id="reload-automatico" 
          label="Reload automático" 
          checked={autoReload} 
          onChange={onChangeAutoReload} 
          className="me-3"
        />
        <Button onClick={onReload} className="me-3">
          <LuRefreshCw />
        </Button>
      </div>

      <Row className="justify-content-center">
        {mesas.map((mesa) => (
          <Col key={mesa.id} xs={12} sm={6} md={4}>
            <Button 
              variant="link" 
              onClick={() => handleShowModal(mesa)} 
              className={`mesa-button ${mesa.estado === 'ocupada' ? 'ocupada' : 'libre'}`}
            >
              <ListarMesaAdmin key={mesa.id} mesa={mesa} reload={reload} />
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

// import { useEffect, useState, useCallback } from "react";
// import { ListarMesaAdmin } from "./ListarMesaAdmin";
// import { Row, Col, Button, Form } from 'react-bootstrap';
// import { LuRefreshCw } from "react-icons/lu";
// import { Link } from "react-router-dom";

// export const ListarMesasAdmin = ({ mesas }) => {
//   const [reload, setReload] = useState(false);
//   const [autoReload, setAutoReload] = useState(() => {
//     const savedAutoReload = sessionStorage.getItem("autoReload");
//     return savedAutoReload ? JSON.parse(savedAutoReload) : false;
//   });

//   const onReload = () => setReload(prev => !prev);
  
//   useEffect(() => {
//     let intervalId;

//     if (autoReload) {
//       intervalId = setInterval(onReload, 5000);
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [autoReload]);

//   const onChangeAutoReload = (e) => {
//     const isChecked = e.target.checked;
//     setAutoReload(isChecked);
//     sessionStorage.setItem("autoReload", JSON.stringify(isChecked));
//   };

//   return (
//     <div>
//       <Button onClick={onReload}>
//         <LuRefreshCw />
//       </Button>
//       <Form.Check 
//         type="switch"
//         id="reload-automatico" 
//         label="Reload automático" 
//         checked={autoReload} 
//         onChange={onChangeAutoReload} 
//         className="me-2"
//       />
//       <Row>
//         {mesas.map((mesa) => (
//           <Col key={mesa.id} xs={12} sm={6} lg={4} className="d-flex justify-content-center">
//             <Link to={`/admin/table/${mesa.id}`}>
//               <ListarMesaAdmin key={mesa.id} mesa={mesa} reload={reload} />
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }