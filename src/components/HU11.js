import React, { useState } from 'react';
import './HU12.css';

function HU12() {
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombreProducto || !descripcion || !imagen) {
            alert("Por favor completa todos los campos.");
            return;
        }
        alert("¡Producto publicado exitosamente!");
        setNombreProducto('');
        setDescripcion('');
        setImagen(null);
    };

    return (
        <div className="hu12-container">
            <h2>Agregar nuevo producto</h2>
            <form onSubmit={handleSubmit} className="hu12-form">
                <input 
                    type="text" 
                    placeholder="Nombre del producto" 
                    value={nombreProducto}
                    onChange={(e) => setNombreProducto(e.target.value)}
                />
                <textarea 
                    placeholder="Descripción del producto" 
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImagenChange}
                />
                {imagen && <img src={imagen} alt="Vista previa" className="hu12-preview" />}
                <button type="submit">Publicar producto</button>
            </form>
        </div>
    );
}

export default HU12;
