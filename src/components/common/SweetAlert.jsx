import Swal from "sweetalert2";

/**
 * @param {Object} options
 * type: "toast" | "confirm"
 */
const SweetAlert = ({
  type = "toast",
  icon = "success",
  title = "",
  text = "",
  confirmButtonText = "OK",
  denyButtonText = "Cancel",
}) => {
  // ✅ TOAST
  if (type === "toast") {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      background: "#fff",
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    return Toast.fire({
      icon,
      title,
    });
  }

  // ✅ CONFIRM / CANCEL DIALOG
  if (type === "confirm") {
    return Swal.fire({
      icon,
      title,
      text,
      showDenyButton: true,     // ❗ Cancel Order button
      showCancelButton: false,  // ❌ popup close cancel নাই
      confirmButtonText,
      denyButtonText,
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#dc2626",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }
};

export default SweetAlert;
