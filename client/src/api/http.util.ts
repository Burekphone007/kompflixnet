import axios from "axios";
import React from "react";

export interface IUserRegRequst {
  username: string;
  name: string;
  birthDate: Date;
  password: string;
}

export const Post = (iUser: IUserRegRequst) => {
  let dateString: string = "1968-11-16T00:00:00";
  let newDate: Date = new Date(dateString);
  const testUser: IUserRegRequst = {
    username: "kolbasz",
    name: "pista",
    birthDate: newDate,
    password: "pista",
  };
  console.log(iUser);
  axios.post(`http://localhost:3000/user/registration`, iUser).then((res) => {
    console.log(res);
    console.log(res.data);
  });
};
