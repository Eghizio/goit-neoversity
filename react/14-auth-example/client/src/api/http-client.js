import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 3_000,
  headers: { "Content-Type": "application/json" },
});

// Saving in LocalStorage only for demonstration purposes.
const LOCAL_STORAGE_KEY = "__TASKS_TOKEN";

export const setAuthHeader = (token) => {
  console.log("Setting auth header");
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const clearAuthHeader = () => {
  client.defaults.headers.common.Authorization = "";
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const retrieveAuthHeader = () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  console.log({ token });
  if (!token) return;
  setAuthHeader(token);
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeClient = {
  request: async (dataToReturn) => {
    await sleep(2_000);
    return dataToReturn;
  },
};
