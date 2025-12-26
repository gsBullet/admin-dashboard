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

const ShowOrderModal = ({ isEditOpen, setIsEditOpen, orderInfo }) => {
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
  console.log(customerInfo);

  return (
    <div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className="max-w-[1200px] h-[80vh] overflow-y-auto m-4"
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
                <span className="font-semibold">Phone:</span>{" "}
                {customerInfo.phone}
              </p>
              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">City:</span> {customerInfo.city}
              </p>
              <p className="text-gray-800 dark:text-white/90">
                <span className="font-semibold">delivery</span>{" "}
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

          <div className="mt-6">
            <Table className={""}>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-800 dark:border-white/90   ">
                <TableRow className={"text-center"}>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                  >
                    Product Id
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                  >
                    Category
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
                    Available
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
                    Price
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}

              <TableBody className="divide-y divide-gray-100 dark:divide-white/50">
                {products?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.id}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.productId.name}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.productId.category.name}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                      {product.quantity}
                    </TableCell>

                    <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                      {product.productId.available ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                      <Badge
                        size="sm"
                        color={status === "pending" ? "warning" : "error"}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        ${product.productId.new_price}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table className={"border-t"}>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/50">
                <TableRow>
                  <TableCell
                    rowSpan={6}
                    className="px-5 py-4 sm:px-6 text-start font-bold"
                  >
                    <span className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90">
                      Total Products : {products.length}
                    </span>
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    className="px-5 py-4 sm:px-6 text-start font-bold"
                  >
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      Payment made: ${paymentMethod}
                    </span>
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    className="px-5 py-4 sm:px-6 text-start font-bold"
                  >
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      TrxID: {trxId}
                    </span>
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    className="px-5 py-4 sm:px-6 text-start font-bold"
                  >
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      Total Quantity : {quantity}
                    </span>
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    className="px-5 py-4 sm:px-6 text-start font-bold"
                  >
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      Delivary Cost : {quantity}
                    </span>
                  </TableCell>

                  <TableCell
                    colSpan={6}
                    className="px-5 py-4 sm:px-6 text-start font-bold"
                  >
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      Total Amount : ${totalAmount}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="p-10">
          <p className="text-gray-800 dark:text-white/90 italic">
            Full Name: {customerInfo.fullName}, Email: {customerInfo.email},
            Phone:
            {customerInfo.phone},Address: {customerInfo.address}, City:{" "}
            {customerInfo.city},State: {customerInfo.state},PostCode:{" "}
            {customerInfo.postalCode}, delivery: {customerInfo.deliveryMethod},
            PaymentMethod: {paymentMethod}, Order Date:{" "}
            {bdTimeFormat(createdAt)},
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowOrderModal;
