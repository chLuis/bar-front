import "./navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (<div className="navbar-container">
        <div className="navbar">
            <div className="navbar-links-left">
                <Link to={"/"}>
                    <p className="Links-navbar-home">Inicio</p>
                </Link>
                <Link to={"/"}>
                    <p className="Links-navbar">Peluqueria</p>
                </Link>
                <Link to={"/"}>
                    <p className="Links-navbar">Tienda</p>
                </Link>
            </div>
            <div className="navbar-links-right">
                <Link to={"/"}>
                    <p className="Links-navbar">Contacto</p>
                </Link>
            </div>
        </div>
        </div>
    );
};
