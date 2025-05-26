import React from 'react';
import './stands.css';

function StandsFunc() {
    return(
            <body className="stands-container">
                <header className="navbar" >
                <h1 className="title">Stands</h1>
                </header>
                
                <main className="main-content">
                    <section className="left-section">
                        <div className="subtitle-container">
                        <h2 className="subtitle">Stands disponibles</h2>
                        </div>

                        <div className="input-group">
                        <label className="input-text">En qué universidad te encuentras:</label>
                        <input list="universidades" id="universidades "type="text" autocomplete="off" className="input" placeholder="Ej: Universidad de los Andes"/>
                        </div>

                        <div class="box" id="recomendaciones">
                        <h3>Recomendaciones para ti</h3>
                        <p>Según reservaciones anteriores</p>
                        </div>

                        <div class="box" id="estadisticas">
                        <h3>Estadísticas de stands anteriores</h3>
                        <p>Según reservaciones anteriores</p>
                        </div>

                        <button id="ver-perfil">Ver mi perfil</button>    
                    </section>

                    <section className="right-section">
                            <h2>Stands disponibles en <em>Universidad de los Andes</em></h2>

                            <div id="mapa-stands">
                            <img src="ruta/a/tu/imagen-del-mapa.png" alt="Mapa de la universidad con stands disponibles"/>
                            </div>
                    </section>
                </main>
            <footer>
            <button id="btn-regresar">&#8592;</button>
            </footer>
            </body>
    )
}

export default StandsFunc;