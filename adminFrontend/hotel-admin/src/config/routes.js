import LoginPage from '../containers/pages/Login';
import ManagePage from '../containers/pages/AdminManage'

const components = {
    login: {
        url: "/admins/authorization",
        component: LoginPage
    },
    managePage: {
        url: "/admins/manage",
        component: ManagePage
    }
}

export default {
    guest: {
        allowedRoutes: [
          components.login
        ],
        redirectRoutes: "/admins/authorization"
    },
    admin: {
        allowedRoutes: [
            components.managePage
        ],
        redirectRoutes: "/admins/manage"
    }
}