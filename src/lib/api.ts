import axios from "axios";

const api = axios.create({
    baseURL: "https://mulberry.vercel.app",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api