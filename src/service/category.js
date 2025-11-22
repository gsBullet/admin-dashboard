import Axios from "./Axios";
// import axios from "axios";

export const addCategory = async (data) => {
  try {
    const response = await Axios.post("/category/add-category", {
      name: data.get("name"),
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
export const getAllCategory = async ({ page, limit }) => {
  try {
    const response = await Axios.get(
      `/category/all-category?page=${page}&limit=${limit}`
    );
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
export const fetchAllCategoryForProduct = async () => {
  try {
    const response = await Axios.get(
      `/category/all-category-for-product`
    );
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const updateCategory = async ({ formData, id }) => {
  try {
    const response = await Axios.post(`/category/update-category/${id}`, {
      name: formData.get("name"),
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updateCategoryStatus = async ({ data, id }) => {
  try {
    const response = await Axios.post(
      `/category/update-category-status/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id) => {
  const response = await Axios.get(`/category/delete-category/${id}`);
  return response.data;
};
