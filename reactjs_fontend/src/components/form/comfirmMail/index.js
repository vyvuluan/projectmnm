import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import swal from "sweetalert";

const ComfirmMail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const history = useNavigate();

  const email = searchParams.get("email");

  const [code, setCode] = useState({
    code: "",
  });
  const handleInput = (e) => {
    e.persist();
    setCode({ ...code, [e.target.name]: e.target.value });
  };
  // console.log(code);
  const handleComfirmEmail = (e) => {
    e.preventDefault();
    const data = {
      code: code.code,
    };
    axios
      .put(`api/confirm-email/${email}`, data)
      .then((res) => {
        if (res.data.status == 200) {
          swal("Success", res.data.message, "success");
        }
        history("/login");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handleBackCode = (e) => {
    e.preventDefault();
    axios
      .post(`api/gui-lai-code/${email}`)
      .then((res) => {
        if (res.data.status == 200) {
          swal("Success", res.data.message, "success");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleComfirmEmail}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Xác nhận Email</h3>

            <div className="form-group mt-3">
              <div className="text-center">
                <label style={{ color: "green" }}>
                  Vui lòng kiểm tra email để lấy mã xác nhận
                </label>
              </div>
              <input
                type="number"
                name="code"
                className="form-control mt-1 shadow-sm"
                placeholder="Nhập mã xác nhận"
                onChange={handleInput}
                value={code.code}
                required
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary shadow-sm">
                Xác nhận
              </button>
            </div>
            <div className="text-center text-uppercase mt-3 fw-bold">
              <a href="#" onClick={handleBackCode}>
                lấy lại mã xác nhận
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ComfirmMail;
