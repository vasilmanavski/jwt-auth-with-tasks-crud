import React, {useCallback, useContext, useState} from 'react';
import {login} from "../service/auth";
import {UserCredentialsDto} from "src/types/types";
import {useNavigate} from "react-router";
import {TaskContext} from "../context/TaskContext";
import Cookies from 'js-cookie';
import {AuthContext} from "../context/AuthContext";
import {fetchUserInfo} from "../service/user";
import ErrorMessage from "../components/ErrorMessage";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { addError, setErrors, errors } = useContext(TaskContext);
    const { setIsAuthenticated, setUser } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        return login({username: email, password} as UserCredentialsDto)
            .then(() => {

                Cookies.set('username', email, { expires: 7, secure: false, sameSite: 'Strict' });

                setIsAuthenticated(true);

                fetchUserInfo(email)
                    .then(userInfo => setUser(userInfo));

                setErrors([]);
                navigate('/home');
            })
            .catch(() => {
                addError(new Error('User with provided credentials doesnt exists'))
            });

    }, [addError, email, navigate, password, setErrors, setIsAuthenticated, setUser]);

    return (
        <div>
            {errors.length > 0 && <ErrorMessage />}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;