import React, {useContext} from 'react';
import {TaskContext} from "../context/TaskContext";

const ErrorMessage: React.FC = () => {
    const {errors, setErrors} = useContext(TaskContext);

    if (!errors || errors.length === 0) {
        return null;
    }

    const handleClose = () => {
        setErrors([]);
    };

    return (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '5px', position: 'relative' }}>
            {errors.map((error, index) => (
                <div key={index}>{error.message || 'Unknown error'}</div>
            ))}
            <button
                onClick={handleClose}
                style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent', color: 'red', fontSize: '16px', cursor: 'pointer' }}
            >
                X
            </button>
        </div>
    );
};

export default ErrorMessage;