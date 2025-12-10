import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
} from "react-router";

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
import UserProfiles from "./pages/UserProfiles";
import AddUsers from "./pages/Users/AddUsers";
import UserList from "./pages/Users/UserList";
import AddUserRole from "./pages/UsersRole/AddUserRole";
import UserRoleList from "./pages/UsersRole/UserRoleList";
import Buttons from "./pages/UiElements/Buttons";
// import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomeLayout from "./layout/homeLayout/HomeLayout";
import AddAvatarBanner from "./pages/AvatarBanner/AddAvatarBanner";
import AvatarBannerList from "./pages/AvatarBanner/AvatarBannerList";

export default function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}

          {auth.checkAuth && auth.token ? (
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/all-category" element={<ListCategory />} />

              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/all-products" element={<AllProducts />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              {/* <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} /> */}

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* ADD USERS */}
              <Route path="/add-user" element={<AddUsers />} />
              <Route path="/all-users" element={<UserList />} />

              {/* user role */}
              <Route path="/add-user-role" element={<AddUserRole />} />
              <Route path="/all-user-roles" element={<UserRoleList />} />

              {/* add hero banner  */}
              <Route path="/add-avatar-banner" element={<AddAvatarBanner/>} />
              <Route path="/avatar-banner-list" element={<AvatarBannerList/>} />

              {/* Ui Elements */}
              {/* <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} /> */}
              <Route path="/buttons" element={<Buttons />} />
              {/* <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} /> */}

              {/* Charts */}
              {/* <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
            </Route>
          ) : (
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
          )}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
