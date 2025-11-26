import Axios from "./Axios";
// import axios from "axios";

export const addUserRole = async (data) => {
  try {
    const response = await Axios.post("/user-role/add-user-role", {
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
export const getAllUserRoles = async () => {
  try {
    const response = await Axios.get("/user-role/get-all-user-roles");
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const updateUserRole = async (id, data) => {
  try {
    const response = await Axios.post(`/user-role/update-user-role/${id}`, {
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
export const updateUserRoleStatus = async ({id, status}) => {
  try {
    const response = await Axios.post(`/user-role/update-user-role-status/${id}`, {
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

export const deleteUserRole = async (id) => {
  try {
    const response = await Axios.get(`/user-role/delete-user-role/${id}`);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
