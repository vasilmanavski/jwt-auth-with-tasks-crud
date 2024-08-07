import React from 'react';
import { Task } from "src/types/types";

interface Props {
    task: Task;
    onDelete: (id: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
    return (
        <div className="task-item">
            <h2>{task.title}</h2>
            <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TaskItem;