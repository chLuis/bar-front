import './AltaDog.css'
import { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDogs,createDog } from '../../api/dogsAPI'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { BtnHome } from '../BtnHome'
import Swal from 'sweetalert2'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


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
    const [open, setOpen] = useState(false);
    const [seHaRenderizado, setSeHaRenderizado] = useState(false);
  
    const handleClose = () => {
    setOpen(false);
    };
  
    const handleOpen = () => {
    setOpen(true);
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1200,
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
            queryClient.invalidateQueries(['dogs'])
            Toast.fire({
                title: 'Perro dado de alta!',
                icon: 'success',
            })
            setTimeout(() => {
                handleClose()
                window.location.href = 'https://main--eloquent-conkies-02e62a.netlify.app/#/'; // Reemplaza '/otra-pagina' con la ruta a la que deseas redirigir
              }, 1200);

        },
        onError: (error) => {
            handleClose()
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
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }

    useEffect(() => {
        // Realiza la acción solo si no se ha renderizado antes
        if (!seHaRenderizado) {
            scrollToTop()
            setSeHaRenderizado(true);
        }}, [seHaRenderizado]);

const handleSelectFriendsChange = (selectedOptions) => {
  setSelectedFriends(selectedOptions);
};
function handleLastVisit(e) {
    const lastVisit = new Date(e.target.value)
    console.log(lastVisit)
}

const handleSelectEnemiesChange = (selectedOptions) => {
  setSelectedEnemies(selectedOptions);
};
    const handleSubmit = (e) => {
        handleOpen()
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
                        handleClose()
                        return Swal.fire({
                            title: 'Hubo un error!',
                            icon: 'error',
                            text: "Nombre es requerido"
                        })}
                    if(!dog.race){
                        handleClose()
                        return Swal.fire({
                            title: 'Hubo un error!',
                            icon: 'error',
                            text: "Raza es requerida"
                        })
                    }
                    if(!dog.age){
                        handleClose()
                        return Swal.fire({
                            title: 'Hubo un error!',
                            icon: 'error',
                            text: "Edad es requerida"})
                    }
                    if(!dog.owner){
                        handleClose()
                        return Swal.fire({
                            title: 'Hubo un error!',
                            icon: 'error',
                            text: "Tutor es requerido"})
                    }
                    if(!dog.phone){
                        handleClose()
                        return Swal.fire({
                            title: 'Hubo un error!',
                            icon: 'error',
                            text: "Teléfono es requerido"})
                        }
                    if(!dog.rotation){
                        handleClose()
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
    optionsDogs?.unshift({ value: 'Todos', label: 'Todos' })

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.onfocus = () => {
            input.previousElementSibling.classList.add('top');
            input.previousElementSibling.classList.add('focus');
            input.parentNode.classList.add('focus');
        }
        input.onblur = () => {
            input.value = input.value.trim( );
            if (input.value.trim( ).length == 0){
                input.previousElementSibling.classList.remove('focus');
            }
            input.previousElementSibling.classList.remove('top');
            input.parentNode.classList.remove('focus');
        }
    })

    return (
        <div className='pageAltaDog'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer-1 }}
                open={open}
                onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        <div className='allArea-altaDog'>
            <h2 className='title-alta-dog'>Dar de alta un perro</h2>
            <p className='subtitle-alta-dog'>(*) campos obligatorios</p>
            {formEmpty && <form className="form-alta-dog" onSubmit={handleSubmit}>
                <label>
                    <span>Nombre*</span>
                    <input type="text" name="name"/>
                </label>
                <label>
                    <span>Raza*</span>
                    <input type="text" name="race"/>
                </label>
                <label>
                    <span>Edad*</span>
                    <input type="number" name="age"/>
                </label>
                <label>
                    <span>Tutor*</span>
                    <input type="text" name="owner"/>
                </label>
                <label>
                    <span>Teléfono*</span>
                    <input type="number" name="phone"/>
                </label>
                <label>
                    <span>Rotación*</span>
                    <input type="number" name="rotation"/>
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" name="email"/>
                </label>
                <label>
                    <span>Enfermedad</span>
                    <input type="text" name="disease"/>
                </label>
                <label>
                    <span>Discapacidad</span>
                    <input type="text" name="disability"/>
                </label>
                <label>
                    <span>Alergia</span>
                    <input type="text" name="allergy"/>
                </label>
                <label>
                    <span className='focus'>Castrado?</span>
                    <select name="castrated" placeholder='Castra3do?' defaultValue={-1}>
                        <option value={-1} disabled>--- Seleccionar ---</option>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    <span>Tipo de Corte</span>
                    <input type="text" name="typeOfCut"/>
                </label>
                <label>
                    <span>Tipo de Shampoo</span>
                    <input type="text" name="typeOfShampoo"/>
                </label>
                <label>
                    <span>Temperamento</span>
                    <input type="text" name="temper"/>
                </label>
                    
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
                <label>
                    <span className='focus'>Sacar fotos?</span>
                    <select name="photo"  defaultValue={-1}>
                        <option value={-1} disabled>--- Seleccionar ---</option>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    <span className='focus'>Hacer videos?</span>
                    <select name="video"  defaultValue={-1}>
                        <option value={-1} disabled>--- Seleccionar ---</option>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    <span className='focus'>Modo de pago</span>
                    <select name="paymentMode"  defaultValue={-1}>
                        <option value={-1} disabled>--- Seleccionar ---</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                    </select>
                </label>
                <label>
                    <span className='focus'>Salta de la mesa?</span>
                    <select name="jumper" defaultValue={-1}>
                        <option value={-1} disabled>--- Seleccionar ---</option>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    <span className='focus'>El tutor se queda?</span>
                    <select name="ownerStay"  defaultValue={-1}>
                        <option value={-1} disabled>--- Seleccionar ---</option>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    <span>Saldo</span>
                    <input type="number" name="balance"/>
                </label>
                <label name="lastVisit">
                <span className='focus'>Ultima visita?</span>
                <input type="date" placeholder="Última visita" name="lastVisit" onChange={(e) => handleLastVisit(e)}/>
                </label>
                <label>
                <span className='focus'>Foto de perfil</span>
                <input accept='image/*' type='file' onChange={convertToBase64} className='imageUp'></input>
                {image ==="" || image ===null ? "" : <img width={100} height={100} src={image} alt="Imagen Perro" />}
                </label>
                <label>
                <span className='focus'>Descripción</span>
                <textarea placeholder="Descripción adicional" name="description" rows={4} className='descriptionUpDog'/>
                </label>
                {!addDogMutation.isPending && showBtnEdit && <button type="submit" className='btn-up-dog'>Crear</button>}
            </form>}
        </div>
            <BtnHome/>
            </div>
)}
