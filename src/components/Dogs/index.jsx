import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getDogs, deleteDog } from "../../api/dogsAPI";
import "./dogs.css";
import { BtnHome } from "../BtnHome";
import perroSinFoto from '../../assets/images/perroSinFoto.png'
import { useNavigate, Link } from "react-router-dom";
import { EditDog } from '../EditDog/index'
import Swal from "sweetalert2";
import { useEffect } from "react";
import { SearchDog } from "..";


export const Dogs = () => {
    
    const navigate = useNavigate();
    const [nombrePerro, setNombrePerro] = useState("")
    const fotoPerroSinFoto = perroSinFoto
    const queryClient = useQueryClient()
    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs,
        select: dogs => dogs.sort((a, b) => b.name - a.name)
    });
    
    const deleteDogMutation = useMutation({
        mutationFn: deleteDog,
        onSuccess: () => {
            queryClient.invalidateQueries(["dogs"]);
            Swal.fire(
                'Borrado!',
                'El perro ha sido borrado.',
                'success'
            )
        },
    })

    function handleDelete(id) {
        Swal.fire({
            title: '¿Estas seguro de borrar a este perro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteDogMutation.mutate(id)
            }
          })
    }
    const handleEditarClick = (name) => {
        // Navega a la página de edición y pasa la información como estado
        navigate('/searchdog', { state: { parametro: name } });
      };



    if (isLoading) return <>
        <h1 className="loader">
            <span className="loader-loading" style={{"--d": "150ms"}}>C</span>
            <span className="loader-loading" style={{"--d": "300ms"} }>A</span>
            <span className="loader-loading" style={{"--d": "450ms"} }>R</span>
            <span className="loader-loading" style={{"--d": "600ms"} }>G</span>
            <span className="loader-loading" style={{"--d": "750ms"} }>A</span>
            <span className="loader-loading" style={{"--d": "900ms"} }>N</span>
            <span className="loader-loading" style={{"--d": "1050ms" }}>D</span>
            <span className="loader-loading" style={{"--d": "1200ms" }}>O</span>
            <span className="loader-loading" style={{"--d": "1350ms" }}>.</span>
            <span className="loader-loading" style={{"--d": "1500ms" }}>.</span>
            <span className="loader-loading" style={{"--d": "1650ms" }}>.</span>
        </h1>
        <BtnHome />
        </>;
    else if (isError) {
        //console.log(error)
        return <>
            <h1>
                {error.message}
            </h1>
            <BtnHome />
            </>
    }

    return (
        <div>
        <h2>Lista de perros</h2>
        <div className="dog-list">
            {dogs.map(dog => (
            <div key={dog._id} className="dog-element-list">
                <img className="avatar-dog" src={dog.image ? dog.image : fotoPerroSinFoto} height={100} alt={dog.image ? dog.image : fotoPerroSinFoto} />
                <h3>{dog.name}</h3>
                <p>{dog.owner}</p>
                {/* <button className="link-searchDelete" onClick={() => handleEdit(dog.name)}> */}
                <button className="link-searchDelete" onClick={() => handleEditarClick(dog.name)}>
                    <i className="fa-solid fa-pencil"></i> Editar
                </button>
                <button className="link-searchDelete" onClick={() => handleDelete(dog._id)}>
                    <i className="fa-regular fa-trash-can"></i> Borrar
                </button>
            </div>
            ))}
        </div>
        <BtnHome />
        </div>
    );
};
