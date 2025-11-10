import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ Fixed import
import AdminLayout from "./adminLayout/AdminLayout";
import Admin from "./pages/admin/Admin";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./adminLayout/AppLayout";

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
