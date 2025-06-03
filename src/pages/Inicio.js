import React from 'react';
import './Inicio.css';
import HU13 from '../components/HU13.js';
import Mapa from '../components/Mapa.js' 
import Navbar from '../components/Navbardef.js'; 
import Footer from '../components/footer.js';

function Inicio() {
  return (
    <React.Fragment>
    <body>
        <div>
        <Navbar/>
      </div>
      <div className="hu13-container">
        <HU13 />
      </div>    
      <div className="mapa-container">
        <Mapa/>
      </div>
    </body>
      <footer>
        <Footer/>
      </footer>
    </React.Fragment>
  );
}

export default Inicio;
