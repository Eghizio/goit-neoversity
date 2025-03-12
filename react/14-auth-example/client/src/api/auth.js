import {
  clearAuthHeader,
  client,
  fakeClient,
  retrieveAuthHeader,
  setAuthHeader,
} from "./http-client";

const exampleCurrentUser = {
  userId: "12345",
  username: "Kuba",
};

const exampleAuthResponse = {
  ...exampleCurrentUser,
  token: "JWT-TOKEN",
};

const usingFake = false;

const FakeAuthApi = {
  register: async ({ email, password }) =>
    fakeClient.request(exampleAuthResponse),
  login: async ({ email, password }) => fakeClient.request(exampleAuthResponse),
  logout: async () => ({ ok: true }),
  getCurrentUser: async () => fakeClient.request(exampleCurrentUser),
};

export const AuthApi = usingFake
  ? FakeAuthApi
  : {
      register: async ({ email, password }) => {
        const res = await client.post(`/users`, { email, password });

        setAuthHeader(res.data.token);

        if (res.status < 400) return res.data;
      },
      login: async ({ email, password }) => {
        const res = await client.post(`/users/sessions`, { email, password });

        setAuthHeader(res.data.token);

        if (res.status < 400) return res.data;
      },
      logout: async () => {
        const res = await client.delete(`/users/sessions/`);

        clearAuthHeader();

        return res.data;
      },
      getCurrentUser: async () => {
        retrieveAuthHeader();

        const res = await client.get(`/users/sessions`);

        if (res.status < 400) {
          console.log("current user");
          return res.data;
        }
      },
    };
