import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDogs, deleteDog } from "../../api/dogsAPI";
import "./dogs.css";
import { BtnHome } from "../BtnHome";
import perroSinFoto from '../../assets/images/perroSinFoto.png'
import { EditDog } from '../EditDog/index'

export const Dogs = () => {
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
        //select: dogs => dogs.sort((a, b) => b.id - a.id)
    });

    const deleteDogMutation = useMutation({
        mutationFn: deleteDog,
        onSuccess: () => {
            console.log("borrado")
            queryClient.invalidateQueries(["dogs"]);
        }
    })

    if (isLoading) return <><h1>Cargando...</h1><BtnHome /></>;
    else if (isError) {console.log(error)
        return <><h1>{error.message}</h1><BtnHome /></>}

    return (
        <div>
        {/* <EditDog /> */}
        <div className="dog-list">
            {dogs.map(dog => (
            <div key={dog._id} className="dog-element-list">
                <img className="avatar-dog" src={dog.image ? dog.image : fotoPerroSinFoto} height={100} alt={dog.image ? dog.image : fotoPerroSinFoto} />
                <h3>{dog.name}</h3>
                <p>{dog.owner}</p>
                <button>✏️ Editar</button>
                <button onClick={() => {
                    deleteDogMutation.mutate(dog._id);
                }}>🗑️ Borrar</button>
            </div>
            ))}
        </div>
        <BtnHome />
        </div>
    );
};
