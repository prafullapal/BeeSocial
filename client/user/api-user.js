import axios from "axios";

const list = async (signal) => {
  try {
    let response = await axios.get("/api/users/list");
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, signal) => {
  try {
    let response = await axios.get("/api/users/" + params.userId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, user) => {
  try {
    let response = await axios.put("/api/users/" + params.userId, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params) => {
  try {
    let response = await axios.delete("/api/users/" + params.userId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

export { list, read, update, remove };
