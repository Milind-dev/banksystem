import axiosInstance from "../Instances.jsx";

import {
  GET_CHECK_SESSION_ADMIN,
  GET_LOGIN, GET_REGISTERED_USERS,
  POST_UPLOAD_PROFILE_PIC,
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
  const token = localStorage.getItem("token");
  return axiosInstance.post("api/auth/verify-otp", postData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include", // ⚡ attach session cookie
  });
}

export function UploadProfilePic(postData) {
  const token = localStorage.getItem("token ");
  return axiosInstance.post(POST_UPLOAD_PROFILE_PIC, postData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      // "Content-Type": "multipart/form-data",

    },
    withCredentials: true, // send session cookie
  });
}

export function CheckSessionAdmin(postData) {
  return axiosInstance.get(GET_CHECK_SESSION_ADMIN, postData);
}

export function RegisterUser(postData) {
  return axiosInstance.post(GET_REGISTERED_USERS, postData);
}