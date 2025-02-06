import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useLogoutMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const LogoutButton = ({ onLogout, className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApi, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Mise à jour du Redux store
            dispatch(logout());

            window.location.reload();

            navigate("/", { replace: true });

            if (onLogout) onLogout();
        } catch (error) {
            console.error("Erreur de déconnexion :", error);

            if (error?.data?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                console.log("Token expiré ou non valide, redirection...");
                navigate("/");
            }
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center p-3 rounded-md hover:bg-white hover:text-black transition"
        >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            <span className={className}>{isLoading ? "Déconnexion..." : "Déconnexion"}</span>
        </button>
    );
};

export default LogoutButton;
