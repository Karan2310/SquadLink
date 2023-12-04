import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation/SideNavigation.js";
import Teams from "./Teams.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAdmin, logoutAdmin } from "../slice/AdminSlice.js";
import { useCookies } from "react-cookie";
import TopBar from "../components/TopBar/TopBar.js";
import { setUser } from "../slice/UserSlice.js";
import { SERVER_URL } from "../config.js";
import axios from "axios";
import { setLoading } from "../slice/AppSclice.js";
import MobileNav from "../components/MobileNav/MobileNav.js";
import Members from "./Members.js";

const MainLayout = () => {
  const [cookies, removeCookie] = useCookies(["token", "userId"]);
  const [currPage, setCurrPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDomain, setSearchDomain] = useState(["Finance", "Management"]);
  const [searchGender, setSearchGender] = useState(["Male", "Female"]);
  const [searchAvailable, setSearchAvailable] = useState(["true"]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fetchUserTrigger, setFetchUserTrigger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const triggerUser = () => {
    setFetchUserTrigger(!fetchUserTrigger);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      if (!cookies.token || !cookies.userId) {
        removeCookie("token");
        removeCookie("userId");
        dispatch(logoutAdmin());
        window.location.href = "/login";
      }

      try {
        await dispatch(fetchAdmin(cookies.token)).unwrap();
      } catch (error) {
        console.error("Failed to fetch admin data: ", error);
        navigate("/login");
      }

      try {
        const { data } = await axios.get(buildUrl());
        dispatch(setUser(data));
      } catch (error) {
        console.error("Can't fetch users", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [
    currPage,
    searchQuery,
    searchDomain,
    searchAvailable,
    searchGender,
    fetchUserTrigger,
  ]);

  const buildUrl = () => {
    const url = `${SERVER_URL}/api/users?page=${currPage}${
      searchQuery.trim() !== "" ? `&search=${searchQuery}` : ""
    }${
      searchDomain.length > 0 ? `&domain=${searchDomain.join("&domain=")}` : ""
    }${
      searchGender.length > 0 ? `&gender=${searchGender.join("&gender=")}` : ""
    }${
      searchAvailable.length > 0
        ? `&available=${searchAvailable.join("&available=")}`
        : ""
    }`;

    return url;
  };
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row g-0">
          <div className="d-block d-md-none mobile-menu">
            <MobileNav isMenuOpen={isMenuOpen} ToggleMenu={ToggleMenu} />
          </div>
          <div
            className="d-none d-md-flex col-md-4 col-lg-3 p-3 py-4  align-items-center justify-content-center "
            id="screen"
            style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
          >
            <SideNavigation />
          </div>
          <div className="col-md-8 col-lg-9 px-4 px-md-0 py-4 pe-md-3 ">
            <TopBar ToggleMenu={ToggleMenu} />

            <Routes>
              <Route path="/" element={<Navigate to="/members" />} />
              <Route
                path="/members"
                element={
                  <Members
                    {...{
                      currPage,
                      setCurrPage,
                      setSearchQuery,
                      setSearchDomain,
                      setSearchGender,
                      setSearchAvailable,
                      triggerUser,
                      searchDomain,
                      searchGender,
                      searchAvailable,
                    }}
                  />
                }
              />
              <Route
                path="/teams/*"
                element={
                  <Teams
                    {...{
                      currPage,
                      setCurrPage,
                      setSearchQuery,
                      setSearchDomain,
                      setSearchGender,
                      setSearchAvailable,
                      triggerUser,
                      searchDomain,
                      searchGender,
                      searchAvailable,
                    }}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
