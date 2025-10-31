import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const API_BASE_URL = 'https://api-incident.onrender.com/api/incidents';

// Aceptamos las funciones onEditStatus y onDelete desde el padre (ApiList)
const ApiItemCard = ({ item, onEditStatus, onDelete }) => {
    
    // --- Lógica de Variante (sin cambios) ---
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

    // --- Función para ELIMINAR el incidente (llamada a la API) ---
    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de que quieres eliminar el incidente: ${item.title}?`)) {
            return;
        }

        try {
            // Usamos _id o id (depende de tu API)
            const id = item._id || item.id; 
            
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                // Spring DELETE debería devolver 204 No Content
                throw new Error(`Fallo al eliminar: ${response.statusText || response.status}`);
            }

            // Si tiene éxito, notifica al componente padre para actualizar la lista
            onDelete(id); 

        } catch (error) {
            console.error("Error al eliminar el incidente:", error);
            alert(`Error al eliminar: ${error.message}`);
        }
    };
    
    // --- Renderizado ---
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
                        <Badge bg={status.variant} className="py-1 px-2">{status.text}</Badge>
                        <Badge bg={severity.variant} className="py-1 px-2">{severity.text}</Badge>
                    </div>
                    <Card.Text className="text-muted mt-3" style={{ fontSize: '0.75rem' }}>
                        Created: {item.createdAt}
                    </Card.Text>
                </Card.Body>
            </a>
            
            <Card.Footer className="bg-white border-top d-flex justify-content-between p-0">
                
                {/* 1. Botón para EDITAR ESTADO */}
                <Button 
                    variant="link" 
                    className="flex-grow-1 text-decoration-none p-2 text-primary border-end"
                    // Llama a la función del padre para iniciar el modo de edición de estado
                    onClick={() => onEditStatus(item._id || item.id)} 
                >
                    <span className="material-symbols-outlined me-1" style={{ fontSize: '1rem' }}>edit</span>
                    Editar Estado
                </Button>
                
                {/* 2. Botón para ELIMINAR */}
                <Button 
                    variant="link" 
                    className="flex-grow-1 text-decoration-none p-2 text-danger"
                    onClick={handleDelete}
                >
                    <span className="material-symbols-outlined me-1" style={{ fontSize: '1rem' }}>delete</span>
                    Eliminar
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default ApiItemCard;