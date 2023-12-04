import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard/ProfileCard.js";
import { Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Select, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { SERVER_URL } from "../config.js";
import { setLoading } from "../slice/AppSclice.js";
import { updateUsers } from "../slice/UserSlice.js";
import { useDispatch } from "react-redux";
const { MultiSelect } = require("@mantine/core");

const Members = ({
  currPage,
  setCurrPage,
  setSearchQuery,
  triggerUser,
  setSearchDomain,
  setSearchGender,
  setSearchAvailable,
  searchDomain,
  searchGender,
  searchAvailable,
}) => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [showFilters, setShowFilters] = useState(false);
  const domains = [
    "Sales",
    "Finance",
    "IT",
    "Marketing",
    "UI Designing",
    "Management",
    "Business Development",
  ];

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      avatar: "",
      domain: "",
      available: true,
    },
    validate: {
      first_name: (value) =>
        value.trim() !== "" ? null : "Please enter First Name",
      last_name: (value) =>
        value.trim() !== "" ? null : "Please enter Last Name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      avatar: (value) =>
        value.trim() !== "" ? null : "Please enter Avatar Link",
      gender: (value) => (value.trim() !== "" ? null : "Please select Gender"),

      domain: (value) => (value.trim() !== "" ? null : "Please select Domain"),
    },
  });

  const handleDomainChange = (selectedValues) => {
    setSearchDomain(selectedValues);
  };

  const handleGenderChange = (selectedValues) => {
    setSearchGender(selectedValues);
  };

  const handleAvailableChange = (selectedValues) => {
    setSearchAvailable(selectedValues);
  };

  const handlePaginationChange = (newPage) => {
    setCurrPage(newPage);
    window.scrollTo(0, 0);
  };

  let searchTimeout;

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      setCurrPage(1);
      setSearchDomain([]);
      setSearchGender([]);
      setSearchAvailable([]);
      setSearchQuery(e.target.value);
    }, 500);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSubmit = async (values) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${SERVER_URL}/api/users`, values);
      const newUser = data;
      dispatch(updateUsers(newUser));
      form.reset();
      close();
    } catch (error) {
      console.error(error);
      alert("Error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setCurrPage(1);
    setSearchQuery("");
    setSearchDomain([]);
    setSearchGender([]);
    setSearchAvailable([]);
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between w-100 ">
        <div className="row w-100 d-flex align-items-center justify-content-between m-0">
          <div className="col-8 col-md-9 col-lg-10 p-0">
            <div
              className="container-fluid bg-white   mb-3 px-4  d-flex align-items-center ms-0"
              style={{
                fontSize: "0.9rem",
                borderRadius: "10px",
                paddingTop: "0.7rem",
                paddingBottom: "0.7rem",
              }}
            >
              <i className="fa-solid fa-magnifying-glass me-2"></i>
              <input
                placeholder="Search Member"
                type="text"
                style={{ width: "100%", outline: "none", border: 0 }}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="col-4 col-md-3 col-lg-2 d-flex justify-content-end p-0">
            <Button
              variant="filled"
              onClick={toggleFilters}
              size="xs"
              style={{ marginTop: "-1rem" }}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>
      </div>
      <div
        className="mb-4 d-flex flex-column flex-md-row align-items-center justify-content-end"
        style={{ marginTop: "-0.5rem" }}
      >
        {showFilters && (
          <>
            <MultiSelect
              className="w-100 mt-2"
              label="Domain"
              placeholder="Select Domain"
              data={domains}
              clearable
              onChange={handleDomainChange}
              value={searchDomain}
            />
            <MultiSelect
              className="w-100 mt-2 mx-2"
              clearable
              label="Gender"
              placeholder="Select Gender"
              data={["Male", "Female"]}
              onChange={handleGenderChange}
              value={searchGender}
            />
            <MultiSelect
              className="w-100 mt-2"
              clearable
              label="Availability"
              placeholder="Select Availability"
              data={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              onChange={handleAvailableChange}
              value={searchAvailable}
            />
          </>
        )}
      </div>

      <div className="row gy-4">
        {users.users &&
          users.users.map((user) => (
            <div key={user.id} className="col-12 col-md-6 col-lg-4">
              <ProfileCard user={user} triggerUser={triggerUser} />
            </div>
          ))}
      </div>
      <div className="container w-100 d-flex justify-content-center my-5">
        <Pagination
          total={users.totalPages}
          value={currPage}
          onChange={handlePaginationChange}
        />
      </div>
      <button
        className="shadow"
        onClick={open}
        style={{
          position: "fixed",
          right: "40px",
          bottom: "40px",
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

      <Modal opened={opened} onClose={close} title="Add User" centered>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            className="mb-3"
            label="First Name"
            placeholder="Jhon"
            {...form.getInputProps("first_name")}
            error={form.errors.first_name}
          />

          <TextInput
            className="mb-3"
            label="Last Name"
            placeholder="Jacobs"
            {...form.getInputProps("last_name")}
            error={form.errors.last_name}
          />

          <TextInput
            className="mb-3"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            error={form.errors.email}
          />

          <TextInput
            className="mb-3"
            label="Avatar Link"
            placeholder="https://something.com"
            {...form.getInputProps("avatar")}
            error={form.errors.avatar}
          />

          <Select
            className="mb-3"
            label="Gender"
            placeholder="Pick value"
            {...form.getInputProps("gender")}
            defaultValue="Male"
            data={["Male", "Female"]}
            error={form.errors.gender}
          />

          <Select
            className="mb-3"
            label="Availability"
            placeholder="Pick value"
            {...form.getInputProps("available")}
            defaultValue="available"
            data={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            error={form.errors.available}
          />

          <Select
            className="mb-3"
            label="Domain"
            placeholder="Pick value"
            {...form.getInputProps("domain")}
            data={domains}
            error={form.errors.domain}
          />

          <Group justify="flex-end" mt="lg">
            <Button type="submit">Add User</Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default Members;
