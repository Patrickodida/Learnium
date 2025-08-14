import api from "./api";

export async function register(name, email, password) {
  const { data } = await api.post("/api/auth/register", { name, email, password });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post("/api/auth/login", { email, password });
  // returns { token, user }
  return data;
}

export async function getUserById(id) {
  const { data } = await api.get(`/api/auth/user/${id}`);
  return data;
}
