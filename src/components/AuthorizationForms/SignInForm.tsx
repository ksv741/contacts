import { Button } from '@mui/material';
import React, { useState } from 'react';
import useValidate from '../../hooks/useValidate';
import { emailRegExp } from '../../utils/constants';
import ValidateInput, { ValidateInputState } from '../ValidateInput';

const SignInForm:React.FC = () => {
  const [email, setEmail] = useState<ValidateInputState>({
    label: 'Почта',
    helperText: 'Введите адрес почты',
    value: '',
    touched: false,
    valid: true,
    error: false,
    errorText: '',
    type: 'text'
  });
  const [password, setPassword] = useState<ValidateInputState>({
    label: 'Пароль',
    helperText: 'Введите пароль',
    type: 'password',
    value: '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
  });
  const isFormValid = useValidate(email.valid, password.valid);

  function signInHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;
  }

  return (
    <form onSubmit={signInHandler}>
      <ValidateInput validateItem={email} validateRules={{required: true, testReg: emailRegExp}} changeItem={setEmail}/>
      <ValidateInput validateItem={password} validateRules={{required: true, min: 3, max: 10 }} changeItem={setPassword}/>

      <Button variant="outlined" disabled={!isFormValid} type='submit'>Войти</Button>
    </form>
  );
};

interface SignInSubtitleProps {
  onClick: (e: React.MouseEvent) => void;
}

export const SignInSubtitle: React.FC<SignInSubtitleProps> = ({onClick}) => {
  return (
    <>
      Если у Вас еще нет аккаунта <Button onClick={onClick}>зарегистрируйтесь</Button>
    </>
  );
};

export default SignInForm;
