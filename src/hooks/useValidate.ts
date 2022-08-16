import { useEffect, useState } from 'react';
import validator from '../utils/validator';

const UseValidate = (...params: boolean[]) => {
  const [isFormValid, setIsFormValid] = useState(validator.validateResults(params));
  useEffect(() => {
    setIsFormValid(validator.validateResults(params));
  }, [params]);

  return isFormValid
};

export default UseValidate;
