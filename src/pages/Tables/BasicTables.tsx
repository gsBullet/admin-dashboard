import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="All Categories"
        description="All categories of products"
      />
      <PageBreadcrumb pageTitle="All Categories" />
      <div className="space-y-6">
        <ComponentCard title="Product Categories">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
