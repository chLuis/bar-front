import axios from "axios";

const dogsApi = axios.create({
    baseURL: "http://localhost:8080/dog",
})

export const getDogs = async () => {
    const res = await dogsApi.get("/get");
    return res.data
} 

export const createDog = async (dog) => {
    dogsApi.post("/post", dog)
}

export const deleteDog = async (id) => {
    dogsApi.delete(`/delete/${id}`)
}