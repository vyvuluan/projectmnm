import React from "react";
import { MdDeleteForever } from "react-icons/md";
const ContactAdmin = () => {
  return (
    <>
      <div class="table-responsive-md">
        <form action="">
          <table class="table table-hover ">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  #id
                </th>
                <th className="text-center" scope="col">
                  Message
                </th>
                <th className="text-center" scope="col">
                  Ngày tạo
                </th>
                <th className="text-center" scope="col">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-center" scope="row">
                  1
                </th>
                <td
                  
                  style={{ maxWidth: "auto", wordWrap: "break-word",  }}
                >
                  mess here

                </td>
                <td className="text-center">Otto</td>
                <td className="text-center">
                  <a href="#">
                  <MdDeleteForever style={{width:"20px", height:"20px"}} />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
export default ContactAdmin;
