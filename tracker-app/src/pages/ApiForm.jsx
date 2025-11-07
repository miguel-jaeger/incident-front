import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_URL } from '../config/config.js';

// Función para formatear la fecha y hora actuales
const formatDateTime = (date) => {
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    };
    return new Date(date).toLocaleString('es-ES', options).replace(',', '');
};

const ApiForm = ({ onGoBack }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'OPEN',
        severity: 'HIGH',
        message: '', // NUEVO
        createdAt: formatDateTime(new Date()),
        updatedAt: formatDateTime(new Date()),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
            updatedAt: formatDateTime(new Date())
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionError(null);

        try {
            // MODIFICADO: incluir message solo si existe
            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                severity: formData.severity,
            };

            if (formData.status === 'CLOSED' && formData.message.trim() !== '') {
                payload.message = formData.message;
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            onGoBack();

        } catch (error) {
            setSubmissionError(`Fallo al guardar: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="sticky-top bg-light border-bottom p-3 d-flex align-items-center gap-3">
                <Button variant="outline-secondary" onClick={onGoBack} className="border-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </Button>
                <h1 className="h5 fw-bold mb-0 text-dark">Add New Item</h1>
            </header>

            <main className="flex-grow-1 overflow-y-auto p-3" style={{ paddingBottom: '160px' }}>
                {submissionError && <div className="alert alert-danger" role="alert">{submissionError}</div>}
                <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

                    <Form.Group controlId="title">
                        <Form.Label className="small fw-medium">Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., User Authentication Endpoint"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label className="small fw-medium">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter a detailed description..."
                            required
                            value={formData.description}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </Form.Group>

                    <Form.Group controlId="status">
                        <Form.Label className="small fw-medium">Status</Form.Label>
                        <Form.Select
                            value={formData.status}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option>ABIERTO</option>
                            <option>PROGRESO</option>
                            <option>CERRADO</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="severity">
                        <Form.Label className="small fw-medium">Severity</Form.Label>
                        <Form.Select
                            value={formData.severity}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option>HIGH</option>
                            <option>MEDIUM</option>
                            <option>LOW</option>
                        </Form.Select>
                    </Form.Group>

                    {/* NUEVO: campo condicional para message */}
                    {formData.status === 'CLOSED' && (
                        <Form.Group controlId="message">
                            <Form.Label className="small fw-medium">Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter closing message..."
                                required
                                value={formData.message}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </Form.Group>
                    )}

                </Form>
            </main>

            <footer className="bg-light border-top p-3 mt-auto">
                <Row className="g-3">
                    <Col>
                        <Button variant="secondary" onClick={onGoBack} className="w-100 py-2" disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                            className="w-100 py-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </Col>
                </Row>
            </footer>
        </div>
    );
};

export default ApiForm;
