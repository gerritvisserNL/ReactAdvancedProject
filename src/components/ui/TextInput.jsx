import { Input, Center } from "@chakra-ui/react";

export const TextInput = ({ onChange, ...props }) => {
  return (
    <Center>
      <Input
        backgroundColor="white"
        variant="outline"
        onChange={onChange}
        width={320}
        {...props}
      />
    </Center>
  );
};
