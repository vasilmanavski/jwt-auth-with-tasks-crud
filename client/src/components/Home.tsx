import React, { useCallback, useContext, useEffect, useState } from 'react';
import { addTask, deleteTask, getTasks } from '../service/task';
import { Task } from '../types/types';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/task/TaskItem';
import AddTask from '../components/task/AddTask';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import ErrorMessages from '../components/ErrorMessages';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';

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
        console.log(fetchedTasks);
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

    const taskDto = { title, userId: user?.id };
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
        <Typography variant='h4' gutterBottom>
          Welcome to the Home Page!
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <TaskItem task={task} onDelete={handleDeleteTask} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='100%'
              minHeight='200px'
            >
              <Typography variant='h6' align='center' color='textSecondary'>
                No tasks available.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box textAlign='center' mt={4}>
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