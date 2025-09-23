import { HttpClient } from "./http-client.js";

// const API_URL = `http://localhost:3001/api/v1`;

const Client = new HttpClient(`/api/v1`, {
  "Content-Type": "application/json",
});

/* Switched to HttpOnly Cookie instead of Local Storage. */

export const Api = {
  register: async (credentials) => Client.post(`/users`, credentials),
  login: async (credentials) => Client.post(`/users/me`, credentials),

  // Logged in users.
  logout: async () => Client.delete(`/users/me`),

  getCurrentUser: async () => Client.get(`/users/me`),
  getAllUsers: async () => Client.get(`/users`), // ADMIN role only.

  generateSomeJwt: async () => Client.get(`/jwts`),

  getMyNotes: async () => Client.get(`/notes`),
  addNote: async (note) => Client.post(`/notes`, note),
};
