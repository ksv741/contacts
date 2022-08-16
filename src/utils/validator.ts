import {
  ErrorsReturnType,
  IValidator,
  ValidateParams,
  ValidateReturnType,
  ValidatorRules,
} from '../types/Validator';

class Validator implements IValidator{
  public validateOne({value, rules} : ValidateParams): ValidateReturnType {
    let result = true;

    let key: keyof ValidatorRules
    let errors: ErrorsReturnType = {}

    for (key in rules) {
      switch (key) {
        case 'required': {
          result = result && !!value;
          if (!value) errors.required = 'Не может быть пустым';
          break;
        }
        case 'max': {
          if (rules.max == null) throw new Error('Не передано max значение');
          const isValid = value.length <= rules.max
          result = result && isValid;
          if (!isValid) errors.max = 'Значение не может быть больше ' + rules.max + ' символов';
          break;
        }
        case 'min': {
          if (rules.min == null) throw new Error('Не передано min значение');
          const isValid = value.length >= rules.min;
          result = result && isValid;
          if (!isValid) errors.min = 'Значение не может быть меньше ' + rules.min + ' символов';
          break;
        }
        case 'testReg': {
          if (rules.testReg == null) throw new Error('Не передано testReg значение');
          const isValid = !!rules?.testReg?.test(value);
          result = result && isValid;
          if (!isValid) errors.testReg = 'Неправильное значение';
          break;
        }
        case 'toBe': {
          if (rules.toBe == null) throw new Error('Не передано toBe значение');
          const isValid = rules.toBe === value;
          result = result && isValid;
          if (!isValid) errors.toBe = 'Значение не совпадает';
          break;
        }
        default: break;
      }
    }

    return result ? result : errors;
  }

  public validateAll(results: ValidateParams[]): boolean {
    // TODO
    return !!results.length;
  }

  public validateResults(results: boolean[]): boolean {
    return results.reduce((res, cur) => res && cur, true);
  }

  public isValid(result: ValidateReturnType) {
    return result === true;
  }
}

export default new Validator();
