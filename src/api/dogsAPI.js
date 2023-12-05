import axios from "axios";
//const DB_URL = "http://localhost:8080/dog";
const DB_URL = "https://lenguaback.onrender.com/dog";

const dogsApi = axios.create({
    baseURL: DB_URL
})

export const getDogs = async () => {
    try {
        const res = await dogsApi.get("/get");
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
} 

export const createDog = async (dog) => {
    try {
        const res = await dogsApi.post("/post", dog)
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error}
}

export const deleteDog = async (id) => {
    dogsApi.delete(`/delete/${id}`)
}

export const updateDog = async (dog) => {
    try {
        const res = await dogsApi.patch(`/patch/${dog._id}`, dog)
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}