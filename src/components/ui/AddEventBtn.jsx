import { Button } from "@chakra-ui/react";

export const AddEventBtn = ({ color }) => {
  return (
    <Button
      type="submit"
      colorScheme={color === "green.500" ? "green" : "gray"}
    >
      Add Event
    </Button>
  );
};
