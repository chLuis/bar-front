import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDogs, createDog } from "../../api/dogsAPI";
import { useState } from "react";
import "./searchDog.css";
import { BtnHome } from "../index.js";

export const SearchDog = () => {
    const queryClient = useQueryClient();
    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs,
    });
    const [filteredDogs, setFilteredDogs] = useState([]);

    function mostrar(id) {
        let mostrarAmigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if (dogs[i]._id === id) {
                for (let j = 0; j < dogs[i]?.friends?.length; j++) {
                    for (let k = 0; k < dogs?.length; k++) {
                        if (dogs[k]._id === dogs[i]?.friends[j]) {
                            mostrarAmigos.push(dogs[k].name);
                        }
                    }
                }
            }
        }
        const amigosString = mostrarAmigos.join(", ")
        return amigosString;
    }
    function mostrarPelea(id) {
        let mostrarPeleaCon = []
        for (let i = 0; i < dogs?.length; i++) {
            if (dogs[i]._id === id) {
                for (let j = 0; j < dogs[i]?.enemies?.length; j++) {
                    for (let k = 0; k < dogs?.length; k++) {
                        if (dogs[k]._id === dogs[i].enemies[j]) {
                            mostrarPeleaCon.push(dogs[k].name);
                        }
                    }
                }
            }
        }
        const peleaConString = mostrarPeleaCon.join(", ")
        return peleaConString;
    }

    const handleSearch = (e) => {
        e.target.value
            ? setFilteredDogs(dogs.filter((dog) => dog.name.includes(e.target.value)))
            : null;
        e.target.value === "" ? setFilteredDogs([]) : null;
    };


    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Buscar perro"
                    className="input-search-dog"
                    onChange={handleSearch}
                />
                {filteredDogs.length > 0 && (
                    <p className="resultados-search">
                        Resultados: {filteredDogs?.length}
                    </p>
                )}
                {filteredDogs?.map((dog, i) => {
                    return (
                        <div key={i} className="dog-filter">
                            <h2>🐶 {dog.name}</h2>
                            <p>Raza: {dog.race}</p>
                            <p>Edad: {dog.age}</p>
                            <p>Dueño: {dog.owner}</p>
                            <p>Cel: {dog.phone}</p>
                            <p>Email: {dog.email}</p>
                            <p>Vuelve cada: {dog.rotation} días</p>
                            <p>Enfermedad/Discapacidad: {dog.disease}</p>
                            <p>Alergias: {dog.allergy}</p>
                            <p>Temperamento: {dog.temper}</p>
                            <p>Castrado: {dog.castrated ? "Si" : "No"}</p>
                            <p>Tipo de corte: {dog.typeOfCut}</p>
                            <p>Tipo de shampoo: {dog.typeOfShampoo}</p>
                            <p>Descripción: {dog.description}</p>
                            <p>Amigos: {mostrar(dog._id)}</p>
                            <p>Pelea con: {mostrarPelea(dog._id)}</p>
                        </div>
                    );
                })}
                {!filteredDogs?.length > 0 && (
                    <p>No se encontraron resultados</p>
                )}
            </div>
            <BtnHome />
        </>
    );
};
