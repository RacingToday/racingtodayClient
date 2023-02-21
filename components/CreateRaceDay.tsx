/** @format */
import {
  getMyUser,
  getMyRaceDays,
  GET_RACETRACKS,
} from "../lib/helperFunctions";

import {
  Button,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Alert,
  AlertIcon,
  CloseButton,
  AlertDialogBody,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import React, { SetStateAction, useState } from "react";
import Link from "next/link";

function CreateRaceDay(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [EventDescription, setEventDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Track, setTrack] = useState("Please Select a Track");
  const [Date, setDate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [trackID, setTrackID] = useState(0);
  const [isError, setIsError] = useState(false);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);
  const [myUserID, setMyUserID] = useState(0);

  const { loading, error, data } = useQuery(GET_RACETRACKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error </p>;
  const arrayOfRaceTracks = data.raceTracks.data;
  interface RaceTrack {
    id: number;
    attributes: {
      TrackName: string;
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isError =
      Track === "Please Select a Track" ||
      EventDescription === "" ||
      Date === "" ||
      StartTime === "" ||
      EndTime === "" ||
      Capacity === "" ||
      trackID === 0;
    if (isError) {
      setIsError(true);
      return;
    }

    const startTimeToSend = StartTime + ":00:000";
    const EndTimeToSend = EndTime + ":00:000";
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    const userAndJWT = await getMyUser(jwt);
    setMyUserID(userAndJWT.id);

    const newRaceDay = await fetch("http://localhost:1337/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
          createRacaDay(data: {
              EventDescription: "${EventDescription}",
              Price: ${Price}
              RaceDate: "${Date}",
              race_track: ${trackID},
              StartTime: "${startTimeToSend}",
              EndTime: "${EndTimeToSend}",
              OrganizerEmail: "${userAndJWT.username}"
              Capacity: ${Capacity}
              users: ${userAndJWT.id}
          }) {
            data {
              id
              attributes {
              EventDescription
              RaceDate
              StartTime
              EndTime
              Capacity
              OrganizerEmail
              race_track {
                data {
                  attributes {
                    TrackName
                    Location
                    TrackDescription
                  }
              }
            }
          }
        }
      }
    
        }`,
      }),
    }).then((res) => res.json());
    setEventDescription("");
    setPrice("");
    setTrack("please select a track");
    setDate("");
    setStartTime("");
    setEndTime("");
    setCapacity("");
    setTrackID(0);
    setSuccessfullyCreated(true);

    if (window.location.href.match("myracedays")) {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return;
      }

      const myDays = await getMyRaceDays(jwt, userAndJWT.id);
      props.props.props.setMyRaceDays(
        myDays.data.usersPermissionsUser.data.attributes.race_days.data
      );
    }
    return newRaceDay;
  };

  return (
    <>
      <Button size={"sm"} colorScheme="blue" onClick={onOpen}>
        Create Raceday
      </Button>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Raceday</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setSuccessfullyCreated(false);
              onClose();
              setIsError(false);
            }}
          />
          {isError && (
            <Alert status="error">
              <CloseButton onClick={() => setIsError(false)} />
              <AlertIcon />
              Please make sure you fill out all the fields
            </Alert>
          )}
          {successfullyCreated && (
            <Alert status="success" variant={"solid"}>
              <CloseButton onClick={() => setSuccessfullyCreated(false)} />
              <AlertIcon />
              Successfully Created Raceday
              <AlertDialogBody>
                <Button
                  colorScheme={"blue"}
                  onClick={() => {
                    setSuccessfullyCreated(false);
                    onClose();
                  }}
                >
                  Close this form
                </Button>
                <Button m={"0.4em 1em"} colorScheme={"blue"}>
                  <Link href={"/myracedays"}>Go to my Racedays</Link>
                </Button>
              </AlertDialogBody>
            </Alert>
          )}
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Event Description</FormLabel>
                <Textarea
                  variant={"filled"}
                  placeholder="Please add a description of the event"
                  onChange={(e) => setEventDescription(e.target.value)}
                  value={EventDescription}
                />

                <FormLabel>Event Date</FormLabel>
                <Input
                  value={Date}
                  variant={"filled"}
                  type={"date"}
                  onChange={(e) => setDate(e.target.value)}
                />

                <FormLabel>Start Time</FormLabel>
                <Input
                  onChange={(e) => setStartTime(e.target.value)}
                  value={StartTime}
                  variant={"filled"}
                  type={"time"}
                />

                <FormLabel>End Time</FormLabel>
                <Input
                  value={EndTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  variant={"filled"}
                  type={"time"}
                />
                <FormLabel>Price</FormLabel>
                <Input
                  w={"auto%"}
                  variant={"filled"}
                  onChange={(e) => setPrice(e.target.value)}
                  type={"number"}
                  value={Price}
                />
                <FormLabel>Track</FormLabel>
                <Menu>
                  <MenuButton as={Button}>{Track}</MenuButton>
                  <MenuList>
                    {arrayOfRaceTracks.map(
                      (raceTrack: RaceTrack, index: number) => (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            setTrack(raceTrack.attributes.TrackName);
                            setTrackID(raceTrack.id);
                          }}
                        >
                          {raceTrack.attributes.TrackName}
                        </MenuItem>
                      )
                    )}
                  </MenuList>
                  <FormLabel m={"1em 0em"}>Raceday capacity</FormLabel>
                  <Input
                    value={Capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    w={"auto%"}
                    placeholder="example: 20"
                    type={"number"}
                    mb={"1em"}
                  />
                </Menu>
                <br />
                <Button
                  type="submit"
                  onSubmit={(e) => handleSubmit}
                  colorScheme={"blue"}
                >
                  Craete
                </Button>

                <Button
                  m={"0.4em 1em"}
                  colorScheme={"red"}
                  onClick={() => {
                    setSuccessfullyCreated(false);
                    setIsError(false);
                    onClose();
                  }}
                >
                  Close
                </Button>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateRaceDay;
