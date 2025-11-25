
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
