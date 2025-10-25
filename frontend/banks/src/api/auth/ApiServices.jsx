import axiosInstance from "../Instances.jsx";

import {
  GET_LOGIN, GET_REGISTERED_USERS,
  POST_VERIFY_OTP,
  // GET_VERIFY_OTP 
} from "./ApiEndPoint.jsx";

export function LoginUser(postData) {
  return axiosInstance.post(GET_LOGIN, postData);
}
// export function VerifyOtps(postData, config = {}) {
//   return axiosInstance.post(POST_VERIFY_OTP, postData, config);
// }

export function VerifyOtps(postData) {
  const token = localStorage.getItem("logintoken");
  return axiosInstance.post("api/auth/verify-otp", postData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
export function RegisterUser(postData) {
  return axiosInstance.post(GET_REGISTERED_USERS, postData);
}