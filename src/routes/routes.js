import LandingPage from './LandingPage'
import Login from './Login'
const ROUTES = [
  { path: '/', component: Login, exact: true },
  { path: '/login', component: Login, exact: true },
  { path: '/dashboard', component: LandingPage, exact: true }
]

export default ROUTES
