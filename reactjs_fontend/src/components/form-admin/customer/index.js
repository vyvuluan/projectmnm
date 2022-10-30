import { BsTools } from "react-icons/bs";
import { Link } from "react-router-dom";

const Customer = () => {
  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#ID</th>
          <th scope="col">Họ Tên</th>
          <th scope="col">Ngày sinh</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Giới tính</th>
          <th scope="col">UserID</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>
            <Link to="/detailCustomer">
              <button type="submit" className="border-0 bg-primary rounded">
                <BsTools />
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Customer;
