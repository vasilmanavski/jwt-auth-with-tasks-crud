import React, { useState } from 'react';
import { Task } from 'src/types/types';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';

interface TaskProps {
  event: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedTask: Partial<Task>) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ event, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(event.title);

  const handleDelete = () => {
    onDelete(event.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(event.id, { title: editedTitle });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <CardContent
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        cursor: 'pointer',
      }}
      onClick={handleEdit}
    >
      {isEditing ? (
        <TextField
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <Typography variant='body1' component='span'>
          {event.title}
        </Typography>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        {isEditing ? (
          <IconButton onClick={handleSave} sx={{ color: 'green' }}>
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDelete} sx={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </CardContent>
  );
};

export default TaskComponent;