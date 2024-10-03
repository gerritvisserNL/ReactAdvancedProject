import { useState, useEffect } from "react";
import { Heading, Flex, Box, Select } from "@chakra-ui/react";
import { TextInput } from "../components/ui/TextInput";
import { AddEventBtn } from "../components/ui/AddEventBtn";
import eventsData from "/events.json";

export const AddEventPage = () => {
  // States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [categoryIds, setCategoryIds] = useState("");

  // List of users and categories
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  // useEffect to set the data when the component loads
  useEffect(() => {
    setUsers(eventsData.users);
    setCategories(eventsData.categories);
  }, []);

  const createEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        alert("Event succesffully added");
        console.log("Event successfully added:", newEvent);
      } else {
        alert("Failed to add event");
        console.error("Failed to add event");
      }
    } catch (error) {
      alert("Error:", error);
      console.error("Error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");

    // An async function, but no need to wait for it.
    createEvent({
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    });

    // Empty the form fields.
    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds("");
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  const handleUserChange = (event) => {
    setCreatedBy(Number(event.target.value));
  };

  const handleCategoryChange = (event) => {
    setCategoryIds([Number(event.target.value)]);
  };

  return (
    <>
      <Flex
        flexDirection="column"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Add Event Form</Heading>
        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection="column"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              backgroundColor={"#BDC3C7"}
              padding={4}
              borderRadius="1rem"
              boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
              margin={4}
            >
              <Box mb={4} width="100%">
                <Select
                  placeholder="Select a user"
                  value={createdBy}
                  onChange={handleUserChange}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box mb={4} width="100%">
                <TextInput
                  type="text"
                  required="required"
                  placeholder="Title of event"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Box>
              <Box mb={4} width="100%">
                <TextInput
                  type="text"
                  required="required"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Box>
              <Box mb={4} width="100%">
                <TextInput
                  type="url"
                  required="required"
                  placeholder="URL to image"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </Box>
              <Box mb={4} width="100%">
                <Select
                  placeholder="Select a category"
                  value={categoryIds}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box mb={4} width="100%">
                <TextInput
                  type="text"
                  required="required"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </Box>
              <Box mb={4} width="100%">
                <TextInput
                  type="text"
                  required="required"
                  placeholder="Starttime"
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                />
              </Box>
              <Box mb={4} width="100%">
                <TextInput
                  type="text"
                  required="required"
                  placeholder="EndTime"
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                />
              </Box>
              <Box>
                <AddEventBtn type="submit">Add user</AddEventBtn>
              </Box>
            </Box>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
