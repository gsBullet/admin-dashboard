import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { EnvelopeIcon, UserCircleIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import { addUserRole } from "../../service/userRole";
import SweetAlert from "../../components/common/SweetAlert";

const AddUserRole = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userRole", e.target.userRole.value);
    const data = await addUserRole(formData);
    if (data?.success) {
      SweetAlert({
        icon: "success",
        title: data.message,
      });
      e.target.reset();
    } else {
      SweetAlert({
        icon: "error",
        title: data.response.data.message,
      });
    }
  };
  return (
    <div>
      <PageMeta
        title="Add User Role"
        description="Add new user roles to the system"
      />
      <PageBreadcrumb pageTitle="Add User Role" />
      <ComponentCard
        title="Add User Role"
        className="max-w-2xl m-auto text-center"
      >
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            {/* full name  */}
            <div>
              <Label htmlFor={"userRole"} className={"text-start"}>
                User Role
              </Label>
              <div className="relative">
                <Input
                  placeholder="User role"
                  type="text"
                  className="pl-[62px]"
                  name="userRole"
                  id="userRole"
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <UserCircleIcon className="size-6" />
                </span>
              </div>
            </div>
            <div className="text-end mt-5">
              <Button type="submit">Add Role</Button>
            </div>
          </form>
        </div>
      </ComponentCard>
    </div>
  );
};

export default AddUserRole;
