import * as Bt from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
const ViewAccount = ({ viewAcc, showModal,setSubmitting }) => {
  // console.log(viewAcc.status);
  const id = viewAcc.id;
  const [valueRole, setValueRole] = useState(viewAcc?.role_id);
  const [valueStatus, setValueStatus] = useState(viewAcc?.status);
  const [errorUser, setErrorUser] = useState();
  const [errorEmail, setErrorEmail] = useState();

  const [errorRole, setErrorRole] = useState();
  const [errorStatus, setErrorStatus] = useState();
  const [updateAccount, setUpdateAccount] = useState({
    email: viewAcc?.email,
    // username: viewAcc?.username,
    role_id: viewAcc?.role_id,
    status: viewAcc?.status,
  });

  const handleChangeRole = (e) => {
    console.log(e.target.value);
    setValueRole(e.target.value);
  };
  const handleChangeStatus = (e) => {
    console.log(e.target.value);
    setValueStatus(e.target.value);
  };
  const handleInput = (e) => {
    console.log(e.target.value);
    e.persist();
    setUpdateAccount({ ...updateAccount, [e.target.name]: e.target.value });
  };
  const handleUpdateAccount = (e) => {
    // console.log(id);
    e.preventDefault();

    const data = {
      email: updateAccount.email,
      // username: updateAccount.username,
      role_id: valueRole,
      status: valueStatus,
    };

    axios
      .put(`/api/admin/manageUser/${id}`, data)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
          showModal(false);
          setSubmitting(true)
          
        }
        if (res.data.status === 400) {
          setErrorEmail(res.data.error?.email);
          // setErrorUser(res.data.error?.username);

          setErrorRole(res.data.error?.role_id);

          setErrorStatus(res.data.error?.status);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  console.log(updateAccount.status);
  return (
    <>
      <Bt.Form onSubmit={handleUpdateAccount}>
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-6">Email </Bt.FormLabel>{" "}
          <span className="text-danger ms-2 ">{errorEmail}</span>
          <Bt.FormControl
            type="text"
            name="email"
            placeholder="Số lượng"
            className="rounded-0"
            value={updateAccount.email}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>

        {/* <Bt.FormGroup className="mb-3" controlId="formAddress">
          <Bt.FormLabel className="fw-semibold fs-6">UserName</Bt.FormLabel>
          <span className="text-danger ms-2">{errorUser}</span>
          <Bt.FormControl
            type="text"
            className="rounded-0"
            name="username"
            value={updateAccount.username}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup> */}
        <Bt.FormLabel className="fw-semibold fs-6">Quyền</Bt.FormLabel>
        <span className="text-danger ms-2">{errorRole}</span>

        <Bt.FormGroup>
          <Bt.FormSelect
            name="role_id"
            // value={updateAccount.role_id}

            onChange={handleChangeRole}
            className="rounded-0 shadow-none mb-3 text-muted"
            defaultValue={updateAccount.role_id}
          >
            <option value={2}>admin</option>
            <option value={3}>kho</option>
            <option value={4}>nhân viên</option>
          </Bt.FormSelect>
        </Bt.FormGroup>
        <Bt.FormLabel className="fw-semibold fs-6">Trạng thái</Bt.FormLabel>
        <span className="text-danger ms-2">{errorStatus}</span>

        <Bt.FormGroup>
          <Bt.FormSelect
            name="status"
            // value={}

            onChange={handleChangeStatus}
            defaultValue={updateAccount.status}
            className="rounded-0 shadow-none mb-3 text-muted"
          >
            <option value={1}>Hoạt động</option>
            <option value={0}>Không hoạt động</option>
          </Bt.FormSelect>
        </Bt.FormGroup>

        <Bt.Button
          variant="primary"
          type="submit"
          className="rounded-0 py-2 mt-3"
          // onClick={() => handleUpdateAccount(viewAcc.id)}
        >
          Chỉnh sửa
        </Bt.Button>
      </Bt.Form>
    </>
  );
};
export default ViewAccount;
