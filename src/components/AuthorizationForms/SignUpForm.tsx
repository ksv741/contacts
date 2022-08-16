import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useValidate from '../../hooks/useValidate';
import { signUpUser } from '../../store/reducers/auth';
import { emailRegExp } from '../../utils/constants';
import ValidateInput, { ValidateInputState } from '../ValidateInput';

const SignUpForm = () => {
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
  const [repeatedPassword, setRepeatedPassword] = useState<ValidateInputState>({
    label: 'Повторите пароль',
    helperText: 'Введите пароль',
    type: 'password',
    value: '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
  });

  const isFormValid = useValidate(email.valid, password.valid, repeatedPassword.valid);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  function signUpHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    dispatch(signUpUser({email: email.value, password: password.value}));
  }

  return (
    <form onSubmit={signUpHandler}>
      <ValidateInput
        validateItem={email}
        validateRules={{required: true, testReg: emailRegExp}}
        changeItem={setEmail}
        disabled={isLoading}
      />
      <ValidateInput
        validateItem={password}
        validateRules={{required: true, min: 3, max: 10 }}
        changeItem={setPassword}
        disabled={isLoading}
      />
      <ValidateInput
        validateItem={repeatedPassword}
        validateRules={{required: true, toBe: password.value }}
        changeItem={setRepeatedPassword}
        disabled={isLoading}
      />

      <LoadingButton type='submit'  loading={isLoading} variant="outlined" disabled={!isFormValid || isLoading}>
        Зарегистрироваться
      </LoadingButton>
    </form>
  );
};

interface SignUpSubtitleProps {
  onClick: (e: React.MouseEvent) => void;
}

export const SignUpSubtitle: React.FC<SignUpSubtitleProps> = ({onClick}) => {
  return (
    <>
      Если у Вас уже есть аккаунт вы можете <Button onClick={onClick}>войти</Button>
    </>
  );
};

export default SignUpForm;
