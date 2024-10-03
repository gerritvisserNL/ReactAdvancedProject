import { useState, useEffect } from "react";
import { Heading, Flex, Box, Select, Button, useToast } from "@chakra-ui/react";
import { TextInput } from "../components/ui/TextInput";

export const EditEventModal = ({
  eventData,
  users,
  categories,
  onClose,
  onEventUpdate,
}) => {
  // Initialize state with the current event data
  const [title, setTitle] = useState(eventData.title);
  const [description, setDescription] = useState(eventData.description);
  const [image, setImage] = useState(eventData.image);
  const [location, setLocation] = useState(eventData.location);
  const [startTime, setStartTime] = useState(eventData.startTime);
  const [endTime, setEndTime] = useState(eventData.endTime);
  const [createdBy, setCreatedBy] = useState(eventData.createdBy);
  const [categoryIds, setCategoryIds] = useState(eventData.categoryIds || []);

  useEffect(() => {
    // Update state when eventData changes
    setTitle(eventData.title);
    setDescription(eventData.description);
    setImage(eventData.image);
    setLocation(eventData.location);
    setStartTime(eventData.startTime);
    setEndTime(eventData.endTime);
    setCreatedBy(eventData.createdBy);
    setCategoryIds(eventData.categoryIds || []);
  }, [eventData]);

  // toast message instead of alert()
  const toast = useToast();

  const showToastSuccess = () => {
    toast({
      title: "",
      description: "Event successfully updated!",
      status: "success", // other options: "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  const showToastWarning = () => {
    toast({
      title: "",
      description: "Failed to update event!",
      status: "warning", // other options: "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  const showToastError = () => {
    toast({
      title: "",
      description: "Error updating event!",
      status: "error", // other options: "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  // Function to save the updated Event
  const handleSave = async () => {
    const updatedEvent = {
      ...eventData,
      title,
      description,
      createdBy,
      categoryIds,
      location,
      startTime,
      endTime,
      image,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/events/${eventData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        const updatedEventResponse = await response.json();
        console.log("Event successfully updated:", updatedEventResponse);
        showToastSuccess("Event successfully updated!");

        // Update the parent component with the new data
        onEventUpdate(updatedEventResponse);

        onClose();
      } else {
        console.error("Failed to update event");
        showToastWarning("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      showToastError("Error updating event");
    }
  };

  // Function to set the creator of the event
  const handleUserChange = (event) => {
    setCreatedBy(Number(event.target.value));
  };

  // Function to set the category of the event
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
        <Heading>Edit Event Form</Heading>
        <form onSubmit={(e) => e.preventDefault()}>
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
                <Button colorScheme="blue" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
