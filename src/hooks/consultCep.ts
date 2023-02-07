import axios from "axios";

const cepApi = axios.create({
    baseURL: "https://viacep.com.br/ws",
    headers: {
        "Content-Type": "application/json",
    }
})

export default cepApi