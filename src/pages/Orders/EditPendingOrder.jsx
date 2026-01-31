import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "../../components/ui/modal";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Badge from "../../components/ui/badge/Badge";
import bdTimeFormat from "../../components/common/bdTimeFormat";

const EditPendingOrder = ({ isEditOpen, setIsEditOpen, orderInfo }) => {
  // console.log("orderInfo:", orderInfo);

  const {
    status,
    paymentMethod,
    // payAmount,
    trxId,
    deliveryFee,
    createdAt,
    customerId,
  } = orderInfo || {};
  const customerInfo = customerId?.addresses?.[0] || {};
  const products = orderInfo?.customerProducts || [];

  /* ---------------- STATE ---------------- */
  const [customer, setCustomer] = useState(customerInfo);
  const [items, setItems] = useState(products);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dFee = deliveryFee
    ? Number(deliveryFee)
    : customer?.deliveryMethod === "inside-dhaka"
      ? 60
      : 120;
  console.log(dFee);

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    setCustomer(customerInfo);
    setItems(products);
  }, [orderInfo]);

  /* ---------------- HANDLERS ---------------- */
  const handleCustomerInfoChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = Number(value);
    setItems(updated);
  };

  // const handleReset = () => {
  //   setCustomer(customerInfo);
  //   setItems(products);
  // };

  /* ---------------- CALC ---------------- */
  const quantity = useMemo(
    () => items.reduce((sum, p) => sum + (p.quantity || 0), 0),
    [items],
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, p) =>
          sum + (p.quantity || 0) * (p.price || 0) + (deliveryFee || 0),
        0,
      ),
    [items],
  );

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      orderId: orderInfo?._id,
      customer,
      products: items,
    };
    payload.products.quantity = quantity;
    payload.products.totalAmount = totalAmount;
    try {
      console.log("SUBMIT DATA 👉", payload);
      alert("Order updated successfully!");
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Pending Order"
        className="max-w-[1200px] h-[80vh] overflow-y-auto m-4"
      >
        <div className="relative w-full max-6xl mx-auto overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-3 text-4xl font-semibold text-gray-800 dark:text-white/90 text-center ">
                Edit Order Details
              </h1>
              <p className="text-gray-800 dark:text-white/90 text-center ">
                Order Date: {bdTimeFormat(createdAt)}
              </p>
              <div className="px-4 py-3 text-center">
                <span className="dark:text-white/90">Order Status:&nbsp;</span>
                <Badge
                  size="sm"
                  color={status === "pending" ? "warning" : "error"}
                >
                  {status}
                </Badge>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 ">
              {/* Customer Information Card */}
              <div className="border rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4 pb-2 border-b">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/90  mb-1">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) =>
                        handleCustomerInfoChange("fullName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={customer.email}
                      onChange={(e) =>
                        handleCustomerInfoChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) =>
                        handleCustomerInfoChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      City
                    </label>
                    <Input
                      type="text"
                      value={customer.city}
                      onChange={(e) =>
                        handleCustomerInfoChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      Address
                    </label>
                    <Input
                      type="text"
                      value={customer.address}
                      onChange={(e) =>
                        handleCustomerInfoChange("address", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      State
                    </label>
                    <Input
                      type="text"
                      value={customer.state}
                      onChange={(e) =>
                        handleCustomerInfoChange("state", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      Post Code
                    </label>
                    <Input
                      type="number"
                      value={customer.postalCode}
                      onChange={(e) =>
                        handleCustomerInfoChange("postalCode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      Delivery Method
                    </label>
                    <Input
                      type="text"
                      value={customer.deliveryMethod}
                      onChange={(val) =>
                        handleCustomerInfoChange("deliveryMethod", val)
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                      Payment Method
                    </label>
                    <Input
                      type="text"
                      value={paymentMethod}
                      onChange={(val) =>
                        handleCustomerInfoChange("paymentMethod", val)
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Products Card */}
              <div className="border rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4 pb-2 border-b">
                  Order Items
                </h2>
                <div className="overflow-x-auto">
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
                          Size
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
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {products.map((product, index) => (
                        <tr
                          key={product._id}
                          className="dark:hover:bg-gray-700 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                            {product.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                            {product?.productId?.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                            {product?.size || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                            {product?.productId?.category?.name}
                          </td>
                          <td className="px-4 py-3">
                            <Input
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "quantity",
                                  e.target.value,
                                )
                              }
                              className="w-20 "
                            />
                          </td>
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
                            <div className="flex items-center">
                              <span className="mr-1">$</span>
                              <Input
                                type="number"
                                min="1"
                                value={product.price}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "price",
                                    e.target.value,
                                  )
                                }
                                disabled
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="border rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4 pb-2 border-b">
                  Order Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                      Total Products
                    </label>
                    <Input type="text" value={products.length} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                      Payment Method
                    </label>
                    <Input type="text" value={paymentMethod} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                      Transaction ID
                    </label>
                    <Input type="text" value={trxId} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                      Total Quantity
                    </label>
                    <Input type="text" value={quantity} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                      Delivery Cost ($)
                    </label>
                    <Input type="text" value={deliveryFee} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                      Total Amount ($)
                    </label>
                    <Input type="text" value={totalAmount} disabled />
                  </div>
                </div>
              </div>

              {/* Shop Information (Read-only) */}
              <div className=" rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                  Shop Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-800 dark:text-white/90">
                      Shop Name
                    </p>
                    <p className="font-medium dark:text-gray-500">
                      {"Bannah Shop"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-white/90">
                      Address
                    </p>
                    <p className="font-medium dark:text-gray-500">
                      {"108, Banglabazar, Dhaka-1100"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-white/90">
                      Location
                    </p>
                    <p className="font-medium dark:text-gray-500">
                      {"Dhaka, Bangladesh"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-white/90">
                      Email
                    </p>
                    <p className="font-medium dark:text-gray-500">
                      {"bannahshop@gmail.com"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-white/90">
                      Phone
                    </p>
                    <p className="font-medium dark:text-gray-500">
                      {"+8801700000000"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditPendingOrder;
