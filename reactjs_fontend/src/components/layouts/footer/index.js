import React from "react";
import * as Icon from "react-bootstrap-icons";
import { RiHomeSmileFill } from 'react-icons/ri'
import { FaEnvelope } from 'react-icons/fa'
import { MdOutlineSmartphone } from 'react-icons/md'

const Footers = () => {

  return (
    <footer className="text-white text-center text-lg-start bg-secondary">
      <div className="container p-4">
        <div className="row mt-4">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 text-dark">Về L3M SHOP</h5>

            <p className="text-dark">
              Chuyên Laptop-PC-Workstation. Với giá cả phải chăng chúng tôi tự hào đi sau trong lĩnh vực bán lẻ thiết bị công nghệ và phần cứng.
            </p>

            <p className="text-dark">
              Tự hào với chưa đầy 1 năm trong nghành chúng tôi đã lãnh nợ lên đến 4 nghìn tỷ.
            </p>

            <div className="mt-4 mb-3">
              <a
                className="text-dark px-2"
                href={"https://www.facebook.com/profile.php?id=100007156123173"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon.Facebook></Icon.Facebook>
              </a>
              <a
                className="text-dark px-2"
                href={"https://www.instagram.com/sontungmtp/"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon.Instagram></Icon.Instagram>
              </a>
              <a
                className="text-dark px-2"
                href={
                  "https://www.youtube.com/results?search_query=eunji+pyoapple"
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon.Youtube></Icon.Youtube>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">

            <ul className="fa-ul text-dark list-unstyled" style={{ marginLeft: "1.65em;" }}
            >
              <li className="mb-3">
                <span className="fa-li"><RiHomeSmileFill /></span><span className="ms-2 text-dark">273 An D.Vương, Phường 3, Quận 5</span>
              </li>
              <li className="mb-3">
                <span className="fa-li"><FaEnvelope /></span><span className="ms-2 text-dark">hotrol3m@gmail.com</span>
              </li>
              <li className="mb-3">
                <span className="fa-li"><MdOutlineSmartphone /></span><span className="ms-2 text-dark">+84 349 262 670</span>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 text-dark">Giờ mở cửa</h5>

            <table className="table text-center text-dark">
              <tbody className="font-weight-normal">
                <tr>
                  <td>Thứ 2 - 6:</td>
                  <td>8am - 10pm</td>
                </tr>
                <tr>
                  <td>Thứ 7:</td>
                  <td>8am - 3pm</td>
                </tr>
                <tr>
                  <td>Chủ nhật:</td>
                  <td>Nghỉ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
