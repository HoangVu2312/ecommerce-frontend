import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommerce-server.onrender.com",
});

export default instance;