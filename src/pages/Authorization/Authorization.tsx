import { Alert, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SignInForm, { SignInSubtitle } from '../../components/AuthorizationForms/SignInForm';
import SignUpForm, { SignUpSubtitle } from '../../components/AuthorizationForms/SignUpForm';
import './Authorization.scss';
import { useAppSelector } from '../../hooks/redux';

const Authorization: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isShownError, setIsShownError] = useState(false);
  const {error} = useAppSelector(state => state.auth)

  function toggleSignUp() {
    setIsSignUp(prev => !prev)
  }

  function closeAlertHandler() {
    setIsShownError(false)
  }

  useEffect(() => {
    setIsShownError(true);
  }, [error])

  return (
    <div className={'Authorization'}>
      <Typography variant="h3" component="h3" sx={{mb: 4}} color='#3f51b5'>{isSignUp ? 'Регистрация' : 'Вход'}</Typography>

      {isSignUp ? <SignUpForm/> : <SignInForm/>}

      <Typography variant='subtitle2' component='div' sx={{mt: 1}}>
        {isSignUp ? <SignUpSubtitle onClick={toggleSignUp}/> : <SignInSubtitle onClick={toggleSignUp}/>}
      </Typography>

      {!!error && (
        <Snackbar open={isShownError} autoHideDuration={3000} onClose={closeAlertHandler}>
          <Alert severity="error" onClose={closeAlertHandler} >{error}</Alert>
        </Snackbar>
        )}

    </div>
  );
};

export default Authorization;
