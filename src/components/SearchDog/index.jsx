import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDogs, deleteDog, updateDog } from "../../api/dogsAPI";
import { useState } from "react";
import "./searchDog.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { BtnHome } from "../index.js";
import perroSinFoto from "../../assets/images/perroSinFoto.png";
import Swal from "sweetalert2";

export const SearchDog = () => {
    
    const queryClient = useQueryClient();
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [showFilter, setShowFilter] = useState(true)
    const [formUpdateDog, setFormUpdateDog] = useState(false)
    const [idDog, setIdDog] = useState("")
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [selectedEnemies, setSelectedEnemies] = useState([]);
    const [friendsGet, setFriendGet] = useState([])
    const [enemiesGet, setEnemyGet] = useState([])
    const [image, setImage] = useState("")
    const [showBtnEdit, setShowBtnEdit] = useState(true)

    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs,
    });
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      const animatedComponents = makeAnimated()

/// EDIT

const updateDogMutation = useMutation({
    mutationFn: updateDog,
    onSuccess: () => {
        queryClient.invalidateQueries(["dogs"]);
        setShowBtnEdit(false)
        Toast.fire({
            title: 'Perro editado!',
            icon: 'success',
        })
        setTimeout(() => {
            window.location.reload(true)
          }, 2000);
        
    },
    onError: (error) => {
        Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: (error.response.data = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Payload Too Large</pre>\n</body>\n</html>\n" ? "Imagen demasiado grande" : null) || error,
        })
        console.error(error);
        // Otras acciones en caso de error global de mutación
    }
});

