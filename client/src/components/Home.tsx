import React, {useCallback, useContext, useEffect, useState} from 'react';
import {addTask, deleteTask, getTasks} from "../service/task";
import {Task} from "../types/types";
import {TaskContext} from "../context/TaskContext";
import TaskItem from "../components/task/TaskItem";
import AddTask from "../components/task/AddTask";
import {useNavigate} from "react-router";
import {AuthContext} from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

const Home: React.FC = () => {
    const {isLoading, setIsLoading, addError} = useContext(TaskContext);
    const {isAuthenticated, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);

    useEffect(() => {

        if (!isAuthenticated || !user) {
            addError(new Error('Please log in'));
            return;
        }

        setIsLoading(true);
        getTasks(user?.email)
            .then(fetchedTasks => {
                setTasks(fetchedTasks);
            })
            .catch(error => {
                addError(new Error(error));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [addError, isAuthenticated, navigate, setIsLoading, user, user?.email]);

    const toggleIsAddTaskOpen = useCallback(() => {
        setIsAddTaskOpen(!isAddTaskOpen);
    }, [isAddTaskOpen]);

    const handleAddTask = useCallback((event) => {
        event.preventDefault();

        const title = event.target.title.value as string;

        const taskDto = {title, userId: user?.id}
        addTask(taskDto)
            .then(addedTask => {
                setTasks([...tasks, addedTask]);
            })
            .catch(error => {
                addError(new Error(error.message));
            });

        toggleIsAddTaskOpen();
    }, [addError, tasks, toggleIsAddTaskOpen, user?.id]);

    const handleDeleteTask = useCallback((id: number) => {
        deleteTask(id)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => {
                addError(new Error(error.message));
            });
    }, [addError, tasks]);

    if (isLoading) {
        return <div>Tasks are loading...</div>;
    }

    if (!isAuthenticated || !user) {

        return <ErrorMessage/>;
    }

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            {isAddTaskOpen && <AddTask handleSubmit={handleAddTask} toggleIsAddTaskOpen={toggleIsAddTaskOpen}/>}
            <input type='button' value='Add new item' onClick={toggleIsAddTaskOpen}/>
            <div className="task-list">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} onDelete={handleDeleteTask}/>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;