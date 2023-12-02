import { Avatar, Text, Button, Paper } from "@mantine/core";

const ProfileCard = ({ user }) => {
  return (
    <Paper radius="md" withBorder p="lg" bg="white">
      <Avatar src={user.avatar} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {user.first_name} {user.last_name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.email} • {user.domain}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
};

export default ProfileCard;
