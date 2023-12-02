import { Avatar, Text, Button, Paper } from "@mantine/core";

const ProfileCard = () => {
  return (
    <Paper radius="md" withBorder p="lg" bg="white">
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        Jane Fingerlicker
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        jfingerlicker@me.io • Art director
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
};

export default ProfileCard;
