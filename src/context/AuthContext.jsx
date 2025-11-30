import React, { useEffect, useState, createContext } from "react";
import { checkUserAuth } from "../service/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState({
    checkAuth: false,
    token: "",
  });

  console.log("auth", auth);

  console.log("userInfo", userInfo);

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
