import axios from "axios";
const DB_URL = "http://localhost:8080/dog";
//const DB_URL = "https://pf-back-dev-hchm.4.us-1.fl0.io/dogs/dog";

const dogsApi = axios.create({
    baseURL: DB_URL
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