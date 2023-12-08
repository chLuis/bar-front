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

    const [admin, setAdmin] = useState(true);
    const [peluLink, setPeluLink] = useState(false);
    const [tiendaLink, setTiendaLink] = useState(false);
    //const logo = require('../assets/images/LenguaLogo.png');

    function linksToPelu() {
        setPeluLink(!peluLink);
    }
    function linksToTienda() {
        setTiendaLink(!tiendaLink);
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
                <i className="fondo-linkPelu"></i>
                    {!peluLink &&<div onClick={linksToPelu} className="peluPrevLink">
                        PELUQUERÍA CANINA<br></br><span>---- <i className="fa-regular fa-hand-pointer"></i> ----</span>
                    </div>}
                    {peluLink &&<div onClick={linksToPelu} className="peluRealLink">
                    <Link to="peluqueria/nuestrosalon" className="aToPelu">- Conoce nuestro salón y más</Link> <br></br>
                    <Link to="peluqueria/nuestrosservicios" className="aToPelu">- Qué servicios ofrecemos.</Link><br></br>
                    <Link to="peluqueria/nuestraformacion" className="aToPelu">- Nuestra formación.</Link><br></br>
                    <Link to="peluqueria/trabajosytestimonios" className="aToPelu">- Nuestros trabajos y testimonios.</Link><br></br>
                    <Link to="agendadogs" className="aToPelu">Agenda tu turno</Link>
                    </div>}
                </div>
                </article>
                <article>
                <div className="home-link-tienda">
                <i className="fondo-linktienda"></i>
                    {!tiendaLink &&<div onClick={linksToTienda} className="tiendaPrevLink">
                    TIENDA<br></br><span>---- <i className="fa-regular fa-hand-pointer"></i> ----</span>
                    </div>}
                    {tiendaLink &&<div onClick={linksToTienda} className="tiendaRealLink">
                    <Link to="tienda/equipamiento" className="aTotienda">- Equipamiento de paso</Link> <br></br>
                    <Link to="tienda/cosmetica" className="aTotienda">- Cosmética natural</Link><br></br>
                    <Link to="tienda/accesorios" className="aTotienda">- Accesorios</Link><br></br>
                    <Link to="tienda/kitslimpieza" className="aTotienda">- Quiero mis kits de limpieza "Lengua Afuera"</Link><br></br>
                    </div>}
                </div>
                </article>
            </section>
            <button className="btn-momentaneo" onClick={() => setAdmin(!admin)}> Mostrar opciones de Administrador </button>
            {admin && (
                <div className="links-to-dogs">
                    <Link to="altadogs">
                        <button className="btn-opt">➕ Alta Perro</button>
                    </Link>
                    <Link to="searchdog">
                        <button className="btn-opt">🔎 Buscar</button>
                    </Link>
                    <Link to="alldogs">
                        <button className="btn-opt">🐶 Ver Todos</button>
                    </Link>
                    <Link to="alertdogtime">
                        <button className="btn-opt">🚨 Alerta!</button>
                    </Link>
                    <Link to="agendadogs">
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
