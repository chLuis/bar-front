import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDogs,createDog } from '../../api/dogsAPI'
import { useState } from 'react'
import './searchDog.css'
import { BtnHome } from '../index.js'

export const SearchDog = () => {

    const queryClient = useQueryClient()
    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs
    });
    const [filteredDogs, setFilteredDogs] = useState([]);


    const handleSearch = (e) => {
        //console.log(e.target.value);
        (e.target.value)
            ?setFilteredDogs(dogs.filter(dog => dog.name.includes(e.target.value)))
            : null;
        (e.target.value === "")
        ? setFilteredDogs([]) 
        : null;
        
    }

    return (
        <>
        <div>
            <input type="text" placeholder="Search dogs" onChange={handleSearch}/>
            {filteredDogs?.map(dog => {
                return (
                    <div key={dog._id} className='dog-filter'>
                        <h2>🐶 {dog.name}</h2>
                        <p>Raza: {dog.race}</p>
                        <p>Edad: {dog.age}</p>
                        <p>Dueño: {dog.owner}</p>
                        <p>Cel: {dog.phone}</p>
                        <p>Email: {dog.email}</p>
                        <p>Vuelve cada: {dog.rotation} días</p>
                        <p>Enfermedad/Discapacidad: {dog.disease}</p>
                        <p>Alergias: {dog.allergy}</p>
                        <p>Temeperamento: {dog.temper}</p>
                        <p>Castrado: {dog.castrated? "Si":"No"}</p>
                        <p>Tipo de corte: {dog.typeOfCut}</p>
                        <p>Tipo de shampoo: {dog.typeOfShampoo}</p>
                        <p>Descripción: {dog.description}</p>

                    </div>
                )

            })}
        </div>
        <BtnHome />
        </>
    )

}