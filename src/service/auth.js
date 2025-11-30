import Axios from "./Axios";

export const singinUser = async (data) => {
  try {
    const response = await Axios.post("/auth/sign-in", {
      email: data.get("email"),
      password: data.get("password"),
    });
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
export const checkUserAuth = async (token) => {
  try {
    const response = await Axios.get("/auth/check-auth", {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    });
    console.log(response);

    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
