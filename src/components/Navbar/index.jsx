import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
//import { Login } from '../index.js'

export const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [modalLoginShow, setModalLoginShow] = useState(false)
    //const [valorDelModal, setValorDelModal] = useState(false)
    //const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);


  function cambiarvalor() {
    setModalLoginShow(!modalLoginShow)
}
  function showModalLogin() {
    setModalLoginShow(!modalLoginShow);
  }
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
    return (
      <nav className={`navbar ${showMenu ? 'active' : ''}`}>
      {modalLoginShow && <div className="modal-login">
            <h2>Bienvenido</h2>
            <input type="text"></input>
            <input type="password"></input>
            <button>Iniciar</button>
            <button onClick={cambiarvalor}>Cerrar</button>
        </div>}
        <div className="navbar-container">
          
          <div className="navbar-toggle" onClick={toggleMenu}>
            ☰
          </div>
          <div className="navbar-btn-home">
            <Link onClick={showModalLogin}>Inicia sesion</Link>
        </div>
        </div>
        <div onClick={toggleMenu} className={`mobile-menu ${showMenu ? 'active' : ''}`}>
          
          <div className="navbar-pelu-div"><Link to={"/"} className="navbarToHome">Inicio</Link></div>
          <div>
          <div className="navbar-pelu-div">Peluqueria</div>
            <div className="navbar-pelu-div-links">
              <Link to="peluqueria/nuestrosalon" className="navbarToPelu">- Conoce nuestro salón y más</Link> <br></br>
              <Link to="peluqueria/nuestrosservicios" className="navbarToPelu">- Qué servicios ofrecemos</Link><br></br>
              <Link to="peluqueria/nuestraformacion" className="navbarToPelu">- Nuestra formación</Link><br></br>
              <Link to="peluqueria/trabajosytestimonios" className="navbarToPelu">- Nuestros trabajos y testimonios</Link><br></br>
              <Link to="agendadogs" className="navbarToPelu">- Agenda tu turno</Link>
            </div>
          </div>
          <div>
            <div className="navbar-pelu-div">Tienda</div>
            <div className="navbar-pelu-div-links">
              <Link to="tienda/equipamiento" className="navbarToPelu">- Equipamiento de paseo</Link> <br></br>
              <Link to="tienda/cosmetica" className="navbarToPelu">- Cosmética natural</Link><br></br>
              <Link to="tienda/accesorios" className="navbarToPelu">- Accesorios</Link><br></br>
              <Link to="tienda/kitslimpieza" className="navbarToPelu">- ¡Quiero mis kits de limpieza "Lengua Afuera"</Link><br></br>
            </div>
          </div>
          <div className="navbar-pelu-div">Contacto</div>
          <div className="navbar-redes">
          <a href="https://www.instagram.com/lengua_afuera/">
                <i className="fa-brands fa-instagram iconsFooter-insta"></i>
            </a>
            <a href="https://w.app/5fgq7w" className="link-to-insta">
                <i className="fa-brands fa-whatsapp iconsFooter-wsp"></i>
            </a>
          </div>
        </div>
      </nav>
    );
  };