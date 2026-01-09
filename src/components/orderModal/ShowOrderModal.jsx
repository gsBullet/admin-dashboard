import React from "react";
import { Modal } from "../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import bdTimeFormat from "../common/bdTimeFormat";

const ShowOrderModal = ({ isEditOpen, setIsEditOpen, orderInfo,orderStatus,orderActionColor }) => {
  // console.log(orderInfo);
  const {
    status,
    paymentMethod,
    quantity,
    trxId,
    totalAmount,
    createdAt,
    customerId,
  } = orderInfo || {};
  const customerInfo = customerId?.addresses?.[0] || {};
  const products = orderInfo?.customerProducts || [];
  const productTotalAmount = orderInfo?.customerProducts?.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  // console.log(customerInfo);

  return (
    <div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className="max-w-[1200px] h-[85vh] overflow-y-auto m-4"
      >
        <div className=" relative w-full  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2">
            <h4 className=" text-4xl font-semibold text-gray-800 dark:text-white/90 text-center ">
              Order Details
            </h4>
          </div>
          <div className="flex justify-between">
            <div className=" px-2">
              <p className="text-gray-800 dark:text-white/90 ">
                <span className="font-semibold">Full Name:</span>
                {customerInfo.fullName}
              </p>
              <p className="text-gray-800 dark:text-white/90 ">
                <span className="font-semibold">Email:</span>
                {customerInfo.email}
              </p>
              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">Customer Phone:</span>{" "}
                <a
                  className="hover:text-brand-700 hover:underline"
                  href={`tel:${customerId?.phone}`}
                >
                  {customerId?.phone}
                </a>
              </p>

              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">Billing Phone:</span>{" "}
                <a
                  className="hover:text-brand-700 hover:underline"
                  href={`tel:${customerInfo.phone}`}
                >
                  {customerInfo.phone}
                </a>
              </p>

              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">City:</span> {customerInfo.city}
              </p>
              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">Delivery:</span>{" "}
                {customerInfo.deliveryMethod}
              </p>

              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">Order Date:</span>
                {bdTimeFormat(createdAt)}
              </p>
            </div>

            <div className="text-gray-800 dark:text-white/90 ">
              <span className="font-semibold">Bannah Shop</span>
              <p>123 Market Street, Suite 500</p>
              <p>New York, NY 10001</p>
              <p>Email: 6MnM5@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          <div className="overflow-x-auto  mt-12">
            <table className="min-w-full divide-y text-gray-800 dark:text-white/90">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    // className="dark:hover:bg-gray-700 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                      {product?.productId?.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                      {product?.productId?.category?.name}
                    </td>
                    <td className="px-4 py-3">{product.quantity}</td>
                    <td className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          product?.productId?.available === true
                            ? "success"
                            : "error"
                        }
                      >
                        {product?.productId?.available
                          ? "In Stock"
                          : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={status === orderStatus ? orderActionColor : "error"}
                      >
                        {status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-1">$</span>
                        {product.price}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white/90"
                  >
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">
                    ${productTotalAmount}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white/90"
                  >
                    Delivery Charge:
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">
                    ${totalAmount - productTotalAmount}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="2"
                    className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white/90"
                  >
                    {products.length} Items
                  </td>
                  <td
                    colSpan="2"
                    className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white/90"
                  >
                    {quantity} Quantity
                  </td>

                  <td
                    colSpan="2"
                    className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white/90"
                  >
                    Total Amount:
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">
                    <div className="flex items-center">
                      <span className="mr-1">$</span>
                      {totalAmount}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="p-10">
          <p className="text-gray-800 dark:text-white/90 italic">
            Full Name: {customerInfo.fullName}, Email: {customerInfo.email},
            Customer Phone:
            {customerId?.phone}, Billing Address Phone:
            {customerInfo.phone},Address: {customerInfo.address}, City:{" "}
            {customerInfo.city},State: {customerInfo.state},PostCode:{" "}
            {customerInfo.postalCode}, delivery: {customerInfo.deliveryMethod},
            PaymentMethod: {paymentMethod},TransactionID:{trxId}, Order Date:
            {bdTimeFormat(createdAt)},
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowOrderModal;
