import React from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from 'src/types/types';

interface Props {
  task: Task;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
  return (
    <Card variant='outlined' sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant='h6' component='div'>
          {task.title}
        </Typography>
        <IconButton
          aria-label='delete'
          color='secondary'
          onClick={() => onDelete(task.id)}
          sx={{ float: 'right' }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TaskItem;