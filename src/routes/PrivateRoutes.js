import DashboardUser from "../pages/users/DashboardUser";
import Profile from "../pages/users/Profile";


const privateRoutes = [
    { path: '/dashboard-user', element: DashboardUser },
    { path: '/profile', element: Profile },
]

export default privateRoutes;
