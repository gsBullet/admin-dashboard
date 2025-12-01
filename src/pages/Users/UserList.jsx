import React, { useContext, useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import LoadingBtn from "../UiElements/LoadingBtn";
import Button from "../../components/ui/button/Button";
import { getAllUserRoles } from "../../service/userRole";
import Switch from "../../components/form/switch/Switch";
import { Modal } from "../../components/ui/modal";
import SweetAlert from "../../components/common/SweetAlert";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { EyeCloseIcon, EyeIcon, UserCircleIcon } from "../../icons";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserStatus,
} from "../../service/user";
import { AuthContext } from "../../context/AuthContext";

const UserList = () => {
  const { auth } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [selectUserData, setSelectUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  // fetch user roles
  useEffect(() => {
    const fetchUserRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllUserRoles(auth.token);

        if (response.success) {
          setUserRoles(response.data);
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRoles();
  }, []);

  // fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(auth.token);
        console.log(response);

        if (response.success) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectUserData(user);
    setIsOpen(true);
    // Implement edit functionality here
  };
  const handleSubmitUpdate = async (e) => {
    console.log(e.target);

    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", e.target.firstName.value);
    formData.append("lastName", e.target.lastName.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("userRole", e.target.userRole.value);

    if (e.target.password.value) {
      formData.append("password", e.target.password.value);
    }

    const data = await updateUser({
      id: selectUserData._id,
      data: formData,
      token: auth.token,
    });
    if (data?.success) {
      const response = await getAllUsers(auth.token);
      SweetAlert({
        icon: "success",
        title: data.message,
      });
      setUserData(response.data);
      setIsOpen(false);
      setLoading(false);
    } else {
      SweetAlert({
        icon: "error",
        title: data.response.data.message,
      });
    }
  };

  const toggoleStatus = async ({ user, value }) => {
    console.log("check", user);

    // setLoading(true);
    try {
      // Call update API here with formData and selectRole._id
      const data = await updateUserStatus({
        id: user._id,
        status: value,
        token: auth.token,
      });

      if (data?.success) {
        SweetAlert({
          icon: "success",
          title: data.message,
        });

        setUserData(
          userData.map((r) =>
            r._id === user._id ? { ...r, status: value } : r
          )
        );
      } else {
        SweetAlert({
          icon: "error",
          title: data.response.data.message,
        });
      }
    } catch (error) {
      console.error("Error updating role status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Call delete API here with id
    try {
      const data = await deleteUser({ id, token: auth.token });
      if (data?.success) {
        SweetAlert({
          icon: "success",
          title: data.message,
        });
        const response = await getAllUsers(auth.token);
        setUserRoles(response.data);
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      SweetAlert({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowData = (role) => {
    setSelectUserData(role);
    setIsShowModal(true);
  };

  return (
    <div>
      <PageMeta
        title="All User Roles list"
        description="user roles to the system"
      />
      <PageBreadcrumb pageTitle="All User Roles list" />
      <ComponentCard title="User Role List" className=" text-center">
        <>
          {loading ? (
            <div className="text-center py-8 flex justify-center items-center ">
              <LoadingBtn />
            </div>
          ) : userData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No user roles found
            </div>
          ) : (
            userData.length > 0 && (
              <Table className="space-y-6">
                <TableHeader className="border-b border-gray-800 dark:border-white/90">
                  <TableRow className="text-center">
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      User Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500   dark:text-gray-400"
                    >
                      User Role
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

                <TableBody className="divide-y divide-gray-800 dark:divide-white/90">
                  {userData?.map((user) => (
                    <TableRow
                      key={user._id}
                      className="text-center hover:bg-gray-100 dark:hover:bg-white/3"
                    >
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {user.userRole.userRole}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center  dark:text-gray-400">
                        <Switch
                          defaultChecked={user.status}
                          label={user.status ? "Active" : "Inactive"}
                          onChange={(value) => toggoleStatus({ user, value })}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        <div className="flex gap-2 justify-center items-center">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleShowData(user)}
                          >
                            Show
                          </Button>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleEdit(user)}
                            disabled={user.status === false}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(user._id)}
                            disabled={user.status === true}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}
        </>
      </ComponentCard>

      {/* modal for show  */}
      <Modal
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        title="Edit User"
        className=" max-w-2xl m-4 "
      >
        <div className="rounded-3xl bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
          <div className="mt-12">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ">
              {/* Animated Gradient Header */}
              <div className="relative h-48 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse opacity-50"></div>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  }}
                ></div>
              </div>

              {/* Profile Section */}
              <div className="relative px-8 pb-8">
                {/* Profile Image with Glow Effect */}
                <div className="absolute -top-20 left-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={`https://ui-avatars.com/api/?name={selectUserData?.firstName}+{selectUserData?.lastName}&size=128&background=6366f1&color=fff&bold=true`}
                      alt="Profile"
                      className="relative w-40 h-40 rounded-full border-8 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute bottom-3 right-3 w-8 h-8 rounded-full border-4 border-white shadow-lg ${
                        selectUserData?.status ? "bg-green-500" : "bg-gray-400"
                      } animate-pulse`}
                    ></div>
                  </div>
                </div>

                {/* Status Badge - Top Right */}
                <div className="flex justify-end pt-6">
                  <div
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                      selectUserData?.status
                        ? "bg-linear-to-r from-green-400 to-emerald-500 text-white"
                        : "bg-linear-to-r from-gray-400 to-gray-500 text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {selectUserData?.status ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* User Info */}
                <div className="mt-16 mb-8">
                  <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-2">
                    {selectUserData?.firstName} {selectUserData?.lastName}
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span className="text-lg font-semibold text-purple-700">
                      {selectUserData?.userRole.userRole}
                    </span>
                  </div>
                </div>

                {/* Contact Information Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {/* Email Card */}
                  <div className="group relative bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                          Email Address
                        </p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {selectUserData?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group relative bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">
                          Phone Number
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectUserData?.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timestamps Section */}
                <div className="relative bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 border-2 border-purple-100">
                  <div className="absolute top-4 right-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></span>
                    Activity Timeline
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                          Created At
                        </p>
                      </div>
                      <p className="text-base font-bold text-gray-900 ml-4">
                        {new Date(selectUserData?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-xs text-gray-500 ml-4 mt-1">
                        {new Date(selectUserData?.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                        <p className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                          Last Updated
                        </p>
                      </div>
                      <p className="text-base font-bold text-gray-900 ml-4">
                        {new Date(selectUserData?.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-xs text-gray-500 ml-4 mt-1">
                        {new Date(selectUserData?.updatedAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex justify-center gap-4 mt-8">
              <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Edit Profile
              </button>
              <button className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200">
                View Activity
              </button>
            </div> */}
          </div>
        </div>
      </Modal>

      {/* modal for add  and edit  */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit User"
        className=" max-w-xl m-4"
      >
        <div className="space-y-6">
          <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 mt-10">
            <form onSubmit={handleSubmitUpdate} className="space-y-6">
              {/* First name  */}
              <div>
                <Label htmlFor={"firstName"} className={"text-start"}>
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter Your full name"
                    type="text"
                    className="pl-[62px]"
                    name="firstName"
                    required
                    id={"firstName"}
                    value={selectUserData?.firstName}
                    onChange={(e) =>
                      setSelectUserData({
                        ...selectUserData,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <UserCircleIcon className="size-6" />
                  </span>
                </div>
              </div>
              {/* last name  */}
              <div>
                <Label htmlFor={"lastName"} className={"text-start"}>
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter Your full name"
                    type="text"
                    className="pl-[62px]"
                    name="lastName"
                    required
                    id={"lastName"}
                    value={selectUserData?.lastName}
                    onChange={(e) =>
                      setSelectUserData({
                        ...selectUserData,
                        lastName: e.target.value,
                      })
                    }
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <UserCircleIcon className="size-6" />
                  </span>
                </div>
              </div>
              {/* email  */}
              <div>
                <Label htmlFor={"email"} className={"text-start"}>
                  Email
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter Your full name"
                    type="email"
                    className="pl-[62px]"
                    name="email"
                    required
                    id={"email"}
                    value={selectUserData?.email}
                    onChange={(e) =>
                      setSelectUserData({
                        ...selectUserData,
                        email: e.target.value,
                      })
                    }
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <UserCircleIcon className="size-6" />
                  </span>
                </div>
              </div>

              {/* phone  */}
              <div>
                <Label htmlFor={"phone"} className={"text-start"}>
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter Your phone number"
                    type="text"
                    className="pl-[62px]"
                    name="phone"
                    required
                    id={"phone"}
                    hint="Must start with 0 and max 11 digits"
                    pattern="^0\d{0,10}$"
                    value={selectUserData?.phone}
                    onChange={(e) =>
                      setSelectUserData({
                        ...selectUserData,
                        phone: e.target.value,
                      })
                    }
                  />
                  <span className="absolute left-0 top-1/3 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <UserCircleIcon className="size-6" />
                  </span>
                </div>
              </div>
              {/* user role  */}
              <div>
                <Label className="text-start">User Role</Label>
                <select
                  className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-white/90"
                  name="userRole"
                  required
                  value={selectUserData?.userRole._id}
                  onChange={(e) =>
                    setSelectUserData({
                      ...selectUserData,
                      userRole: e.target.value,
                    })
                  }
                >
                  <option value="">Select a role</option>

                  {userRoles?.map((role) => (
                    <option
                      key={role._id}
                      value={role._id}
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      {role.userRole}
                    </option>
                  ))}
                </select>
              </div>

              {/* password  */}
              <div>
                <Label htmlFor={"password"} className="text-start">
                  Password Input
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password at least 6 characters"
                    name={"password"}
                    id={"password"}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-end mt-5">
                <Button type="submit">update User</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
