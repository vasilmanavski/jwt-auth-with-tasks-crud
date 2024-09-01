import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, CircularProgress, Container } from '@mui/material';
import { addTask, getTasks } from '../service/task';
import { TaskContext } from '../context/TaskContext';
import AddTask from '../components/task/AddTask';
import Calendar from '../components/Calendar';
import ErrorMessages from '../components/ErrorMessages';
import { AuthContext } from '../context/AuthContext';
import { Task } from '../types/types';

const Home: React.FC = () => {
  const { isLoading, setIsLoading, addError } = useContext(TaskContext);
  const { isAuthenticated, user } = useContext(AuthContext);
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
    const start = event.target.start.value as Date;
    const end = event.target.end.value as Date;

    const taskDto = { title, userId: user?.id, start, end };
    addTask(taskDto)
      .then(addedTask => {
        setTasks([...tasks, addedTask]);
      })
      .catch(error => {
        addError(new Error(error.message));
      });

    toggleIsAddTaskOpen();
  }, [addError, tasks, toggleIsAddTaskOpen, user?.id]);

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {

    return <ErrorMessages />;
  }

  return (
    <Container maxWidth='md'>
      <Box textAlign='center' mt={4}>
        <Calendar tasks={tasks} setTasks={setTasks} />

        <Button
          variant='contained'
          color='primary'
          onClick={toggleIsAddTaskOpen}
          sx={{ mb: 3 }}
        >
          Add new task
        </Button>
      </Box>

      {isAddTaskOpen && (
        <Box mb={4}>
          <AddTask handleSubmit={handleAddTask} toggleIsAddTaskOpen={toggleIsAddTaskOpen} />
        </Box>
      )}
    </Container>
  );
};

export default Home;