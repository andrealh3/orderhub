import { useEffect, useState } from "react";
import { ListarMesaAdmin } from "./ListarMesaAdmin";
import { Row, Col, Button, Form } from 'react-bootstrap';
import { LuRefreshCw } from "react-icons/lu";
import { useCallback } from "react";
import { Link } from "react-router-dom";

export const ListarMesasAdmin = ({ mesas }) => {
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false)

  const onReload = useCallback(() => setReload(prev => !prev), []);

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
    setAutoReload(e.target.checked);
  };

  return (
    <div>
      <Button onClick={onReload}>
        <LuRefreshCw />
      </Button>
      <Form.Check 
        type="switch"
        id="reload-automatico" 
        label="Reload automático" 
        checked={autoReload} 
        onChange={onChangeAutoReload} 
        className="me-2"
      />
      <Row>
        {mesas.map((mesa) => (
          <Col key={mesa.id} xs={12} sm={6} lg={4} className="d-flex justify-content-center">
            <Link to={`/admin/table/${mesa.id}`}>
              <ListarMesaAdmin key={mesa.id} mesa={mesa} reload={reload} />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
