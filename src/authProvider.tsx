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
            }).then((d) => {
                localStorage.setItem('email', email);
                console.log(d);
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
        localStorage.getItem('email') ? Promise.resolve() : Promise.reject(),
    logout: () => {
        localStorage.removeItem('email');
        return Promise.resolve();
    },
    checkError: (error) => Promise.resolve(),
    getPermissions: () => Promise.resolve()
}

export default authProvider;
