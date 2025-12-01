import Axios from "./Axios";
// import axios from "axios";

export const addUser = async (data, token) => {
  try {
    const response = await Axios.post(
      "/user/add-user",
      {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone"),
        userRole: data.get("userRole"),
        password: data.get("password"),
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
export const getAllUsers = async (token) => {
  try {
    const response = await Axios.get("/user/get-all-users", {
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

export const updateUser = async ({ id, data, token }) => {
  console.log(id, token);
  
  try {
    const response = await Axios.post(
      `/user/update-user/${id}`,
      {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone"),
        userRole: data.get("userRole"),
        password: data.get("password"),
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
export const updateUserStatus = async ({ id, status, token }) => {
  try {
    const response = await Axios.post(
      `/user/update-user-status/${id}`,
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

export const deleteUser = async ({ id, token }) => {
  try {
    const response = await Axios.get(`/user/delete-user/${id}`, {
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
