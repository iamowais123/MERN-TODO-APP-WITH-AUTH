import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000", // backend url
    withCredentials : true, // important for sending cookies (auth)
});

export default api;