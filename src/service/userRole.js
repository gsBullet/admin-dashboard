import Axios from "./Axios";
// import axios from "axios";

export const addUserRole = async (data, token) => {
  try {
    const response = await Axios.post(
      "/user-role/add-user-role",
      {
        userRole: data.get("userRole"),
      },
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      }
    );
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
export const getAllUserRoles = async (token) => {
  try {
    const response = await Axios.get("/user-role/get-all-user-roles", {
      headers: {
        authorization: `EcomToken ${token}`,
      },
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

export const updateUserRole = async (id, data, token) => {
  try {
    const response = await Axios.post(
      `/user-role/update-user-role/${id}`,
      {
        userRole: data.get("userRole"),
      },
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      }
    );
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
export const updateUserRoleStatus = async ({ id, status, token }) => {
  try {
    const response = await Axios.post(
      `/user-role/update-user-role-status/${id}`,
      {
        status,
      },
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      }
    );
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const deleteUserRole = async ({ id, token }) => {
  try {
    const response = await Axios.get(`/user-role/delete-user-role/${id}`, {
      headers: {
        authorization: `EcomToken ${token}`,
      },
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
