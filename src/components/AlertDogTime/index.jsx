import "./alertDogTime.css";
import { useQuery } from "@tanstack/react-query";
import { getDogs } from "../../api/dogsAPI";
import { useState } from "react";

export const AlertDogTime = () => {
    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs,
        select: (dogs) => dogs.sort((a, b) => b.id - a.id),
    });
    const [diasNegativos, setDiasNegativos] = useState("");

    function lastVisitDate(fecha) {
        //console.log(fecha)
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
        <div className="alertContainer">
            <div className="alertDogTimeTitle">
                <p>🐶 Perro</p>
                <p>Dueño</p>
                <p>Rotación</p>
                <p>📅 Última Visita</p>
                <p>Vuelve en</p>
            </div>
            {dogs?.map((dog, i) =>
                dog.lastVisit ? (
                    <div key={i} className="alertDogTime">
                        <p>{dog.name}</p>
                        <p>{dog.owner}</p>
                        <p>{dog.rotation}</p>
                        <p>{lastVisitDate(dog.lastVisit)}</p>
                        <p>{calcularDiasRestantes(dog.lastVisit, dog.rotation)}{" "}
                            día/s.
                        </p>
                    </div>
                ) : null
            )}
        </div>
    );
};
