import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_URL } from '../config/config.js';

const StatusEditForm = ({ incident, onCancel, onUpdateSuccess }) => {
    const id = incident._id || incident.id;

    // Inicializar el estado con los valores del incidente recibido
    const [newStatus, setNewStatus] = useState(incident.status);
    const [message, setMessage] = useState(incident.message || ''); // valor inicial del backend
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setNewStatus(value);

        // Si cambia a otro estado distinto de CLOSED, limpiar el mensaje
        if (value !== 'CLOSED') {
            setMessage('');
        } else if (incident.message) {
            // Si vuelve a CLOSED, restaurar el mensaje original del backend
            setMessage(incident.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            // Construir el payload
            const payload = { status: newStatus };
            if (newStatus === 'CLOSED' && message.trim() !== '') {
                payload.message = message;
            }

            const response = await fetch(`${API_URL}/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.statusText}`);
            }

            const updatedIncident = await response.json();
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
                    <Form.Select 
                        value={newStatus} 
                        onChange={handleStatusChange} 
                        disabled={isSubmitting}
                    >
                        <option>OPEN</option>
                        <option>IN_PROGRESS</option>
                        <option>CLOSED</option>
                    </Form.Select>
                </Form.Group>

                {/* Campo condicional para message */}
                {newStatus === 'CLOSED' && (
                    <Form.Group controlId="message" className="mb-3">
                        <Form.Label className="small fw-medium">Mensaje de cierre</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Describe el motivo del cierre..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </Form.Group>
                )}

                <Row className="g-2">
                    <Col>
                        <Button 
                            variant="secondary" 
                            onClick={onCancel} 
                            className="w-100" 
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                    </Col>
                    <Col>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100" 
                            disabled={
                                isSubmitting || 
                                (newStatus === incident.status && message.trim() === (incident.message || ''))
                            }
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
