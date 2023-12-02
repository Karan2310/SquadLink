import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import SideNavigation from "../components/SideNavigation/SideNavigation.js";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "../slice/UserSlice";
import { useCookies } from "react-cookie";
import TopBar from "../components/TopBar/TopBar.js";

const MainLayout = () => {
  const [cookies, removeCookie] = useCookies(["token", "userId"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token || !cookies.userId) {
      removeCookie("token");
      removeCookie("userId");
      dispatch(logoutUser());
      window.location.href = "/login";
    }
    dispatch(fetchUser(cookies.token))
      .unwrap()
      .catch((error) => {
        console.error("Failed to fetch user data: ", error);
        navigate("/login");
      });
  }, [dispatch, navigate]);

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row g-0">
          <div
            className="d-none d-md-flex col-md-4 col-lg-3 p-3 py-4  align-items-center justify-content-center"
            style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
          >
            <SideNavigation />
          </div>
          <div className="col-md-8 col-lg-9 px-4 px-md-0 py-4 pe-md-3 ">
            <TopBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
