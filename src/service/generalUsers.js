import Axios from "./Axios";

export const getAllGeneralUsers = async ({
  token,
  limit,
  currentPage,
  searchTerm,
}) => {
  const response = await Axios.get(
    `/general-users/get-all-general-users?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const getAllVerifyUsers = async ({
  token,
  limit,
  currentPage,
  searchTerm,
}) => {
  const response = await Axios.get(
    `/general-users/get-all-verify-users?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const getAllStarUsers = async ({
  token,
  limit,
  currentPage,
  searchTerm,
}) => {
  const response = await Axios.get(
    `/general-users/get-all-star-users?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const getAllBlockUsers = async ({
  token,
  limit,
  currentPage,
  searchTerm,
}) => {
  const response = await Axios.get(
    `/general-users/get-all-block-users?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const getAllPaymentOrdersByUser = async ({
  userId,
  token,
  limit,
  currentPage,
  searchTerm,
  activeTab,
}) => {
  const response = await Axios.get(
    `/general-users/get-all-payment-order-by-user/${userId}?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}&activeTab=${activeTab}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const changeGeneralUserStatusByPending = async ({ token, userId,status,isVerified }) => {
  const response = await Axios.get(
    `/general-users/change-general-user-status-by-pending/${userId}/${status}/${isVerified}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
