import React, { useEffect, useState } from "react";
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
import {
  deleteAvatarBanner,
  getAllAvatarBanner,
  updateAvatarBannerStatus,
  updateAvatarBanner,
} from "../../service/avatarBanner";
import Label from "../../components/form/Label";
const IMG_URL = import.meta.env.VITE_IMAGE_URL;

const AvatarBannerList = () => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const pageSizeOptions = [5, 10, 20, 50, 100];

  // Modal
  const { isOpen, openModal, closeModal } = useModal();
  const [editAvatarBanner, setEditAvatarBanner] = useState(null);
  const [avatarBanner, setAvatarBanner] = useState([]);

  // Edit form fields
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(editImage);
  

  // ---------- FETCH ----------
  const fetchAvatarBanner = async () => {
    setLoading(true);
    const data = await getAllAvatarBanner({
      page: currentPage,
      limit,
      token: auth.token,
    });
    setAvatarBanner(data.banners);
    setTotalPages(data.totalPages);
    setTotalItems(data.totalItems);

    setLoading(false);
  };

  useEffect(() => {
    fetchAvatarBanner();
  }, [currentPage, limit]);

  // ---------------- EDIT ----------------
  const handleEdit = (banner) => {
    setEditAvatarBanner(banner);

    setEditTitle(banner.title);
    setEditDesc(banner.desc);
    setImagePreview(IMG_URL + banner.avatar);

    openModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editAvatarBanner?._id) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("desc", editDesc);
    if (editImage) formData.append("avatar", editImage);

    try {
      // You need API function for update
      const response = await updateAvatarBanner({
        id: editAvatarBanner._id,
        formData,
        token: auth.token,
      });
      SweetAlert({ icon: "success", title: response.message });
      closeModal();
      fetchAvatarBanner();
    } catch (err) {
      SweetAlert({
        icon: "error",
        title: err.response?.data?.message || "Update failed",
      });
    }

    setIsSubmitting(false);
  };

  // ---------- update status ----------
  const toggoleStatus = async (data) => {
    const response = await updateAvatarBannerStatus({
      id: data._id,
      status: !data.status,
      token: auth.token,
    });
    SweetAlert({ icon: "success", title: response.message });
    setAvatarBanner((prev) => {
      return prev.map((c) =>
        c._id === data._id ? { ...c, status: !c.status } : c
      );
    });
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
      const response = await deleteAvatarBanner({ id, token: auth.token });
      SweetAlert({ icon: "success", title: response.message });

      // Remove from UI
      setAvatarBanner((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      SweetAlert({ icon: "error", title: err.response?.data?.message });
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
        title="All Avatar Banners | Admin Panel"
        description="This is React.js All Avatar Banners Dashboard page "
      />
      <PageBreadcrumb pageTitle="All Avatar Banners" />

      <div className="space-y-6">
        <ComponentCard title="All Avatar Banners" className="text-center">
          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="overflow-x-auto rounded-xl border ">
              {loading ? (
                <div className="flex justify-center items-center">
                  <LoadingBtn />
                </div>
              ) : (
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
                        Description
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                      >
                        Avatar
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
                    {avatarBanner.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-gray-500"
                        >
                          No banner found
                        </TableCell>
                      </TableRow>
                    ) : (
                      avatarBanner?.map((banner) => (
                        <TableRow
                          key={banner._id}
                          className="text-center hover:bg-gray-100 dark:hover:bg-white/3"
                        >
                          <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                            {banner.title}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                            {banner.desc}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                            <img
                              src={IMG_URL + banner.avatar}
                              alt={banner.title}
                              className="w-20 h-20 object-cover border"
                            />
                          </TableCell>

                          <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                            {new Date(banner.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                            {new Date(banner.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-center  dark:text-gray-400">
                            <Switch
                              defaultChecked={banner.status}
                              label={banner.status ? "Active" : "Inactive"}
                              onChange={() => toggoleStatus(banner)}
                            />
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                            <div className="flex gap-2 justify-center items-center">
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleEdit(banner)}
                                disabled={banner.status === false}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(banner._id)}
                                disabled={banner.status === true}
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
              )}
            </div>
          </div>
          {/* Pagination Bar */}
          {totalItems > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 pb-4">
              {/* Showing X–Y of Z */}
              <div className="text-sm text-gray-600">
                Showing
                <strong>
                  {startItem}-{endItem}
                </strong>
                of <strong>{totalItems}</strong> banneregories
              </div>

              {/* Per page */}
              <div className="flex items-center gap-3 px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                <div>
                  <span className="text-sm text-gray-600">Per page:</span>
                </div>
                <div>
                  <select
                    value={limit}
                    onChange={(e) =>
                      handlePageSizeChange(Number(e.target.value))
                    }
                    className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {pageSizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
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
        <Modal isOpen={isOpen} onClose={closeModal}  className=" max-w-xl m-4">
          <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <form onSubmit={handleSave} className="p-8 space-y-8">
              {/* Title Input */}
              <div className="group">
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Avatar Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter a captivating title..."
                  className="w-full px-4 py-3 rounded-lg border-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              {/* Full Description Textarea */}
              <div className="group">
                <Label
                  htmlFor="desc"
                  className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Full Description
                </Label>
                <textarea
                  name="desc"
                  id="desc"
                  placeholder="Provide a detailed description of your banner..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-slate-700 resize-none dark:text-white/90"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
              </div>

              {/* Image Upload with Preview */}
              <div className="group">
                <Label
                  htmlFor="avatarImg"
                  className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  avatar Image
                </Label>

                <div className="relative">
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    // required
                  />

                  <label
                    htmlFor="avatar"
                    className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 overflow-hidden group"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            Click to change image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-16 h-16 mb-4 text-slate-400 group-hover:text-indigo-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm font-semibold text-slate-600">
                          <span className="text-indigo-600">
                            Click to upload
                          </span>
                          or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">
                          PNG, JPG, WEBP (MAX. 5MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Banner...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Create avatar Banner
                    </>
                  )}
                </Button>

                <button
                  type="reset"
                  onClick={() => setImagePreview(null)}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 dark:text-white/90 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AvatarBannerList;
