import { Avatar, Text, Button, Paper, Badge } from "@mantine/core";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { useDispatch } from "react-redux";
import { setLoading } from "../../slice/AppSclice";
import { deleteUser } from "../../slice/UserSlice";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Select, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

const ProfileCard = ({ user, triggerUser }) => {
  const form = useForm({
    initialValues: {
      _id: user._id,
      first_name: user && user.first_name,
      last_name: user && user.last_name,
      email: user && user.email,
      gender: user && user.gender,
      avatar: user && user.avatar,
      domain: user && user.domain,
      available: user && user.available,
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
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  const domains = [
    "Sales",
    "Finance",
    "IT",
    "Marketing",
    "UI Designing",
    "Management",
    "Business Development",
  ];

  const handleDelete = async (userId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) {
      // User clicked Cancel, do nothing
      return;
    }

    dispatch(setLoading(true));
    try {
      await axios.delete(`${SERVER_URL}/api/users/${userId}`);
      dispatch(deleteUser(userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (values) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/api/users/${values._id}`,
        values
      );
      triggerUser();

      close();
    } catch (error) {
      console.error(error);
      alert("Error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Paper
        opacity={user.available ? "1" : "0.7"}
        radius="md"
        p="lg"
        bg="white"
        style={{ position: "relative" }}
      >
        <Badge
          radius={6}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontSize: "12px",
            background: "#000",
            color: "#fff",
          }}
        >
          ID: {user.id}
        </Badge>
        <Badge
          color={user.available ? "blue" : "gray"}
          radius={6}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            fontSize: "8px",
          }}
        >
          {user.available == true ? "Available" : "Unavailable"}
        </Badge>
        <Avatar
          src={user.avatar}
          size={120}
          radius={120}
          mx="auto"
          bg={"#F5F6FA"}
        />
        <div className="d-flex align-items-center justify-content-center mt-3">
          <Text ta="center" fz="lg" fw={500} className="me-2">
            {user.first_name} {user.last_name}
          </Text>
          <ActionIcon
            variant="transparent"
            aria-label="Settings"
            onClick={open}
          >
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "rgb(34, 139, 230)" }}
            ></i>
          </ActionIcon>
        </div>
        <Text ta="center" c="dimmed" fz="sm">
          {user.email} • {user.domain} • {user.gender}
        </Text>

        <Button
          variant="outline"
          color="red"
          fullWidth
          mt="md"
          onClick={() => {
            handleDelete(user.id);
          }} // Attach the onClick handler
        >
          Delete
        </Button>
      </Paper>
      <Modal opened={opened} onClose={close} title="Edit User">
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
            <Button type="submit">Update User</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default ProfileCard;
