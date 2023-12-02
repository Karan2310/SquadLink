import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../slice/AdminSlice.js";
import { useCookies } from "react-cookie";

const SideNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token", "userId"]);
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("userId");
    dispatch(logoutAdmin());
    window.location.href = "/login";
  };

  const navs = [
    {
      name: "Home",
      path: "",
      icon: "fa-solid fa-house",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "fa-solid fa-display",
    },
    {
      name: "Trainers",
      path: "/trainers",
      icon: "fa-solid fa-house",
    },
    {
      name: "Member Info",
      path: "/member-info",
      icon: "fa-solid fa-house",
    },
    {
      name: "Edit Plans",
      path: "/plans",
      icon: "fa-solid fa-house",
    },
    {
      name: "Get Invoice",
      path: "/invoice",
      icon: "fa-solid fa-house",
    },
  ];

  return (
    <div className="navigation rounded p-3 d-flex flex-column">
      <div style={{ overflow: "auto" }}>
        {navs.map((e) => {
          const { name, path, icon } = e;
          return (
            <NavLink to={path} className="navlink my-2 rounded-s ">
              <i className={`me-2 ms-2 ${icon}`}></i>
              <p>{name}</p>
            </NavLink>
          );
        })}
      </div>

      <div>
        <div className="divider my-3"></div>
        <NavLink to="/new-member" className="navlink my-2 rounded-s ">
          <i className="fa-solid fa-user-plus me-2 ms-2"></i>
          <p>New Member</p>
        </NavLink>
        <button
          className="logout-btn flexbox px-3 p-2 w-100 rounded-s"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket me-2 ms-2"></i>
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;
