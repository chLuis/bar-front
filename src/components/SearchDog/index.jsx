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
    const [balanceDog, setBalanceDog] = useState()
    const [dateDog, setDateDog] = useState()

    function handleSaldo(e) {
        const saldoNumber = parseInt(e.target.value)
        setBalanceDog(saldoNumber)
        console.log(typeof balanceDog)
    }
    function handleDate(e) {
        console.log(e.target.value)
        const dateeee = e.target.value
        console.log(dateeee)
        const date = new Date(e.target.value)
        console.log(date)
        console.log(typeof date)
        setDateDog(date)
    }

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
        setShowBtnEdit(true)
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
    console.log(e.target)
    const dog = Object.fromEntries(formData);
    dog.balance = balanceDog
    dog.lastVisit = dateDog
    console.log(dog)
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
    optionsDogs?.unshift({ value: 'Todos', label: 'Todos' })

    const handleSelectFriendsChange = (selectedOptions) => {
      setSelectedFriends(selectedOptions);
    };
    const handleSelectEnemiesChange = (selectedOptions) => {
        setSelectedEnemies(selectedOptions);
      };


    function showFriends(id) {
        let mostrarAmigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].friends[0] === "Todos"){
                console.log(dogs[i].friends[0])
                mostrarAmigos.push({value: dogs[i].friends[0], label: dogs[i].friends[0]})
                setSelectedFriends(mostrarAmigos)
                return setFriendGet(mostrarAmigos)
            }
            if (dogs[i]?._id === id) {
                let mostrarAmigos = []
                for (let j = 0; j < dogs[i]?.friends?.length; j++) {
                    for(let k = 0; k < dogs?.length; k++) {
                        if(dogs[k]._id === dogs[i]?.friends[j]) {
                            mostrarAmigos.push({value: dogs[i].friends[j], label: dogs[k].name})
                            setSelectedFriends(mostrarAmigos)
                        }
                    }
                }
                return setFriendGet(mostrarAmigos)
            }
        }
        return
    }

    function showEnemies(id) {
        let mostrarEnemigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].enemies[0] === "Todos"){
                console.log(dogs[i].enemies[0])
                mostrarEnemigos.push({value: dogs[i].enemies[0], label: dogs[i].enemies[0]})
                setSelectedEnemies(mostrarEnemigos)
                return setEnemyGet(mostrarEnemigos)
            }
            if (dogs[i]?._id === id) {
                let mostrarEnemigos = []
                for (let j = 0; j < dogs[i]?.enemies?.length; j++) {
                    for(let k = 0; k < dogs?.length; k++) {
                        if(dogs[k]._id === dogs[i]?.enemies[j]) {
                            mostrarEnemigos.push({value: dogs[i].enemies[j], label: dogs[k].name})
                            setSelectedEnemies(mostrarEnemigos)
                        }
                    }
                }
                return setEnemyGet(mostrarEnemigos)
            }
        }
        return
    }
    
    function toggleFormUpdateDog() {
        setFormUpdateDog(!formUpdateDog)
        setShowFilter(!showFilter)
    }

    function convertToBase64(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload =  () => {
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
            if(dogs[i]._id === id && dogs[i].friends[0] === "Todos"){
                mostrarAmigos.push(dogs[i].friends[0])
                const amigosString = mostrarAmigos.join(", ")
                return amigosString;
            } else {
                let mostrarAmigos = []
                if (dogs[i]._id === id) {
                    for (let j = 0; j < dogs[i]?.friends?.length; j++) {
                        for (let k = 0; k < dogs?.length; k++) {
                            if (dogs[k]._id === dogs[i]?.friends[j]) {
                                mostrarAmigos.push(dogs[k].name);
                            }
                        }
                    }
                }
                const amigosString = mostrarAmigos.join(", ")
                return amigosString;
            }
        }
        return ;
    }

    function mostrarPelea(id) {
        let mostrarPeleaCon = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].enemies[0] === "Todos"){
                mostrarPeleaCon.push(dogs[i].enemies[0])
                const peleaConString = mostrarPeleaCon.join(", ")
                return peleaConString;
            } else if (dogs[i].enemies[0] !== "Todos"){
                let mostrarPeleaCon = []
                if (dogs[i]._id === id) {
                    for (let j = 0; j < dogs[i]?.enemies?.length; j++) {
                        for (let k = 0; k < dogs?.length; k++) {
                            if (dogs[k]._id === dogs[i]?.enemies[j]) {
                                mostrarPeleaCon.push(dogs[k].name);
                            }
                        }
                    }
                }
                const peleaConString = mostrarPeleaCon.join(", ")
                return peleaConString;
            }
        }
        return ;
    }

    function lastVisitDate(fecha){
        if(fecha){
            const date = new Date(fecha);
            const offsetMinutes = new Date().getTimezoneOffset();
            const fechaLocal = new Date(date.getTime() + offsetMinutes * 60000);
            const año = fechaLocal?.getFullYear();
            const mes = ('0' + (fechaLocal?.getMonth() + 1)).slice(-2); // Agregar un cero al mes si es necesario
            const dia = ('0' + fechaLocal?.getDate()).slice(-2)
            const fechaFormateada = `${año}-${mes}-${dia}`
            return fechaFormateada
        }
        return null
    }

    const handleSearch = (e) => {
        e.target.value
            ? setFilteredDogs(dogs.filter((dog) => (dog.name.toLowerCase()).includes(e.target.value.toLowerCase())))
            : null;
        e.target.value === "" ? setFilteredDogs([]) : null;
    };

    const handleEditOption = (id) => {
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
                            <p>Castrado: {typeof dog.castrated === 'boolean' ? dog.castrated? "Si":"No" : ""}</p>
                            <p>Tipo de corte: {dog.typeOfCut}</p>
                            <p>Tipo de shampoo: {dog.typeOfShampoo}</p>
                            <p>Amigos: {mostrar(dog._id)}</p>
                            <p>Pelea con: {mostrarPelea(dog._id)}</p>
                            <p>Hacer fotos? {typeof dog.photo === 'boolean' ? dog.photo ? "Si":"No" : ''}</p>
                            <p>Hacer videos? {typeof dog.video === 'boolean' ? dog.video ? "Si":"No" : ''}</p>
                            <p>Medio de pago? {dog.paymentMode}</p>
                            <p>Salta de la mesa? {typeof dog.jumper === 'boolean' ? dog.jumper ? "Si":"No" : ''}</p>
                            <p>El dueño se queda? {typeof dog.ownerStay === 'boolean' ? dog.ownerStay ? "Si":"No" : ''}</p>
                            <p>Ultima visita: {lastVisitDate(dog.lastVisit)}</p>
                            <p>Saldo: $ {dog.balance}</p>
                            <p>Descripción: {dog.description}</p>
                            <div>
                                <button onClick={() => handleEditOption(dog._id)}>editar</button>
                                <button onClick={() => handleDelete(dog._id)}>borrar</button>
                            </div>
                        </div>
                    );
                })}</>}
                {!filteredDogs?.length > 0 && (
                    <p>No se encontraron resultados</p>
                )}

                {formUpdateDog && <>
                    {dogs?.map((dog, i) => (
                        dog._id === idDog ?
                        <div key={i} className="divEditDog">
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
                                <select name="castrated" placeholder='Castra3do?' defaultValue={typeof dog.castrated === 'boolean' ? dog.castrated : -1}>
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
                                    onChange={handleSelectFriendsChange}>
                                </Select>
                                <Select name="enemies"
                                    options={optionsDogs}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    defaultValue={enemiesGet}
                                    className='select-option'
                                    placeholder="Pelea con..."
                                    onChange={handleSelectEnemiesChange}>
                                </Select>
                                <select name="photo" placeholder='Hacer fotos?' defaultValue={typeof dog.photo === 'boolean' ? dog.photo : -1}>
                                    <option value={-1} disabled>Hacer fotos?</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                <select name="video" placeholder='Hacer videos?' defaultValue={typeof dog.video === 'boolean' ? dog.video : -1}>
                                    <option value={-1} disabled>Hacer videos?</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                <select name="paymentMode" defaultValue={dog.paymentMode ? dog.paymentMode : -1}>
                                    <option value={-1} disabled>Medios de pago</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                </select>
                                <select name="jumper" defaultValue={typeof dog.jumper === 'boolean' ? dog.jumper : -1}>
                                    <option value={-1} disabled>Salta de la mesa?</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                <select name="ownerStay" defaultValue={typeof dog.ownerStay === 'boolean' ? dog.ownerStay : -1}>
                                    <option value={-1} disabled>El dueño se queda?</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                <input type="number" placeholder="Saldo" name="balance" defaultValue={dog.balance} onChange={handleSaldo}/>
                                <label name="lastVisit">Ultima visita {lastVisitDate(dog.lastVisit)}</label>
                                    <input type="date" name="balance" defaultValue={dog.lastVisit} onChange={handleDate}/>
                                <label>Imagen</label>
                                <input accept='image/*' type='file' onChange={convertToBase64}></input>
                                {image ==="" || image ===null ? "" : <img width={100} height={100} src={image} alt="Imagen Perro" />}
                                <textarea placeholder="Descripción" name="description" rows={4} defaultValue={dog.description}/>
                                {!updateDogMutation.isPending && showBtnEdit && 
                                    <button type="submit" className="sendEditForm">
                                        Editar
                                    </button>
                                }
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
