function setToken(token) {
    localStorage.setItem("ACCESS_TOKEN", token)
}

function getToken() {
    return localStorage.getItem("ACCESS_TOKEN");
}

const setRole = (role) => {
    localStorage.setItem("ROLE", role)
}

const getRole = () => {
    if (getToken()) {
        return localStorage.getItem("ROLE")
    }
    setRole("guest")
    return localStorage.getItem("ROLE");
}

const removeRole = () => {
    localStorage.removeItem("ROLE");
}

function removeToken() {
    localStorage.removeItem("ACCESS_TOKEN");
}

export default {
    setToken,
    getToken,
    removeToken,
    getRole,
    setRole,
    removeRole
}