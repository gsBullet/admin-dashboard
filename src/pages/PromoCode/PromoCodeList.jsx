import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { changePromoStatus, getAllPromos } from "../../service/Promo";
import LoadingBtn from "../UiElements/LoadingBtn";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Switch from "../../components/form/switch/Switch";
import SweetAlert from "../../components/common/SweetAlert";
import Button from "../../components/ui/button/Button";
import PromoCodeModal from "./modal/PromoCodeModal";
import TablePagination from "../Tables/TablePagination";

const PromoCodeList = () => {
  const { auth } = useContext(AuthContext);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        // setLoading(true);
        const response = await getAllPromos({
          token: auth.token,
          limit,
          page: currentPage,
          search: searchTerm,
        });
        setPromoCodes(response.data.promoCodes);
        setTotalProducts(response.data.totalPromoCodes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token, currentPage, limit, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      try {
        await fetch(`/api/promocodes/${id}`, { method: "DELETE" });
      } catch (error) {
        console.error("Error deleting promo code:", error);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      // setLoading(true);
      const response = await changePromoStatus({
        token: auth.token,
        id,
        isActive: currentStatus,
      });
      if (response.success) {
        SweetAlert({
          title: response.message,
          icon: "success",
        });
        setPromoCodes((prevCodes) =>
          prevCodes.map((promo) =>
            promo._id === id ? { ...promo, isActive: currentStatus } : promo,
          ),
        );
      } else {
        SweetAlert({
          title: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      SweetAlert({
        title: error.response?.data?.message || "Error updating status",
        icon: "error",
      });
      console.error("Error updating status:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleEditModal = (promo) => {
    // Implement edit modal logic here
    setModalData(promo);
    setIsOpen(true);
    // console.log(promo);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center ">
          <LoadingBtn />
        </div>
      ) : (
        <>
          <PageMeta
            title="Promo Code List"
            description="Promo Code List Page"
          />
          <PageBreadcrumb pageTitle="Promo Code List" />
          <ComponentCard title="Promo Code List" className=" text-xl mt-6">
            <div className="max-w-6xl mx-auto p-6 ">
              <div className="flex justify-end items-center gap-3 mb-6">
                {/* Search Bar */}
                <div className="">
                  <Input
                    type="text"
                    placeholder="Search promo codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Link
                    to="/add-promo-code"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Create Promo
                  </Link>
                </div>
              </div>

              {/* Promo Codes Table */}
              <div className="rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className=" dark:bg-gray-600 bg-gray-200">
                    <tr className="text-center">
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Serial
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Code
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Discount
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Validity
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Usage
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Status
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-white/90">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {promoCodes.map((promo) => (
                      <tr
                        key={promo._id}
                        className="dark:hover:bg-gray-700 dark:text-white/90 hover:bg-gray-100 text-center"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {promoCodes.indexOf(promo) + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-mono ">{promo.code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900 dark:text-white/90">
                            {promo.discountType === "percentage"
                              ? `${promo.discountValue}% off`
                              : `$${promo.discountValue} off`}
                          </div>
                          {promo.minPurchaseAmount > 0 && (
                            <div className="text-sm text-gray-500 dark:text-white/90">
                              Min: ${promo.minPurchaseAmount}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div>
                              From:{" "}
                              {format(new Date(promo.validFrom), "dd/MM/yyyy")}
                            </div>
                            <div>
                              To:{" "}
                              {format(new Date(promo.validUntil), "dd/MM/yyyy")}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div>Used: {promo.usedCount || 0}</div>
                            <div>Limit: {promo.usageLimit || "Unlimited"}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Switch
                            size="sm"
                            color={
                              promo.isActive === true
                                ? "blue"
                                : promo.isActive === false
                                  ? "warning"
                                  : "error"
                            }
                            defaultChecked={promo.isActive}
                            label={promo.isActive ? "Active" : "Inactive"}
                            onChange={(checked) =>
                              toggleStatus(promo._id, checked)
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                          <div className="flex gap-3">
                            <Button
                              size="sm"
                              variant="primary"
                              disabled={!promo.isActive}
                              onClick={() => handleEditModal(promo)}
                            >
                              <i
                                className="fa fa-edit text-xl"
                                aria-hidden="true"
                              ></i>
                            </Button>
                            <Button
                              variant="danger"
                              disabled={promo.isActive}
                              onClick={() => handleDelete(promo._id)}
                              // className="text-red-600 hover:text-red-800"
                            >
                              <i
                                className="fa fa-trash text-xl"
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

                {promoCodes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No promo codes found
                  </div>
                )}
              </div>
            </div>
            {isOpen && (
              <PromoCodeModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={modalData}
              />
            )}
          </ComponentCard>
        </>
      )}
    </>
  );
};

export default PromoCodeList;
