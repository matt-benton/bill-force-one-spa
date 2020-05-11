import Welcome from './pages/Welcome'
import Accounts from './pages/Accounts'
import CreateAccount from './pages/CreateAccount'
import AccountDashboard from './pages/AccountDashboard'

export const routes = [
    { path: '', component: Welcome },
    { path: '/accounts', component: Accounts },
    { path: '/accounts/create', component: CreateAccount },
    { path: '/accounts/:accountId/bills', component: AccountDashboard },
]
