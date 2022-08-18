import { useEffect, useState } from 'react';
import { ValidateInputState } from '../components/UI/ValidateInput';
import validator from '../utils/validator';

export const UseValidate = (...params: ValidateInputState[]) => {
  const [isFormValid, setIsFormValid] = useState(false);
  function check() {
    return params.reduce((res, {value, rules}) => {
      return rules
        ? res && typeof validator.validateOne({value, rules}) === 'boolean'
        : res;
    }, true)
  }

  useEffect(() => {
    setIsFormValid(check())
  }, []);

  useEffect(() => {
    setIsFormValid(check())
  }, [params]);

  return isFormValid
};

export default UseValidate;
