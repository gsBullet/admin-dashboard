import Swal from "sweetalert2";

const SweetAlert = ({ icon, title }) => {
 
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
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
};

export default SweetAlert;
