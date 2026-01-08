import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  cancelOrdersByAdmin,
  deleteOrderByAdmin,
  deliveredOrdersByAdmin,
  deliveredOrdersByAdminByDate,
  deliveredOrdersFromCompleted,
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
import SweetAlert from "../../components/common/SweetAlert";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import Button from "../../components/ui/button/Button";
import TablePagination from "../Tables/TablePagination";
import "./css/order.css";

const DeleveredOrders = () => {
  const { auth } = useContext(AuthContext);
  const [penOrders, setPenOrders] = useState([]);
  const [showNoData, setShowNoData] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [dateByOrders, setDateByOrders] = useState("");

  // const [orderDetails, setOrderDetails] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [deliveredOrderByDate, setDeliveredOrderByDate] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  // console.log(auth);
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      setShowNoData(false);
      try {
        const response = await deliveredOrdersByAdmin({
          token: auth.token,
          searchTerm,
          limit,
          currentPage,
          paymentMethod,
          dateByOrders,
        });
        if (response.success) {
          setPenOrders(response.data.orders);
          setTotalItems(response.data.totalItems);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      } finally {
        setShowNoData(true);
      }
    };

    fetchDeliveredOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.checkAuth,
    currentPage,
    limit,
    paymentMethod,
    searchTerm,
    dateByOrders,
  ]);

  // deliveredOrdersByAdminByDate
  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      setShowNoData(false);
      try {
        const response = await deliveredOrdersByAdminByDate({
          token: auth.token,
        });
        if (response.success) {
          setDeliveredOrderByDate(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      } finally {
        setShowNoData(true);
      }
    };

    fetchDeliveredOrders();
  }, [auth.checkAuth, dateByOrders]);

  const handleShowOrder = (order) => {
    setIsPendingOpen(true);
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

      confirmButtonText: "Returned Order",
      denyButtonText: "Cancel Order",

      confirmButtonColor: "#16a34a",
      denyButtonColor: "#dc2626",

      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (result.isConfirmed) {
      // ✅ CONFIRM ORDER
      await deliveredOrdersFromCompleted(orderId, auth.token);
      setPenOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      SweetAlert({
        type: "toast",
        icon: "success",
        title: "Order Delivered Successfully",
      });
    }

    if (result.isDenied) {
      // ❌ CANCEL ORDER
      await cancelOrdersByAdmin(orderId, auth.token);
      SweetAlert({
        type: "toast",
        icon: "success",
        title: "Order Cancelled Successfully",
      });
    }
  };
  const handleReset = () => {
    setSearchTerm("");
    setPaymentMethod("");
    setDateByOrders("");
  };

  const handlePageSizeChange = (size) => {
    setLimit(size);
    setCurrentPage(1); // always start from page 1 when changing size
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deliveredOrderDates = deliveredOrderByDate?.map(
    (date) => new Date(date.updatedAt).toISOString().split("T")[0]
  );

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteOrderByAdmin({
          token: auth.token,
          orderId,
        });

        if (response?.success) {
          setPenOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          return Swal.fire({
            title: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <PageMeta
        title="Delivered Orders"
        description="Delivered all Orders of our website"
      />
      {!showCalendar && <PageBreadcrumb pageTitle="Delivered Orders" />}
      <div className="flex justify-center items-center my-3">
        {showCalendar && (
          <DatePicker
            // selected={dateByOrders}
            // onChange={(date) => setDateByOrders(date)}
            inline
            highlightDates={[
              {
                "react-datepicker__day--highlighted-custom-1":
                  deliveredOrderDates,
              },
            ]}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd-MM-yyyy"
          />
        )}
      </div>
      <div className="space-y-1">
        <ComponentCard title={`Total Delivered Orders: ${totalItems} `}>
          <div className="flex justify-end items-center flex-wrap">
            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <DatePicker
                selected={dateByOrders}
                onChange={(date) => setDateByOrders(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Search date .... "
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="border border-gray-300 rounded px-2 py-1 mr-4"
              />
            </div>
            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <select
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                name="paymentMethod"
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bkash">Bkash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
              </select>
            </div>
            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <Button size="sm" onClick={() => setShowCalendar(!showCalendar)}>
                Calander
              </Button>
            </div>
            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <Button size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
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
                        Delivery Date
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
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {bdTimeFormat(order.updatedAt)}
                        </TableCell>
                        {/* badge cell  */}
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                          <Badge
                            size="sm"
                            color={
                              order.status === "delivered" ? "success" : "error"
                            }
                          >
                            {order.status?.toUpperCase()}
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
                            <button
                              disabled={order.status === true}
                              onClick={() => handleDeleteOrder(order._id)}
                              className={`text-red-800   px-1 py-1 ${
                                order.status === true
                                  ? " cursor-not-allowed opacity-30 "
                                  : " hover:text-white hover:bg-red-800 rounded"
                              }`}
                            >
                              <i
                                class="fas fa-trash text-xl px-1"
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
            <TablePagination
              totalItems={totalItems}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={limit}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </ComponentCard>
      </div>

      {/* show order modal */}
      <ShowOrderModal
        isEditOpen={isPendingOpen}
        setIsEditOpen={setIsPendingOpen}
        orderInfo={orderDetails}
        orderStatus={"delivered"}
        orderActionColor={"success"}
      />
    </div>
  );
};

export default DeleveredOrders;
