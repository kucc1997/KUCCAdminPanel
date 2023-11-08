import {AuthProvider} from "react-admin";

const authProvider: AuthProvider = {
    login: (params) => Promise.resolve(""),
    checkAuth: (params) => Promise.reject(),
    logout: (params) => Promise.resolve(""),
    checkError: (error) => Promise.resolve(),
    getPermissions: () => Promise.resolve()
}

export default authProvider;
