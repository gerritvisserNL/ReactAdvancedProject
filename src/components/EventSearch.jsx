import { useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { TextInput } from "./ui/TextInput";
import eventsData from "/events.json";

export const EventSearch = ({ setSearchQuery }) => {
  const [noResults, setNoResults] = useState(false);

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const matchedEvents = eventsData.events.filter((event) =>
      event.title.toLowerCase().includes(searchValue)
    );

    setNoResults(matchedEvents.length === 0);
  };

  return (
    <Flex flexDirection="column" align="center">
      <TextInput onChange={handleChange} placeholder="Search event" />
      {noResults && (
        <Text color="red.500" fontWeight="bold" mt="2">
          No events found.
        </Text>
      )}
    </Flex>
  );
};
