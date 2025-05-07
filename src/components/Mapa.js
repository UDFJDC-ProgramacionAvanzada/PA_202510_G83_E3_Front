import React from "react";
import './Mapa.css'; // Asegúrate de que la ruta sea correcta


function Mapa() {

    return (
        <div className="mapa_maps">
            <div className="mapa_contenido">
                <span className="titulo_de_maps">Mira nuestro mapa</span>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127251.74934827193!2d-74.09853728564451!3d4.662156251880545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoQ!5e0!3m2!1ses!2sco!4v1746581177507!5m2!1ses!2sco"
                    className="mapa_bogota"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación en el mapa"
                ></iframe>
                <p className="texto_descrip_mapa">Descubre los lugares más interesantes</p>
            </div>
        </div>
    );
}

export default Mapa;