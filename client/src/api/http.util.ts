import axios from "axios";
import React from "react";

export interface IUserRegRequst {
  username: string;
  name: string;
  birthDate: Date;
  gender: string;
  password: string;
}

export const Post = (userRegistrationReq: IUserRegRequst) => {
  axios
    .post(`http://localhost:3000/user/registration`, userRegistrationReq)
    .then((res) => {
      console.log(res);
    });
};
