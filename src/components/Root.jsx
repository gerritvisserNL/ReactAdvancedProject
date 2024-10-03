import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Center } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Center backgroundColor="lightblue">
      <Box maxWidth={{ base: "100%", md: "80%", lg: "60%" }} minHeight="100vh">
        <Navigation />
        <Outlet />
        <Box flexGrow="1" bgColor="blue.300" />
      </Box>
    </Center>
  );
};
