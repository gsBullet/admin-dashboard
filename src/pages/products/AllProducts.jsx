import React, { useContext, useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  updateProductStatus,
} from "../../service/product";
import Switch from "../../components/form/switch/Switch";
import TablePagination from "../Tables/TablePagination";
import LoadingBtn from "../UiElements/LoadingBtn";
import { fetchAllCategoryForProduct } from "../../service/category";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import SweetAlert from "../../components/common/SweetAlert";
import { AuthContext } from "../../context/AuthContext";

const AllProducts = () => {
  const { auth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState([]);
  const [available, setAvailable] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const thumbnailInputRef = React.useRef(null);
  const imagesInputRef = React.useRef(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoData(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // fetchAllCategoryForProduct
  useEffect(() => {
    const getCategory = async () => {
      const data = await fetchAllCategoryForProduct({ token: auth.token });
      setCategory(data);
    };
    getCategory();
  }, [auth.token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setLimit(size);
    setCurrentPage(1); // always start from page 1 when changing size
  };

  const handleSearch = (search) => {
    setCurrentPage(1);
    setLimit(10);
    setSearchTerm(search);
    setShowNoData(false);
  };

  // fetch all products

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        category: searchCategory,
        available: available,
        sort: "createdAt",
        order: "desc",
        token: auth.token,
      });
      setProducts(response.data);
      setTotalProducts(response.pagination.totalProducts);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
    };
    fetchProducts();
  }, [currentPage, limit, searchTerm, available, sort, order, searchCategory]);

  const changeStatus = async ({ product, checked }) => {
    const response = await updateProductStatus({
      id: product._id,
      status: checked,
      token: auth.token,
    });

    if (response.success === true) {
      const updatedProducts = products.map((p) => {
        if (p._id === product._id) {
          return {
            ...p,
            status: checked,
          };
        }
        return p;
      });
      setProducts(updatedProducts);
    }
  };

  const handleShowProduct = (product) => {
    setIsOpen(true);
    setSelectedProduct(product);
  };

  const handleEditProduct = (product) => {
    setIsEditOpen(true);
    setSelectedProduct(product);
  };

  const removeImagePreview = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    // Also update the files input
    if (imagesInputRef.current) {
      const input = imagesInputRef.current;
      const dt = new DataTransfer();

      Array.from(input.files).forEach((file, i) => {
        if (i !== index) {
          dt.items.add(file);
        }
      });

      input.files = dt.files;
    }
  };

  // Clear all image previews
  const clearAllImages = () => {
    setImagePreviews([]);
    if (imagesInputRef.current) {
      imagesInputRef.current.value = "";
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Text fields
    formData.append("id", e.target.id.value);
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("old_price", e.target.old_price.value);
    formData.append("new_price", e.target.new_price.value);
    formData.append("category", e.target.category.value);
    formData.append("quantity", e.target.quantity.value);
    formData.append("available", e.target.available.value);
    formData.append("status", e.target.status.value);

    // Thumbnail - only append if a new file is selected
    if (thumbnailInputRef.current && thumbnailInputRef.current.files[0]) {
      formData.append("thumbnail", thumbnailInputRef.current.files[0]);
    }

    // Images - only append if new files are selected
    if (imagesInputRef.current && imagesInputRef.current.files.length > 0) {
      const related_images = imagesInputRef.current.files;
      for (let i = 0; i < related_images.length; i++) {
        formData.append("related_images", related_images[i]);
      }
    }

    try {
      // Use update endpoint instead of add-product
      const response = await updateProduct(
        selectedProduct._id,
        formData,
        auth.token
      );
      if (response?.success) {
        setIsEditOpen(false);
        SweetAlert({
          icon: "success",
          title: response.message,
        });

        // Refresh products list
        const updatedResponse = await getAllProducts({
          page: currentPage,
          limit: limit,
          search: searchTerm,
          category: searchCategory,
          available: available,
          sort: "updatedAt",
          order: "desc",
          token: auth.token,
        });
        setProducts(updatedResponse.data);
      } else {
        SweetAlert({
          icon: "error",
          title: "Error",
          text: response?.message || "Failed to update product",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      SweetAlert({
        icon: "error",
        title: "Error",
        text: error.response?.message || "Failed to update product",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct({ id, token: auth.token });
    if (response?.success) {
      SweetAlert({
        icon: "success",
        title: response.message,
      });
      const updatedResponse = await getAllProducts({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        category: searchCategory,
        available: available,
        sort: "createdAt",
        order: "desc",
        token: auth.token,
      });
      setProducts(updatedResponse.data);
    }
  };

  const limitWords = (text, limit = 10) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <>
      <PageMeta title="All Products" description="All products" />
      <PageBreadcrumb pageTitle="All Products" />

      <div className="space-y-6">
        <ComponentCard title="Product Categories">
          <div className="flex justify-end items-center">
            <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <select
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                name="category"
                id="category"
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {category?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
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
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              {products.length === 0 ? (
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
                        Description
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        Old Price
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-white/90"
                      >
                        New Price
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
                        product Images
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
                        Actions
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
                            {product.name}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.category.name}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {limitWords(product.description, 10)}
                          </span>
                        </TableCell>

                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            ${product.old_price}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            ${product.new_price}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {product.quantity}
                        </TableCell>

                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          <div className="flex flex-col justify-center items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                              <img
                                width={40}
                                height={40}
                                src={
                                  import.meta.env.VITE_IMAGE_URL +
                                  product.thumbnail
                                }
                                alt={product.name}
                              />
                            </div>
                            <div className="flex -space-x-2">
                              {product.related_images.map(
                                (teamImage, index) => (
                                  <div
                                    key={index}
                                    className="w-10 h-10 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                                  >
                                    <img
                                      width={24}
                                      height={24}
                                      src={
                                        import.meta.env.VITE_IMAGE_URL +
                                        teamImage
                                      }
                                      alt={`Team member ${index + 1}`}
                                      className="w-full size-10"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                          {product.available ? "Yes" : "No"}
                        </TableCell>
                        {/* switch cell  */}
                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                          <Switch
                            size="sm"
                            color={
                              product.status === true
                                ? "blue"
                                : product.status === false
                                ? "warning"
                                : "error"
                            }
                            defaultChecked={product.status}
                            label={product.status ? "Active" : "Inactive"}
                            onChange={(checked) =>
                              changeStatus({ product, checked })
                            }
                          />
                        </TableCell>
                        {/* action cells */}
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
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
              totalItems={totalProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={limit}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </ComponentCard>
      </div>
      {/* product show details modal  */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-[700px] h-screen"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className=" pr-14">
            <div className="flex justify-center items-center gap-10">
              <div className="relative-images">
                <div className="flex flex-col gap-5">
                  {selectedProduct?.related_images.map((image, index) => (
                    <img
                      key={index}
                      width={100}
                      height={100}
                      src={import.meta.env.VITE_IMAGE_URL + image}
                      alt={selectedProduct?.name}
                      className="related-image"
                    />
                  ))}
                </div>
              </div>
              <div className="thumbnail">
                <img
                  width={300}
                  height={300}
                  src={
                    import.meta.env.VITE_IMAGE_URL + selectedProduct?.thumbnail
                  }
                  alt={selectedProduct?.name}
                />
              </div>
            </div>
            <h1 className=" text-xl font-medium text-gray-800  dark:text-white/90 mt-5">
              Product ID: {selectedProduct?.id}
            </h1>
            <h3 className="mb-2 text-3xl font-semibold text-gray-800 dark:text-white/90 ">
              {selectedProduct?.name}
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <div className="product-price flex flex-row gap-10 mb-6">
            <div className="old_price  ">
              <Label>Old Price</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProduct?.old_price}
              </p>
            </div>
            <div className="new-price">
              <Label>New Price</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProduct?.new_price}
              </p>
            </div>
            <div className="product-quantity">
              <Label>Quantity</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProduct?.quantity}
              </p>
            </div>
            <div className="product-available">
              <Label>Available</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProduct?.available ? "Yes" : "No"}
              </p>
            </div>
            <div className="product-status">
              <Label>Status</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProduct?.status ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div className="product-description">
            <Label>Description</Label>
            <pre className="text-sm text-gray-500 dark:text-gray-400">
              {selectedProduct?.description}
            </pre>
          </div>
          <div className="product-create-update flex flex-row gap-10 mt-6">
            <div className="createAt">
              <Label>Created At</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(selectedProduct?.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="updatedAt">
              <Label>Updated At</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(selectedProduct?.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="user-profile">
              <Label>Created By</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProduct?.user?.name} S Profile
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* product edit modal */}
      {/* product edit modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className="max-w-[700px] h-[80vh] overflow-y-auto m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-10 text-4xl font-semibold text-gray-800 dark:text-white/90 text-center ">
              Edit Product Information
            </h4>
          </div>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {/* Product ID - Read Only */}
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product ID *
              </label>
              <Input
                type="text"
                name="id"
                id="id"
                placeholder="Enter unique product ID"
                required
                readOnly
                value={selectedProduct?.id || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    id: e.target.value,
                  })
                }
              />
            </div>

            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name *
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter product name"
                required
                value={selectedProduct?.name || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description *
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter product description"
                value={selectedProduct?.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
                rows="3"
                required
                className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent  text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              />
            </div>

            {/* Price Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Old Price */}
              <div>
                <label
                  htmlFor="old_price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Original Price *
                </label>
                <Input
                  type="number"
                  name="old_price"
                  id="old_price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  value={selectedProduct?.old_price || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      old_price: e.target.value,
                    })
                  }
                />
              </div>

              {/* New Price */}
              <div>
                <label
                  htmlFor="new_price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sale Price *
                </label>
                <Input
                  type="number"
                  name="new_price"
                  id="new_price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  value={selectedProduct?.new_price || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      new_price: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category *
              </label>
              <select
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-white/90"
                value={selectedProduct?.category?._id || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: {
                      ...selectedProduct?.category,
                      _id: e.target.value,
                    },
                  })
                }
                name="category"
                required
              >
                <option value="">Select a category</option>
                {category?.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity *
              </label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="0"
                min="0"
                required
                value={selectedProduct?.quantity || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: e.target.value,
                  })
                }
              />
            </div>

            {/* Product Thumbnail with Preview */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Thumbnail
              </label>
              <input
                ref={thumbnailInputRef}
                className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900  dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/3 dark:file:text-gray-400 dark:placeholder:text-gray-400"
                accept="image/*"
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const previewUrl = URL.createObjectURL(e.target.files[0]);
                    setThumbnailPreview(previewUrl);
                  }
                }}
              />

              {/* Thumbnail Preview */}
              {(thumbnailPreview || selectedProduct?.thumbnail) && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Preview:
                  </p>
                  <div className="relative inline-block">
                    <img
                      src={
                        thumbnailPreview ||
                        `${import.meta.env.VITE_IMAGE_URL}${
                          selectedProduct?.thumbnail
                        }`
                      }
                      alt="Thumbnail preview"
                      className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview(null);
                        if (thumbnailInputRef.current) {
                          thumbnailInputRef.current.value = "";
                        }
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Product Images with Preview */}
            <div>
              <label
                htmlFor="related_images"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Images
              </label>
              <input
                ref={imagesInputRef}
                accept="image/*"
                type="file"
                multiple
                name="related_images"
                id="related_images"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    const newPreviews = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      newPreviews.push(URL.createObjectURL(e.target.files[i]));
                    }
                    setImagePreviews(newPreviews);
                  }
                }}
                className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900  dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/3 dark:file:text-gray-400 dark:placeholder:text-gray-400"
              />

              {/* Images Preview */}
              {(imagePreviews.length > 0 ||
                selectedProduct?.related_images?.length > 0) && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      Images Preview:
                    </p>
                    <button
                      type="button"
                      onClick={clearAllImages}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {/* New image previews */}
                    {imagePreviews.map((preview, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImagePreview(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {/* Existing image previews */}
                    {!imagePreviews.length &&
                      selectedProduct?.related_images?.map((image, index) => (
                        <div key={`existing-${index}`} className="relative">
                          <img
                            src={`${import.meta.env.VITE_IMAGE_URL}${image}`}
                            alt={`Existing ${index + 1}`}
                            className="h-24 w-full object-cover rounded-lg border border-gray-300"
                          />
                          <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            ✓
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="available"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Availability
              </label>
              <select
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                name="available"
                id="available"
                value={selectedProduct?.available?.toString() || "true"}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    available: e.target.value === "true",
                  })
                }
              >
                <option value="true">Available</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                name="status"
                id="status"
                value={selectedProduct?.status?.toString() || "true"}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    status: e.target.value === "true",
                  })
                }
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto"
              >
                {loading ? "Updating Product..." : "Update Product"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AllProducts;
