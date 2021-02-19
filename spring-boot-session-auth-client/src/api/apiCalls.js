import axios from "axios";
import { STATUS_OK } from "./constants";

export async function register(formData) {
  var success = false;

  await axios({
    url: "/users",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.status === STATUS_OK) {
        success = true;
      } else {
        throw new Error("Username taken!");
      }
    })
    .catch(() => {});

  return success;
}

export async function login(formData) {
  var success = false;

  var bodyFormData = new FormData();

  bodyFormData.append("username", formData.username);
  bodyFormData.append("password", formData.password);

  await axios({
    url: "/login",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  })
    .then((response) => {
      if (response.status === STATUS_OK) {
        success = true;
      } else {
        throw new Error("Incorrect credentials!");
      }
    })
    .catch(() => {});

  return success;
}

export async function logout() {
  await axios({
    url: "/logout",
    method: "POST",
  });
}

export async function getUserData(username) {
  var responseData = {
    success: false,
    data: undefined,
  };

  await axios({
    url: "/users/" + username,
    method: "GET",
  })
    .then((response) => {
      if (response.status === STATUS_OK) {
        responseData = {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error("Invalid request!");
      }
    })
    .catch(() => {});

  return responseData;
}
