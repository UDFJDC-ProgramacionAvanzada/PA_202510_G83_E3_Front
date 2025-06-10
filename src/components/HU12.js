// HU11.js
import React, { useState } from 'react';
import './HU11.css'; // Importa tu nuevo archivo de estilos

const HU11 = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    universidad: '',
    correo: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    // Aquí podrías enviar los datos a una API
  };

  return (
    <div className="registro-vendedor-container">
      <h2 className="titulo-registro">Registro de nuevo emprendimiento</h2>
      
      {enviado ? (
        <p className="mensaje-exito">¡Gracias! Tu emprendimiento ha sido registrado.</p>
      ) : (
        <form className="formulario-registro" onSubmit={handleSubmit}>
          <label>
            Nombre del emprendimiento:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Universidad:
            <input
              type="text"
              name="universidad"
              value={formData.universidad}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Correo de contacto:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="boton-enviar">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default HU11;
