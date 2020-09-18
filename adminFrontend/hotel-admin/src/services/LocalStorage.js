const ACCESS_TOKEN = "ACCESS_TOKEN";
const ROLE = "ROLE";

const setToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token)
}

const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
}

const setRole = (role) => {
    localStorage.setItem(ROLE, role)
}

const getRole = () => {
    if (getToken()) {
        return localStorage.getItem(ROLE)
    }
    setRole("guest")
    return localStorage.getItem(ROLE)
}

const removeRole = () => {
    localStorage.removeItem(ROLE)
}

const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN)
}

export default {
    setToken,
    getToken,
    setRole,
    getRole,
    removeRole,
    removeToken
}