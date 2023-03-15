import axios from "axios";

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

export { photo };
