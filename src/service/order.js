import Axios from "./Axios";

export const pendingOrdersByAdmin = async (token) => {
  const response = await Axios.get("/orders/pending-orders", {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const EditPendingOrdersByAdmin = async (token, orderId) => {
  const response = await Axios.get(
    "/orders/edit-pending-orders",
    {
      orderId: orderId,
    },
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
}
export const completedOrdersByAdmin = async (token) => {
  const response = await Axios.get("/orders/completed-orders", {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const cancelOrdersByAdmin = async (token) => {
  const response = await Axios.get("/orders/cancel-orders", {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const deliveredOrdersByAdmin = async (token) => {
  const response = await Axios.get("/orders/delivered-orders", {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const orderDetailsByAdmin = async (token, orderId) => {
  const response = await Axios.get(
    "/orders/order-details",
    {
      orderId: orderId,
    },
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};

export const updateOrderStatusByAdmin = async ({token, orderId, status}) => {
  const response = await Axios.post(
    `/orders/update-order-status/${orderId}`,
    {
      status: status,
    },
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
