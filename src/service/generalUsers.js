import Axios from "./Axios";

export const getAllGeneralUsers = async () => {
  const response = await Axios.get("/user/get-all-general-users");
  return response.data;
};
