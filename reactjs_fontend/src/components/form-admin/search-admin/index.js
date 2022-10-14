import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchAdmin = () => {
  return (
    <>
      <form className="d-none d-sm-inline-block form-inline ml-md-3">
        <div
          className="input-group"
          //căn giữa
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "350px",
          }}
        >
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          ></input>

          <button className="btn btn-primary rounded-end r-0" type="button">
            <FaSearch />
          </button>
        </div>
      </form>
    </>
  );
};
export default SearchAdmin;
