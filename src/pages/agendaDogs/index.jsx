import { LogoLengua, BtnHome } from '../../components'
import { useState } from 'react'
import './agendaDogs.css'

export const AgendaPage = () => {

    const [selectedWeek, setSelectedWeek] = useState(1); // Estado para la semana seleccionada

    // Datos de ejemplo para la tabla
    const scheduleData = {
      1: [
        { day: 'Lunes', time: '8:00 AM', event: 'Reunión' },
        { day: 'Martes', time: '10:00 AM', event: 'Presentación' },
        // ... Otros eventos para la semana 1
      ],
      2: [
        // Eventos para la semana 2
      ],
      // ... Puedes agregar más semanas según sea necesario
      3: [
        { day: 'Sábado', time: '13:00 AM', event: 'Almuerzo' }
      ],
    };
  
    // Lista de días de la semana
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
    // Lista de horas
    const hoursOfDay = Array.from({ length: 14 }, (_, index) => index + 8); // De 8 AM a 21 PM
  
    // Función para manejar el cambio de semana en el desplegable
    const handleWeekChange = (e) => {
      setSelectedWeek(parseInt(e.target.value, 10));
    };
  
    const getEventDataForDayAndHour = (day, hour) => {
      const eventsForWeek = scheduleData[selectedWeek] || [];
      return eventsForWeek.find((item) => item.day === day && item.time === `${hour}:00 AM`);
    };

    return (
        <>
            <LogoLengua />

            <div className='agendaCalendar'>
      <label htmlFor="weekSelector">Seleccione la semana: </label>
      <select id="weekSelector" onChange={handleWeekChange} value={selectedWeek}>
        <option value={1}>Semana 1</option>
        <option value={2}>Semana 2</option>
        <option value={3}>Semana 3</option>
        <option value={4}>Semana 4</option>
        {/* Agrega más opciones según sea necesario */}
      </select>

      <table>
        <thead>
          <tr>
            <th></th> {/* Espacio vacío para la esquina superior izquierda */}
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursOfDay.map((hour) => (
            <tr key={hour}>
              <td className='horas'>{hour}:00</td>
              {daysOfWeek.map((day) => {
                const eventData = getEventDataForDayAndHour(day, hour);
                return <td key={day}>{eventData ? eventData.event : ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

            <BtnHome />
        </>
    )
}