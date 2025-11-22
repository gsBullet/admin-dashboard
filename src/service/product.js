import Axios from "./Axios";


export const getAllProducts = async ({
  page,
  limit,
  search,
  category,
  available,
  sort,
  order,
}) => {
  try {
    const response = await Axios.get(
      `/product/all-products?page=${page}&limit=${limit}&search=${search}&category=${category}&available=${available}&sort=${sort}&order=${order}`
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

export const addProduct = async (formData) => {
  try {
    const response = await Axios.post("/product/add-product", formData, {
      // Do NOT set Content-Type header - let axios set it automatically
      // with the correct boundary for multipart/form-data
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000, // 60 second timeout for large files
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await Axios.get("/products", { params });
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await Axios.get(`/products/${id}`);
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await Axios.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const updateProductStatus = async (id, data) => {
  try {
    const response = await Axios.post(`/product/update-product-status/${id}`, data);
    if (response.data.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await Axios.delete(`/products/${id}`);
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
