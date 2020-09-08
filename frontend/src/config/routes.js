import LoginPage from '../containers/pages/Login'
import RegisterPage from '../containers/pages/Register'
import Home from '../containers/pages/Home'
import CustomerProfilePage from '../containers/pages/customers/Profile'
import CustomerEditProfilePage from '../containers/pages/customers/EditProfile'
import AddPetsPage from '../containers/pages/pets_custumers/Add_Pets'
import BookingPetsPage from '../containers/pages/pets_custumers/Booking_Pets'
import TaskCustomers from '../containers/pages/task/Task_Customers'
import CreateReviewPage from '../containers/pages/customer_review/CreateReview'
import EditReviewPage from '../containers/pages/customer_review/EditReview'
import CustomerReviewPage from '../containers/pages/customer_review/Review'
import CustomerHistoryPage from '../containers/pages/customer_bill/CustomerHistory'
// import RegisterOptionalProviderPage from '../containers/pages/provider/OptionalProviders'
import RegisterLoginProviderPage from '../containers/pages/provider/RegisterLoginProvider'
import ProviderProfilePage from '../containers/pages/provider/Profile'
import EditProviderPage from '../containers/pages/provider/EditProvider'
import TaskProviders from '../containers/pages/task/Task_Providers'
import ProviderHistoryPage from '../containers/pages/provider_bill/ProviderHistory'
import ProviderReviewPage from '../containers/pages/provider_review/Review'
import AdminLoginPage from '../containers/pages/admin/Login'
import AdminManagePage from '../containers/pages/admin/Manage'

const components = {
    login: {
        url: "/login",
        component: LoginPage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
    homePage: {
        url: '/home',
        component: Home
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
    customerProfilePage: {
        url: '/customer/profile',
        component: CustomerProfilePage
    },
    customerEditProfilePage: {
        url: '/customer/editProfile',
        component: CustomerEditProfilePage
    },
    createReviewPage: {
        url: '/customer/review/new',
        component: CreateReviewPage
    },
    editReviewPage: {
        url: '/customer/review/edit',
        component: EditReviewPage
    },
    customerReviewPage: {
        url: '/customer/review',
        component: CustomerReviewPage
    },
    customerHistoryPage: {
        url: '/customer/history',
        component: CustomerHistoryPage
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
    providerProfilePage: {
        url: '/provider/profile',
        component: ProviderProfilePage
    },
    providerHistoryPage: {
        url: '/provider/history',
        component: ProviderHistoryPage
    },
    providerReviewPage: {
        url: '/provider/review',
        component: ProviderReviewPage
    },
    adminLoginPage: {
        url: '/admin/login',
        component: AdminLoginPage
    },
    adminManagePage: {
        url: '/admin/manage',
        component: AdminManagePage
    }
}
export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            components.homePage,
        ],
        redirectRoutes: "/home"
    },
    user: {
        allowedRoutes: [
            components.homePage,
            components.customerProfilePage,
            components.customerEditProfilePage,
            components.addPets,
            components.bookingPets,
            components.taskCustomers,
            components.createReviewPage,
            components.editReviewPage,
            components.customerReviewPage,
            components.registerLoginProviderPage,
            components.customerHistoryPage
        ],
        redirectRoutes: "/home"
    },
    provider: {
        allowedRoutes: [
            components.providerProfilePage,
            components.editProviderPage,
            components.taskProviders,
            components.providerHistoryPage,
            components.providerReviewPage
        ],
        redirectRoutes: "/home"
    },
    admin: {
        allowedRoutes: [
            components.adminLoginPage,
            components.adminManagePage
        ],
        redirectRoutes: "/admin/login"
    }
}