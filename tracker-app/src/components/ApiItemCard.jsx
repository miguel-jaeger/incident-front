import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ApiItemCard = ({ item }) => {
    const getStatusVariant = (status) => {
        if (status === 'OPEN') return { text: 'Active', variant: 'success' };
        if (status === 'IN_PROGRESS') return { text: 'In Progress', variant: 'warning' };
        return { text: 'Inactive', variant: 'secondary' };
    };

    const getSeverityVariant = (severity) => {
        if (severity === 'HIGH') return { text: 'High', variant: 'danger' };
        if (severity === 'MEDIUM') return { text: 'Medium', variant: 'warning' };
        return { text: 'Low', variant: 'info' };
    };

    const status = getStatusVariant(item.status);
    const severity = getSeverityVariant(item.severity);

    return (
        <Card className="shadow-sm mb-3">
            <a href="#" className="text-decoration-none text-reset">
                <Card.Body>
                    <Card.Title as="h5" className="text-dark">
                        {item.title}
                    </Card.Title>
                    <Card.Text className="text-muted small" style={{ WebkitLineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                        {item.description}
                    </Card.Text>
                    <div className="d-flex align-items-center gap-2 mt-3">
                        <Badge bg={status.variant} className="py-1 px-2">
                            {status.text}
                        </Badge>
                        <Badge bg={severity.variant} className="py-1 px-2">
                            {severity.text}
                        </Badge>
                    </div>
                    <Card.Text className="text-muted mt-3" style={{ fontSize: '0.75rem' }}>
                        Created: {item.createdAt}
                    </Card.Text>
                </Card.Body>
            </a>
            <Card.Footer className="bg-white border-top">
                <Button variant="link" className="w-100 text-decoration-none p-2 text-primary">
                    <span className="material-symbols-outlined me-1" style={{ fontSize: '1rem' }}>edit</span>
                    Edit
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default ApiItemCard;