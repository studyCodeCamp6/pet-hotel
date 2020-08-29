import LoginPage from '../containers/pages/Login'
import RegisterPage from '../containers/pages/Register'
import AddPetsPage from '../containers/pages/Add_Pets'
import BookingPetsPage from '../containers/pages/Booking_Pets'
import RegisterProviderPage from '../containers/pages/provider/RegisterProvider'

const components = {
    login: {
        url: "/login",
        component: LoginPage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
    addPets: {
        url: '/pets/add',
        component: AddPetsPage
    },
    bookingPets : {
        url : '/pets',
        component : BookingPetsPage
    },
    registerProviderPage : {
        url : '/providers',
        component : RegisterProviderPage
    }
    
}
export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            components.addPets,
            components.bookingPets,
            components.registerProviderPage
        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.login,
            components.register,
            components.registerProviderPage

        ],
        redirectRoutes: "/login"
    },
    admin: {
        allowedRoutes: [
            components.login,
            components.register
        ],
        redirectRoutes: "/login"
    }
}