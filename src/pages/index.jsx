import { Link } from "react-router-dom";
import './index.css'

export const Home = () => {
    return (
        <div className="links-to-dogs">
        <h2>Perros</h2>
            <Link to="alldogs">
                <button className="btn-opt">Ver Todos</button>
            </Link>
            <Link to="altadogs">
                <button className="btn-opt">Alta</button>
            </Link>
            <Link to="searchdog">
                <button className="btn-opt">Buscar</button>
            </Link>
        </div>
    );
};
