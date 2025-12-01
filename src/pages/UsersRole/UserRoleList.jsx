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
import {
  deleteUserRole,
  getAllUserRoles,
  updateUserRole,
  updateUserRoleStatus,
} from "../../service/userRole";
import Switch from "../../components/form/switch/Switch";
import { Modal } from "../../components/ui/modal";
import SweetAlert from "../../components/common/SweetAlert";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { UserCircleIcon } from "../../icons";
import { AuthContext } from "../../context/AuthContext";

const UserRoleList = () => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [selectRole, setSelectRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const handleEdit = (role) => {
    setSelectRole(role);
    setIsOpen(true);
    // Implement edit functionality here
    console.log("Edit role:", role);
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userRole", selectRole.userRole);
    // Call update API here with formData and selectRole._id
    const data = await updateUserRole(selectRole._id, formData, auth.token);
    if (data?.success) {
      SweetAlert({
        icon: "success",
        title: data.message,
      });
      setIsOpen(false);
      setLoading(false);
      const response = await getAllUserRoles(auth.token);
      setUserRoles(response.data);
    } else {
      SweetAlert({
        icon: "error",
        title: data.response.data.message,
      });
    }
  };

  const toggoleStatus = async (role) => {
    console.log(role);

    // setLoading(true);
    try {
      // Call update API here with formData and selectRole._id
      const data = await updateUserRoleStatus({
        id: role._id,
        status: !role.status,
        token: auth.token,
      });

      if (data?.success) {
        SweetAlert({
          icon: "success",
          title: data.message,
        });

        setUserRoles(
          userRoles.map((r) =>
            r._id === role._id ? { ...r, status: !r.status } : r
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
      const data = await deleteUserRole({ id, token: auth.token });
      if (data?.success) {
        SweetAlert({
          icon: "success",
          title: data.message,
        });
        const response = await getAllUserRoles(auth.token);
        setUserRoles(response.data);
      } else {
        SweetAlert({
          icon: "error",
          title: data.response.data.message,
        });
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
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
                          onChange={() => toggoleStatus(role)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500   dark:text-gray-400">
                        <div className="flex gap-2 justify-center items-center">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleEdit(role)}
                            disabled={role.status === false}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(role._id)}
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit User Role"
        className=" max-w-xl m-4"
      >
        <div className="space-y-6">
          <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 mt-10">
            <form onSubmit={handleSubmitUpdate}>
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
                    value={selectRole?.userRole}
                    onChange={(e) =>
                      setSelectRole({
                        ...selectRole,
                        userRole: e.target.value,
                      })
                    }
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <UserCircleIcon className="size-6" />
                  </span>
                </div>
              </div>
              <div className="text-end mt-5">
                <Button type="submit">update Role</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserRoleList;
