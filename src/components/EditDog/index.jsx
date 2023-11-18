import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { updateDog, getDogs } from "../../api/dogsAPI";
import { useState } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { BtnHome } from '../BtnHome'

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

    const animatedComponents = makeAnimated()
    const optionsDogs = dogs?.map(dog => ({ value: dog._id, label: dog.name }));
    
    const handleSelectFriendsChange = (selectedOptions) => {
      setSelectedFriends(selectedOptions);
    };
    
    const handleSelectEnemiesChange = (selectedOptions) => {
      setSelectedEnemies(selectedOptions);
    };

    function updateDogOpenForm(id_dog) {
        toggleFormUpdateDog()
        setIdDog(id_dog)
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

    return (
        <div>
            {!formUpdateDog && <>{dogs?.map((dog, i) => (
                <div key={i}>
                    <h2>{dog.name}</h2>
                    <p>{dog.owner}</p>
                    <p>{dog._id}</p>
                    <button onClick={() => updateDogOpenForm(dog._id)}>
                        Update
                    </button>
                </div>))}</>}
                {formUpdateDog && <>
                <h2>Perro</h2>
                {dogs?.map((dog, i) => (
                    dog._id === idDog ?
                    <div key={i}>
                    <input type="text" placeholder="Nombre*" name="name" value={dog.name}/>
                <input type="text" placeholder="Raza*" name="race" value={dog.race}/>
                <input type="number" placeholder="Edad*" name="age" value={dog.age}/>
                <input type="text" placeholder="Dueño*" name="owner" value={dog.owner}/>
                <input type="number" placeholder="Celular*" name="phone" value={dog.phone}/>
                <input type="email" placeholder="Email" name="email" value={dog.email}/>
                <input type="number" placeholder="Rotación*" name="rotation" value={dog.rotation}/>
                <input type="text" placeholder="Enfermedad/Discapacidad" name="disease" value={dog.disease}/>
                <input type="text" placeholder="Alergia" name="allergy" value={dog.allergy}/>
                <input type="text" placeholder="Temperamento" name="temper" value={dog.temper}/>
                <select name="castrated" placeholder='Castra3do?' defaultValue={dog.castrated}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                <input type="text" placeholder="Tipo de Corte" name="typeOfCut" value={dog.typeOfCut}/>
                <input type="text" placeholder="Tipo de Shampoo" name="typeOfShampoo" value={dog.typeOfShampoo}/>
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
                <textarea placeholder="Descripción" name="description" rows={4} value={dog.description}/>
                        
                        <h2>{dog.name}</h2>
                        <p>{dog.owner}</p>
                        <p>{dog._id}</p>
                        
                    
                    </div> : null))}
                    
                    





                <button onClick={toggleFormUpdateDog}>
                    Cerrar
                </button>
                </>}
                    <BtnHome />
        </div>
    );
};
