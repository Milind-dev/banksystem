import axiosInstance from "../Instances.jsx";

import { GET_LOGIN, GET_REGISTERED_USERS } from "./ApiEndPoint.jsx";

export function LoginUser(postData) {
  return axiosInstance.post(GET_LOGIN, postData);
}

export function RegisterUser(postData) {
  return axiosInstance.post(GET_REGISTERED_USERS, postData);
}