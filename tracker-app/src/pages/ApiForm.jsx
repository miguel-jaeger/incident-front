import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ApiForm = ({ onGoBack }) => {
    const currentDate = "2023-10-27 10:00 AM"; 
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving item...");
        onGoBack(); 
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="sticky-top bg-light border-bottom p-3 d-flex align-items-center gap-3">
                <Button variant="outline-secondary" onClick={onGoBack} className="border-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </Button>
                <h1 className="h5 fw-bold mb-0 text-dark">Add New Item</h1>
            </header>

            <main className="flex-grow-1 overflow-y-auto p-3 pb-5">
                <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                    <Form.Group controlId="title">
                        <Form.Label className="small fw-medium">Title</Form.Label>
                        <Form.Control type="text" placeholder="e.g., User Authentication Endpoint" required />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label className="small fw-medium">Description</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Enter a detailed description..." required />
                    </Form.Group>

                    <Form.Group controlId="status">
                        <Form.Label className="small fw-medium">Status</Form.Label>
                        <Form.Select>
                            <option>OPEN</option>
                            <option>IN_PROGRESS</option>
                            <option>CLOSED</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="severity">
                        <Form.Label className="small fw-medium">Severity</Form.Label>
                        <Form.Select>
                            <option>HIGH</option>
                            <option>MEDIUM</option>
                            <option>LOW</option>
                        </Form.Select>
                    </Form.Group>

                    <Row className="g-3">
                        <Col>
                            <Form.Group controlId="created-at">
                                <Form.Label className="small fw-medium">Created At</Form.Label>
                                <Form.Control type="text" readOnly value={currentDate} className="bg-light text-muted" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="updated-at">
                                <Form.Label className="small fw-medium">Updated At</Form.Label>
                                <Form.Control type="text" readOnly value={currentDate} className="bg-light text-muted" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </main>

            <footer className="fixed-bottom bg-light border-top p-3">
                <Row className="g-3">
                    <Col>
                        <Button variant="secondary" onClick={onGoBack} className="w-100 py-2">
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleSubmit} className="w-100 py-2">
                            Save
                        </Button>
                    </Col>
                </Row>
            </footer>
        </div>
    );
};

export default ApiForm;