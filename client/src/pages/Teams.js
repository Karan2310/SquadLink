import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllTeams from "./AllTeams";
import CreateTeam from "./CreateTeam";
import axios from "axios";
import { SERVER_URL } from "../config";

const Teams = ({ currPage, setCurrPage, setSearchQuery }) => {
  const [teams, setTeams] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState();
  const fetchTeams = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/teams`);
      setTeams(data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const trigger = () => {
    setFetchTrigger(!fetchTrigger);
  };

  useEffect(() => {
    fetchTeams();
  }, [fetchTrigger]);
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTeams {...{ teams, trigger }} />} />
        <Route
          path="/create-team"
          element={
            <CreateTeam
              {...{ currPage, setCurrPage, setSearchQuery, trigger }}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Teams;
