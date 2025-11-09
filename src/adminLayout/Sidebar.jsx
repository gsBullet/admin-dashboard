import React from "react";
import "./css/sidebar.css";
import addProductIcon from "../assets/Admin_Assets/Product_Cart.svg";
import listProduct from "../assets/Admin_Assets/Product_list_icon.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"add-product"}>
        <div className="sidebar-item">
          <img src={addProductIcon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"list-product"}>
        <div className="sidebar-item">
          <img src={listProduct} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
