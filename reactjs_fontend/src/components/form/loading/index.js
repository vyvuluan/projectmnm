import React from "react";
export const Loading = () => {
  return (
    <>
      <div className="d-flex justify-content-center text-primary mt-3">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};
//chưa xử lý
export const ButtonLoading = () => {
  return (
    <>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="sr-only">Loading...</span>
      </button>
    </>
  );
};
