import axios from "axios";
import Router from "next/router";

const porta = process.env.NEXT_PUBLIC_BACK_APP_API_URL;

const api = axios.create({
    baseURL: porta,
});

api.interceptors.request.use(
    (config) => {
        config.headers["Authorization"];
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            Router.push("/login");
        }
        return Promise.reject(error);
    },
);

export default api;