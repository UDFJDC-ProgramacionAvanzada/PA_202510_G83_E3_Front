import React from 'react';
import './App.css';

function App() {
  const handleClick = () => {
    alert("¡Botón clickeado!");
  };

  return (
    <div>
      {/* Enlace real */}
      <a href="#contacto" onClick={() => console.log("Enlace clickeado")}>
        Contacto
      </a>

      {/* Botón estilizado como enlace */}
      <button 
        onClick={handleClick}
        style={{
          background: "none",
          border: "none",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Haz clic
      </button>
    </div>
  );
}


export default App;
