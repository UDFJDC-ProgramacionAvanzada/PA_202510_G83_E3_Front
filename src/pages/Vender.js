import './Vender.css';
import { FormattedMessage } from 'react-intl';
import "../localizacion/EN.json";
import { Link } from 'react-router-dom';

function Vender() {
    return(
        <>

        <header>
            <div className="vender-container">
                <h1 className='texto-vender'><FormattedMessage id='VENDER'/></h1>
                <div className='register'>
                    <span className='register-text'><FormattedMessage id='Eres_nuevo?'/></span>
                    <button className='register-button'><FormattedMessage id='Registrate'/></button>
                </div>
            </div>
        </header>

        <div className='profile-container'>
            <div className='secciones'>
                <Link to="/stands" className='stands'><FormattedMessage id='Stand'/></Link>
                <button className='productos'><FormattedMessage id='Productos_que_ya_se_estan_vendiendo'/></button>
                <button className='publicar'><FormattedMessage id='Publicar_nuevo_emprendimiento'/></button>
                <button className='universidades'><FormattedMessage id='Universidad'/></button>
            </div>

            <div className='login-container'>

                <form className='formulario_inicio'>
                    <input type="text" className='input-user' placeholder='Usuario' />
                    <input type="text" className='input-emprendimiento' placeholder='Nombre del emprendimiento' />
                    <input type="password" className='input-password' placeholder='Contraseña' />

                </form>
            </div>
        </div>
        
        <footer className='footer-stands'>
            <Link to="/" className="btn-regresar">&#8592;</Link>
        </footer>

        </>


    )
}

export default Vender;