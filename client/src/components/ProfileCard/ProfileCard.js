import { Avatar, Text, Button, Paper, Badge } from "@mantine/core";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { useDispatch } from "react-redux";
import { setLoading } from "../../slice/AppSclice";
import { deleteUser } from "../../slice/UserSlice";

const ProfileCard = ({ user }) => {
  const dispatch = useDispatch();

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

  return (
    <Paper
      opacity={user.available ? "1" : "0.7"}
      radius="md"
      withBorder
      p="lg"
      bg="white"
      style={{ position: "relative" }}
    >
      <Badge
        color="dark"
        radius={6}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "12px",
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
          right: "10px",
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
      <Text ta="center" fz="lg" fw={500} mt="md">
        {user.first_name} {user.last_name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.email} • {user.domain} • {user.gender}
      </Text>

      <Button
        variant="default"
        fullWidth
        mt="md"
        onClick={() => {
          handleDelete(user.id);
        }} // Attach the onClick handler
      >
        Delete
      </Button>
    </Paper>
  );
};

export default ProfileCard;
