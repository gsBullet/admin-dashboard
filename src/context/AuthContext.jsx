import React, { useEffect, useState, createContext } from "react";
import { checkUserAuth } from "../service/auth";
import SweetAlert from "../components/common/SweetAlert";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState({
    checkAuth: false,
    token: "",
  });


  const checkUser = async () => {
    const token = await JSON.parse(localStorage.getItem("ecom"));
    const response = await checkUserAuth(token);
    // console.log("response", response);
    // console.log("token", token);

    if (token && response.success) {
      setAuth({
        checkAuth: true,
        token: token,
      });
      setUserInfo(response.data);
    }else{
      setAuth({
        checkAuth: false,
        token: "",
      });
      setUserInfo({});
      SweetAlert({
        title: "Session Expired",
        text: "Please login again to continue.",
        icon: "warning",
      })
    }
  };
  useEffect(() => {
    checkUser();
  }, [auth.checkAuth]); // run once

  const logout = () => {
    localStorage.removeItem("ecom");
    setAuth({
      checkAuth: false,
      token: "",
    });
    setUserInfo({});
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, userInfo, setUserInfo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
