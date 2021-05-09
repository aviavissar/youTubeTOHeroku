import axios1 from "axios";
let axios = axios1.default;

export const login = async (email, password) => {
  try {
    console.log(email + "," + password);
    const response = await axios.post(
      "/users/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      if (response.data === 400) {
        return new Error("Unable to find your mail please sign in");
      } else if (response.data === 401) {
        return new Error("wrong password try again");
      }

      return response;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const logout = async (userToken) => {
  try {
    const response = await axios.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" client error" + error);
  }
};

export const createUser = async (email, password, fname, lname) => {
  try {
    const response = await axios({
      method: "post",
      url: "/users",
      headers: {},
      data: {
        fname,
        lname,
        email,
        password,
      },
    }).catch((e) => {
      console.log("error", e.response);
      if (e.response.data.code === 11000) {
        throw new Error("this email already exist");
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profile, userToken) => {
  const { password, fname = "my defaultName", lname } = profile;
  try {
    console.log("response", profile);
    const response = await axios({
      method: "patch",
      url: "/users/me",
      data: {
        fname,
        lname,
        password,
      },
      headers: {
        Authorization: userToken,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(" client error");
  }
};

/****catagories */
export const getCatagories = async (userToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "/catagories",
      headers: {
        Authorization: userToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (userToken, category) => {
  try {
    const response = await axios({
      method: "post",
      url: "/catagories",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: userToken,
      },
      data: category,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateCategory = async (editCat, userToken) => {
  const { _id, cat_name, videos } = editCat;
  try {
    console.log("response", editCat);
    const response = await axios({
      method: "patch",
      url: `/catagories/${_id}`,
      data: {
        cat_name,
        videos,
      },
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(" claint error");
  }
};

export const deleteCategory = async (userToken, id) => {
  try {
    await axios.delete(`/catagories/${id}`, {
      headers: {
        Authorization: userToken,
      },
    });
  } catch (error) {
    console.error(" exios claint error" + error);
  }
};

export const createList = async (userToken, catagories) => {
  try {
    const response = await axios({
      method: "post",
      url: "/catagories/list",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: userToken,
      },
      data: catagories,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
