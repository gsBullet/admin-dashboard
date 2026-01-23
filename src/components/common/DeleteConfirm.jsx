import React from "react";
import Swal from "sweetalert2";

const DeleteConfirm = ({icon, successTitle}) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return Swal.fire({
        title: successTitle,
        text: "Your file has been deleted Permanently.",
        icon: icon,
      });
    }
  });
};

export default DeleteConfirm;
