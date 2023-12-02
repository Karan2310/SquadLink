import React from "react";
import "./TopBar.css";
const TopBar = () => {
  return (
    <>
      <div className="topbar container-fluid mb-3 p-2 px-md-3">
        <div className="row w-100 flexbox">
          <div className="col-9 col-md-10">
            <p className="fw-bold title">SquadLink</p>
          </div>
          <div
            className="col-3 col-md-2"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <div className="avatar">
              <img
                className="img-fluid"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt="user"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
