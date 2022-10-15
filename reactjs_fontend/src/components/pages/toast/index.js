import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CheckToast = (props) => {
  return (
    <>
      {toast(props.mess)} 
      <ToastContainer />
    </>
  );
};
export default CheckToast;

// {
//   !check ? (
//     <>
//       {" "}
//       {toast("waiting...")} <ToastContainer />
//     </>
//   ) : null;
// }
