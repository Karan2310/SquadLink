import React from "react";
import { Routes, Route } from "react-router-dom";
import AllTeams from "./AllTeams";
import CreateTeam from "./CreateTeam";

const Teams = ({ currPage, setCurrPage, setSearchQuery }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTeams />} />
        <Route
          path="/create-team"
          element={
            <CreateTeam {...{ currPage, setCurrPage, setSearchQuery }} />
          }
        />
      </Routes>
    </>
  );
};

export default Teams;
