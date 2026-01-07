import Axios from "./Axios";

export const pendingOrdersByAdmin = async (
  token,
  limit,
  currentPage,
  searchTerm,
  paymentMethod,
  dateByOrders
) => {
  const response = await Axios.get(
    `/orders/pending-orders?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}&paymentMethod=${paymentMethod}&dateByOrders=${dateByOrders}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const pendingOrdersByAdminByDate = async (token) => {
  const response = await Axios.get(`/orders/pending-orders-by-date`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const getCompletedOrdersByAdmin = async ({
  token,
  searchTerm,
  limit,
  currentPage,
  paymentMethod,
  dateByOrders,
}) => {
  const response = await Axios.get(
    `/orders/get-completed-orders?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}&paymentMethod=${paymentMethod}&dateByOrders=${dateByOrders}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const getCompletedOrdersByAdminByDate = async ({
  token,
}) => {
  const response = await Axios.get(
    `/orders/get-completed-orders-by-date`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};

export const completedOrdersByAdmin = async (orderId, token) => {
  const response = await Axios.get(`/orders/completed-orders/${orderId}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const cancelOrdersByAdmin = async (orderId, token) => {
  const response = await Axios.get(`/orders/cancelling-orders/${orderId}`, {
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

export const updateOrderStatusByAdmin = async ({ token, orderId, status }) => {
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
