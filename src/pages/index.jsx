import { Link } from "react-router-dom";
import './index.css'
import { LogoLengua } from '../components'

export const Home = () => {

    //const logo = require('../assets/images/LenguaLogo.png');
    return (
        <>
        <LogoLengua />
        <div className="links-to-dogs">
        <h2>Perros</h2>
            <Link to="agenda">
                <button className="btn-opt">🗓️ Agenda</button>
            </Link>
            <Link to="alldogs">
                <button className="btn-opt">🐶 Ver Todos</button>
            </Link>
            <Link to="altadogs">
                <button className="btn-opt">➕ Alta Perro</button>
            </Link>
            <Link to="searchdog">
                <button className="btn-opt">🔎 Buscar</button>
            </Link>
        </div>
        </>
    );
};
