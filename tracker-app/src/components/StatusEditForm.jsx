import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_BASE_URL = 'https://api-incident.onrender.com/api/incidents';

// Recibe el incidente actual, y funciones para cerrar y actualizar la lista
const StatusEditForm = ({ incident, onCancel, onUpdateSuccess }) => {
    
    const id = incident._id || incident.id;
    const [newStatus, setNewStatus] = useState(incident.status);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            const response = await fetch(`${API_BASE_URL}/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.statusText}`);
            }

            const updatedIncident = await response.json();

            // Si tiene éxito, notifica al padre y cierra el formulario
            onUpdateSuccess(updatedIncident); 
            onCancel();

        } catch (err) {
            console.error("Error al actualizar el estado:", err);
            setError(`Fallo al actualizar el estado: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="p-4 border rounded shadow-sm bg-white mb-4">
            <h2 className="h5 mb-3">Editar Estado: {incident.title}</h2>
            {error && <div className="alert alert-danger small">{error}</div>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="status" className="mb-3">
                    <Form.Label className="small fw-medium">Nuevo Estado</Form.Label>
                    <Form.Select value={newStatus} onChange={handleStatusChange} disabled={isSubmitting}>
                        <option>OPEN</option>
                        <option>IN_PROGRESS</option>
                        <option>CLOSED</option>
                    </Form.Select>
                </Form.Group>

                <Row className="g-2">
                    <Col>
                        <Button variant="secondary" onClick={onCancel} className="w-100" disabled={isSubmitting}>
                            Cancelar
                        </Button>
                    </Col>
                    <Col>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100" 
                            disabled={isSubmitting || newStatus === incident.status} // Deshabilitar si no hay cambios
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StatusEditForm;