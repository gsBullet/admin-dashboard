import { BrowserRouter as Router, Routes, Route } from "react-router";

import NotFound from "./pages/OtherPage/NotFound";

import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import FormElements from "./pages/Forms/FormElements";
import AddCategory from "./pages/caategory/AddCategory";
import ListCategory from "./pages/caategory/ListCategory";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import BasicTables from "./pages/Tables/BasicTables";
import AddProduct from "./pages/products/AddProduct";
import AllProducts from "./pages/products/AllProducts";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/all-category" element={<ListCategory />} />

            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/all-products" element={<AllProducts />} />

            {/* Others Page */}
            {/* <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} /> */}

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            {/* <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} /> */}

            {/* Charts */}
            {/* <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
