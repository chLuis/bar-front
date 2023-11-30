import { LogoLengua, BtnHome } from "../../components";
import { getDogs } from "../../api/dogsAPI";
import { useState } from "react";
import "./agendaDogs.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const AgendaPage = () => {
    const queryClient = useQueryClient();
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
    const [selectedWeek, setSelectedWeek] = useState(1); // Estado para la semana seleccionada

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

    // Datos de ejemplo para la tabla
    const scheduleData = {
        1: [
            { day: "Lunes", time: "8:00 AM", event: "Reunión" },
            { day: "Martes", time: "10:00 AM", event: "Presentación" },
            // ... Otros eventos para la semana 1
        ],
        2: [
            // Eventos para la semana 2
        ],
        // ... Puedes agregar más semanas según sea necesario
        3: [{ day: "Sábado", time: "13:00 AM", event: "Almuerzo" }],
    };

    // Lista de días de la semana
    const daysOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    // Lista de horas
    const hoursOfDay = Array.from({ length: 14 }, (_, index) => index + 8); // De 8 AM a 21 PM

    // Función para manejar el cambio de semana en el desplegable
    const handleWeekChange = (e) => {
        setSelectedWeek(parseInt(e.target.value, 10));
    };

    const getEventDataForDayAndHour = (day, hour) => {
        const eventsForWeek = scheduleData[selectedWeek] || [];
        return eventsForWeek.find(
            (item) => item.day === day && item.time === `${hour}:00 AM`
        );
    };

    return (
        <>
            <LogoLengua />

            <div className="agendaCalendar">
                <div className="select-dog-week">
                    {/* <label>Seleccione su perro:</label> */}
                    <select defaultValue={-1}>
                        <option value={-1}>Seleccione su perro</option>
                        <option value={"Nuevo perro"}>Nuevo perro</option>
                        {dogs.map((dog) => (
                            <option value={dog._id} key={dog._id}>
                                {dog.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="select-dog-week">
                    {/* <label htmlFor="weekSelector">Seleccione la semana: </label> */}
                    <select
                        id="weekSelector"
                        onChange={handleWeekChange}
                        value={selectedWeek}
                    >
                        <option value={1}>Semana 1</option>
                        <option value={2}>Semana 2</option>
                        <option value={3}>Semana 3</option>
                        <option value={4}>Semana 4</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>
                <div className="table-Agenda">
                <table>
                    <thead>
                        <tr>
                            <th></th>{" "}
                            {/* Espacio vacío para la esquina superior izquierda */}
                            {daysOfWeek.map((day, index) => (
                                <th key={index}>{day} </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hoursOfDay.map((hour) => (
                            <tr key={hour}>
                                <td className="horas">{hour}:00</td>
                                {daysOfWeek.map((day) => {
                                    const eventData = getEventDataForDayAndHour(
                                        day,
                                        hour
                                    );
                                    return (
                                        <td key={day}>
                                            {eventData ? eventData.event : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table></div>
            </div>

            <BtnHome />
        </>
    );
};
