import Axios from "./Axios";

export const getAllGeneralUsers = async ({ token,limit,currentPage,searchTerm}) => {
  const response = await Axios.get(`/general-users/get-all-general-users?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
