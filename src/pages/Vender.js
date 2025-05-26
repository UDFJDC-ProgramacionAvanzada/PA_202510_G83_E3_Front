import './Vender.css';

function Vender() {
    return(
        <>
        
        <header>
            <div className="vender-container">
                <h1 className='texto-vender'>VENDER</h1>
                <div className='register'>
                    <span className='register-text'>Eres nuevo?</span>
                    <button className='register-button'>Registrate</button>
                </div>
            </div>
        </header>
        
        <div className='profile-container'>
            <div className='secciones'>
                <button className='stands'> Stands </button>
                <button className='productos'> Productos que ya se estan vendiendo </button>
                <button className='publicar'> Publicar nuevo emprendimiento</button>
                <button className='universidades'> Universidad </button>
            </div>

            <div className='login-container'>
            
                <form className='formulario_inicio'>
                    <input type="text" className='input-user' placeholder='Usuario' />
                    <input type="text" className='input-emprendimiento' placeholder='Nombre del emprendimiento' />
                    <input type="password" className='input-password' placeholder='Contraseña' />
            
                </form>
            </div>



        </div>
        
        </>

        
    )
}

export default Vender;