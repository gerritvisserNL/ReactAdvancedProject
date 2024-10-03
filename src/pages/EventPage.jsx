import { React, useState } from "react";
import {
  Flex,
  Box,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EditEventBtn } from "../components/ui/EditEventBtn";
import { EditEventModal } from "./EditEventModal";
import { DeleteBtn } from "../components/ui/DeleteBtn";

// get data from database with loader
export const loader = async ({ params }) => {
  const users = await fetch(`http://localhost:3000/users`);
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories/`);

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [eventData, setEventData] = useState(event);
  const navigate = useNavigate();

  // Function to get the category names for the event
  const getCategorieByEventId = (event) => {
    return event.categoryIds
      .map((id) => categories.find((category) => category.id === id)?.name)
      .join(", ");
  };

  // Callback to handle event updates
  const handleEventUpdate = (updatedEvent) => {
    setEventData(updatedEvent); // Update state with the new event data
  };

  // toast messages instead of alert()
  const toast = useToast();

  const showToastSuccess = () => {
    toast({
      title: "",
      description: "Event deleted!",
      status: "success", // other options: "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  const showToastError = () => {
    toast({
      title: "",
      description: "Error while deleting event!",
      status: "error", // other options: "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  // Function to delete the current event
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/events/${eventData.id}`, {
        method: "DELETE",
      });
      showToastSuccess("Event deleted!");
      navigate("/"); // Navigate to EventsPage (/) after deleting event
    } catch (error) {
      console.error("Error while deleting event:", error);
      showToastError("Error");
    }
  };

  return (
    <div>
      <p>{eventData.body}</p>

      <div key={eventData.id}>
        <Box
          bgColor="#BDC3C7"
          marginBottom="3rem"
          borderRadius="1rem"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
          width={["100%", "90%", "80%", "36rem"]}
          mx="auto"
          height="auto"
        >
          <Box textAlign="center" marginTop="1rem" marginBottom="1rem">
            <h2 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
              {eventData.title}
            </h2>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {eventData.description}
            </p>
          </Box>
          <div className="img-container">
            <Image
              src={eventData.image}
              alt="image of event"
              width="100%"
              height="20rem"
              objectFit="cover"
            />
          </div>
          <Flex padding="1.5rem" justifyContent="space-between">
            <Box>
              <p>
                <span style={{ fontWeight: "bold" }}>Created by:</span>{" "}
                {users.find((user) => user.id === eventData.createdBy).name}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                {getCategorieByEventId(eventData)}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Start event:</span>{" "}
                {eventData.startTime}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>End event:</span>{" "}
                {eventData.endTime}
              </p>
            </Box>
            <Flex flexDirection="column" gap={2}>
              <Box>
                <EditEventBtn onOpen={onOpen} />
              </Box>
              <Box>
                <DeleteBtn onClick={onDeleteOpen} />
              </Box>
            </Flex>

            {/* Modal for editing event */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  {/* Form to edit event */}
                  <EditEventModal
                    eventData={eventData}
                    users={users}
                    categories={categories}
                    onClose={onClose}
                    onEventUpdate={handleEventUpdate}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>

            {/* Modal for confirming deletion */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <p>Are you sure you want to delete this event?</p>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button variant="ghost" onClick={onDeleteClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
      </div>
    </div>
  );
};
