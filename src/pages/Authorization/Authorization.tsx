import { Typography } from '@mui/material';
import React, { useState } from 'react';
import SignInForm, { SignInSubtitle } from '../../components/AuthorizationForms/SignInForm';
import SignUpForm, { SignUpSubtitle } from '../../components/AuthorizationForms/SignUpForm';
import './Authorization.scss';

const Authorization: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  function toggleSignUp() {
    setIsSignUp(prev => !prev)
  }

  return (
    <div className={'Authorization'}>
      <Typography variant="h3" component="h3" sx={{mb: 4}} color='#3f51b5'>{isSignUp ? 'Регистрация' : 'Вход'}</Typography>

      {isSignUp ? <SignUpForm/> : <SignInForm/>}

      <Typography variant='subtitle2' component='div' sx={{mt: 1}}>
        {isSignUp ? <SignUpSubtitle onClick={toggleSignUp}/> : <SignInSubtitle onClick={toggleSignUp}/>}
      </Typography>
    </div>
  );
};

export default Authorization;
