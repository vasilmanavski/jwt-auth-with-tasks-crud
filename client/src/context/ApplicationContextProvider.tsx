import React from 'react';

import TaskContextProvider from '../context/TaskContext.tsx';
import AuthContextProvider from "../context/AuthContext";


const ApplicationContextProvider: React.FC<{ children: React.ReactElement }> = ({children}) => (
    <AuthContextProvider>
        <TaskContextProvider>
            {children}
        </TaskContextProvider>
    </AuthContextProvider>
);

export default ApplicationContextProvider;
