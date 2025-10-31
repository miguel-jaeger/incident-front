import React, { useState } from 'react';
import ApiList from './pages/ApiList';
import ApiForm from './pages/ApiForm';
// Asegúrate de que 'bootstrap/dist/css/bootstrap.min.css' esté importado en main.jsx

function App() {
  const [view, setView] = useState('list'); // 'list' o 'form'

  const handleAddItem = () => {
    setView('form');
  };

  const handleGoBack = () => {
    setView('list');
  };

  return (
    // Puedes añadir la clase 'dark' aquí para probar el tema oscuro global
    <div className="bg-light min-vh-100"> 
      {view === 'list' ? (
        <ApiList onAddItem={handleAddItem} />
      ) : (
        <ApiForm onGoBack={handleGoBack} />
      )}
    </div>
  );
}

export default App;