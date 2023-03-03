/** @format */
import { RaceDay } from "../lib/types";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  useDisclosure,
  List,
  Flex,
} from "@chakra-ui/react";
import { getMyUser } from "../lib/helperFunctions";

export default function RequestToJoin(raceday: any) {
  const sizeConfig = ["sm", "sm", "md", "md"];
  const [myUser, setMyUser] = useState<any>(null);
  const handleClick = () => {
    const jwt = localStorage.getItem("jwt");

    setRequestToJoinButton("Your request has been sent!");
    if (jwt === null) {
      return;
    }
    const sendRequest = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt === null) {
        return;
      }
      console.log(jwt);
      const id = myUser.id;
      console.log(id);
      const raceDayId: number = raceday.raceDay.id;

      const response = await fetch(
        `http://localhost:1337/api/raca-days/${raceDayId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              users: id,
            },
          }),
        }
      ).then((res) => res.json());
      return response;
    };
    sendRequest();
  };
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    const userDetails = async () => {
      const myUser = await getMyUser(jwt);

      setMyUser(myUser);
    };
    userDetails();
  }, []);

  const { isOpen: isOpen, onOpen, onClose } = useDisclosure();
  const [requestToJoinButton, setRequestToJoinButton] =
    useState("Request to Join");
  return (
    <>
      <Button onClick={onOpen} colorScheme={"blue"} size={sizeConfig}>
        Request to Join
      </Button>
      <Modal
        size={"6xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDirection={"column"}
            color={"whiteAlpha.900"}
            fontSize={["md", "lg", "xl"]}
            bg={"black"}
          >
            Date: {raceday.raceDay.attributes.RaceDate}
            {" - "} Track:{" "}
            {raceday.raceDay.attributes.race_track.data.attributes.TrackName}
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody mb={4} overflow="auto">
            <List mt={3} display="flex" flexDirection="column" gap="0.5rem">
              <li>
                <strong>Event Description:</strong>{" "}
                {raceday.raceDay.attributes.EventDescription}
              </li>
              <li>
                <strong>Start Time:</strong>{" "}
                {raceday.raceDay.attributes.StartTime !== null
                  ? raceday.raceDay.attributes.StartTime.slice(0, 5)
                  : raceday.raceDay.attributes.StartTime}
              </li>
              <li>
                <strong>End Time:</strong>{" "}
                {raceday.raceDay.attributes.EndTime !== null
                  ? raceday.raceDay.attributes.EndTime.slice(0, 5)
                  : raceday.raceDay.attributes.EndTime}
              </li>
              <li>
                <strong>Capacity:</strong> {raceday.raceDay.attributes.Capacity}
              </li>
              <li>
                <strong>Price:</strong> {raceday.raceDay.attributes.Price}
              </li>
              <li>
                <strong>Noise Restrictions:</strong>{" "}
                {raceday.raceDay.attributes.NoiseRestriction > 0
                  ? raceday.raceDay.attributes.NoiseRestriction
                  : "None"}
              </li>
              <li>
                <strong>Accepted classes for the track day:</strong>{" "}
                {raceday.raceDay.attributes.CarClass}
              </li>
            </List>
            <Flex>
              <Button onClick={handleClick} mt={4} colorScheme={"blue"}>
                {requestToJoinButton}
              </Button>
              <Button mt={4} ml={4} onClick={onClose} colorScheme={"red"}>
                Cancel
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
