import LoginRegister from "../auth/LoginRegister";
import Home from "../pages/home/Home";


const publicRoutes = [
    { path: '/', element: Home },
    { path: '/login-register', element: LoginRegister },
]

export default publicRoutes;
