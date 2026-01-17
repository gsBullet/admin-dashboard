import Axios from "./Axios";

export const getAllPromos = async ({ token }) => {
  const response = await Axios.get(`/promos/get-all-promos`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const deletePromo = async ({ id, token }) => {
  const response = await Axios.get(`/promos/delete-promo/${id}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const createPromoByAdmin = async ({ data, token }) => {
  const response = await Axios.post(`/promos/create-promo`, data, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const getAllCategoryForDiscount = async ({ token }) => {
  try {
    const response = await Axios.get(`/category/all-category-for-discount`, {
      headers: {
        authorization: `EcomToken ${token}`,
      },
    });
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const getAllProductsForDiscount = async ({ token }) => {
  try {
    const response = await Axios.get(`/product/all-products-for-discount`, {
      headers: {
        authorization: `EcomToken ${token}`,
      },
    });
    if (response.data.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
export const getAllUsersForDiscount = async ({ token, customerSearch }) => {
  try {
    const response = await Axios.get(`/general-users/discount-for-users?customerSearch=${customerSearch}`, {
      headers: {
        authorization: `EcomToken ${token}`,
      },
    });
    if (response.data.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
