import Axios from "./Axios";

export const addAvatarBanner = async (data) => {
  try {
    const response = await Axios.post(
      "/avatar/create-avatar",
      {
        title: data.get("title"),
        desc: data.get("desc"),
        avatar: data.get("avatar"),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `EcomToken ${data.get("token")}`,
        },
      }
    );

    return response.data || [];
  } catch (error) {
    return error;
  }
};

export const getAllAvatarBanner = async ({ page, limit, token }) => {
  try {
    const response = await Axios.get(
      `/avatar/get-all-avatars?page=${page}&limit=${limit}`,
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

export const updateAvatarBanner = async ({ formData, id, token }) => {
  try {
    const response = await Axios.post(
      `/avatar/update-avatar/${id}`,

      {
        title: formData.get("title"),
        desc: formData.get("desc"),
        avatar: formData.get("avatar"),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `EcomToken ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updateAvatarBannerStatus = async ({ status, id, token }) => {
  try {
    const response = await Axios.post(
      `/avatar-banner/update-avatar-banner-status/${id}`,
      status,
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

export const deleteAvatarBanner = async ({ id, token }) => {
  const response = await Axios.get(`/avatar/delete-avatar/${id}`, {
    headers: {
      authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
