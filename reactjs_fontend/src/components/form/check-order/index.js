import React, { useEffect, useState } from "react";
import "./style.css";
import OrderDetail from "../order-detail";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as B from 'react-bootstrap'
import Breadcum from '../breadcum/index'

const checkStatus = [
  { id: 0, name: 'Đơn hàng chờ xác nhận', icon: 'pe-7s-cart' },
  { id: 1, name: 'Đơn hàng đã xác nhận', icon: 'pe-7s-config' },
  { id: 2, name: 'Đang đóng gói', icon: 'pe-7s-medal' },
  { id: 3, name: 'Đang vận chuyển', icon: 'pe-7s-car' },
  { id: 4, name: 'Giao hàng thành công', icon: 'pe-7s-home' },
];

const CheckOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState();

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/getStatusDH/${id}`).then(res => {
      if (isMounted) {
        if (res.status === 200) {
          setStatus(res.data.donHang.status);
        }
      }
      return () => isMounted = false;
    })
  }, [id]);

  const check = (stt) => {
    var x;
    switch (stt) {
      case 0: {
        x = 'Chờ xác nhận';
        break;
      }
      case 1: {
        x = 'Đã xác nhận';
        break;
      }
      case 2: {
        x = 'Đang đóng gói';
        break;
      }
      case 3: {
        x = 'Đang vận chuyển';
        break;
      }
      case 4: {
        x = 'Giao hàng thành công';
        break;
      }
      case 5: {
        x = 'Đơn hàng đã hủy';
        break;
      }
      default: {
        break;
      }
    }
    return x;
  }

  return (
    <>
      <Breadcum
        title='Tình trạng đơn hàng'
        BC={2}
        name='Tình trạng đơn hàng'
        link='/myorder'
        linkName='Đơn hàng'
      />

      <div className="container padding-bottom-3x mb-5 mt-5">
        <form action="">
          <div className="card mb-3">
            <div className="p-4 text-center text-white text-lg bg-primary">
              <span className="text-uppercase">Đơn hàng số - </span>
              <span className="text-medium">{id}</span>
            </div>
            <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
              <div className="w-100 text-center py-1 px-2">
                <span className="text-medium">Tình Trạng: </span> {check(status)}
              </div>
            </div>

            <div className="card-body">
              <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                {status !== 5 ?
                  checkStatus.map((item, index) => (
                    <div key={item.id} className={'step' + [status >= index ? ' completed' : '']}>
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <i className={item.icon}></i>
                        </div>
                      </div>
                      <h4 className="step-title">{item.name}</h4>
                    </div>
                  ))
                  :
                  <div className={'step completed'}>
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className='pe-7s-close-circle'></i>
                      </div>
                    </div>
                    <h4 className="step-title">Đơn hàng đã hủy</h4>
                  </div>}
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
            <div className="custom-control custom-checkbox mr-3">
              {/* <input
                className="custom-control-input"
                type="checkbox"
                id="notify_me"
              />
              <label className="custom-control-label" htmlFor="notify_me">
                Thông báo cho tôi khi đơn hàng được giao
              </label> */}
            </div>
            {/* <div className="text-left text-sm-right">
              <Link className="btn btn-outline-primary btn-rounded btn-sm " to={`/OrderDetail`}>
                Xem chi tiết đơn hàng
              </Link>

            </div> */}
          </div>
        </form>
      </div>
      {/* chi tiết đơn hàng */}
    </>
  );
};
export default CheckOrder;
