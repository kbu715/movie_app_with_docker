import axios from "axios";
import { REGISTER_USER, LOGIN_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  //node로 정보 보내기
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then(response => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  //node로 정보 보내기
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then(response => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: REGISTER_USER,
    payload: request,
  };
}

//get메소드는 body부분이 필요없다.
export function auth() {
  //node로 정보 보내기
  const request = axios.get("/api/users/auth").then(response => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: AUTH_USER,
    payload: request,
  };
}
