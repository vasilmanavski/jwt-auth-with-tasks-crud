import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {TaskContext} from "../context/TaskContext";
import {AuthContext} from "../context/AuthContext";
import Cookies from 'js-cookie';
import {logout} from "../service/auth";

const LogoutButton: React.FC = () => {
    const {addError} = useContext(TaskContext);
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
            .then(() => {
                setIsAuthenticated(false);
                setUser(null);

                Cookies.remove('accessToken');
                Cookies.remove('username');
                navigate('/login');
            })
            .catch((error) => addError(error))
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;