import axios from "axios";
//const DB_URL = "http://localhost:8080/user";
const DB_URL = "https://lenguaback.onrender.com/user";

const userApi = axios.create({
    baseURL: DB_URL
})

export const getUser = async () => {
    const res = await userApi.get("/get");
    return res.data
} 

export const createUser = async (user) => {
    try {
        const res = await userApi.post("/post", user)
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error}
}