import axios from "axios";

const api = axios.create({
    // baseURL: "https://mulberry.vercel.app",
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api