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
export const returnOrdersByAdmin = async ({
  token,
  limit,
  currentPage,
  searchTerm,
  paymentMethod,
  dateByOrders,
}) => {
  const response = await Axios.get(
    `/orders/return-orders?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}&paymentMethod=${paymentMethod}&dateByOrders=${dateByOrders}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const returnOrdersByAdminByDate = async ({ token }) => {
  const response = await Axios.get(`/orders/return-orders-by-date`, {
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
export const getCompletedOrdersByAdminByDate = async ({ token }) => {
  const response = await Axios.get(`/orders/get-completed-orders-by-date`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};

export const completedOrdersFromPending = async (orderId, token) => {
  const response = await Axios.get(`/orders/completed-orders/${orderId}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const deliveredOrdersFromCompleted = async (orderId, token) => {
  const response = await Axios.get(
    `/orders/delevered-orders-from-completed/${orderId}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const cancelOrdersByAdmin = async ({
  token,
  searchTerm,
  limit,
  currentPage,
  paymentMethod,
  dateByOrders,
}) => {
  const response = await Axios.get(
    `/orders/cancelled-orders?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}&paymentMethod=${paymentMethod}&dateByOrders=${dateByOrders}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const cancelOrdersByAdminByDate = async ({ token }) => {
  const response = await Axios.get(`/orders/cancelled-orders-by-date`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const deliveredOrdersByAdmin = async ({
  token,
  searchTerm,
  limit,
  currentPage,
  paymentMethod,
  dateByOrders,
}) => {
  const response = await Axios.get(
    `/orders/delivered-orders?limit=${limit}&currentPage=${currentPage}&searchTerm=${searchTerm}&paymentMethod=${paymentMethod}&dateByOrders=${dateByOrders}`,
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
export const deliveredOrdersByAdminByDate = async ({ token }) => {
  const response = await Axios.get("/orders/delivered-orders-by-date", {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
export const deleteOrderByAdmin = async ({ token, orderId }) => {
  const response = await Axios.get(`/orders/delete-order-by-admin/${orderId}`, {
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
