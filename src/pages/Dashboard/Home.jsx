import PageMeta from "../../components/common/PageMeta";


export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="This is React.js Ecommerce Dashboard"
      />
      <div className="">
        <h1 className="text-7xl dark:text-gray-400">Welcome to Dashboard</h1>
      </div>
    </>
  );
}
