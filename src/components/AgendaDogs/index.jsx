import { LogoLengua, BtnHome } from "../../components";
import { getDogs } from "../../api/dogsAPI";
import { getPeluTurno } from '../../api/peluTurnoAPI'
import { useState, useEffect } from "react";
import "./agendaDogs.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const AgendaDogs = () => {
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

    const {
        isLoading: isLoadingpeluTurno,
        data: peluTurno
    } = useQuery({
        queryKey:["peluTurno"],
        queryFn: getPeluTurno
    })

    const startingDate = "11/27/2023"
    const [selectedWeek, setSelectedWeek] = useState(-1); // Estado para la semana seleccionada
    const [currentDate, setCurrentDate] = useState(new Date());
    const [week1, setWeek1] = useState(false)
    const [week2, setWeek2] = useState(false)
    const [week3, setWeek3] = useState(false)
    const [week4, setWeek4] = useState(false)


    const handleWeekChange = (e) => {
        setSelectedWeek(parseInt(e.target.value, 10))
        switch(e.target.value){
            case '1':
                setWeek2(false)
                setWeek3(false)
                setWeek4(false)
                setWeek1(true)
                break;
            case '2':
                setWeek1(false)
                setWeek3(false)
                setWeek4(false)
                setWeek2(true)
                break;
            case '3':
                setWeek1(false)
                setWeek2(false)
                setWeek4(false)
                setWeek3(true)
                break;
            case '4':
                setWeek1(false)
                setWeek2(false)
                setWeek3(false)
                setWeek4(true)
                break;
            default:
                setWeek1(false)
                setWeek2(false)
                setWeek3(false)
                setWeek4(false)
                break;
        }
    };

    const getEventDataForDayAndHour = (day, hour) => {
        const eventsForWeek = scheduleData[selectedWeek] || [];
        return eventsForWeek.find(
            (item) => item.day === day && item.time === `${hour}:00 AM`
        );
    };

    const fecha = new Date(startingDate);  // Puedes poner tu propia fecha aquí
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    //const diaDeLaSemana = fecha.getDay();
    //const nombreDia = diasSemana[diaDeLaSemana];
    const diasSemanaWork1 = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const diasSemanaWork2 = ['Martes', 'Miercoles', 'Jueves', 'Jueves', 'Viernes', 'Sábado']
    const diasSemanaWork3 = ['Mierc', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const diasSemanaWork4 = ['Jueves', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
 



    useEffect(() => {
        // Obtener la fecha actual
        const today = new Date();

        // Calcular el número de semanas entre la fecha actual y la fecha de inicio
        const startDate = new Date(startingDate); // Establece la fecha de inicio
        const diffInWeeks = Math.floor(
            (today - startDate) / (7 * 24 * 60 * 60 * 1000)
        ) + 1;

        // Establecer la semana actual
        setSelectedWeek(diffInWeeks);
        setCurrentDate(today);
    }, []);

    if (isLoadingpeluTurno) {
        return (
            <>
                <h1 className="loader">
                    <span className="loader-loading" style={{ "--d": "150ms" }}></span>
                </h1>
            </>
        );
    }
    
    if (isLoading)
        return (
            <>
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
            </>
        );
    else if (isError) {
        return (
            <>
                <h1>{error.message}</h1>
            </>
        );
    }

    // Datos de ejemplo para la tabla
    const scheduleData = {
        1: [
            { day: "Lunes", time: "8:00 AM", event: peluTurno[0].horario },
            { day: "Martes", time: "10:00 AM", event: "Presentación" },
            // ... Otros eventos para la semana 1
        ],
        2: [
            // Eventos para la semana 2
        ],
        // ... Puedes agregar más semanas según sea necesario
        3: [{ day: "Sábado", time: "13:00 AM", event: "Almuerzo" }],
    };



    // Lista de horas
    const hoursOfDay = Array.from({ length: 14 }, (_, index) => index + 8); // De 8 AM a 21 PM

    const getWeekDateRange = (weekNumber) => {
        const startDate = new Date(startingDate); // Establece la fecha de inicio
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (weekNumber - 1) * 7 + 6);

        const startOfWeek = new Date(startDate);
        startOfWeek.setDate(startDate.getDate() + (weekNumber - 1) * 7 );

        return {
            start: startOfWeek.toLocaleDateString(),
            end: endDate.toLocaleDateString(),
        };
    };
    //const dayofWeekTable = new Date(startingDate);
    //console.log(dayofWeekTable.getDay()+1)

    return (
        <>
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
                <select
                    id="weekSelector"
                    onChange={handleWeekChange}
                    defaultValue={-1}
                    //value={selectedWeek}
                >
                <option value={-1}>Seleccione una fecha</option>
                    {[...Array(4)].map((_, index) => {
                        const { start, end } = getWeekDateRange(index + 1);
                        return (
                            <option key={index} value={index + 1}>
                                Semana {start} al {end}
                            </option>
                        );
                    })}
                </select>
            </div>
                <div className="table-Agenda">
                {week1 && <table>
                    <thead>
                        <tr>
                            <th>Elija</th>{/* Espacio vacío para la esquina superior izquierda */}
                            {true &&<>
                                        {diasSemanaWork1.map((dias, index) => 
                                        <td key={index}>{dias}</td>)}
                                        </>}
                        </tr>
                    </thead>
                    <tbody>
                    {hoursOfDay.map((hour, index) => (
                            <tr key={index}>
                                <td className="horas">{hour}:00</td>
                                        {true &&<>
                                        {diasSemanaWork1.map((dias, index) => 
                                        <td key={index}>
                                            {peluTurno?.map((turno, i) => 
                                            turno.horario == hour ?
                                            <>{dias}</>
                                            : null
                                             )}


                                        </td>)}
                                        </>}
                                  
                            </tr>
                    ))}
                    </tbody>
                </table>}
                {week2 && <table>
                    <thead>
                        <tr>
                            <th>Elija</th>{/* Espacio vacío para la esquina superior izquierda */}
                            {true &&<>
                                        {diasSemanaWork2.map((dias, index) => 
                                        <td key={index}>{dias}</td>)}
                                        </>}
                        </tr>
                    </thead>
                    <tbody>
                    {hoursOfDay.map((hour, index) => (
                            <tr key={index}>
                                <td className="horas">{hour}:00</td>
                                        {true &&<>
                                        {diasSemanaWork2.map((dias, index) => 
                                        <td key={index}></td>)}
                                        </>}
                                  
                            </tr>
                    ))}
                    </tbody>
                </table>}
                {week3 && <table>
                    <thead>
                        <tr>
                            <th>Elija</th>{/* Espacio vacío para la esquina superior izquierda */}
                            {true &&<>
                                        {diasSemanaWork3.map((dias, index) => 
                                        <td key={index}>{dias}</td>)}
                                        </>}
                        </tr>
                    </thead>
                    <tbody>
                    {hoursOfDay.map((hour, index) => (
                            <tr key={index}>
                                <td className="horas">{hour}:00</td>
                                        {true &&<>
                                        {diasSemanaWork3.map((dias, index) => 
                                        <td key={index}></td>)}
                                        </>}
                                  
                            </tr>
                    ))}
                    </tbody>
                </table>}
                {week4 && <table>
                    <thead>
                        <tr>
                            <th>Elija</th>{/* Espacio vacío para la esquina superior izquierda */}
                            {true &&<>
                                        {diasSemanaWork4.map((dias, index) => 
                                        <td key={index}>{dias}</td>)}
                                        </>}
                        </tr>
                    </thead>
                    <tbody>
                    {hoursOfDay.map((hour, index) => (
                            <tr key={index}>
                                <td className="horas">{hour}:00</td>
                                        {true &&<>
                                        {diasSemanaWork4.map((dias, index) => 
                                        <td key={index}></td>)}
                                        </>}
                                  
                            </tr>
                    ))}
                    </tbody>
                </table>}
                </div>
                <div>Desplace 👉🏼 para ver mas dias</div>
            </div>
            
        </>
    );
};
