import axios from "axios";
import {
  ResponseExceptionErrorFormat,
  IUserRegErrResponse,
  IUserRegRequst,
} from "./interfaces";

export const setRegErrResponse = (
  key: keyof IUserRegErrResponse,
  message: string,
  object: IUserRegErrResponse
): IUserRegErrResponse => {
  object[key].errMessage = message;
  object[key].isInCorrect = true;
  return object;
};
export const mapResponse = async (
  errorMessages: ResponseExceptionErrorFormat[]
): Promise<IUserRegErrResponse> => {
  let resultObject: IUserRegErrResponse = {
    username: { isInCorrect: false, errMessage: "" },
    name: { isInCorrect: false, errMessage: "" },
    password: { isInCorrect: false, errMessage: "" },
    birthDate: { isInCorrect: false, errMessage: "" },
    gender: { isInCorrect: false, errMessage: "" },
    confirmPassword: { isInCorrect: false, errMessage: "" },
  };
  errorMessages.forEach((element) => {
    resultObject = setRegErrResponse(
      element.fieldName as keyof IUserRegErrResponse,
      element.message,
      resultObject
    );
  });

  return resultObject;
};

export const Post = async (
  userRegistrationReq: IUserRegRequst
): Promise<IUserRegErrResponse> => {
  const res = await axios
    .post(`http://localhost:3000/user/registration`, userRegistrationReq)
    .catch((error) => {
      return error.response.data.message;
    });
  if (res.ok) {
    return mapResponse(res);
  } else {
    return mapResponse(res);
  }
};
