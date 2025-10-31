import React, { useState, useEffect } from 'react';
import ApiItemCard from '../components/ApiItemCard';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const API_URL = 'https://api-incident.onrender.com/api/incidents';


const ApiList = ({ onAddItem }) => {
    // 1. Hook para almacenar los datos de la API
    const [incidents, setIncidents] = useState([]);
    // 2. Hook para manejar el estado de carga (loading)
    const [loading, setLoading] = useState(true);
    // 3. Hook para manejar posibles errores
    const [error, setError] = useState(null);

    // 4. Hook de efecto para realizar la llamada a la API
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await fetch(API_URL);
                
                // Manejo básico de errores HTTP (ej. 404 o 500)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Asumiendo que la respuesta es un array de incidentes directamente
                setIncidents(data);
                setError(null);

            } catch (err) {
                console.error("Error al cargar los datos:", err);
                setError("Error al cargar los incidentes. Por favor, inténtelo de nuevo.");

            } finally {
                // Independientemente del éxito o fracaso, terminamos la carga
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez al montar el componente

    // --- Lógica de Renderizado ---
    
    let content;

    if (loading) {
        content = <p className="text-center mt-5">Cargando datos...</p>;
    } else if (error) {
        content = <p className="text-center mt-5 text-danger">{error}</p>;
    } else if (incidents.length === 0) {
        content = <p className="text-center mt-5 text-muted">No se encontraron incidentes.</p>;
    } else {
        content = (
            <div className="d-flex flex-column gap-3">
                {incidents.map(item => (
                    // Usamos _id (común en APIs) o id si existe
                    <ApiItemCard key={item._id || item.id} item={item} /> 
                ))}
            </div>
        );
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