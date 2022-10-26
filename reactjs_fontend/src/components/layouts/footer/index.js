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
              url: "https://pro.ant.design/",
              openExternal: true,
            },
            {
              title: "Tư vấn mua hàng",
              url: "https://mobile.ant.design/",
              openExternal: true,
            },
            {
              title: "Tuyển dụng",
              url: "https://kitchen.alipay.com/",
            },
          ],
        },
        {
          title: "CHÍNH SÁCH CHUNG",
          items: [
            {
              title: "Chính sách trả góp",
              url: "https://pro.ant.design/",
              openExternal: true,
            },
            {
              title: "Chính sách bảo mật",
              url: "https://mobile.ant.design/",
              openExternal: true,
            },
            {
              title: "Chính sách giải quyết khiếu nại",
              url: "https://kitchen.alipay.com/",
            },
            {
              title: "Chính sách bảo hành",
              url: "https://kitchen.alipay.com/",
            },
          ],
        },
        {
          title: "THÔNG TIN KHUYẾN MÃI",
          items: [
            {
              title: "Tổng hợp khuyến mãi",
              url: "https://pro.ant.design/",
              openExternal: true,
            },
            {
              title: "VGA Giảm Sâu",
              url: "https://mobile.ant.design/",
              openExternal: true,
            },
            {
              title: "Laptop 1.990k - Giảm đến 50%",
              url: "https://kitchen.alipay.com/",
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
              url: "https://yuque.com",

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
              url: "https://yunfengdie.com",

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
