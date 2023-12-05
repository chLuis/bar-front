import axios from "axios";
//const DB_URL = "http://localhost:8080/user";
const DB_URL = "https://lenguaback.onrender.com/user";

const userApi = axios.create({
    baseURL: DB_URL
})

export const getUser = async (name, password) => {
    console.log("la data")
    try {
        const res = await userApi.get("/get",{params: {name, password}});
        console.log(res.data)
        return res.data
    }
    catch (error) {
        return error.response.data
        //throw error
    }
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