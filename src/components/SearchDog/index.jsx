import "./searchDog.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDogs, deleteDog, updateDog } from "../../api/dogsAPI";
import { useState } from "react";
import { BtnHome } from "../index.js";
import perroSinFoto from "../../assets/images/perroSinFoto.png";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export const SearchDog = () => {

    const animatedComponents = makeAnimated()
    const queryClient = useQueryClient();
    const location = useLocation(); // Info traida desde all dogs

    const [parametro, setParametro] = useState(location.state?.parametro || "")
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
    const [open, setOpen] = useState(false);
    const [seeMore, setSeeMore] = useState(false)

    //Notificacion toast
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        zIndex: 11,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    //Querys DOGS
    const {
        isLoading,
        data: dogs,
        isError,
        error,
    } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs,
    });

    //Manejo del loader spin
    const handleClose = () => {
    setOpen(false);
    };

    const handleOpen = () => {
    setOpen(true);
    };

    //Manejo del saldo
    function handleSaldo(e) {
        const saldoNumber = parseInt(e.target.value)
        setBalanceDog(saldoNumber)
    }
    //Manejo de la fecha de visita del perro
    function handleDate(e) {
        const date = new Date(e.target.value)
        setDateDog(date)
    }


    
    /// EDIT DOG
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
            handleClose()
            window.location.reload(true)
        }, 1500);
        
    },
    onError: (error) => {
        handleClose()
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
    handleOpen()
    e.preventDefault();
    const formData = new FormData(e.target);
    const dog = Object.fromEntries(formData);
    dog.balance = balanceDog
    dog.lastVisit = dateDog
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
            text: "Tutor es requerido"})
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
    if(image !== "")
    {   
        dog.image = image
    }
    //dog.image = image
    // addDogMutation.mutate({   //------>>> Si quiero agregar algo que no esta en el body
    //     ...dog,
    //     image: image
    // })
    updateDogMutation.mutate(dog)

}

    // Metodo para crear las opciones, de acuerdo a los perros dentro de la DB
    const optionsDogs = dogs?.map(dog => ({ value: dog._id, label: dog.name }));
    optionsDogs?.unshift({ value: 'Todos', label: 'Todos' })

    const handleSelectFriendsChange = (selectedOptions) => {
        setSelectedFriends(selectedOptions);
    };
    const handleSelectEnemiesChange = (selectedOptions) => {
        setSelectedEnemies(selectedOptions);
    };

    // Funcion para mostrar los perros amigos
    function showFriends(id) {
        let mostrarAmigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].friends[0] === "Todos"){
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
    // Funcion para mostrar los perros con quien pelea
    function showEnemies(id) {
        let mostrarEnemigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].enemies[0] === "Todos"){
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
    
    // Funcion para cerrar el formulario de edicion sin cambiar datos
    function toggleFormUpdateDog() {
        setFormUpdateDog(!formUpdateDog)
        setShowFilter(!showFilter)
        scrollToTop()
    }

    // Funcion para convertir una imagen a texto y poder almacenarla
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

    // Funcion para ir al tope de la pagina
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
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

    // Borrar perro del query
    const deleteDogMutation = useMutation({
        mutationFn: deleteDog,
        onSuccess: () => {
            queryClient.invalidateQueries(["dogs"]);
            setTimeout(() => {
                window.location.reload(true)
            }, 1500);
        }
    })


    //Funcion para mostrar los perros amigos cuando hago el search
    function mostrar(id) {
        let mostrarAmigos = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].friends[0] === "Todos"){
                mostrarAmigos.push(dogs[i].friends[0])
                const amigosString = mostrarAmigos.join(", ")
                //console.log(amigosString)
                return amigosString;
            }
            if(dogs[i]?._id === id) {
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

    // Funcion para mostrar los perros con quien pelea cuando hago el search
    function mostrarPelea(id) {
        let mostrarPeleaCon = []
        for (let i = 0; i < dogs?.length; i++) {
            if(dogs[i]._id === id && dogs[i].enemies[0] === "Todos"){
                mostrarPeleaCon.push(dogs[i].enemies[0])
                const peleaConString = mostrarPeleaCon.join(", ")
                return peleaConString;
            } if (dogs[i]?._id === id){
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

    // Funcion para mostrar la ultima visita
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

    // Funcion para mostrar al perro de acuerdo al resultado de la busqueda o Vengo de otra pagina con params
    const handleSearch = (e) => {
        let busqueda
        if(e.target?.value === "") {
            return setFilteredDogs([])
        }
        if(!e.target?.value){
            busqueda = e
            return setFilteredDogs(dogs?.filter((dog) => (dog.name.toLowerCase()).includes(busqueda?.toLowerCase())))
        }
        if(e.target.value){
            e.target.value? busqueda = e.target.value : busqueda = e
            busqueda
            ? setFilteredDogs(dogs?.filter((dog) => (dog.name.toLowerCase()).includes(busqueda?.toLowerCase())))
            : null;
        } 
    };
    
    if(parametro){
        let newParam = parametro
        setParametro(false)
        handleSearch(newParam)
        //scrollToTop()
    }

    // Funcion para mostrar mas datos del perro
    const handleSeeMore = () => {
        setSeeMore(!seeMore)
        //scrollToTop()
    }

    // Funcion para mostrar el formulario de edicion
    const handleEditOption = (id) => {
        showFriends(id)
        showEnemies(id)
        setIdDog(id)
        setFormUpdateDog(!formUpdateDog)
        setShowFilter(!showFilter)
        scrollToTop()
    }
    

    return (
        <>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer-1 }}
            open={open}
            onClick={handleClose}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            
            <div className="container-search">
                {showFilter && <input
                    type="text"
                    placeholder="Buscar perro"
                    className="input-search-dog"
                    onChange={handleSearch}
                    defaultValue={parametro? parametro : ""}
                />}
                {showFilter && filteredDogs?.length > 0 &&(
                    <p className="resultados-search">
                        Resultados: {filteredDogs?.length} de {dogs?.length}
                    </p>
                )}
                {/* {showFilter && !seeMore && <>{filteredDogs?.map((dog, i) => {
                    return (
                        <div key={i} className="dog-filter">
                            <img src={dog.image? dog.image : perroSinFoto} alt={`imagen de ${dog.name}`} height={100} className="imagen-dog-search"></img>
                            <h2>🐶 {dog.name}</h2>
                            <p><span className="spanFoundedDog">Raza: </span>{dog.race}</p>
                            <p><span className="spanFoundedDog">Tutor: </span>{dog.owner}</p>
                            <p><span className="spanFoundedDog">Teléfono: </span>{dog.phone}</p>
                            <p><span className="spanFoundedDog">Alergias: </span>{dog.allergy}</p>
                            <p><span className="spanFoundedDog">Tipo de corte: </span>{dog.typeOfCut}</p>
                            <p><span className="spanFoundedDog">Tipo de shampoo: </span>{dog.typeOfShampoo}</p>
                            <p><span className="spanFoundedDog">Hacer fotos? </span>{typeof dog.photo === 'boolean' ? dog.photo ? "Si":"No" : ''}</p>
                            <p><span className="spanFoundedDog">Hacer videos? </span>{typeof dog.video === 'boolean' ? dog.video ? "Si":"No" : ''}</p>
                            <p><span className="spanFoundedDog">Saldo: $ </span>{dog.balance}</p>
                            <p><span className="spanFoundedDog">Descripción: </span>{dog.description}</p>
                            
                            <div className="btn-dogFounded">
                                <button className="btn-foundedSeeMore" onClick={() => handleSeeMore()}>Ver más</button>
                                <button className="btn-foundedEdit" onClick={() => handleEditOption(dog._id)}>Editar</button>
                                <button className="btn-foundedDelete" onClick={() => handleDelete(dog._id)}>Borrar</button>
                            </div>
                        </div>
                    );
                })}</>} */}

                {showFilter && <>{filteredDogs?.map((dog, i) => {
                    return (
                        <div key={i} className="dog-filter">
                            <img src={dog.image? dog.image : perroSinFoto} alt={`imagen de ${dog.name}`} height={100} className="imagen-dog-search"></img>
                            <h2>🐶 {dog.name}</h2>
                            <p><span className="spanFoundedDog">Raza: </span>{dog.race}</p>
                            {seeMore && <p><span className="spanFoundedDog">Edad: </span>{dog.age}</p>}
                            <p><span className="spanFoundedDog">Tutor: </span>{dog.owner}</p>
                            <p><span className="spanFoundedDog">Teléfono: </span>{dog.phone}</p>
                            {seeMore && <p><span className="spanFoundedDog">Email: </span>{dog.email}</p>}
                            {seeMore && <p><span className="spanFoundedDog">Vuelve cada: </span>{dog.rotation} días</p>}
                            {seeMore && <p><span className="spanFoundedDog">Enfermedad: </span>{dog.disease}</p>}
                            {seeMore && <p><span className="spanFoundedDog">Discapacidad: </span>{dog.disability}</p>}
                            <p><span className="spanFoundedDog">Alergias: </span>{dog.allergy}</p>
                            {seeMore && <p><span className="spanFoundedDog">Temperamento: </span>{dog.temper}</p>}
                            {seeMore && <p><span className="spanFoundedDog">Castrado: </span>{typeof dog.castrated === 'boolean' ? dog.castrated? "Si":"No" : ""}</p>}
                            <p><span className="spanFoundedDog">Tipo de corte: </span>{dog.typeOfCut}</p>
                            <p><span className="spanFoundedDog">Tipo de shampoo: </span>{dog.typeOfShampoo}</p>
                            {seeMore && <p><span className="spanFoundedDog">Amigos: </span>{mostrar(dog._id)}</p>}
                            {seeMore && <p><span className="spanFoundedDog">Pelea con: </span>{mostrarPelea(dog._id)}</p>}
                            <p><span className="spanFoundedDog">Hacer fotos? </span>{typeof dog.photo === 'boolean' ? dog.photo ? "Si":"No" : ''}</p>
                            <p><span className="spanFoundedDog">Hacer videos? </span>{typeof dog.video === 'boolean' ? dog.video ? "Si":"No" : ''}</p>
                            {seeMore && <p><span className="spanFoundedDog">Medio de pago? </span>{dog.paymentMode}</p>}
                            <p><span className="spanFoundedDog">Salta de la mesa? </span>{typeof dog.jumper === 'boolean' ? dog.jumper ? "Si":"No" : ''}</p>
                            {seeMore && <p><span className="spanFoundedDog">El tutor se queda? </span>{typeof dog.ownerStay === 'boolean' ? dog.ownerStay ? "Si":"No" : ''}</p>}
                            {seeMore && <p><span className="spanFoundedDog">Ultima visita: </span>{lastVisitDate(dog.lastVisit)}</p>}
                            <p><span className="spanFoundedDog">Saldo: </span>${dog.balance}</p>
                            <p><span className="spanFoundedDog">Descripción: </span>{dog.description}</p>
                            <div className="btn-dogFounded">
                                {!seeMore && <button className="btn-foundedSeeMore" onClick={() => handleSeeMore()}>Ver más</button>}
                                {seeMore && <button className="btn-foundedSeeLess" onClick={() => handleSeeMore()}>Ver menos</button>}
                                <button className="btn-foundedEdit" onClick={() => handleEditOption(dog._id)}>Editar</button>
                                <button className="btn-foundedDelete" onClick={() => handleDelete(dog._id)}>Borrar</button>
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
                                <input type="text" placeholder="Tutor*" name="owner" defaultValue={dog.owner}/>
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
                                    <option value={-1} disabled>El tutor se queda?</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                <input type="number" placeholder="Saldo" name="balance" defaultValue={dog.balance} onChange={handleSaldo}/>
                                <label name="lastVisit">Ultima visita {lastVisitDate(dog.lastVisit)}</label>
                                    <input type="date" name="balance" defaultValue={dog.lastVisit} onChange={handleDate}/>
                                <label>Imagen</label>
                                <input accept='image/*' type='file' onChange={convertToBase64}></input>
                                {image ==="" || image ===null ? <img width={100} height={100} src={dog.image} alt="Imagen Perro" /> : <img width={100} height={100} src={image} alt="Imagen Perro" />}
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

