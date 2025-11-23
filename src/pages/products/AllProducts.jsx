import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { getAllProducts, updateProductStatus } from "../../service/product";
import Switch from "../../components/form/switch/Switch";
import TablePagination from "../Tables/TablePagination";
import LoadingBtn from "../UiElements/LoadingBtn";
import { fetchAllCategoryForProduct } from "../../service/category";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

const AllProducts = () => {
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

  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const data = await fetchAllCategoryForProduct();
      setCategory(data);
    };
    getCategory();
  }, []);

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
  };

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
      });
      setProducts(response.data);
      setTotalProducts(response.pagination.totalProducts);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
    };
    fetchProducts();
  }, [currentPage, limit, searchTerm, available, sort, order, searchCategory]);

  const changeStatus = async ({ product, checked }) => {
    const response = await updateProductStatus(product._id, {
      status: checked,
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
    // Logic to show product details in a modal

    console.log(product);
    setIsOpen(true);
    setSelectedProduct(product);
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
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              {products.length === 0 ? (
                <div className="flex justify-center items-center my-10 ">
                  <LoadingBtn />
                </div>
              ) : (
                <Table className={""}>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow className={"text-center"}>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Product Id
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Product Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Category
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Description
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Old Price
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        New Price
                      </TableCell>{" "}
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        product Images
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Available
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
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
                            {product.description}
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
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {product.quantity}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {product.available ? "Yes" : "No"}
                        </TableCell>
                        {/* switch cell  */}
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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
                              disabled={product.status === false}
                              className={`text-blue-600   dark:text-blue-400 px-1 py-1${
                                product.status === false
                                  ? " cursor-not-allowed opacity-30 "
                                  : "hover:bg-blue-600 hover:text-white"
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
                              className={`text-red-600   px-1 py-1 ${
                                product.status === true
                                  ? " cursor-not-allowed opacity-30 "
                                  : "hover:bg-red-600 hover:text-white  "
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <div className="flex justify-center items-center gap-10">
              <div className="relative-images">
                <div className="flex flex-col gap-5">
                  {selectedProduct?.related_images.map((image, index) => (
                    <img
                      key={index}
                      width={300}
                      height={300}
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
                  height={600}
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedProduct?.description}
            </p>
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
    </>
  );
};

export default AllProducts;
