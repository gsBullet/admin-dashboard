import Axios from "./Axios";

export const getAllProduct = async ({ page, limit }) => {
  try {
    const response = await Axios.get(
      `/product/all-product?page=${page}&limit=${limit}`
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

export const addProduct = async (formData) => {
  try {
    const response = await Axios.post('/product/add-product', formData, {
      // Do NOT set Content-Type header - let axios set it automatically
      // with the correct boundary for multipart/form-data
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 second timeout for large files
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAllCategoryForProduct = async () => {
  try {
    const response = await Axios.get("/category/all-category-for-product");
    if (response.data.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
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
