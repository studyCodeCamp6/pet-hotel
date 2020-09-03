import LoginPage from '../containers/pages/Login'
import RegisterPage from '../containers/pages/Register'
import AddPetsPage from '../containers/pages/Add_Pets'
import BookingPetsPage from '../containers/pages/Booking_Pets'
import RegisterOptionalProviderPage from '../containers/pages/provider/OptionalProviders'
import RegisterLoginProviderPage from '../containers/pages/provider/RegisterLoginProvider'
import EditProviderPage from '../containers/pages/provider/EditProvider'

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
    editProviderPage : {
        url : '/providers/edit',
        component : EditProviderPage
    },
    registerLoginProviderPage : {
        url : '/providers/register',
        component : RegisterLoginProviderPage
    }
    
}
export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            components.addPets,
            components.bookingPets,
            components.editProviderPage,
            components.registerLoginProviderPage
        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.login,
            components.register,
            components.addPets,
            components.bookingPets,
            components.editProviderPage,
            components.registerLoginProviderPage

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