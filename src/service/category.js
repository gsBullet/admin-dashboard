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
export const getAllCategory = async () => {
  try {
    const response = await Axios.get("/api/category/all-category");
    if (response.data.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const updateCategory = async (data, id) => {
  const response = await Axios.post(
    `/api/category/update-category/${id}`,
    data
  );
  return response;
};
export const updateCategoryStatus = async (data, id) => {
  const response = await Axios.post(
    `/api/category/update-category-status/${id}`,
    data
  );
  return response;
};

export const deleteCategory = async (id) => {
  const response = await Axios.get(`/api/category/delete-category/${id}`);
  return response;
};