function updateCompleteDog(e, _id) {
    e.preventDefault();
    //console.log(_id)
    //console.log(e.target)
    const formData = new FormData(e.target);
    const dog = Object.fromEntries(formData);
    if(!dog.name){
        return Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: "Nombre es requerido"
        })}
    if(!dog.race){
        return Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: "Raza es requerida"
        })
    }
    if(!dog.age){
        return Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: "Edad es requerida"})
    }
    if(!dog.owner){
        return Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: "Dueño es requerido"})
    }
    if(!dog.phone){
        return Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: "Teléfono es requerido"})
        }
    if(!dog.rotation){
        return Swal.fire({
            title: 'Hubo un error!',
            icon: 'error',
            text: "Rotación es requerida"
        })
    }
    dog.friends = selectedFriends.map(amigo => amigo.value);
    dog.enemies = selectedEnemies.map(enemigo => enemigo.value);
    dog._id = _id
    dog.image = image
    //console.log(dog)
    // addDogMutation.mutate({   //------>>> Si quiero agregar algo que no esta en el body
    //     ...dog,
    //     image: image
    // })
    //console.log(dog)
    updateDogMutation.mutate(dog)
    //console.log("Si ando")
}

    const optionsDogs = dogs?.map(dog => ({ value: dog._id, label: dog.name }));
    //const fijos = {value: dogs[13].friends[0], label: dogs[6].name}
    const handleSelectFriendsChange = (selectedOptions) => {
      setSelectedFriends(selectedOptions);
    };
    const handleSelectEnemiesChange = (selectedOptions) => {
        setSelectedEnemies(selectedOptions);
      };
      function updateDogOpenForm(id_dog) {
        toggleFormUpdateDog()
        showFriends(id_dog)
        showEnemies(id_dog)
        setIdDog(id_dog)
    }


    function showFriends(id) {
        let mostrarAmigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if (dogs[i]?._id === id) {
                for (let j = 0; j < dogs[i]?.friends?.length; j++) {
                    for(let k = 0; k < dogs?.length; k++) {
                        if(dogs[k]._id === dogs[i]?.friends[j]) {
                            mostrarAmigos.push({value: dogs[i].friends[j], label: dogs[k].name})
                        }
                    }
                }
            }
        }
        return setFriendGet(mostrarAmigos)
    }

    function showEnemies(id) {
        let mostrarEnemigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if (dogs[i]?._id === id) {
                for (let j = 0; j < dogs[i]?.enemies?.length; j++) {
                    for(let k = 0; k < dogs?.length; k++) {
                        if(dogs[k]._id === dogs[i]?.enemies[j]) {
                            mostrarEnemigos.push({value: dogs[i].enemies[j], label: dogs[k].name})
                        }
                    }
                }
            }
        }
        return setEnemyGet(mostrarEnemigos)
    }
    
    function toggleFormUpdateDog() {
        setFormUpdateDog(!formUpdateDog)
        setShowFilter(!showFilter)
    }

    function convertToBase64(e) {
        //console.log(e)
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload =  () => {
            //console.log(reader.result) // string
            const imageString = reader.result
            setImage(imageString)
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        }
    }


    // Borrar un perro
    function handleDelete(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás borrando este perro!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteDogMutation.mutate(id)
                    Toast.fire({
                        title: 'Perro borrado!',
                        icon: 'success',
                    })
                }
                })}

    const deleteDogMutation = useMutation({
        mutationFn: deleteDog,
        onSuccess: () => {
            console.log("borrado")
            queryClient.invalidateQueries(["dogs"]);
            setTimeout(() => {
                window.location.reload(true)
              }, 2000);
        }
    })



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
    const handleEditOption = (id) => {
        
            //toggleFormUpdateDog()
            showFriends(id)
            showEnemies(id)
            setIdDog(id)
        
        setFormUpdateDog(!formUpdateDog)
        setShowFilter(!showFilter)
    }

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
                {showFilter &&<>{filteredDogs?.map((dog, i) => {
                    return (
                        <div key={i} className="dog-filter">
                            <img src={dog.image? dog.image : perroSinFoto} alt={`imagen de ${dog.name}`} height={100} className="imagen-dog-search"></img>
                            <h2>🐶 {dog.name}</h2>
                            <p>Raza: {dog.race}</p>
                            <p>Edad: {dog.age}</p>
                            <p>Dueño: {dog.owner}</p>
                            <p>Teléfono: {dog.phone}</p>
                            <p>Email: {dog.email}</p>
                            <p>Vuelve cada: {dog.rotation} días</p>
                            <p>Enfermedad: {dog.disease}</p>
                            <p>Discapacidad: {dog.disability}</p>
                            <p>Alergias: {dog.allergy}</p>
                            <p>Temperamento: {dog.temper}</p>
                            <p>Castrado: {dog.castrated ? "Si" : "No"}</p>
                            <p>Tipo de corte: {dog.typeOfCut}</p>
                            <p>Tipo de shampoo: {dog.typeOfShampoo}</p>
                            <p>Descripción: {dog.description}</p>
                            <p>Amigos: {mostrar(dog._id)}</p>
                            <p>Pelea con: {mostrarPelea(dog._id)}</p>
                            <div>
                            <button onClick={() => handleEditOption(dog._id)}>editar</button>
                            <button onClick={() => {handleDelete(dog._id)}}>borrar</button>
                            </div>
                        </div>
                    );
                })}</>}
                {!filteredDogs?.length > 0 && (
                    <p>No se encontraron resultados</p>
                )}

                {formUpdateDog && <>
                
                {dogs?.map((dog, i) => (
                    dog._id === idDog ?<div key={i}>
                    <h3>Editar información de: {dog.name}</h3>
                    <img src={dog.image? dog.image : perroSinFoto} height={100} width={100}></img>
                    <form onSubmit={(e) => updateCompleteDog(e, dog._id)}>
                    <div  className="formEditDog">
                    
                    <input type="text" placeholder="Nombre*" name="name" defaultValue={dog.name}/>
                    <input type="text" placeholder="Raza*" name="race" defaultValue={dog.race}/>
                    <input type="number" placeholder="Edad*" name="age" defaultValue={dog.age}/>
                    <input type="text" placeholder="Dueño*" name="owner" defaultValue={dog.owner}/>
                    <input type="number" placeholder="Celular*" name="phone" defaultValue={dog.phone}/>
                    <input type="email" placeholder="Email" name="email" defaultValue={dog.email}/>
                    <input type="number" placeholder="Rotación*" name="rotation" defaultValue={dog.rotation}/>
                    <input type="text" placeholder="Enfermedad" name="disease" defaultValue={dog.disease}/>
                    <input type="text" placeholder="Discapacidad" name="disability" defaultValue={dog.disability}/>
                    <input type="text" placeholder="Alergia" name="allergy" defaultValue={dog.allergy}/>
                    <input type="text" placeholder="Temperamento" name="temper" defaultValue={dog.temper}/>
                    <select name="castrated" placeholder='Castra3do?' defaultValue={dog.castrated}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                    <input type="text" placeholder="Tipo de Corte" name="typeOfCut" defaultValue={dog.typeOfCut}/>
                    <input type="text" placeholder="Tipo de Shampoo" name="typeOfShampoo" defaultValue={dog.typeOfShampoo}/>
                    <Select name="friends"
                        options={optionsDogs}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        defaultValue={friendsGet}
                        className='select-option'
                        placeholder="Amigos"
                        onChange={handleSelectFriendsChange}

                        >
                    </Select>
                    <Select name="enemies"
                        options={optionsDogs}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        defaultValue={enemiesGet}
                        className='select-option'
                        placeholder="Pelea con..."
                        onChange={handleSelectEnemiesChange}
                        >
                    </Select>
                    <label>Imagen</label>
                    <input accept='image/*' type='file' onChange={convertToBase64}></input>
                    {image ==="" || image ===null ? "" : <img width={100} height={100} src={image} alt="Imagen Perro" />}
                    <textarea placeholder="Descripción" name="description" rows={4} defaultValue={dog.description}/>
                            {!updateDogMutation.isPending && showBtnEdit && <button type="submit">Update2</button>}
                        
                    
                    </div>
                    </form>
                    </div> : null))}
                    
                    





                <button onClick={toggleFormUpdateDog}>
                    Cerrar
                </button>
                </>}
            </div>
            <BtnHome />
        </>
    );
};
