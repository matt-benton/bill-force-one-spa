import Welcome from './pages/Welcome'
import Accounts from './pages/Accounts'
import CreateAccount from './pages/CreateAccount'
import AccountDashboard from './pages/AccountDashboard'
import EditBill from './pages/EditBill'
import NavAndContent from './layouts/NavAndContent'

export const routes = [
    { path: '', component: Welcome },
    {
        path: '/app',
        component: NavAndContent,
        children: [
            { path: '/accounts', component: Accounts },
            { path: '/accounts/create', component: CreateAccount },
            { path: '/accounts/:accountId/bills', component: AccountDashboard },
            { path: '/accounts/:accountId/bills/:billId', component: EditBill },
        ],
    },
]
