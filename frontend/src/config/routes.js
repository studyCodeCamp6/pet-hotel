import LoginPage from '../containers/pages/Login'
import RegisterPage from '../containers/pages/Register'

const component = {
    login:{
        url:"/login",
        component:LoginPage
    },
    register:{
        url:"/register",
        component:RegisterPage
    }
}
export default {
    guest:{
        allowedRoutes: [
            component.login,
            component.register
        ],
        redirectRoutes:"/login"
    },
    user:{
        allowedRoutes:[
            component.login,
            component.register

        ],
        redirectRoutes:"/login"
    },
    admin:{
        allowedRoutes:[
            component.login,
            component.register
        ],
        redirectRoutes:"/login"
    }
}