import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { EnvelopeIcon, UserCircleIcon } from "../../icons";

const AddUsers = () => {
  return (
    <div>
      <PageMeta title="Add Users" description="Add new users to the system" />
      <PageBreadcrumb pageTitle="Add Users" />
      <ComponentCard title="Add User" className="max-w-2xl m-auto text-center">
        <div className="space-y-6">
          {/* full name  */}
          <div>
            <Label className={"text-start"}>Full Name</Label>
            <div className="relative">
              <Input
                placeholder="Enter Your full name"
                type="text"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
          </div>
          {/* phone  */}
          <div>
            <Label className={"text-start"}>Phone</Label>
            <div className="relative">
              <Input
                placeholder="Enter Your phone number"
                type="text"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
            <div className="relative">
              <Input
                placeholder="Enter Your phone number"
                type="text"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
          </div>
          {/* user role  */}
          <div>
            <Label className={"text-start"}>Phone</Label>
            <div className="relative">
              <Input
                placeholder="Enter Your phone number"
                type="text"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
            <div className="relative">
              <Input
                placeholder="Enter Your phone number"
                type="text"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <UserCircleIcon className="size-6" />
              </span>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};

export default AddUsers;
