// Importa los archivos JSON con las traducciones para español e inglés
import messages_es from '../localizacion/ES.json';
import messages_en from '../localizacion/EN.json';

// Función para detectar el idioma del navegador y devolver el locale y mensajes correspondientes
export default function detectLanguage() {
    // Obtiene el idioma configurado en el navegador (ejemplo: "es-ES", "en-US")
    const lang = navigator.language;

    // Si el idioma comienza con "es", se devuelve configuración para español
    if (lang.startsWith('es')) {
        return { 
            locale: 'es-ES',         // Código de localización para español de España
            messages: messages_es    // Mensajes en español importados
        };
    } else {
        // Por defecto, se devuelve configuración para inglés
        return { 
            locale: 'en-US',         // Código de localización para inglés estadounidense
            messages: messages_en    // Mensajes en inglés importados
        };
    }
}
