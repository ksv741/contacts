export type ValidatorRules = {
  required?: boolean;
  max?: number;
  min?: number;
  testReg?: RegExp;
  toBe?: string;
};
export type ValidateParams = { value: string, rules: ValidatorRules };
export type ErrorsReturnType = { [key in keyof ValidatorRules]: string };
export type ValidateReturnType = true | ErrorsReturnType;

export interface IValidator {
  validateOne: (param: ValidateParams) => ValidateReturnType;
  validateAll: (param: ValidateParams[]) => boolean;
  validateResults: (param: boolean[]) => boolean;
  isValid: (result: ValidateReturnType) => boolean;
}
