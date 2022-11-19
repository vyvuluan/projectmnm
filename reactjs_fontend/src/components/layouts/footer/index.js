import React from "react";
import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import { render } from "react-dom";

const Footers = () => {
    
  return (
    <Footer
    className="border-top shadow-sm"
      theme={'light'}
      maxColumnsPerRow={4}
      columns={[
        {
          title: "GIỚI THIỆU",
          items: [
            {
              title: "Về chúng tôi",
              url: "http://localhost:3000/",
              openExternal: true,
            },
            {
              title: "Tư vấn mua hàng",
              url: "http://localhost:3000/",
              openExternal: true,
            },
            {
              title: "Tuyển dụng",
              url: "http://localhost:3000/",
            },
          ],
        },
        {
          title: "CHÍNH SÁCH CHUNG",
          items: [
            {
              title: "Chính sách trả góp",
              url: "http://localhost:3000/",
              openExternal: true,
            },
            {
              title: "Chính sách bảo mật",
              url: "http://localhost:3000",
              openExternal: true,
            },
            {
              title: "Chính sách giải quyết khiếu nại",
              url: "http://localhost:3000",
            },
            {
              title: "Chính sách bảo hành",
              url: "http://localhost:3000",
            },
          ],
        },
        {
          title: "THÔNG TIN KHUYẾN MÃI",
          items: [
            {
              title: "Tổng hợp khuyến mãi",
              url: "http://localhost:3000/",
              openExternal: true,
            },
            {
              title: "VGA Giảm Sâu",
              url: "http://localhost:3000",
              openExternal: true,
            },
            {
              title: "Laptop 1.990k - Giảm đến 50%",
              url: "http://localhost:3000",
            },
          ],
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
              alt="more products"
            />
          ),
          title: "HỖ TRỢ KHÁCH HÀNG",
          items: [
            {
              icon: (
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                  alt="yuque"
                />
              ),
              title: "Tổng hợp Hotline CSKH, phản ánh",
              url: "http://localhost:3000" ,
              openExternal: true,
            },
            {
              icon: (
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
                  alt="yuque"
                />
              ),
              title: "Thông tin thanh toán",
              url: "http://localhost:3000",
              openExternal: true,
            },
          ],
        },
      ]}
      bottom="Made with ❤️ L3M Team"
    />
  );
};

export default Footers;
