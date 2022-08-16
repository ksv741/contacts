import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useValidate from '../../hooks/useValidate';
import { signInUser } from '../../store/reducers/auth';
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
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  function signInHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    dispatch(signInUser({email: email.value, password: password.value}));
  }

  return (
    <form onSubmit={signInHandler}>
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

      <LoadingButton type='submit' loading={isLoading} variant="outlined" disabled={!isFormValid || isLoading}>
        Войти
      </LoadingButton>

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
