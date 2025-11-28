import Axios from "./Axios";
// import axios from "axios";

export const addUser = async (data) => {
  try {
    const response = await Axios.post("/user/add-user", {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      userRole: data.get("userRole"),
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
export const getAllUsers = async () => {
  try {
    const response = await Axios.get("/user/get-all-users");
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await Axios.post(`/user/update-user/${id}`, {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      userRole: data.get("userRole"),
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
export const updateUseStatus = async ({id, status}) => {
  try {
    const response = await Axios.post(`/user/update-user-status/${id}`, {
      status
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

export const deleteUse = async (id) => {
  try {
    const response = await Axios.get(`/user/delete-user/${id}`);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
