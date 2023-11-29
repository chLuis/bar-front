import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);
    //const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  

  

  
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
    return (
      <nav className={`navbar ${showMenu ? 'active' : ''}`}>
        <div className="navbar-container">
          
          <div className="navbar-toggle" onClick={toggleMenu}>
            ☰
          </div>
          <div className="navbar-btn-home">
            <Link to={"/"}>Inicio</Link>
        </div>
        </div>
        <div className={`mobile-menu ${showMenu ? 'active' : ''}`}>
          <Link to={"/"}><a href="#">Inicio</a></Link>
          <Link><a href="#">Peluqueria</a></Link>
          <Link><a href="#">Tienda</a></Link>
          <Link><a href="#">Contacto</a></Link>
        </div>
      </nav>
    );
  };