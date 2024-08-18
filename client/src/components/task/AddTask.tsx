import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Props {
  handleSubmit: (id: string) => void;
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