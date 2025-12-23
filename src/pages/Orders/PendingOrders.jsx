import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { pendingOrdersByAdmin } from "../../service/order";
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

const PendingOrders = () => {
  const { auth } = useContext(AuthContext);
  const [penOrders, setPenOrders] = useState([]);
  const [showNoData, setShowNoData] = useState(false);
  // console.log(auth);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      setShowNoData(false);
      try {
        const response = await pendingOrdersByAdmin(auth.token);
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
                            ${order.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            ${order.payAmount}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {order.totalAmount}
                        </TableCell>

                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {order.address}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                        {order.createdAt.slice(0,10)+" "+order.createdAt.slice(11,19)}
                        </TableCell>
                        {/* switch cell  */}
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                          <Switch
                            size="sm"
                            color={
                              order.status === "pending"
                                ? "blue"
                                : order.status === "cancelled"
                                ? "warning"
                                : "error"
                            }
                            defaultChecked={order.status === "pending"}
                            label={order.status === "pending" ? "Pending" : "Cancelled"}
                            // onChange={(checked) =>
                            //   changeStatus({ order, checked })
                            // }
                          />
                        </TableCell>
                        {/* action cells */}
                        {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleShowProduct(product)}
                              className="text-green-600  hover:bg-green-600  dark:text-green-400 px-1 py-1"
                            >
                              <i
                                className="fa fa-eye text-xl hover:text-white"
                                aria-hidden="true"
                                title="view"
                              ></i>
                            </button>
                            <button
                              onClick={() => handleEditProduct(product)}
                              disabled={product.status === false}
                              className={`text-blue-600   dark:text-blue-400 px-1 py-1${
                                product.status === false
                                  ? " cursor-not-allowed opacity-30 "
                                  : " hover:text-white hover:bg-blue-600"
                              }`}
                            >
                              <i
                                className="fa fa-edit text-xl "
                                aria-hidden="true"
                                title="edit"
                              ></i>
                            </button>
                            <button
                              disabled={product.status === true}
                              onClick={() => handleDeleteProduct(product._id)}
                              className={`text-red-600   px-1 py-1 ${
                                product.status === true
                                  ? " cursor-not-allowed opacity-30 "
                                  : " hover:text-white hover:bg-red-600 "
                              }`}
                            >
                              <i
                                className="fa fa-trash text-xl"
                                aria-hidden="true"
                                title="delete"
                              ></i>
                            </button>
                          </div>
                        </TableCell> */}
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
    </div>
  );
};

export default PendingOrders;
