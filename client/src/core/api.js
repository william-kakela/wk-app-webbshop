import axios from "axios";

export default () => {
    let client = axios.create({
        baseURL: "http://localhost:8000/api/",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    });

    client.interceptors.response.use(res => {
        return res;
    }, error => {
        return error;
    });

    return client;
};
