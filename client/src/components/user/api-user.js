import axios from "axios";

const list = async (signal) => {
  try {
    let response = await axios.get("/api/users/list", { signal: signal });
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const read = async (params, signal) => {
  try {
    let response = await axios.get("/api/users/" + params.userId, {
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const update = async (params, user) => {
  try {
    let response = await axios.put("/api/users/" + params.userId, user, {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return await response.data;
  } catch (err) {
    return { error: err };
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
    return { error: err };
  }
};

const follow = async (followId) => {
  try {
    console.log("FollowId::", followId);
    let response = await axios.put(
      "/api/users/follow",
      { followId },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const unfollow = async (unfollowId) => {
  try {
    let response = await axios.put(
      "/api/users/unfollow",
      { unfollowId },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const findPeople = async (params, signal) => {
  try {
    let response = await axios.get("/api/users/findPeople/" + params.userId, {
      signal: signal,
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

export { list, read, update, remove, follow, unfollow, findPeople };
