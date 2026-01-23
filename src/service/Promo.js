import Axios from "./Axios";

export const getAllPromos = async ({ token, limit, page, search }) => {
  const response = await Axios.get(
    `/promo-codes/get-all-promo-codes?limit=${limit}&page=${page}&search=${search}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    },
  );
  return response.data;
};
export const changePromoStatus = async ({ token, id, isActive }) => {
  const response = await Axios.patch(
    `/promo-codes/change-promo-status/${id}`,
    { isActive },
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    },
  );
  return response.data;
};

export const deletePromo = async ({ id, token }) => {
  const response = await Axios.get(`/promo-codes/delete-promo-code/${id}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const createPromoByAdmin = async ({ data, token }) => {
  const response = await Axios.post(
    `/promo-code/add-promo-code-by-admin`,
    data,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    },
  );
  return response.data;
};
export const updatePromoByAdmin = async ({ id, data, token }) => {
  const response = await Axios.post(
    `/promo-code/update-promo-code-by-admin/${id}`,
    data,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    },
  );
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
    const response = await Axios.get(
      `/general-users/discount-for-users?customerSearch=${customerSearch}`,
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      },
    );
    if (response.data.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
