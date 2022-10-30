import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const LoginGoogle = (props) => {
  
  // const [data, setData] = useState({});
  // console.log(props.l);
    
  return (
    <>
      <a
        type="button"
        variant="contained"
        color="primary"
        href={props.loginGG}
        className="p-1 border m-1 btnCus shadow-sm rounded"
        style={{textDecoration:"none", textAlign:"center"}}
      >
        <img
          width="20px"
          style={{ marginBottom: "3px", marginRight: "5px" }}
          alt="Google sign-in"
          src="https://img.icons8.com/color/48/000000/google-logo.png"
        />
        Login with Google
      </a>
    </>
  );
};
export default LoginGoogle;
