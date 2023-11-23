import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { updateDog, getDogs } from "../../api/dogsAPI";
import { useState } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { BtnHome } from '../BtnHome'
import './editDog.css'

export const EditDog = () => {

    const queryClient = useQueryClient();
    const { isLoading, error, data: dogs } = useQuery({
        queryKey: ["dogs"],
        queryFn: getDogs
    })

    const [formUpdateDog, setFormUpdateDog] = useState(false)
    const [idDog, setIdDog] = useState("")
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [selectedEnemies, setSelectedEnemies] = useState([]);
    const [friendsGet, setFriendGet] = useState([])
    const [enemiesGet, setEnemyGet] = useState([])

    const animatedComponents = makeAnimated()
    const optionsDogs = dogs?.map(dog => ({ value: dog._id, label: dog.name }));
    //const fijos = {value: dogs[13].friends[0], label: dogs[6].name}
    const handleSelectFriendsChange = (selectedOptions) => {
      setSelectedFriends(selectedOptions);
    };
    //console.log("fijos", fijos)

    const handleSelectEnemiesChange = (selectedOptions) => {
      setSelectedEnemies(selectedOptions);
    };

    let optionsFriends = []

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
    }

    const updateDogMutation = useMutation({
        mutationFn: updateDog,
        onSuccess: () => {
            queryClient.invalidateQueries(["dogs"]);
        },
    });

    function updateCompleteDog () {
        console.log("Si ando")
    }

    return (
        <div>
            {!formUpdateDog && <div className="listDogUpdate">{dogs?.map((dog, i) => (
                <div key={i}>
                    <h2>{dog.name}</h2>
                    <p>{dog.owner}</p>
                    {/* <p>{dog._id}</p> */}
                    <button onClick={() => updateDogOpenForm(dog._id)}>
                        Update
                    </button>
                </div>))}</div>}
                {formUpdateDog && <>
                
                {dogs?.map((dog, i) => (
                    dog._id === idDog ?<>
                    <h3>Editar información de: {dog.name}</h3>
                    <div key={i} className="formEditDog">
                    
                    <input type="text" placeholder="Nombre*" name="name" defaultValue={dog.name}/>
                <input type="text" placeholder="Raza*" name="race" defaultValue={dog.race}/>
                <input type="number" placeholder="Edad*" name="age" defaultValue={dog.age}/>
                <input type="text" placeholder="Dueño*" name="owner" defaultValue={dog.owner}/>
                <input type="number" placeholder="Celular*" name="phone" defaultValue={dog.phone}/>
                <input type="email" placeholder="Email" name="email" defaultValue={dog.email}/>
                <input type="number" placeholder="Rotación*" name="rotation" defaultValue={dog.rotation}/>
                <input type="text" placeholder="Enfermedad/Discapacidad" name="disease" defaultValue={dog.disease}/>
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
                <textarea placeholder="Descripción" name="description" rows={4} defaultValue={dog.description}/>
                        <button onClick={e => {updateCompleteDog()}}>Update</button>
                        
                    
                    </div></> : null))}
                    
                    





                <button onClick={toggleFormUpdateDog}>
                    Cerrar
                </button>
                </>}
                    <BtnHome />
        </div>
    );
};
