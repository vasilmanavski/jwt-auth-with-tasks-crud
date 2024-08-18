import React, { useContext, useState } from 'react';
import { register } from '../service/auth';
import { UserCredentialsDto } from 'src/types/types';
import { useNavigate } from 'react-router';
import { TaskContext } from '../context/TaskContext';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import { fetchUserInfo } from '../service/user';
import ErrorMessages from '../components/ErrorMessages';
import { Box, Button, TextField, Typography } from '@mui/material';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { addError, setErrors, errors } = useContext(TaskContext);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      addError(new Error('Provided emails do not match'));
      return;
    }

    return register({ username: email, password } as UserCredentialsDto)
      .then(() => {

        Cookies.set('username', email, { expires: 7, secure: false, sameSite: 'Strict' });

        setIsAuthenticated(true);

        fetchUserInfo(email)
          .then(userInfo => setUser(userInfo));

        setErrors([]);
        navigate('/home');
      })
      .catch(() => {
        addError(new Error('User with provided credentials already exists'));
      });

  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={2}
    >
      <Typography variant='h4' gutterBottom>
        Registration
      </Typography>
      {errors.length > 0 && <ErrorMessages />}
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          fullWidth
          variant='outlined'
          margin='dense'
          id='email'
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          variant='outlined'
          margin='dense'
          id='confirm-email'
          label='Confirm Email'
          type='email'
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          variant='outlined'
          margin='dense'
          id='password'
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          type='submit'
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;