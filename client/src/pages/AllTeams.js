import React from "react";
import { NavLink } from "react-router-dom";

const AllTeams = () => {
  return (
    <div>
      <h2>Teams</h2>
      <NavLink
        to="/teams/create-team"
        style={{
          position: "fixed",
          right: "40px",
          bottom: "40px",
          textDecoration: "none",
        }}
      >
        <button
          className="shadow"
          // onClick={open}
          style={{
            background: "#228BE6",
            color: "#fff",
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            border: 0,
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </NavLink>
    </div>
  );
};

export default AllTeams;
