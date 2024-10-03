import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Center, Box, Flex } from "@chakra-ui/react";
import { AddEventBtn } from "./ui/AddEventBtn";
import { EventsBtn } from "./ui/EventsBtn";

export const Navigation = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isAddEventPage = location.pathname === "/add-event";

  return (
    <Center>
      <nav>
        <Flex flexDirection="row" gap={8} margin={4}>
          <Box>
            <Link to="/">
              <EventsBtn color={isHomePage ? "green.500" : "gray.300"} />
            </Link>
          </Box>
          <Box>
            <Link to="/add-event">
              <AddEventBtn color={isAddEventPage ? "green.500" : "gray.300"} />
            </Link>
          </Box>
        </Flex>
      </nav>
    </Center>
  );
};
