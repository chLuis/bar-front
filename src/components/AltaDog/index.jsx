import './AltaDog.css'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDogs,createDog } from '../../api/dogsAPI'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { BtnHome } from '../BtnHome'
 
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


    const addDogMutation = useMutation({
        mutationFn: createDog,
        onSuccess: ()=> {
            console.log("Creando!");
            queryClient.invalidateQueries(['dogs'])
        }
    })


    const [selectedValues, setSelectedValues] = useState([]);
    const handleSelectChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
      };
      //console.log(selectedValues)
      const handleObtainValues = () => {
        // Obtener los valores seleccionados
        const selectedValuesObject = {};
        selectedValues.forEach((value) => {
          selectedValuesObject[value.value] = value.label;
        });
        
        console.log(selectedValuesObject);
      };

      const [selectedFriends, setSelectedFriends] = useState([]);
const [selectedEnemies, setSelectedEnemies] = useState([]);

const handleSelectFriendsChange = (selectedOptions) => {
  setSelectedFriends(selectedOptions);
};

const handleSelectEnemiesChange = (selectedOptions) => {
  setSelectedEnemies(selectedOptions);
};
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const dog = Object.fromEntries(formData);
        dog.friends = selectedFriends.map(amigo => amigo.value);
        dog.enemies = selectedEnemies.map(enemigo => enemigo.value);
        //console.log(dog)
        addDogMutation.mutate(dog)
        /*addDogMutation.mutate({   ------>>> Si quiero agregar algo que no esta en el body
            ...dog,
            color: "black"
        })*/
    }
    

    const animatedComponents = makeAnimated()
    const optionsDogs = dogs?.map(dog => ({ value: dog._id, label: dog.name }));


    return (
        <div className='allArea-altaDog'>
            <h2 className='title-alta-dog'>Dar de alta un perro</h2>
            <p className='subtitle-alta-dog'>Los campos con (*) son obligatorios</p>
            <form className="form-alta-dog" onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre*" name="name"/>
                <input type="text" placeholder="Raza*" name="race"/>
                <input type="number" placeholder="Edad*" name="age"/>
                <input type="text" placeholder="Dueño*" name="owner"/>
                <input type="number" placeholder="Celular*" name="phone"/>
                <input type="email" placeholder="Email" name="email"/>
                <input type="number" placeholder="Rotación*" name="rotation"/>
                <input type="text" placeholder="Enfermedad/Discapacidad" name="disease"/>
                <input type="text" placeholder="Alergia" name="allergy"/>
                <input type="text" placeholder="Temperamento" name="temper"/>
                <select name="castrated" placeholder='Castra3do?' defaultValue={-1}>
                    <option value={-1} disabled>Castrado?</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <input type="text" placeholder="Tipo de Corte" name="typeOfCut"/>
                <input type="text" placeholder="Tipo de Shampoo" name="typeOfShampoo"/>
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
                <textarea placeholder="Descripción" name="description" rows={4}/>
                <button type="submit">Guardar</button>
            </form>
            <BtnHome/>
        </div>
)}
