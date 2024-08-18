import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { logout } from '../service/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { addError } = useContext(TaskContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);

        Cookies.remove('accessToken');
        Cookies.remove('username');
        navigate('/login');
      })
      .catch((error) => addError(error));
  };

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography
          variant='h6'
          component={Link}
          to='/home'
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Timeboxing App
        </Typography>
        <Box display='flex' alignItems='center'>
          <Button color='inherit' component={Link} to='/home'>
            Home
          </Button>
          {!isAuthenticated && (
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          )}
          {!isAuthenticated && (
            <Button color='inherit' component={Link} to='/registration'>
              Registration
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;