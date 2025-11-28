import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import {
  EnvelopeIcon,
  EyeCloseIcon,
  EyeIcon,
  UserCircleIcon,
} from "../../icons";
import Select from "../../components/form/Select";
import { getAllUserRoles } from "../../service/userRole";
import Button from "../../components/ui/button/Button";
import { addUser } from "../../service/user";
import SweetAlert from "../../components/common/SweetAlert";

const AddUsers = () => {
  const [userRole, setUserRole] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(userRole);

  useEffect(() => {
    const fetchUserRoles = async () => {
      const roles = await getAllUserRoles();
      if (roles.success) {
        const roleOptions = roles?.data?.map((role) => ({
          value: role._id,
          label: role.userRole,
        }));
        setUserRole(roleOptions);
      }
    };
    fetchUserRoles();
  }, []);

  const userSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    const formData = new FormData();
    formData.append("firstName", e.target.firstName.value);
    formData.append("lastName", e.target.lastName.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("userRole", e.target.userRole.value);
    formData.append("password", e.target.password.value);

    try {
      const response = await addUser(formData);
      console.log(response);

      if (response.success) {
        SweetAlert({
          title: response.message,
          icon: "success",
        });
        e.target.reset();
      } else {
        SweetAlert({
          title: response.response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      SweetAlert({
        title: error.response.data.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <PageMeta title="Add Users" description="Add new users to the system" />
      <PageBreadcrumb pageTitle="Add Users" />
      <ComponentCard title="Add User" className="max-w-xl m-auto text-center">
        <form className="space-y-6" onSubmit={userSubmitHandler}>
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
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
          </div>
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
              />
              <span className="absolute left-0 top-1/3 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
          </div>
          {/* user role  */}
          <div>
            <Label className="text-start">Select User Role</Label>
            <select
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-white/90"
              name="userRole"
              required
            >
              <option value="">Select a role</option>
              {userRole?.map((role) => (
                <option
                  key={role.value._id}
                  value={role.value._id}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {role.label}
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
                required
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

          <div>
            <Button disabled={loading} type="submit" className="w-full">
              Add User
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
};

export default AddUsers;
