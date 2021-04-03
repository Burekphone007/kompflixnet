export interface IUserRegRequst {
  username: string;
  name: string;
  birthDate: Date;
  gender: string;
  password: string;
  confirmPassword: string;
}

export interface ResponseExceptionErrorFormat {
  fieldName: string;
  message: string;
}
export interface IUserRegErrResponse {
  username: { isInCorrect: boolean; errMessage: string };
  name: { isInCorrect: boolean; errMessage: string };
  birthDate: { isInCorrect: boolean; errMessage: string };
  gender: { isInCorrect: boolean; errMessage: string };
  password: { isInCorrect: boolean; errMessage: string };
  confirmPassword: { isInCorrect: boolean; errMessage: string };
}
