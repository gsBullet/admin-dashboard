import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

const GeneralUsers = () => {
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
        <div className="overflow-x-auto  mt-12">
          <table className="min-w-full divide-y text-gray-800 dark:text-white/90">
            <thead className="bg-gray-50 dark:bg-gray-800">
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
                  Address
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
              <tr>
                <td className=" py-4 whitespace-nowrap">Musharof</td>
                <td className=" py-4 whitespace-nowrap">Hg6X0@example.com</td>
                <td className=" py-4 whitespace-nowrap">+880 1234567890</td>
                <td className=" py-4 whitespace-nowrap">Dhaka, Bangladesh</td>
                <td className=" py-4 flex gap-2 justify-center items-center whitespace-nowrap">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </div>
  );
};

export default GeneralUsers;
