import { useState } from "react";
import './nuestrosServicios.css'

const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

export const NuestrosServicios = () => {
    const [turnos, setTurnos] = useState({});

    const reservarTurno = (dia, hora) => {
        setTurnos((prev) => ({ ...prev, [`${dia}-${hora}`]: true }));
    };

    const estaReservado = (dia, hora) => {
        return turnos[`${dia}-${hora}`] === true;
    };
    <div>
        {dias.map((dia) => (
            <div key={dia}>
                <h2>{dia}</h2>
                {Array.from({ length: 12 }).map((_, i) => {
                    const hora = `${i}:00`;
                    return (
                        <div key={hora}>
                            <span>{hora}</span>
                            <button
                                disabled={estaReservado(dia, hora)}
                                onClick={() => reservarTurno(dia, hora)}
                            >
                                {estaReservado(dia, hora)
                                    ? "Reservado"
                                    : "Reservar"}
                            </button>
                        </div>
                    );
                })}
            </div>
        ))}
    </div>;
    return (
        <div>
            <div className="total">
                {dias.map((dia) => (
                    <div key={dia} className="diass">
                        <h2>{dia}</h2>
                        {Array.from({ length: 12 }).map((_, i) => {
                            const hora = `${i+8}:00`;
                            return (
                                <div key={hora}>
                                    <span>{hora}</span>
                                    <button
                                        disabled={estaReservado(dia, hora)}
                                        onClick={() => reservarTurno(dia, hora)}
                                    >
                                        {estaReservado(dia, hora)
                                            ? "Reservado"
                                            : "Reservar"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
