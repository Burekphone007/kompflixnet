import axios, { AxiosResponse } from "axios";
import { IUserRegRequst, ILoginReq } from "./interfaces";

export const registrationPost = async (
  userRegistrationReq: IUserRegRequst
): Promise<Response> =>
  axios.post(`http://localhost:3000/user/registration`, userRegistrationReq);

export const loginPost = async (
  loginReq: ILoginReq
): Promise<AxiosResponse<{ access_token: string }>> =>
  axios.post(`http://localhost:3000/auth/login`, loginReq);
