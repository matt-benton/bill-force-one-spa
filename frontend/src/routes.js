import Welcome from './pages/Welcome'
import Accounts from './pages/Accounts'
import CreateAccount from './pages/CreateAccount'

export const routes = [
    { path: '', component: Welcome },
    { path: '/accounts', component: Accounts },
    { path: '/accounts/create', component: CreateAccount },
]
