import React from 'react';
import './Terms.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Terms() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="terms-container">
            <button className="back-button" onClick={handleGoBack}>
                <ArrowLeft size={18} style={{ marginRight: '8px' }} />
                Volver
            </button>

            <div className="terms-header">
                <h1 className="terms-title">Términos y Condiciones de Uso</h1>
                <p className="terms-subtitle">Mercaú - Última actualización: Junio 2025</p>
            </div>

            <div className="terms-content">
                <h2>1. Aceptación de los Términos</h2>
                <p>
                    Al acceder y utilizar Mercaú ("la Plataforma"), usted acepta cumplir y estar sujeto a estos Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a la Plataforma.
                </p>

                <h2>2. Descripción del Servicio</h2>
                <p>
                    Mercaú es una plataforma de marketplace universitario que conecta a estudiantes vendedores con estudiantes compradores dentro del ámbito universitario. La Plataforma permite:
                </p>
                <ul>
                    <li>Crear stands virtuales para vender productos</li>
                    <li>Comprar productos de otros estudiantes</li>
                    <li>Gestionar transacciones entre estudiantes</li>
                    <li>Calificar y comentar sobre las experiencias de compra</li>
                </ul>

                <h2>3. Elegibilidad</h2>
                <p>Para utilizar Mercaú, usted debe:</p>
                <ul>
                    <li>Ser estudiante activo de una universidad reconocida</li>
                    <li>Tener al menos 18 años de edad</li>
                    <li>Proporcionar información veraz y actualizada</li>
                    <li>Mantener la seguridad de su cuenta y contraseña</li>
                </ul>

                <h2>4. Registro de Cuenta</h2>
                <h3>4.1 Información de Registro</h3>
                <p>Al crear una cuenta, usted se compromete a:</p>
                <ul>
                    <li>Proporcionar información precisa y completa</li>
                    <li>Mantener actualizada su información de perfil</li>
                    <li>No crear múltiples cuentas</li>
                    <li>No compartir sus credenciales de acceso</li>
                </ul>

                <h3>4.2 Verificación Universitaria</h3>
                <p>
                    Mercaú se reserva el derecho de solicitar verificación de su estatus como estudiante universitario mediante:
                </p>
                <ul>
                    <li>Correo institucional</li>
                    <li>Carnet estudiantil</li>
                    <li>Otros documentos que acrediten su condición de estudiante</li>
                </ul>

                <h2>5. Uso de la Plataforma</h2>
                <h3>5.1 Conducta del Usuario</h3>
                <p>Los usuarios se comprometen a:</p>
                <ul>
                    <li>No utilizar la Plataforma para actividades ilegales</li>
                    <li>No publicar contenido ofensivo, discriminatorio o inapropiado</li>
                    <li>Respetar los derechos de propiedad intelectual</li>
                    <li>No realizar spam o publicidad no autorizada</li>
                    <li>Mantener un comportamiento respetuoso con otros usuarios</li>
                </ul>

                <h3>5.2 Productos Prohibidos</h3>
                <p>No se permite la venta de:</p>
                <ul>
                    <li>Productos ilegales o regulados</li>
                    <li>Armas o materiales peligrosos</li>
                    <li>Medicamentos que requieran prescripción</li>
                    <li>Contenido para adultos</li>
                    <li>Servicios académicos fraudulentos (trabajos, exámenes, etc.)</li>
                    <li>Productos falsificados o robados</li>
                </ul>

                <h2>6. Stands y Productos</h2>
                <h3>6.1 Creación de Stands</h3>
                <ul>
                    <li>Cada usuario puede crear un único stand</li>
                    <li>La información del stand debe ser veraz y completa</li>
                    <li>Las imágenes deben ser propias o con derechos de uso</li>
                    <li>Los horarios y ubicación deben mantenerse actualizados</li>
                </ul>

                <h3>6.2 Publicación de Productos</h3>
                <p>Los vendedores garantizan que:</p>
                <ul>
                    <li>Los productos son de su propiedad legítima</li>
                    <li>Las descripciones son precisas y no engañosas</li>
                    <li>Las imágenes corresponden al producto real</li>
                    <li>Los precios están claramente indicados en pesos colombianos (COP)</li>
                </ul>

                <h2>7. Transacciones</h2>
                <h3>7.1 Proceso de Compra</h3>
                <ul>
                    <li>Las transacciones son directamente entre comprador y vendedor</li>
                    <li>Mercaú no procesa pagos ni actúa como intermediario financiero</li>
                    <li>Los usuarios son responsables de acordar métodos de pago y entrega</li>
                </ul>

                <h3>7.2 Responsabilidad</h3>
                <ul>
                    <li>Mercaú no garantiza la calidad de los productos</li>
                    <li>Los usuarios realizan transacciones bajo su propio riesgo</li>
                    <li>Se recomienda verificar los productos antes de completar la compra</li>
                </ul>

                <h2>8. Sistema de Calificaciones y Comentarios</h2>
                <ul>
                    <li>Las reseñas deben ser honestas y basadas en experiencias reales</li>
                    <li>No se permite manipular las calificaciones</li>
                    <li>Los comentarios ofensivos serán removidos</li>
                    <li>Mercaú se reserva el derecho de moderar el contenido</li>
                </ul>

                <h2>9. Privacidad y Protección de Datos</h2>
                <h3>9.1 Información Personal</h3>
                <ul>
                    <li>Recopilamos solo la información necesaria para el funcionamiento del servicio</li>
                    <li>No compartimos información personal con terceros sin consentimiento</li>
                    <li>Los usuarios pueden solicitar la eliminación de sus datos</li>
                </ul>

                <h3>9.2 Uso de Datos</h3>
                <p>La información recopilada se utiliza para:</p>
                <ul>
                    <li>Facilitar las transacciones entre usuarios</li>
                    <li>Mejorar la experiencia de usuario</li>
                    <li>Enviar notificaciones relevantes</li>
                    <li>Cumplir con obligaciones legales</li>
                </ul>

                <h2>10. Propiedad Intelectual</h2>
                <ul>
                    <li>El contenido de Mercaú está protegido por derechos de autor</li>
                    <li>Los usuarios conservan los derechos sobre su contenido</li>
                    <li>Al publicar contenido, otorgan a Mercaú licencia para mostrarlo en la Plataforma</li>
                    <li>Se prohíbe el uso no autorizado de la marca Mercaú</li>
                </ul>

                <h2>11. Limitación de Responsabilidad</h2>
                <p><strong>Mercaú:</strong></p>
                <ul>
                    <li>No es responsable por las acciones de los usuarios</li>
                    <li>No garantiza la disponibilidad continua del servicio</li>
                    <li>No es responsable por pérdidas derivadas del uso de la Plataforma</li>
                    <li>Actúa únicamente como facilitador de conexiones entre usuarios</li>
                </ul>

                <h2>12. Suspensión y Terminación</h2>
                <p>Mercaú se reserva el derecho de:</p>
                <ul>
                    <li>Suspender o terminar cuentas que violen estos términos</li>
                    <li>Eliminar contenido que considere inapropiado</li>
                    <li>Modificar o discontinuar el servicio</li>
                    <li>Tomar acciones legales cuando sea necesario</li>
                </ul>

                <h2>13. Resolución de Disputas</h2>
                <ul>
                    <li>Las disputas entre usuarios deben resolverse directamente entre las partes</li>
                    <li>Mercaú puede actuar como mediador pero no está obligado a hacerlo</li>
                    <li>Estos términos se rigen por las leyes de Colombia</li>
                    <li>Cualquier disputa legal se resolverá en los tribunales de Bogotá, Colombia</li>
                </ul>

                <h2>14. Modificaciones</h2>
                <ul>
                    <li>Mercaú puede modificar estos términos en cualquier momento</li>
                    <li>Los cambios se notificarán a través de la Plataforma</li>
                    <li>El uso continuado constituye aceptación de los nuevos términos</li>
                </ul>

                <div className="contact-info">
                    <h2>15. Contacto</h2>
                    <p>Para preguntas sobre estos Términos y Condiciones, contáctenos en:</p>
                    <ul>
                        <li><strong>Email:</strong> soporte@mercau.com</li>
                        <li><strong>Plataforma:</strong> Sección de Ayuda y Soporte</li>
                    </ul>
                </div>

                <h2>16. Disposiciones Finales</h2>
                <ul>
                    <li>Si alguna disposición es inválida, las demás permanecerán vigentes</li>
                    <li>Estos términos constituyen el acuerdo completo entre las partes</li>
                    <li>La falta de ejercicio de un derecho no constituye renuncia al mismo</li>
                </ul>

                <div className="acceptance-note">
                    <p>
                        <strong>Al hacer clic en "Aceptar" o al utilizar Mercaú, usted confirma que ha leído, entendido y aceptado estos Términos y Condiciones.</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Terms;