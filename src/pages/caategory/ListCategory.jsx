import React, { useEffect, useState } from "react";
import Axios from "../../service/Axios";
import { deleteCategory, updateCategory } from "../../service/category";
import SweetAlert from "../../components/common/SweetAlert";
import Swal from "sweetalert2";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Switch from "../../components/form/switch/Switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LoadingBtn from "../UiElements/LoadingBtn";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ListCategory = () => {
  const { auth } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const pageSizeOptions = [5, 10, 20, 50, 100];

  // Modal
  const { isOpen, openModal, closeModal } = useModal();
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  // ---------- FETCH ----------
  const fetchCategories = async (page = 1, size = limit) => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/category/all-category?page=${page}&limit=${size}`,
        {
          headers: {
            authorization: `EcomToken ${auth.token}`,
          },
        }
      );

      // Most backends return one of these two shapes
      const payload = res.data?.data || res.data?.categories || res.data;

      setCategories(payload || []);
      setCurrentPage(Number(res.data.currentPage) || page);
      setTotalPages(Number(res.data.totalPages) || 1);
      setTotalItems(Number(res.data.totalItems) || payload?.length || 0);
    } catch (err) {
      console.error(err);
      SweetAlert({ icon: "error", title: "Failed to load categories" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, limit);
  }, [currentPage, limit]);

  // ---------- EDIT ----------
  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    openModal();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingCategory?._id) return;

    try {
      const fd = new FormData();
      fd.append("name", categoryName);

      await updateCategory(editingCategory._id, fd, auth.token);

      SweetAlert({ icon: "success", title: "Category updated!" });
      setCategories((prev) =>
        prev.map((c) =>
          c._id === editingCategory._id ? { ...c, name: categoryName } : c
        )
      );
      closeModal();
    } catch (err) {
      SweetAlert({
        icon: "error",
        title: err.response?.data?.message || "Update failed",
      });
    }
  };

  // ---------- update status ----------
  const toggoleStatus = async (data) => {
    try {
      await Axios.post(`/category/update-category-status/${data._id}`, {
        status: !data.status,
      });

      setCategories((prev) =>
        prev.map((c) =>
          c._id === data._id ? { ...c, status: !data.status } : c
        )
      );
    } catch (error) {
      return error;
    }
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCategory({ id, token: auth.token });
      SweetAlert({ icon: "success", title: "Deleted!" });

      // Remove from UI
      setCategories((prev) => prev.filter((c) => c._id !== id));

      // If page becomes empty → go back one page
      if (categories.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch (err) {
      console.error(err);
      SweetAlert({ icon: "error", title: "Delete failed" });
    }
  };

  // ---------- PAGINATION ----------
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setLimit(size);
    setCurrentPage(1); // always start from page 1 when changing size
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  // ---------- RENDER ----------
  // if (loading) return <Loader />;

  return (
    <>
      <PageMeta
        title="All Categories"
        description="All categories of products"
      />
      <PageBreadcrumb pageTitle="All Categories" />

      <div className="space-y-6">
        <ComponentCard title="Product Categories" className="text-center">
          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="overflow-x-auto rounded-xl border ">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/5">
                  <TableRow className={"text-center"}>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      Created At
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      Updated At
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/50">
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <LoadingBtn />
                      </TableCell>
                    </TableRow>
                  ) : categories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat) => (
                      <TableRow
                        key={cat._id}
                        className="text-center hover:bg-gray-100 dark:hover:bg-white/5"
                      >
                        <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                          {cat.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                          {new Date(cat.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                          {new Date(cat.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-center  dark:text-gray-400">
                          <Switch
                            defaultChecked={cat.status}
                            label={cat.status ? "Active" : "Inactive"}
                            onChange={() => toggoleStatus(cat)}
                          />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                          <div className="flex gap-2 justify-center items-center">
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleEdit(cat)}
                              disabled={cat.status === false}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(cat._id)}
                              disabled={cat.status === true}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* Pagination Bar */}
          {totalItems > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 pb-4">
              {/* Showing X–Y of Z */}
              <div className="text-sm text-gray-600">
                Showing{" "}
                <strong>
                  {startItem}-{endItem}
                </strong>{" "}
                of <strong>{totalItems}</strong> categories
              </div>

              {/* Per page */}
              <div className="flex items-center gap-3 px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                <span className="text-sm text-gray-600">Per page:</span>
                <select
                  value={limit}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {pageSizeOptions.map((s) => (
                    <option key={s} value={s}>
                      <span className="text-gray-600">{s}</span>
                    </option>
                  ))}
                </select>
              </div>

              {/* Page buttons */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {/* Simple page numbers (max 7 visible) */}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) pageNum = i + 1;
                  else if (currentPage <= 4) pageNum = i + 1;
                  else if (currentPage >= totalPages - 3)
                    pageNum = totalPages - 6 + i;
                  else pageNum = currentPage - 3 + i;

                  return (
                    <Button
                      key={pageNum}
                      size="sm"
                      variant={currentPage === pageNum ? "primary" : "outline"}
                      onClick={() => goToPage(pageNum)}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  );
                }).filter(Boolean)}

                {totalPages > 7 && currentPage < totalPages - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {totalPages > 7 && (
                  <Button
                    size="sm"
                    variant={currentPage === totalPages ? "primary" : "outline"}
                    onClick={() => goToPage(totalPages)}
                    className="w-10"
                  >
                    {totalPages}
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </ComponentCard>

        {/* Edit Modal */}
        <Modal isOpen={isOpen} onClose={closeModal} className=" max-w-xl m-4">
          <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <form className="flex flex-col" onSubmit={handleSave}>
              <div className="custom-scrollbar h-[200px] overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Edit Category
                  </h5>

                  <Input
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 px-2  lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ListCategory;
