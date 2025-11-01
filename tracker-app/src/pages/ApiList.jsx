import React, { useState, useEffect } from 'react';
import ApiItemCard from '../components/ApiItemCard';
import StatusEditForm from '../components/StatusEditForm'; // Importar el nuevo formulario
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../config/config.js';

const ApiList = ({ onAddItem }) => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Hook para rastrear el ID del incidente que se está editando
    const [editingId, setEditingId] = useState(null); 
    
    // Función para recargar los datos (útil después de un DELETE o POST)
    const fetchIncidents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.statusText || response.status}`);
            }
            const data = await response.json();
            setIncidents(data);
        } catch (err) {
            console.error("Error al cargar los datos:", err);
            setError(`Error al cargar los incidentes. Detalles: ${err.message || "Error de red/CORS"}`);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchIncidents();
    }, []); 

    // --- MANEJO DE ACCIONES ---
    
    // Maneja la acción de eliminar (actualiza el estado local)
    const handleDeleteSuccess = (deletedId) => {
        // Filtra el incidente eliminado del estado local
        setIncidents(prev => prev.filter(item => (item._id || item.id) !== deletedId));
    };

    // Maneja el éxito de la actualización del estado
    const handleUpdateSuccess = (updatedIncident) => {
        // Reemplaza el incidente antiguo con el incidente actualizado
        setIncidents(prev => prev.map(item => 
            (item._id || item.id) === (updatedIncident._id || updatedIncident.id)
                ? updatedIncident
                : item
        ));
        setEditingId(null); // Sale del modo de edición
    };
    
    // Obtiene el incidente actual que se está editando
    const incidentToEdit = incidents.find(item => (item._id || item.id) === editingId);

    // --- Lógica de Renderizado ---
    
    let content;

    if (loading) {
        content = <p className="text-center mt-5">Cargando datos...</p>;
    } else if (error) {
        content = <p className="text-center mt-5 text-danger">{error}</p>;
    } else if (incidents.length === 0) {
        content = <p className="text-center mt-5 text-muted">No se encontraron incidentes.</p>;
    } else {
        // Si hay un ID de edición, muestra el formulario de edición
        if (editingId && incidentToEdit) {
            content = (
                <StatusEditForm 
                    incident={incidentToEdit}
                    onCancel={() => setEditingId(null)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            );
        } else {
            // Muestra la lista normal
            content = (
                <div className="d-flex flex-column gap-3">
                    {incidents.map(item => (
                        <ApiItemCard 
                            key={item._id || item.id} 
                            item={item} 
                            onEditStatus={setEditingId} // Inicia la edición pasando el ID
                            onDelete={handleDeleteSuccess} // Maneja la eliminación
                        /> 
                    ))}
                </div>
            );
        }
    }

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
                {content}
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