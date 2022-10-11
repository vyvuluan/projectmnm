import React from "react";
import { Button } from "react-bootstrap";
const LoginGoogle= () => {
    return(
        <>
            <Button
              type="submit"
              
              variant="contained"
              color="primary"
              className="p-1 border m-1 btnCus shadow-sm "
              
            //   onClick={handleGoogleLogin}
            >
              <img
                width="20px"
                style={{ marginBottom: "3px", marginRight: "5px" }}
                alt="Google sign-in"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                
              />
              Login with Google
            </Button>
        </>
    )
}
export default LoginGoogle