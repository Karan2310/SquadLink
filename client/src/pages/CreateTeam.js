import React, { useState } from "react";
import { TextInput, Checkbox, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import SelectedMembers from "../components/SelectedMembers";
import axios from "axios";
import { SERVER_URL } from "../config.js";
import { Pagination } from "@mantine/core";

const CreateTeam = ({ currPage, setCurrPage, setSearchQuery }) => {
  const allUsers = useSelector((state) => state.users.users);
  const userLength = useSelector((state) => state.users.totalPages);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const form = useForm({
    initialValues: {
      name: "",
      members: [],
    },
    validate: {
      name: (value) => (value.trim() !== "" ? null : "Invalid Team Name"),
    },
  });

  const handlePaginationChange = (newPage) => {
    setCurrPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleCheckboxChange = (user) => {
    const { id, domain } = user;

    const isMemberSelected = selectedMembers.some((member) => member.id === id);

    if (isMemberSelected) {
      // Deselecting an already selected member
      const updatedMembers = selectedMembers.filter(
        (member) => member.id !== id
      );
      setSelectedMembers(updatedMembers);
      form.setFieldValue("members", updatedMembers);
    } else {
      if (!user.available) {
        const confirmation = window.confirm(
          `This member is Unavailable. Do you still want to add them?`
        );

        if (!confirmation) {
          return; // Exit the function if the user chooses not to add the member
        }
      }

      const existingMember = selectedMembers.find(
        (member) => member.domain === domain
      );

      if (existingMember) {
        alert(
          `You can only select one member per domain.\n \nID : ${existingMember.id}\nName: ${existingMember.first_name} ${existingMember.last_name}\nDomain: ${existingMember.domain}`
        );
      } else {
        // Selecting a new member
        const updatedMembers = [...selectedMembers, user];
        setSelectedMembers(updatedMembers);
        form.setFieldValue("members", updatedMembers);
      }
    }
  };

  let searchTimeout;

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 500);
  };

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/api/teams`, values);
      alert("Team added successfully");

      // Reset the form
      form.reset();

      // Deselect all selected members
      setSelectedMembers([]);
      form.setFieldValue("members", []);

      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row gy-3">
        <div className="col-md-6 col-lg-8">
          <div className="container-fluid c-team rounded bg-white p-3 h-100">
            <h3>Create Team</h3>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
                className="my-3"
                withAsterisk
                label="Team Name"
                placeholder="Sales Team"
                {...form.getInputProps("name")}
              />

              <div className="d-flex flex-column justify-content-between pb-2 mt-4">
                <h5 className="mb-2">Select Members</h5>
                <TextInput
                  onChange={handleSearchChange}
                  placeholder="Search Members"
                  className="mb-2 mb-lg-0" // Adds margin bottom only on small screens
                />
              </div>
              <div
                className="container-fluid p-0 "
                style={{ overflow: "auto", height: "55vh" }}
              >
                <div className="inner-container" style={{ overflowY: "auto" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Domain</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers &&
                        allUsers.map((e) => {
                          return (
                            <tr
                              key={e.id}
                              onClick={() => handleCheckboxChange(e)}
                              style={{
                                cursor: "pointer",
                                // background: !e.available ? "#ECECEC" : "",
                                opacity: !e.available ? "0.4" : "1",
                              }}
                            >
                              <td>
                                <Checkbox
                                  checked={selectedMembers.includes(e)}
                                  readOnly
                                />
                              </td>
                              <th scope="row">{e.id}</th>
                              <td>{e.first_name}</td>
                              <td>{e.last_name}</td>
                              <td>{e.domain}</td>
                              <td>{e.email}</td>
                              <td>
                                {e.available ? "Avaliable" : "Unavailable"}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Pagination
                    total={userLength}
                    value={currPage}
                    onChange={handlePaginationChange}
                  />
                </div>
              </div>

              <Group justify="flex-end" mt="md">
                <Button type="submit">Create Team</Button>
              </Group>
            </form>
          </div>
        </div>

        {/* MEMBER LIST */}
        <div className="col-md-6 col-lg-4">
          <div className="container-fluid c-team rounded bg-white p-3 h-100">
            <h5> Team Members </h5>
            <SelectedMembers form={form} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
