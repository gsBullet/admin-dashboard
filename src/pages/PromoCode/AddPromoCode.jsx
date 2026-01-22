import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { AuthContext } from "../../context/AuthContext";
import {
  getAllCategoryForDiscount,
  getAllProductsForDiscount,
  getAllUsersForDiscount,
} from "../../service/Promo";

const AddPromoCode = () => {
  const { auth } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    maxDiscount: null,
    minPurchaseAmount: 0,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    usageLimit: null,
    isActive: true,
    applicableProducts: [],
    applicableCategories: [],
    customerSpecific: [],
  });

  const [errors, setErrors] = useState({});
  const [productSearch, setProductSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [initialData, setInitialData] = useState(null);
  //   const [isEditMode, setIsEditMode] = useState(false);

  //   get all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoryForDiscount({ token: auth.token });
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [auth.token]);

  //   get all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsForDiscount({ token: auth.token });
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchProducts();
  }, [auth.token]);
  //   get all users Status
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getAllUsersForDiscount({
          token: auth.token,
          customerSearch,
        });
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCustomer();
  }, [auth.token, customerSearch]);

  // Filtered lists for search

  const filteredProducts = products?.filter((product) =>
    product.name?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredCategories = categories?.filter((category) =>
    category.name?.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredCustomers = customers?.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer?.activeUserStatus
        ?.toLowerCase()
        .includes(customerSearch.toLowerCase())
  );

  // Load initial data if in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        validFrom: new Date(initialData.validFrom),
        validUntil: new Date(initialData.validUntil),
        applicableProducts: initialData.applicableProducts || [],
        applicableCategories: initialData.applicableCategories || [],
        customerSpecific: initialData.customerSpecific || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? value === ""
            ? null
            : parseFloat(value)
          : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return { ...prev, [field]: newArray };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Promo code is required";
    } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
      newErrors.code = "Only uppercase letters and numbers allowed";
    }

    if (formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }

    if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      newErrors.discountValue = "Percentage discount cannot exceed 100%";
    }

    if (formData.maxDiscount !== null && formData.maxDiscount < 0) {
      newErrors.maxDiscount = "Maximum discount cannot be negative";
    }

    if (formData.minPurchaseAmount < 0) {
      newErrors.minPurchaseAmount = "Minimum purchase cannot be negative";
    }

    if (formData.validUntil <= formData.validFrom) {
      newErrors.validUntil = "Valid until must be after valid from";
    }

    if (formData.usageLimit !== null && formData.usageLimit < 0) {
      newErrors.usageLimit = "Usage limit cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Format dates to ISO string
      const formattedData = {
        ...formData,
        validFrom: formData.validFrom.toISOString(),
        validUntil: formData.validUntil.toISOString(),
      };
      console.log(formattedData);
      //   const response = await createPromoByAdmin({
      //     data: formattedData,
      //     token: auth.token,
      //   });
      //   onSubmit(formattedData);
    }
  };

  const getSelectedItems = (field, sourceArray) => {
    return sourceArray?.filter(
      (item) =>
        formData[field].includes(item.id) || formData[field].includes(item._id)
    );
  };

  const handleReset = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: 0,
      maxDiscount: null,
      minPurchaseAmount: 0,
      validFrom: new Date(),
      validUntil: new Date(),
      usageLimit: null,
      isActive: true,
      applicableProducts: [],
      applicableCategories: [],
      customerSpecific: [],
    });
    setErrors({});
  };
  return (
    <>
      <>
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
            {"Create New Promo Code"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                  Promo Code *
                </label>
                <Input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.code ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="SUMMER25"
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
                <p className="mt-1 text-sm text-gray-500  dark:text-white/90">
                  Only uppercase letters and numbers
                </p>
              </div>

              {/* Discount Type */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white/90">
                  Discount Type *
                </Label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-gray-800 dark:text-white/90"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white/90">
                  Discount Value *
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    step={formData.discountType === "percentage" ? 0.1 : 1}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.discountValue
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder={
                      formData.discountType === "percentage" ? "10" : "50"
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-white/90">
                      {formData.discountType === "percentage" ? "%" : "₹"}
                    </span>
                  </div>
                </div>
                {errors.discountValue && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.discountValue}
                  </p>
                )}
              </div>

              {/* Maximum Discount (for percentage) */}
              {formData.discountType === "percentage" && (
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                    Maximum Discount (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      name="maxDiscount"
                      value={formData.maxDiscount || ""}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.maxDiscount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="No limit"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-white/90">
                        {"$"}
                      </span>
                    </div>
                  </div>
                  {errors.maxDiscount && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.maxDiscount}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Maximum amount customers can save
                  </p>
                </div>
              )}

              {/* Minimum Purchase Amount */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                  Minimum Purchase Amount
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    name="minPurchaseAmount"
                    value={formData.minPurchaseAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.minPurchaseAmount
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-white/90">$</span>
                  </div>
                </div>
                {errors.minPurchaseAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.minPurchaseAmount}
                  </p>
                )}
              </div>

              {/* Usage Limit */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                  Usage Limit
                </Label>
                <Input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit || ""}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.usageLimit ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Unlimited"
                />
                {errors.usageLimit && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.usageLimit}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Leave empty for unlimited usage
                </p>
              </div>
            </div>

            {/* Validity Period */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
                Validity Period
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                    Valid From *
                  </Label>
                  <DatePicker
                    selected={formData.validFrom}
                    onChange={(date) => handleDateChange(date, "validFrom")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                    Valid Until *
                  </Label>
                  <DatePicker
                    selected={formData.validUntil}
                    onChange={(date) => handleDateChange(date, "validUntil")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.validUntil ? "border-red-500" : "border-gray-300"
                    }`}
                    dateFormat="MMMM d, yyyy"
                    minDate={formData.validFrom}
                  />
                  {errors.validUntil && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.validUntil}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Applicable Products */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
                Applicable Products (Optional)
              </h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {filteredProducts?.length > 0 ? (
                    filteredProducts?.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center p-2 hover:bg-gray-500 rounded cursor-pointer"
                        onClick={() =>
                          handleArrayToggle("applicableProducts", product.id)
                        }
                      >
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={formData.applicableProducts.includes(
                            product.id
                          )}
                          onChange={() =>
                            handleArrayToggle("applicableProducts", product.id)
                          }
                        />
                        <Label
                          htmlFor={`product-${product.id}`}
                          className="ml-2 text-sm text-gray-700 dark:text-white/90 flex-1 cursor-pointer"
                        >
                          {product.name} - ${product.new_price}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm p-2 dark:text-white/90">
                      No products found
                    </p>
                  )}
                </div>

                {/* Selected Products */}
                {formData.applicableProducts.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                      Selected Products:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedItems("applicableProducts", products).map(
                        (product) => (
                          <span
                            key={product.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                          >
                            {product.name}
                            <button
                              type="button"
                              onClick={() =>
                                handleArrayToggle(
                                  "applicableProducts",
                                  product.id
                                )
                              }
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Applicable Categories */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white/90">
                Applicable Categories (Optional)
              </h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <div
                        key={category._id}
                        className="flex items-center p-2 dark:hover:bg-gray-500 hover:bg-gray-200 rounded cursor-pointer"
                        onClick={() =>
                          handleArrayToggle(
                            "applicableCategories",
                            category._id
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          id={`category-${category._id}`}
                          checked={formData.applicableCategories.includes(
                            category._id
                          )}
                          onChange={() =>
                            handleArrayToggle(
                              "applicableCategories",
                              category._id
                            )
                          }
                        />
                        <Label
                          htmlFor={`category-${category._id}`}
                          className="ml-2 text-sm text-gray-700 dark:text-white/90 cursor-pointer "
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm p-2">
                      No categories found
                    </p>
                  )}
                </div>

                {/* Selected Categories */}
                {formData.applicableCategories.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2  dark:text-white/90">
                      Selected Categories:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedItems("applicableCategories", categories).map(
                        (category) => (
                          <span
                            key={category._id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                          >
                            {category.name}
                            <button
                              type="button"
                              onClick={() =>
                                handleArrayToggle(
                                  "applicableCategories",
                                  category._id
                                )
                              }
                              className="ml-2 text-green-600 hover:text-green-800"
                            >
                              ×
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specific Customers */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white/90">
                Specific Customers (Optional)
                <span className="text-sm font-normal text-gray-500 ml-2 dark:text-white/90">
                  Leave empty for all customers
                </span>
              </h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search customers by name or email..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {filteredCustomers?.length > 0 ? (
                    filteredCustomers?.map((customer) => (
                      <div
                        key={customer._id}
                        className="flex items-center p-2 dark:hover:bg-gray-500 hover:bg-gray-200 rounded "
                      >
                        <input
                          type="checkbox"
                          id={`customer-${customer._id}`}
                          checked={formData.customerSpecific.includes(
                            customer._id
                          )}
                          onChange={() =>
                            handleArrayToggle("customerSpecific", customer._id)
                          }
                        />
                        <Label
                          htmlFor={`customer-${customer._id}`}
                          className="ml-2 text-sm text-gray-700 flex-1 dark:text-white/90 cursor-pointer"
                        >
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-gray-500 dark:text-white/90">
                            {customer.email}
                          </div>
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm p-2">
                      No customers found
                    </p>
                  )}
                </div>

                {/* Selected Customers */}
                {formData.customerSpecific?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2 dark:text-white/90">
                      Selected Customers:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedItems("customerSpecific", customers)?.map(
                        (customer) => (
                          <span
                            key={customer._id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                          >
                            {customer.name}
                            <button
                              type="button"
                              onClick={() =>
                                handleArrayToggle(
                                  "customerSpecific",
                                  customer._id
                                )
                              }
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              ×
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Status */}
            <div className="border-t pt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  //   checked
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 text-sm font-medium text-gray-700 dark:text-white/90"
                >
                  Active
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Inactive promo codes won't be available for use
              </p>
            </div>

            {/* Form Actions */}
            <div className="border-t pt-6 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleReset()}
              >
                Reset
              </Button>
              <Button type="submit">{"Create Promo Code"}</Button>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default AddPromoCode;
