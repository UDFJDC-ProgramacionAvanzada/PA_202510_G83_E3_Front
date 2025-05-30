import messages_es from '../localizacion/ES.json';
import messages_en from '../localizacion/EN.json';

export default function detectLanguage() {
    const lang = navigator.language;
    if (lang.startsWith('es')) {
        return { locale: 'es-ES', messages: messages_es };
    } else {
        return { locale: 'en-US', messages: messages_en };
    }
}
