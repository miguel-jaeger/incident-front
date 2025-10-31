import React from 'react';
import ApiItemCard from '../components/ApiItemCard';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const mockItems = [
    { id: 1, title: "User Authentication Endpoint", description: "Manages user login, registration, and session tokens to secure access to the application.", status: "OPEN", severity: "HIGH", createdAt: "2023-10-26" },
    { id: 2, title: "Product Catalog Service", description: "Provides endpoints to fetch, create, update, and delete product information from the database.", status: "OPEN", severity: "MEDIUM", createdAt: "2023-10-25" },
    { id: 3, title: "Payment Gateway Integration", description: "Handles secure payment processing and transaction logging with a third-party provider.", status: "CLOSED", severity: "HIGH", createdAt: "2023-10-22" },
    { id: 4, title: "Image Processing API", description: "Allows for uploading, resizing, and applying filters to images stored in the cloud.", status: "OPEN", severity: "LOW", createdAt: "2023-10-20" },
];

const ApiList = ({ onAddItem }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="sticky-top bg-light border-bottom p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <span className="material-symbols-outlined text-2xl text-dark">api</span>
                    <h1 className="h5 fw-bold mb-0 text-dark">API Items</h1>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="outline-secondary" className="border-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="material-symbols-outlined">search</span>
                    </Button>
                    <Button variant="outline-secondary" className="border-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="material-symbols-outlined">filter_list</span>
                    </Button>
                </div>
            </header>
            <Container fluid className="flex-grow-1 p-3 pb-5">
                <div className="d-flex flex-column gap-3">
                    {mockItems.map(item => (
                        <ApiItemCard key={item.id} item={item} />
                    ))}
                </div>
            </Container>
            <div className="position-fixed bottom-0 end-0 p-4">
                <Button onClick={onAddItem} variant="primary" className="rounded-circle shadow-lg" style={{ width: '56px', height: '56px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.8rem' }}>add</span>
                </Button>
            </div>
        </div>
    );
};

export default ApiList;