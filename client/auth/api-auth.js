import axios from "axios";

const register = async (user) => {
  try {
    let response = await axios.post("/api/auth/register", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const login = async (user) => {
  try {
    let response = await axios.post("/api/auth/login", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const logout = async () => {
  try {
    let response = await axios.get("/api/auth/logout");
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const verifyEmail = async (userToken) => {
  try {
    let response = await axios.post("/api/auth/verify-email", userToken, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const isAuthenticated = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user !== null ? user : false;
};

export { register, login, logout, verifyEmail, isAuthenticated };
