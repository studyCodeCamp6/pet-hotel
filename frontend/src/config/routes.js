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
import ProviderHomePage from '../containers/pages/provider/Home'

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
        url: '/customers/task',
        component: TaskCustomers
    },
    customerProfilePage: {
        url: '/customers/profile',
        component: CustomerProfilePage
    },
    customerEditProfilePage: {
        url: '/customers/editProfile',
        component: CustomerEditProfilePage
    },
    createReviewPage: {
        url: '/customers/review/new',
        component: CreateReviewPage
    },
    editReviewPage: {
        url: '/customers/review/edit',
        component: EditReviewPage
    },
    customerReviewPage: {
        url: '/customers/review',
        component: CustomerReviewPage
    },
    customerHistoryPage: {
        url: '/customers/history',
        component: CustomerHistoryPage
    },
    taskProviders: {
        url: '/providers/task',
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
        url: '/providers/profile',
        component: ProviderProfilePage
    },
    providerHistoryPage: {
        url: '/providers/history',
        component: ProviderHistoryPage
    },
    providerReviewPage: {
        url: '/providers/review',
        component: ProviderReviewPage
    },
    providerHomePage: {
        url: '/providers/home',
        component: ProviderHomePage
    },
    adminLoginPage: {
        url: '/admins/login',
        component: AdminLoginPage
    },
    adminManagePage: {
        url: '/admins/manage',
        component: AdminManagePage
    },
}
export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            components.bookingPets,
            components.homePage,
        ],
        redirectRoutes: "/login"
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
            components.customerHistoryPage,
            components.editProviderPage,
            components.providerHistoryPage
        ],
        redirectRoutes: "/home"
    },
    provider: {
        allowedRoutes: [
            components.providerHomePage,
            components.providerProfilePage,
            components.editProviderPage,
            components.taskProviders,
            components.providerHistoryPage,
            components.providerReviewPage
        ],
        redirectRoutes: "/providers/home"
    },
    admin: {
        allowedRoutes: [
            components.adminLoginPage,
            components.adminManagePage
        ],
        redirectRoutes: "/admins/login"
    }
}