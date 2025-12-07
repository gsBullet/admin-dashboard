import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import SweetAlert from "../../components/common/SweetAlert";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addHeroBanner } from "../../service/heroBanner";

const HeroBanner = () => {
  const { auth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("token", auth.token);
    const data = await addHeroBanner(formData);

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
          title="Add Title"
          description="Add Title page for ecommerce dashboard"
        />
        <PageBreadcrumb pageTitle="Add Title" />
        <ComponentCard
          title="Add Title"
          className="max-w-xl m-auto text-center"
        >
          <form
            onSubmit={handleSubmit}
            className="flex gap-1 justify-center items-center"
          >
            <div>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="title of the banner"
              />
            </div>
            <div>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="title of the banner"
              />
            </div>

            <div className="">
              <Button type="submit">Add Hero Bannner</Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </div>
  );
};

export default HeroBanner;
