import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDogs, deleteDog } from "../../api/dogsAPI";
import "./dogs.css";
import { BtnHome } from "../BtnHome";

export const Dogs = () => {
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

    if (isLoading) return <h1>Loading...</h1>;
    else if (isError) return <h1>{error.message}</h1>;

    return (
        <div>
        <div className="dog-list">
            {dogs.map(dog => (
            <div key={dog._id} className="dog-element-list">
                <h3>{dog.name}</h3>
                <p>{dog.owner}</p>
                <p>{dog.phone}</p>
                <button onClick={() => {
                    deleteDogMutation.mutate(dog._id);
                }}>Borrar</button>
            </div>
            ))}
        </div>
        <BtnHome />
        </div>
    );
};
