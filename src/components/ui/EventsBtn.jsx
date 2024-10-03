import { Button } from "@chakra-ui/react";

export const EventsBtn = ({ color }) => {
  return (
    <Button colorScheme={color === "green.500" ? "green" : "gray"}>
      Events
    </Button>
  );
};
