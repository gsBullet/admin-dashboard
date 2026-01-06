import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  cancelOrdersByAdmin,
  completedOrdersByAdmin,
  getCompletedOrdersByAdmin,
} from "../../service/order";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LoadingBtn from "../UiElements/LoadingBtn";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Switch from "../../components/form/switch/Switch";
import Badge from "../../components/ui/badge/Badge";
import bdTimeFormat from "../../components/common/bdTimeFormat";

import ShowOrderModal from "../../components/orderModal/ShowOrderModal";
import EditPendingOrder from "./EditPendingOrder";
import SweetAlert from "../../components/common/SweetAlert";
import Swal from "sweetalert2";

const CompleteOrders = () => {
  const { auth } = useContext(AuthContext);
  const [penOrders, setPenOrders] = useState([]);
  const [showNoData, setShowNoData] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(false);

  // const [searchTerm, setSearchTerm] = useState("");

  // const [isOpen, setIsOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  // console.log(auth);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      setShowNoData(false);
      try {
        const response = await getCompletedOrdersByAdmin(auth.token);
        if (response.success) {
          setPenOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      } finally {
        setShowNoData(true);
      }
    };

    fetchPendingOrders();
  }, [auth.checkAuth]);

  const handleShowOrder = (order) => {
    setIsPendingOpen(true);
    setOrderDetails(order);
  };
  const handleEditOrder = (order) => {
    // Implement the logic to confirm the order
    console.log("Confirm order:", order);
    setIsEditOpen(true);
    setOrderDetails(order);
  };
  const handleConfirmOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Make a Order Action",
      icon: "question",

      showCloseButton: true, // ❌ close icon
      closeButtonAriaLabel: "Close",

      showDenyButton: true,
      showCancelButton: false,

      confirmButtonText: "Confirm Order",
      denyButtonText: "Cancel Order",

      confirmButtonColor: "#16a34a",
      denyButtonColor: "#dc2626",

      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (result.isConfirmed) {
      // ✅ CONFIRM ORDER
      await completedOrdersByAdmin(orderId, auth.token);
      SweetAlert({
        type: "toast",
        icon: "success",
        title: "Order Confirmed",
      });
    }

    if (result.isDenied) {
      // ❌ CANCEL ORDER
      await cancelOrdersByAdmin(orderId, auth.token);
      SweetAlert({
        type: "toast",
        icon: "success",
        title: "Order Cancelled",
      });
    }
  };

  return (
    <div>
      <PageMeta
        title="Pending Orders"
        description="Pending all Orders of our website"
      />
      <PageBreadcrumb pageTitle="Pending Orders" />
      <div className="space-y-6">
        <ComponentCard title="Product Categories">
          <div className="flex justify-end items-center">
            <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                // onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <select
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                name="category"
                id="category"
                // onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {category?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div> */}
            {/* <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <select
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                name="available"
                id="available"
                onChange={(e) => setAvailable(e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div> */}
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              {penOrders.length === 0 ? (
                <div className="flex justify-center items-center my-10">
                  {!showNoData ? (
                    <LoadingBtn />
                  ) : (
                    <p className="text-gray-500 text-lg">No data found</p>
                  )}
                </div>
              ) : (
                <Table className={""}>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-800 dark:border-white/90   ">
                    <TableRow className={"text-center"}>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Transaction ID
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Payment Method
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Phone Number
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Payment Amount
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Total Amount
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Address
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Order Date
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/50">
                    {penOrders?.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.trxId}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.paymentMethod}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.phone}
                          </span>
                        </TableCell>

                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            ${order.payAmount}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          ${order.totalAmount}
                        </TableCell>

                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {order.address}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {bdTimeFormat(order.createdAt)}
                        </TableCell>
                        {/* badge cell  */}
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                          <Badge
                            size="sm"
                            color={
                              order.status === "confirmed" ? "primary" : "error"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        {/* action cells */}
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleShowOrder(order)}
                              className="text-green-600  hover:bg-green-600 rounded dark:text-green-400 px-1 py-1"
                            >
                              <i
                                className="fa fa-book-open  text-xl hover:text-white"
                                aria-hidden="true"
                                title="view order"
                              ></i>
                            </button>
                            <button
                              onClick={() => handleEditOrder(order)}
                              disabled={order.status === false}
                              className={`text-blue-600   dark:text-blue-400 px-1 py-1${
                                order.status === false
                                  ? " cursor-not-allowed opacity-30 "
                                  : " hover:text-white hover:bg-blue-600 rounded"
                              }`}
                            >
                              <i
                                className="fa fa-edit text-xl "
                                aria-hidden="true"
                                title="edit order"
                              ></i>
                            </button>
                            <button
                              disabled={order.status === true}
                              onClick={() => handleConfirmOrder(order._id)}
                              className={`text-orange-600   px-1 py-1 ${
                                order.status === true
                                  ? " cursor-not-allowed opacity-30 "
                                  : " hover:text-white hover:bg-orange-600 rounded"
                              }`}
                            >
                              <i
                                class="fas fa-bolt text-xl px-1"
                                aria-hidden="true"
                                title="confirm order"
                              ></i>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
          <div>
            {/* <TablePagination
              totalItems={totalProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={limit}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            /> */}
          </div>
        </ComponentCard>
      </div>

      {/* show order modal */}
      <ShowOrderModal
        isEditOpen={isPendingOpen}
        setIsEditOpen={setIsPendingOpen}
        orderInfo={orderDetails}
      />
      <EditPendingOrder
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        orderInfo={orderDetails}
      />
    </div>
  );
};

export default CompleteOrders;
