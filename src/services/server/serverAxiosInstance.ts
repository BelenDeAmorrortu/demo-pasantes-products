import axios from "axios";

const JSON_SERVER_PORT = 4000;
const JSON_SERVER_BASE_URL = `http://localhost:${JSON_SERVER_PORT}`;

export const jsonServerClient = axios.create({
  baseURL: JSON_SERVER_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
