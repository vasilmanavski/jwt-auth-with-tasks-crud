import React from 'react';
import '../css/add-task.css'

interface Props {
    handleSubmit: (id: string) => void;
    toggleIsAddTaskOpen: void;

}

const AddTask: React.FC<Props> = ({handleSubmit, toggleIsAddTaskOpen}) => {

    return (
        <div className="overlay">
            <div className="task-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id={'title'}
                        placeholder="title"
                        required
                    />
                    <button type="submit">Add Task</button>
                    <button className="close-button" onClick={toggleIsAddTaskOpen}>Exit</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;