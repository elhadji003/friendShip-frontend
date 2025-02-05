import DashboardUser from "../pages/users/DashboardUser";
import MesArticles from "../pages/users/MesArticles";
import Profile from "../pages/users/Profile";


const privateRoutes = [
    { path: '/dashboard-user', element: DashboardUser },
    { path: '/profile', element: Profile },
    { path: '/mes-article', element: MesArticles },
]

export default privateRoutes;
