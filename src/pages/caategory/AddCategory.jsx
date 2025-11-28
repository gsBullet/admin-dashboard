import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

import Button from "../../components/ui/button/Button";
import { addCategory } from "../../service/category";
import Input from "../../components/form/input/InputField";
import SweetAlert from "../../components/common/SweetAlert";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddCategory = () => {
  const { auth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("token", auth.token);
    const data = await addCategory(formData);

    if (data?.data) {
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
      <div>
        <PageMeta
          title="Add Category"
          description="Add category page for ecommerce dashboard"
        />
        <PageBreadcrumb pageTitle="Add Category" />
        <ComponentCard
          title="Add Category"
          className="max-w-xl m-auto text-center"
        >
          <form
            onSubmit={handleSubmit}
            className="flex gap-1 justify-center items-center"
          >
            <div>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Category Name"
              />
            </div>
            <div className="">
              <Button type="submit">Add Category</Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </div>
  );
};

export default AddCategory;
