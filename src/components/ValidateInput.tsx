import { TextField } from '@mui/material';
import React, { Dispatch } from 'react';
import { ValidatorRules } from '../types/Validator';
import validator from '../utils/validator';


export interface ValidateInputState {
  label: string;
  value: string;
  touched: boolean;
  valid: boolean;
  error: boolean;
  errorText: string;
  helperText: string;
  type: 'text' | 'password';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface ValidateInputProps {
  validateItem: ValidateInputState;
  validateRules: ValidatorRules;
  changeItem: Dispatch<React.SetStateAction<ValidateInputState>>
  disabled?: boolean;
}
const ValidateInput: React.FC<ValidateInputProps> = ({validateItem, validateRules, changeItem, disabled}) => {
  const {helperText, errorText, error, valid, touched, label, type, color, value} = validateItem;

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const validatedResult = validator.validateOne({value, rules: validateRules});

    changeItem({
      ...validateItem,
      value,
      touched: true,
      error: typeof validatedResult === 'object',
      errorText: typeof validatedResult === 'object' ? Object.values(validatedResult)[0] : '',
      valid: !!value && touched && validator.isValid(validatedResult),
    })
  }

  return (
    <TextField
      helperText={error ? errorText : helperText}
      id={`${label}-helper-text`}
      label={label}
      color={valid ? 'success' : color || 'primary'}
      onChange={inputChangeHandler}
      error={touched && error}
      type={type}
      value={value}
      inputProps={{
        autoComplete: 'new-password',
      }}
      disabled={disabled}
    />
  );
};

export default ValidateInput;
