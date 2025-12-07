import Axios from "./Axios";

export const addHeroBanner = async (data) => {
  try {
    const response = await Axios.post(
      "/hero/create-hero-banner",
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

export const getAllHeroBanner = async ({ page, limit,token }) => {
  try {
    const response = await Axios.get(
      `/hero-banner/all-hero-banner?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      }
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

export const updateHeroBanner = async ({ formData, id, token }) => {
  try {
    const response = await Axios.post(
      `/hero/update-hero-banner/${id}`,
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
export const updateHeroBannerStatus = async ({ data, id, token }) => {
  try {
    const response = await Axios.post(
      `/hero-banner/update-hero-banner-status/${id}`,
      data,
      {
        headers: {
          authorization: `EcomToken ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteHeroBanner = async ({ id, token }) => {
  const response = await Axios.get(`/hero/delete-hero-banner/${id}`, {
    headers: {
      authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
