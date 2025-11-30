// import React, { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router";

const HomeLayout = () => {
  //   const { auth } = useContext(AuthContext);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
