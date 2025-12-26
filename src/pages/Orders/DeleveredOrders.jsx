import React, { useState } from "react";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Badge from "../../components/ui/badge/Badge";

const DeleveredOrders = () => {
  const initialOrder = {
    customerInfo: {
      fullName: "Tatyana Quinn",
      email: "xewageloju@mailinator.com",
      phone: "+1 (242) 273-6429",
      address: "Qui perspiciatis de",
      city: "Eum in voluptas ut s",
      state: "In sit unde ipsam s",
      postCode: "28",
      delivery: "inside-dhaka",
      paymentMethod: "rocket",
    },
    orderDate: "Dec 24, 2025, 02:51 PM",
    products: [
      {
        id: "B-01",
        name: "Kids Jumper with smart looking",
        category: "Kids",
        quantity: 3,
        available: "Yes",
        status: "pending",
        price: 75,
      },
      {
        id: "H-02",
        name: "Jacket with white and ash color mix, modern design, attractive",
        category: "Men",
        quantity: 1,
        available: "Yes",
        status: "pending",
        price: 139,
      },
    ],
    summary: {
      totalProducts: 2,
      paymentMethod: "rocket",
      traId: "Laboriosam amet mo",
      totalQuantity: 4,
      deliveryCost: 4,
      totalAmount: 424,
    },
    shopInfo: {
      name: "Bannah Shop",
      address: "123 Market Street, Suite 500",
      location: "New York, NY 10001",
      email: "óMnMS@example.com",
      phone: "(123) 456-7890",
    },
  };

  const [order, setOrder] = useState(initialOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle customer info changes
  const handleCustomerInfoChange = (field, value) => {
    setOrder((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [field]: value,
      },
    }));
  };

  // Handle product changes
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...order.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]:
        field === "quantity" || field === "price" ? Number(value) : value,
    };

    // Recalculate totals
    const totalQuantity = updatedProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    const productsTotal = updatedProducts.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    const totalAmount = productsTotal + order.summary.deliveryCost;

    setOrder((prev) => ({
      ...prev,
      products: updatedProducts,
      summary: {
        ...prev.summary,
        totalProducts: updatedProducts.length,
        totalQuantity,
        totalAmount,
      },
    }));
  };

  // Handle summary changes
  const handleSummaryChange = (field, value) => {
    const numericValue =
      field === "deliveryCost" || field === "totalAmount"
        ? Number(value)
        : value;

    setOrder((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        [field]: numericValue,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the updated order to your API
      console.log("Updated Order:", order);
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setOrder(initialOrder);
  };

  return (
    <div className="relative w-full max-6xl mx-auto overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-semibold text-gray-800 dark:text-white/90 text-center ">
            Edit Order Details
          </h1>
          <p className="text-gray-800 dark:text-white/90 text-center ">
            Order Date: {order.orderDate}
          </p>
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
                  value={order.customerInfo.fullName}
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
                  value={order.customerInfo.email}
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
                  value={order.customerInfo.phone}
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
                  value={order.customerInfo.city}
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
                  value={order.customerInfo.address}
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
                  value={order.customerInfo.state}
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
                  type="text"
                  value={order.customerInfo.postCode}
                  onChange={(e) =>
                    handleCustomerInfoChange("postCode", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                  Delivery Method
                </label>
                <Select
                  defaultValue={order.customerInfo.delivery}
                  onChange={(e) =>
                    handleCustomerInfoChange("delivery", e.target.value)
                  }
                  options={[
                    { value: "inside-dhaka", label: "Inside Dhaka" },
                    { value: "outside-dhaka", label: "Outside Dhaka" },
                    { value: "international", label: "International" },
                  ]}
                ></Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90">
                  Payment Method
                </label>
                <Input
                  type="text"
                  value={order.customerInfo.paymentMethod}
                  readOnly
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
                  {order.products.map((product, index) => (
                    <tr
                      key={product.id}
                      className="dark:hover:bg-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                        {product.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white/90">
                        {product.category}
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
                              e.target.value
                            )
                          }
                          className="w-20 "
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          size="sm"
                          color={
                            product.available === "Yes" ? "success" : "error"
                          }
                        >
                          {product.available}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          size="sm"
                          color={
                            product.status === "pending" ? "warning" : "error"
                          }
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="mr-1">$</span>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.price}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
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
                <Input
                  type="text"
                  value={order.summary.totalProducts}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                  Payment Method
                </label>
                <Input
                  type="text"
                  value={order.summary.paymentMethod}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                  Transaction ID
                </label>
                <Input
                  type="text"
                  value={order.summary.traId}
                  onChange={(e) => handleSummaryChange("traId", e.target.value)}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                  Total Quantity
                </label>
                <Input
                  type="text"
                  value={order.summary.totalQuantity}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                  Delivery Cost ($)
                </label>
                <Input
                  type="text"
                  value={order.summary.deliveryCost}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">
                  Total Amount ($)
                </label>
                <Input
                  type="text"
                  value={order.summary.totalAmount}
                  readOnly
                />
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
                  {order.shopInfo.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800 dark:text-white/90">
                  Address
                </p>
                <p className="font-medium dark:text-gray-500">
                  {order.shopInfo.address}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800 dark:text-white/90">
                  Location
                </p>
                <p className="font-medium dark:text-gray-500">
                  {order.shopInfo.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800 dark:text-white/90">
                  Email
                </p>
                <p className="font-medium dark:text-gray-500">
                  {order.shopInfo.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800 dark:text-white/90">
                  Phone
                </p>
                <p className="font-medium dark:text-gray-500">
                  {order.shopInfo.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 dark:border-gray-50 text-gray-700 dark:text-white/90 rounded-md hover:bg-gray-50 dark:hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset Changes
            </button>
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
  );
};

export default DeleveredOrders;
