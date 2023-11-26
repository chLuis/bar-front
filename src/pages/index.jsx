import { useQuery } from "@tanstack/react-query";
import { getDogs } from '../api/dogsAPI.js';
import { Link } from "react-router-dom";
import "./index.css";
import { LogoLengua } from "../components";
import { useState } from "react";

export const Home = () => {

    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs,
        //select: dogs => dogs.sort((a, b) => b.id - a.id)
    });

    const [admin, setAdmin] = useState(false);
    const [peluLink, setPeluLink] = useState(false);
    //const logo = require('../assets/images/LenguaLogo.png');

    function linksToPelu() {
        setPeluLink(!peluLink);
    }

    return (
        <>
            <LogoLengua />
            <section className="home-public">
                
                <p>
                    En estos links podrás conocer los servicios que brindamos,
                    además ver equipamientos y accesorios en nuestra tienda para
                    tu compañero de 4 patas.
                </p>
                <article>
                <div className="home-link-pelu">
                    {!peluLink &&<div onClick={linksToPelu} className="peluPrevLink">
                        PELUQUERÍA CANINA<br></br><span>---- <i class="fa-regular fa-hand-pointer"></i> ----</span>
                    </div>}
                    {peluLink &&<div onClick={linksToPelu} className="peluRealLink">
                    <a>- Conoce nuestro salón y más</a> <br></br>
                    <a>- Qué servicios ofrecemos.</a><br></br>
                    <a>- Nuestra formación.</a><br></br>
                    <a>- Nuestros trabajos y testimonios.</a><br></br>
                        <a>Agenda tu turno</a>
                    </div>}
                </div>
{/*                 
                    <h4>1) PELUQUERÍA CANINA</h4>
                     */}
                </article>
                <article>
                    <h4>2) TIENDA</h4>
                    <h5>
                        Equipamiento de paso<br></br>
                        Cosmética natural<br></br>
                        Accesorios<br></br>
                        <a>Quiero mis kits de limpieza "Lengua Afuera"</a>
                    </h5>
                </article>
            </section>
            <button className="btn-momentaneo" onClick={() => setAdmin(!admin)}> Mostrar opciones de Administrador </button>
            {admin && (
                <div className="links-to-dogs">
                    <Link to="searchdog">
                        <button className="btn-opt">🔎 Buscar</button>
                    </Link>
                    <Link to="alldogs">
                        <button className="btn-opt">🐶 Ver Todos</button>
                    </Link>
                    <Link to="altadogs">
                        <button className="btn-opt">➕ Alta Perro</button>
                    </Link>
                    <Link to="agenda">
                        <button className="btn-opt">🗓️ Agenda</button>
                    </Link>
                    {/* <Link to="edit">
                        <button className="btn-opt">✏️ Editar</button>
                    </Link> */}
                </div>
            )}
        </>
    );
};
