import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import LogoutButton from "../components/LogoutButton";
import {AuthContext} from "../context/AuthContext";

const Header: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <header className="header">
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>
                        {!isAuthenticated && <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>}
                        <li className="nav-item"><Link to="/registration" className="nav-link">Registration</Link></li>
                        {isAuthenticated && (<li className="nav-item"><LogoutButton /></li>)}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;