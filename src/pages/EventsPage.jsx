import { React, useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventSearch } from "../components/EventSearch";
import { CategoryFilter } from "../components/CategoryFilter";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to find categories by ID's
  const getCategorieById = (categoryIds) => {
    if (!Array.isArray(categoryIds)) return "No categories";

    return categoryIds
      .map(
        (id) =>
          categories.find((category) => category.id === id)?.name || "Unknown"
      )
      .join(", ");
  };

  // Filtering logic for the category
  useEffect(() => {
    let filteredEvents = events;

    // Filter by category if a category is selected
    if (selectedCategory) {
      filteredEvents = filteredEvents.filter((event) =>
        event.categoryIds.includes(selectedCategory)
      );
    }

    // Filter by search query if there is a search query
    if (searchQuery) {
      filteredEvents = filteredEvents.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setMatchedEvents(filteredEvents);
  }, [selectedCategory, searchQuery, events]);

  return (
    <Flex direction="column" alignItems="center" minHeight="100vh">
      <Box>
        <EventSearch setSearchQuery={setSearchQuery} />

        <CategoryFilter
          categories={categories}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Flex direction="column" wrap="wrap" justifyContent="center">
        {matchedEvents.map((event) => (
          <div key={event.id}>
            <Link to={`event/${event.id}`}>
              <Box
                bgColor="#BDC3C7"
                marginBottom="3rem"
                borderRadius="1rem"
                boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
                transition="transform 0.1s ease, box-shadow 0.1s ease"
                _hover={{
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box textAlign="center" marginTop="1rem" marginBottom="1rem">
                  <h2 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
                    {event.title}
                  </h2>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {event.description}
                  </p>
                </Box>
                <div className="img-container">
                  <Image
                    src={event.image}
                    alt="image of event"
                    width="100%"
                    height="20rem"
                    objectFit="cover"
                  />
                </div>
                <Box padding="1.5rem">
                  <p>
                    <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                    {getCategorieById(event.categoryIds)}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Start event:</span>{" "}
                    {event.startTime}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>End event:</span>{" "}
                    {event.endTime}
                  </p>
                </Box>
              </Box>
            </Link>
          </div>
        ))}
      </Flex>
    </Flex>
  );
};
