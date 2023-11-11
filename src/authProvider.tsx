import {AuthProvider} from "react-admin";
import axios from 'axios';
const authProvider: AuthProvider = {
    login: ({email, password}) => {
        return new Promise((res, rej) => {
            axios.request({
                method: "post",
                url: "http://localhost:8080/login",
                data: {
                    email,
                    password
                }
            }).then(({data}) => {
                localStorage.setItem('access_token', data);
                res("Success")
            }).catch((err) => {
                let status = err.response.status;
                if (status === 401) {
                    rej("Failed! Invalid Credentials!");
                } else {
                    rej(`Failed! Unknwon Error(${status})`);
                }
            });
        });
    },
    checkAuth: () =>
        localStorage.getItem('access_token') ? Promise.resolve() : Promise.reject(),
    logout: () => {
        localStorage.removeItem('access_token');
        return Promise.resolve();
    },
    checkError: (error) => Promise.resolve(),
    getPermissions: () => Promise.resolve()
}

export default authProvider;
