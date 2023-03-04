import axios from "axios";

const listNewsFeed = async (params) => {
  try {
    let response = await axios.get("/api/posts/feed/" + params.userId, {
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

const listByUser = async (params) => {
  try {
    let response = await axios.get("/api/posts/by/" + params.userId, {
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

const create = async (params, payload) => {
  try {
    let response = await axios.post(
      "/api/posts/new/" + params.userId,
      payload,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const photo = async (params) => {
  try {
    let response = await axios.get("/api/posts/photo" + params.postId, {
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

const postById = async (params) => {
  try {
    let response = await axios.get("/api/posts/" + params.postId, {
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

const remove = async (params) => {
  try {
    let response = await axios.delete("/api/posts/" + params.postId, {
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

const like = async (params) => {
  try {
    let response = await axios.get("/api/posts/like/" + params.postId, {
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

const unlike = async (params) => {
  try {
    let response = await axios.get("/api/posts/unlike/" + params.postId, {
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

const comment = async (params, payload) => {
  try {
    let response = await axios.put(
      "/api/posts/comment/" + params.postId,
      payload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

const uncomment = async (params, payload) => {
  try {
    let response = await axios.put(
      "/api/posts/uncomment/" + params.postId,
      payload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.data;
  } catch (err) {
    return { error: err };
  }
};

export {
  listNewsFeed,
  listByUser,
  create,
  photo,
  postById,
  remove,
  like,
  unlike,
  comment,
  uncomment,
};
