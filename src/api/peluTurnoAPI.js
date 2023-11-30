import axios from "axios";
//const DB_URL = "http://localhost:8080/peluturno";
const DB_URL = "https://lenguaback.onrender.com/peluturno";

const peluTurnoApi = axios.create({
    baseURL: DB_URL
})

export const getPeluTurno = async () => {
    const res = await peluTurnoApi.get("/get");
    return res.data
} 

export const createPeluTurno = async (peluTurno) => {
    try {
        const res = await peluTurnoApi.post("/post", peluTurno)
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error}
}

export const deletePeluTurno = async (id) => {
    peluTurnoApi.delete(`/delete/${id}`)
}

export const updatePeluTurno = async (peluTurno) => {
    console.log(peluTurno)
    try {
        const res = await peluTurnoApi.patch(`/patch/${peluTurno._id}`, peluTurno)
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}