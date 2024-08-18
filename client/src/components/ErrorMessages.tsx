import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';

const ErrorMessages: React.FC = () => {
  const { setErrors, errors } = useContext(TaskContext);

  const handleClose = (error: Error): void => {
    setErrors(errors.filter((elem) => elem !== error));
  };

  return (
    <Snackbar
      open={errors.length > 0}
      onClose={() => {
        setErrors([]);
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
      autoHideDuration={5000}
    >
      <div>
        {errors.map((error, index) => (
          <Alert
            key={index}
            action={
              <IconButton aria-label='close' color='inherit' size='small' onClick={() => handleClose(error)}>
                <CloseIcon sx={{ fontSize: '1.5vw' }} />
              </IconButton>
            }
            icon={<ErrorOutlineIcon sx={{ fontSize: '1.5vw' }} />}
            severity='error'
            variant='filled'
            sx={{ fontSize: '1vw' }}
          >
            {error.message}
          </Alert>
        ))}
      </div>
    </Snackbar>
  );
};

export default ErrorMessages;