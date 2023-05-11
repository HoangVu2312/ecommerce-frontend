import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommerce-server-wd76.onrender.com",
});

export default instance;
