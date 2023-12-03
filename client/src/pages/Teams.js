import React from "react";
import { Routes, Route } from "react-router-dom";
import AllTeams from "./AllTeams";
import CreateTeam from "./CreateTeam";

const Teams = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTeams />} />
        <Route path="/create-team" element={<CreateTeam />} />
      </Routes>
    </>
  );
};

export default Teams;
