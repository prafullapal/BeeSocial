import axios from "axios";

const signin = async (user) => {
  try {
    let response = await axios.post("/auth/signin", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const signout = async () => {
  try {
    let response = await axios.get("/auth/signout");
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };
