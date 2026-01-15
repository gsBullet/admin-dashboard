import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import {
  changeGeneralUserStatusByPending,
  getAllGeneralUsers,
} from "../../service/generalUsers";
import { useState } from "react";
import Badge from "../../components/ui/badge/Badge";
import TablePagination from "../Tables/TablePagination";
import Button from "../../components/ui/button/Button";
import CustomerProfile from "../../components/common/ShowCustomerProfile";
import Swal from "sweetalert2";
import SweetAlert from "../../components/common/SweetAlert";

const GeneralUsers = () => {
  const { auth } = useContext(AuthContext);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const [selectUser, setSelectUser] = useState(null);

  // console.log(users);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAllGeneralUsers = async () => {
    const response = await getAllGeneralUsers({
      token: auth.token,
      limit,
      currentPage,
      searchTerm,
    });
    if (response?.success) {
      setUsers(response.data.users);
      setTotalUsers(response.data.totalItems);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    }
    // console.log(response);
  };
  useEffect(() => {
    fetchAllGeneralUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.checkAuth, currentPage, limit, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (limit) => {
    setLimit(limit);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
  };
  const handleShowCustomerData = (user) => {
    // console.log(user);
    setIsOpen(true);
    setSelectUser(user);
  };
  const handleChangeCustomerStatus = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "question",

      showCloseButton: true, // ❌ close icon
      closeButtonAriaLabel: "Close",

      showDenyButton: true,
      showCancelButton: false,

      confirmButtonText: "Verify User",
      denyButtonText: "Star User",

      confirmButtonColor: "#16a34a",
      denyButtonColor: "#dc2626",

      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    // ✅ CONFIRM
    if (result.isConfirmed) {
      await changeGeneralUserStatusByPending({
        userId,
        token: auth.token,
        status: "verified",
        isVerified: true,
      });
      setUsers((preUsers) => preUsers.filter((user) => user._id !== userId));
      SweetAlert({
        type: "toast",
        icon: "success",
        title: "Verified User Successfully",
      });
    }

    // ❌ DENY (Cancel Order)
    else if (result.isDenied) {
      // await cancelOrdersByAdmin(orderId, auth.token);
      // SweetAlert({
      //   type: "toast",
      //   icon: "warning",
      //   title: "Order Cancelled Successfully",
      // });
      console.log("Denied");
    }
  };
  return (
    <div>
      <PageMeta
        title="General Users"
        description="General users   page for ecommerce dashboard"
      />
      <PageBreadcrumb pageTitle="General Users" />
      <ComponentCard
        title="General Users"
        className="max-w-6xl m-auto text-center"
      >
        <div className="overflow-x-auto  ">
          <div className="flex justify-end items-center flex-wrap">
            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="px-4 pb-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
              <Button size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
          <table className="min-w-full divide-y text-gray-800 dark:text-white/90">
            <thead className="bg-gray-300 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-semibold uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-semibold uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-semibold uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-semibold uppercase tracking-wider"
                >
                  Total Orders
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-semibold uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-semibold uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:bg-gray-900">
              {users?.map((user, index) => (
                <tr
                  key={index}
                  className={`${user.totalPayment > 5 ? "bg-indigo-500" : "hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                >
                  <td className=" py-4 whitespace-nowrap">{user.name}</td>
                  <td className=" py-4 whitespace-nowrap">{user.email}</td>
                  <td className=" py-4 whitespace-nowrap">{user.phone}</td>
                  <td className=" py-4 whitespace-nowrap">
                    {user.totalPayment}
                  </td>
                  <td className=" py-4 whitespace-nowrap">
                    <Badge
                      size="sm"
                      color={
                        user.isVerified || user.totalPayment > 5
                          ? "success"
                          : "error"
                      }
                    >
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </Badge>
                  </td>
                  <td className=" py-4 flex gap-2 justify-center items-center whitespace-nowrap">
                    <div>
                      <button
                        onClick={() => handleShowCustomerData(user)}
                        className="hover:text-green-500"
                      >
                        <i
                          class="fa fa-eye text-xl"
                          aria-hidden="true"
                          title="show data"
                        ></i>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleChangeCustomerStatus(user._id)}
                        className="hover:text-blue-700"
                      >
                        <i
                          class="fas fa-bolt text-xl px-1"
                          aria-hidden="true"
                          title="Change Type"
                        ></i>
                      </button>
                    </div>
                    <div>
                      <button
                      className="hover:text-red-700"
                      >
                        <i
                          class="fa fa-trash text-xl"
                          aria-hidden="true"
                          title="delete data"
                        ></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <TablePagination
              totalItems={totalUsers}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={limit}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
        {isOpen && (
          <CustomerProfile
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectUser={selectUser}
          />
        )}
      </ComponentCard>
    </div>
  );
};

export default GeneralUsers;
