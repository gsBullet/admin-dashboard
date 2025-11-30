import Axios from "./Axios";
// import axios from "axios";

export const addCategory = async (data) => {
  try {
    const response = await Axios.post(
      "/category/add-category",
      {
        name: data.get("name"),
      },
      {
        headers: {
          authorization: `EcomToken ${data.get("token")}`,
        },
      }
    );

    return response.data || [];
  } catch (error) {
    return error;
  }
};

// export const getAllCategory = async ({ page, limit }) => {
//   try {
//     const response = await Axios.get(
//       `/category/all-category?page=${page}&limit=${limit}`,
//       {
//         headers: {
//           authorization: `EcomToken ${token}`,
//         },
//       }
//     );
//     if (response.data.data) {
//       return response.data.data;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     return error;
//   }
// };
export const fetchAllCategoryForProduct = async ({token}) => {
  try {
    const response = await Axios.get(`/category/all-category-for-product`, {
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

export const updateCategory = async ({ formData, id, token }) => {
  try {
    const response = await Axios.post(
      `/category/update-category/${id}`,
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      },
      {
        name: formData.get("name"),
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
// export const updateCategoryStatus = async ({ data, id }) => {
//   try {
//     const response = await Axios.post(
//       `/category/update-category-status/${id}`,
//       {
//         headers: {
//           authorization: `EcomToken ${token}`,
//         },
//       },
//       data
//     );
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

export const deleteCategory = async ({ id, token }) => {
  const response = await Axios.get(`/category/delete-category/${id}`, {
    headers: {
      authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
