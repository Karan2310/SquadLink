import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Text, Button, Paper } from "@mantine/core";
import { SERVER_URL } from "../config";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const AllTeams = ({ teams, trigger }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (id) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this team?"
      );

      if (shouldDelete) {
        const { data } = await axios.delete(`${SERVER_URL}/api/teams/${id}`);
        trigger();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    open();
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-4">
          {teams &&
            teams.map((team) => {
              return (
                <div className="col-md-6 col-lg-4" key={team._id}>
                  <Paper
                    radius="md"
                    p="lg"
                    bg="white"
                    shadow="xs"
                    style={{
                      borderLeft: "5px outset #228BE6",
                    }}
                  >
                    <Text fw={600} style={{ fontSize: "1.5rem" }}>
                      {team.name}
                    </Text>

                    <Text c="dimmed" fz="sm" fw={600}>
                      {team.members.length} Members
                    </Text>

                    <Text
                      c="dimmed"
                      fz="sm"
                      fw={500}
                      style={{ overflow: "visible" }}
                    >
                      {team.members.map((e) => (
                        <React.Fragment key={e._id}>
                          {/* Display member information */}
                          {/* {e.first_name} {e.last_name} • */}
                        </React.Fragment>
                      ))}
                    </Text>

                    <div className="row">
                      <div className="col-6">
                        <Button
                          variant="outline"
                          color="red"
                          fullWidth
                          mt="md"
                          onClick={() => handleDelete(team._id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="col-6">
                        <Button
                          variant="filled"
                          color="blue"
                          fullWidth
                          mt="md"
                          onClick={() => handleViewDetails(team)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </div>
              );
            })}
        </div>
      </div>

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

      <Modal
        opened={opened}
        size="xl"
        centered
        radius="md"
        onClose={() => {
          close();
          setSelectedTeam(null);
        }}
        title={selectedTeam?.name || "Team Details"}
        sx={{
          ".mantine-Modal-title": {
            fontSize: "2rem",
            textAlign: "center",
            textTransform: "capitalize",
            width: "100%",
          },
        }}
      >
        {selectedTeam && (
          <>
            <div>
              <div className="inner-container" style={{ overflowY: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">ID</th>
                      <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        First Name
                      </th>
                      <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        Last Name
                      </th>
                      <th scope="col">Domain</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeam.members &&
                      selectedTeam.members.map((e) => {
                        return (
                          <tr>
                            <th scope="row">
                              <Avatar
                                src={e.avatar}
                                size={30}
                                alt={e.first_name}
                                color="blue"
                                variant="transparent"
                              />
                            </th>
                            <th scope="row">{e.id}</th>
                            <td>{e.first_name}</td>
                            <td>{e.last_name}</td>
                            <td>{e.domain}</td>
                            <td>{e.email}</td>
                            <td>{e.available ? "Available" : "Unavailable"}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        <Button
          variant="outline"
          color="red"
          fullWidth
          mt="md"
          onClick={() => {
            handleDelete(selectedTeam._id);
            close();
          }}
        >
          Delete
        </Button>
      </Modal>
    </div>
  );
};

export default AllTeams;
