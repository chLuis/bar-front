import './AltaDog.css'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDogs,createDog } from '../../api/dogsAPI'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { BtnHome } from '../BtnHome'
import Swal from 'sweetalert2'

export const AltaDog = () => {
    
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
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [selectedEnemies, setSelectedEnemies] = useState([]);
    const [formEmpty, setFormEmpty] = useState(true);
    const [image, setImage] = useState("")
    const [showBtnEdit, setShowBtnEdit] = useState(true)

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

    const addDogMutation = useMutation({
        mutationFn: createDog,
        onSuccess: ()=> {
            setShowBtnEdit(false)
            //setFormEmpty(false)
            console.log("Creando!");
            queryClient.invalidateQueries(['dogs'])
            Toast.fire({
                title: 'Perro dado de alta!',
                icon: 'success',
            })
            setTimeout(() => {
                window.location.href = 'https://main--eloquent-conkies-02e62a.netlify.app/#/'; // Reemplaza '/otra-pagina' con la ruta a la que deseas redirigir
              }, 2000);

        },
        onError: (error) => {
            Swal.fire({
                title: 'Hubo un error!',
                icon: 'error',
                text: (error.response.data = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Payload Too Large</pre>\n</body>\n</html>\n" ? "Imagen demasiado grande" : null) || error,
            })
            console.error("Error en una mutación:", error);
            // Otras acciones en caso de error global de mutación
        },
    })

    function convertToBase64(e) {
        console.log(e)
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload =  () => {
            console.log(reader.result) // string
            const imageString = reader.result
            setImage(imageString)
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        }
    }



const handleSelectFriendsChange = (selectedOptions) => {
  setSelectedFriends(selectedOptions);
};
function handleLastVisit(e) {
    console.log(e.target.value)
    console.log(typeof e.target.value)
    const lastVisit = new Date(e.target.value)
    console.log(lastVisit)
    console.log(typeof lastVisit)
}

const handleSelectEnemiesChange = (selectedOptions) => {
  setSelectedEnemies(selectedOptions);
};
    const handleSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás dando de alta este perro!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, dale!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(e.target);
                    const dog = Object.fromEntries(formData);
                    dog.friends = selectedFriends.map(amigo => amigo.value);
                    dog.enemies = selectedEnemies.map(enemigo => enemigo.value);
                    //dog.lastVisit.unshift()
                    dog.image = image
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
                    addDogMutation.mutate({   //------>>> Si quiero agregar algo que no esta en el body
                        ...dog,
                        //image: image
                    })
                    //addDogMutation.mutate(dog)
                }
            

        
    })}
    
    

    const animatedComponents = makeAnimated()
    const optionsDogs = dogs?.map(dog => ({ value: dog._id, label: dog.name }));
    optionsDogs.unshift({ value: 'Todos', label: 'Todos' })


    return (
        <div className='pageAltaDog'>
        <div className='allArea-altaDog'>
            <h2 className='title-alta-dog'>Dar de alta un perro</h2>
            <p className='subtitle-alta-dog'>(*) campos obligatorios</p>
            {formEmpty && <form className="form-alta-dog" onSubmit={handleSubmit}>
                <input type="text" placeholder="*Nombre" name="name"/>
                <input type="text" placeholder="*Raza" name="race"/>
                <input type="number" placeholder="*Edad" name="age"/>
                <input type="text" placeholder="*Dueño" name="owner"/>
                <input type="number" placeholder="*Teléfono" name="phone"/>
                <input type="number" placeholder="*Rotación" name="rotation"/>
                <input type="email" placeholder="Email" name="email"/>
                <input type="text" placeholder="Enfermedad" name="disease"/>
                <input type="text" placeholder="Discapacidad" name="disability"/>
                <input type="text" placeholder="Alergia" name="allergy"/>
                <select name="castrated" placeholder='Castra3do?' defaultValue={-1}>
                    <option value={-1} disabled>Castrado?</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <input type="text" placeholder="Tipo de Corte" name="typeOfCut"/>
                <input type="text" placeholder="Tipo de Shampoo" name="typeOfShampoo"/>
                <input type="text" placeholder="Temperamento" name="temper"/>
                <Select name="friends"
                    options={optionsDogs}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
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
                    className='select-option'
                    placeholder="Pelea con..."
                    onChange={handleSelectEnemiesChange}
                    >
                </Select>
                <select name="photo"  defaultValue={-1}>
                    <option value={-1} disabled>Sacar fotos?</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <select name="video"  defaultValue={-1}>
                    <option value={-1} disabled>Hacer videos?</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <select name="paymentMode"  defaultValue={-1}>
                    <option value={-1} disabled>Modo de pago?</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                </select>
                <select name="jumper"  defaultValue={-1}>
                    <option value={-1} disabled>Salta de la mesa?</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <select name="ownerStay"  defaultValue={-1}>
                    <option value={-1} disabled>El dueño se queda?</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <input type="number" placeholder="Saldo" name="balance"/>
                <label name="lastVisit">Ultima visita?</label>
                <input type="date" placeholder="Última visita" name="lastVisit" onChange={(e) => handleLastVisit(e)}/>
                <input accept='image/*' type='file' onChange={convertToBase64} className='imageUp'></input>
                {image ==="" || image ===null ? "" : <img width={100} height={100} src={image} alt="Imagen Perro" />}
                
                <textarea placeholder="Descripción" name="description" rows={4} className='descriptionUpDog'/>
                {!addDogMutation.isPending && showBtnEdit && <button type="submit" className='btn-up-dog'>Crear</button>}
            </form>}
        </div>
            <BtnHome/>
            </div>
)}
