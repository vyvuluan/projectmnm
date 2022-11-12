import * as Bt from "react-bootstrap";
import { Link } from "react-router-dom";
const SortProduct = () => {
  return (
    <>
      <Bt.Container fluid>
        <Bt.Row className="px-xl-4 pb-3">
          <Bt.Col sm={9}></Bt.Col>
          <Bt.Col sm={3}>
            <Bt.Dropdown
              style={{
                width: "158px",
                right: "0",
                marginRight: "10px",
                position: "absolute",
                textAlign: "left",
              }}
            >
              <Bt.Dropdown.Toggle id="dropdown-basic">
                Sắp xếp
              </Bt.Dropdown.Toggle>
              <Bt.Dropdown.Menu>
                <Bt.Dropdown.Item>
                  <Link
                    className="text-decoration-none"
                    to={"/pageproducts?key=1"}
                  >
                    Tên A - Z
                  </Link>
                </Bt.Dropdown.Item>

                <Bt.Dropdown.Item>
                  <Link
                    className="text-decoration-none"
                    to={"/pageproducts?key=2"}
                  >
                    Tên Z - A
                  </Link>
                </Bt.Dropdown.Item>
                <Bt.Dropdown.Item>
                  <Link
                    className="text-decoration-none"
                    to={"/pageproducts?key=3"}
                  >
                    Giá cao ➡️ thấp
                  </Link>
                </Bt.Dropdown.Item>
                <Bt.Dropdown.Item>
                  <Link
                    className="text-decoration-none"
                    to={"/pageproducts?key=4"}
                  >
                    Giá thấp ➡️ cao
                  </Link>
                </Bt.Dropdown.Item>
              </Bt.Dropdown.Menu>
            </Bt.Dropdown>
          </Bt.Col>
        </Bt.Row>
      </Bt.Container>
    </>
  );
};
export default SortProduct;
