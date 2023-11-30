import "./alertDogTime.css";
import { useQuery } from "@tanstack/react-query";
import { getDogs } from "../../api/dogsAPI";
import { useState } from "react";
import { LogoLengua, BtnHome } from "../index.js";

export const AlertDogTime = () => {
    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs
    });

    const sortedDogs = dogs?.slice().sort((a, b) => (((new Date(a.lastVisit).getTime() + a.rotation * 24 * 60 * 60 * 1000) -  new Date()) / (24 * 60 * 60 * 1000)) - (((new Date(b.lastVisit).getTime() + b.rotation * 24 * 60 * 60 * 1000) -  new Date()) / (24 * 60 * 60 * 1000)))
    const [diasNegativos, setDiasNegativos] = useState("");

    if (isLoading)
        return (
            <>
                <LogoLengua />
                <h1 className="loader">
                    <span className="loader-loading" style={{ "--d": "150ms" }}>
                        C
                    </span>
                    <span className="loader-loading" style={{ "--d": "300ms" }}>
                        A
                    </span>
                    <span className="loader-loading" style={{ "--d": "450ms" }}>
                        R
                    </span>
                    <span className="loader-loading" style={{ "--d": "600ms" }}>
                        G
                    </span>
                    <span className="loader-loading" style={{ "--d": "750ms" }}>
                        A
                    </span>
                    <span className="loader-loading" style={{ "--d": "900ms" }}>
                        N
                    </span>
                    <span
                        className="loader-loading"
                        style={{ "--d": "1050ms" }}
                    >
                        D
                    </span>
                    <span
                        className="loader-loading"
                        style={{ "--d": "1200ms" }}
                    >
                        O
                    </span>
                    <span
                        className="loader-loading"
                        style={{ "--d": "1350ms" }}
                    >
                        .
                    </span>
                    <span
                        className="loader-loading"
                        style={{ "--d": "1500ms" }}
                    >
                        .
                    </span>
                    <span
                        className="loader-loading"
                        style={{ "--d": "1650ms" }}
                    >
                        .
                    </span>
                </h1>
                <BtnHome />
            </>
        );
    else if (isError) {
        return (
            <>
                <h1>{error.message}</h1>
                <BtnHome />
            </>
        );
    }

    function lastVisitDate(fecha) {
        if (fecha) {
            const date = new Date(fecha);
            const offsetMinutes = new Date().getTimezoneOffset();
            const fechaLocal = new Date(date.getTime() + offsetMinutes * 60000);
            const año = fechaLocal?.getFullYear();
            const mes = ("0" + (fechaLocal?.getMonth() + 1)).slice(-2); // Agregar un cero al mes si es necesario
            const dia = ("0" + fechaLocal?.getDate()).slice(-2);
            const fechaFormateada = `${dia}-${mes}-${año}`;
            return fechaFormateada;
        }
        return null;
    }

    const calcularDiasRestantes = (lastVisit, rotation) => {
        // Convertir lastVisit y rotation a objetos Date
        const ultimaVisita = new Date(lastVisit);
        const intervaloVisitas = rotation;

        // Calcular la próxima visita sumando el intervalo a la última visita
        const proximaVisita = new Date(
            ultimaVisita.getTime() + intervaloVisitas * 24 * 60 * 60 * 1000
        );

        // Calcular los días restantes hasta la próxima visita
        const hoy = new Date();
        const diasRestantes = Math.ceil(
            (proximaVisita - hoy) / (24 * 60 * 60 * 1000)
        );

        return diasRestantes;
    };

    return (
        <>
            <LogoLengua />
        
        <div className="alertContainer">
            <div className="alertDogTimeTitle">
                <p>🐶 Perro</p>
                <p>Dueño</p>
                <p>Vuelve en</p>
            </div>
            {sortedDogs?.map((dog, i) =>
                dog.lastVisit.length > 0  ? (
                    <div key={i} className="alertDogTime">
                    <span className="tooltipPanel">
                    <span>Vuelve cada: {dog.rotation} dias</span><br></br>
                    <span>Última vez: {lastVisitDate(dog.lastVisit)}</span><br></br>
                    <span>Teléfono: {dog.phone}</span><br></br>
                    </span>
                        <p className="data-alert-cuadro">{dog.name}</p>
                        <p className="data-alert-cuadro">{dog.owner}</p>
                        <p className="data-alert-cuadro">{calcularDiasRestantes(dog.lastVisit, dog.rotation)}{" "}
                            día/s.
                        </p>
                    </div>
                ) : null
            )}
        </div>
        <BtnHome />
        </>
    );
};
