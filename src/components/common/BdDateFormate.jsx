import React from "react";

const BdDateFormate = (date) => {
  return new Date(date).toLocaleString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default BdDateFormate;
