import React, { useEffect, useState } from "react";
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

const UserRoleList = () => {
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  const fetchUserRoles = async () => {
    setLoading(true);
    try {
      const response = await getAllUserRoles();

      if (response.success) {
        setUserRoles(response.data);
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, []);
  

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
          ) : userRoles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No user roles found
            </div>
          ) : (
            userRoles.length > 0 && (
              <Table className="space-y-6">
                <TableHeader className="border-b border-gray-800 dark:border-white/90">
                  <TableRow className="text-center">
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
                  {userRoles?.map((role) => (
                    <TableRow
                      key={role._id}
                      className="text-center hover:bg-gray-100 dark:hover:bg-white/3"
                    >
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {role.userRole}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {new Date(role.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        {new Date(role.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center  dark:text-gray-400">
                        <Switch
                          defaultChecked={role.status}
                          label={role.status ? "Active" : "Inactive"}
                          // onChange={() => toggoleStatus(role)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        <div className="flex gap-2 justify-center items-center">
                          <Button
                            size="sm"
                            variant="primary"
                            // onClick={() => handleEdit(cat)}
                            disabled={role.status === false}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            // onClick={() => handleDelete(cat._id)}
                            disabled={role.status === true}
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
    </div>
  );
};

export default UserRoleList;
