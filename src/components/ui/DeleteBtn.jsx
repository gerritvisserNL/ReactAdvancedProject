import { Button } from "@chakra-ui/react";

export const DeleteBtn = ({ onClick }) => {
  return (
    <Button
      bg="red.400"
      color="white"
      _hover={{ bg: "red.500" }}
      onClick={onClick}
    >
      Delete Event
    </Button>
  );
};
