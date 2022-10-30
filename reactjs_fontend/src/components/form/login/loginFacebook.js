import React from "react";
import { Button } from "react-bootstrap";
const LoginFaceBook = (props) => {
  return (
    <>
      <a
        type="button"
        variant="contained"
        color="primary"
        className="p-1 border m-1 btnCus shadow-sm rounded"
        style={{ textDecoration: "none", textAlign: "center" }}
        onClick={props.loginFB}
      >
        <img
          width="20px"
          style={{ marginBottom: "3px", marginRight: "5px" }}
          alt="Google sign-in"
          src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
        />
        Login with Facebook
      </a>
    </>
  );
};
export default LoginFaceBook;
