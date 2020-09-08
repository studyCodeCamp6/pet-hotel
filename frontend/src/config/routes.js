import LoginPage from '../containers/pages/Login'
import RegisterPage from '../containers/pages/Register'
import AddPetsPage from '../containers/pages/pets_custumers/Add_Pets'
import BookingPetsPage from '../containers/pages/pets_custumers/Booking_Pets'
import TaskCustomers from '../containers/pages/Task_Customers'
import TaskProviders from '../containers/pages/Task_Providers'
// import RegisterOptionalProviderPage from '../containers/pages/provider/OptionalProviders'
import RegisterLoginProviderPage from '../containers/pages/provider/RegisterLoginProvider'
import EditProviderPage from '../containers/pages/provider/EditProvider'
import providerHistoryPage from '../containers/pages/history/Provider_history'

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
    bookingPets: {
        url: '/pets',
        component: BookingPetsPage
    },
    taskCustomers: {
        url: '/customer/task',
        component: TaskCustomers
    },
    taskProviders: {
        url: '/provider/task',
        component: TaskProviders,
    },
    editProviderPage: {
        url: '/providers/edit',
        component: EditProviderPage
    },
    registerLoginProviderPage: {
        url: '/providers/register',
        component: RegisterLoginProviderPage
    },
    providerHistory: {
        url: '/history/provider',
        component : providerHistoryPage
    }

}
export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            components.bookingPets,

        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.login,
            components.register,
            components.addPets,
            components.taskCustomers,
            components.registerLoginProviderPage,
            components.editProviderPage,
            components.taskProviders,
            components.providerHistory
        ],
        redirectRoutes: "/login"
    },
    provider: {
        allowedRoutes: [
            components.login,
            components.register,
            components.taskCustomers,
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