import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { TaskDto } from 'src/types/types';

interface Props {
  handleSubmit: (data: TaskDto) => void;
  toggleIsAddTaskOpen: () => void;
}

const AddTask: React.FC<Props> = ({ handleSubmit, toggleIsAddTaskOpen }) => {
  return (
    <Dialog open={true} onClose={toggleIsAddTaskOpen}>
      <DialogTitle>Add New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Task Title'
            type='text'
            fullWidth
            variant='outlined'
            required
          />
          <TextField
            margin='dense'
            id='start'
            label='Start Time'
            type='datetime-local'
            fullWidth
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin='dense'
            id='end'
            label='End Time'
            type='datetime-local'
            fullWidth
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleIsAddTaskOpen} color='primary'>
            Exit
          </Button>
          <Button type='submit' color='primary'>
            Add Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTask;