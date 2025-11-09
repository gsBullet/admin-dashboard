import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ Fixed import
import AdminLayout from "./adminLayout/AdminLayout";
import Admin from "./pages/admin/Admin";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Admin/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
