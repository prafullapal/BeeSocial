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
  return user ? { isLoggedIn: true, user: user } : { isLoggedIn: false };
};

export { register, verifyEmail, isAuthenticated };
