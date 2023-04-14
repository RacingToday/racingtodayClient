/** @format */
import {
  getMyUser,
  getMyRaceDays,
  GET_RACETRACKS,
  host,
} from "../../lib/dataFetchHelpers";

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
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  AlertDialogBody,
  Flex,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  RadioGroupProps,
  Select,
  Switch,
  VStack,
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
  const [LaneType, setLaneType] = useState("Please Select a Lane Type");
  const [EndTime, setEndTime] = useState("");
  const [hrz, setHrz] = useState(false);
  const [hrzLevel, setHrzLevel] = useState("");

  const [Capacity, setCapacity] = useState("");
  const [trackID, setTrackID] = useState(0);
  const [isError, setIsError] = useState(false);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);
  const [myUserID, setMyUserID] = useState(0);
  const handleRadioChange = (e: any) => {
    if (e === "1") {
      setHrz(true);
    }
    if (e === "0") {
      setHrz(false);
    }
    return;
  };

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

    let laneTypeValue = parseInt(e.currentTarget.laneType.value) === 1;
    // clean up the data

    if (laneTypeValue !== false && laneTypeValue !== true) {
      setIsError(true);
      return;
    }

    try {
      const carClasses = [
        "GT",
        "Touring",
        "Formel",
        "Motorbikes",
        "Prototype",
        "Others",
      ].reduce((acc, curr) => {
        return e.currentTarget[curr].checked ? acc + curr + ", " : acc;
      }, "");

      const isError =
        Track === "Please Select a Track" ||
        EventDescription === "" ||
        Date === "" ||
        StartTime === "" ||
        EndTime === "" ||
        carClasses === "" ||
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

      const newRaceDay = await fetch(`${host}graphql`, {
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
              NoiseRestriction: ${hrzLevel || "-2"},
              EndTime: "${EndTimeToSend}",
              OrganizerEmail: "${userAndJWT.username}"
              Capacity: ${Capacity}
              CarClass: "${carClasses}"
              OpenPitLane: ${laneTypeValue}
              users: ${userAndJWT.id}
          }) {
            data {
              id
              attributes {
                EventDescription
              RaceDate
              StartTime
              EndTime
              OpenPitLane
              NoiseRestriction
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
      setLaneType("Please Select a Lane Type");

      if (window.location.href.match("myracedays")) {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          return;
        }

        const myDays = await getMyRaceDays(jwt, userAndJWT.id);
        props.props.props.props.setMyRaceDays(
          myDays.data.usersPermissionsUser.data.attributes.race_days.data
        );
      }
      return newRaceDay;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button
        size={"sm"}
        colorScheme="blue"
        display={["none", "block", "block"]}
        onClick={onOpen}
        h={["2rem", "2rem", "2rem"]}
        fontSize={["sm", "sm", "md"]}
        w="fit-content"
      >
        Create Raceday
      </Button>
      <Button
        colorScheme="blue"
        w={"100%"}
        display={["block", "none", "none"]}
        onClick={onOpen}
        fontSize={"1.5rem"}
      >
        Create Raceday
      </Button>

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md" boxShadow="xl" bg="gray.50" p={6}>
          <ModalHeader
            color="blue.600"
            borderBottom="1px"
            borderColor="blue.200"
            pb={4}
          >
            Create Raceday
          </ModalHeader>
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
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Event Description</FormLabel>
                  <Textarea
                    variant={"filled"}
                    placeholder="Please add a description of the event"
                    onChange={(e) => setEventDescription(e.target.value)}
                    value={EventDescription}
                    borderColor="blue.200"
                    _focus={{ borderColor: "blue.500" }}
                    h={"3rem"}
                    mb={"1rem"}
                  />
                  <Flex w="100%" mb={"1rem"}>
                    <FormLabel w={"auto%"}>
                      Price
                      <Input
                        variant={"filled"}
                        onChange={(e) => setPrice(e.target.value)}
                        type={"number"}
                        value={Price}
                      />
                    </FormLabel>
                    <FormLabel w={"auto%"}>
                      Track
                      <br />
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
                      </Menu>
                    </FormLabel>
                  </Flex>
                  Please check the boxes for all the classes you will allow on
                  track allowed on track
                  <Flex
                    justifyContent={"space-around"}
                    flexWrap={"wrap"}
                    mb={"1rem"}
                    gap={"1em"}
                  >
                    <p>
                      <Switch id="GT" name="GT" value="GT" /> GT
                    </p>
                    <p>
                      <Switch id="Touring" name="Touring" /> Touring
                    </p>
                    <p>
                      <Switch id="Formel" name="Formel" /> Formel
                    </p>
                    <p>
                      <Switch id="Motorbikes" name="Motorbikes" /> Motorbikes
                    </p>
                    <p>
                      <Switch
                        id="Prototype"
                        name="Prototypes"
                        value="Prototypes"
                      />{" "}
                      Prototype
                    </p>
                    <p>
                      <Switch id="Others" name="Others" value="Others" /> Others
                    </p>
                  </Flex>
                  <Flex gap={4} mt={"1rem"}>
                    <FormLabel w={"auto%"}>
                      Event Date
                      <Input
                        value={Date}
                        variant={"filled"}
                        type={"date"}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </FormLabel>
                    <FormLabel w="auto%">
                      Start Time
                      <Input
                        onChange={(e) => setStartTime(e.target.value)}
                        value={StartTime}
                        variant={"filled"}
                        type={"time"}
                      />
                    </FormLabel>
                    <FormLabel w={"auto%"}>
                      End Time
                      <Input
                        value={EndTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        variant={"filled"}
                        type={"time"}
                      />
                    </FormLabel>
                  </Flex>
                  <Flex mt={"1rem"}>
                    <FormLabel w={"20%"}>
                      Raceday capacity
                      <Input
                        variant={"filled"}
                        value={Capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="example: 20"
                        type={"number"}
                      />
                    </FormLabel>
                    <FormLabel w={"30%"}>
                      Split or Open Lane
                      <Select
                        className="laneType"
                        id="laneType"
                        variant={"filled"}
                        onChange={(e) => setLaneType(e.target.value)}
                        value={LaneType}
                        placeholder="Select option"
                      >
                        <option value="1">Open Pitlane</option>
                        <option value="0">Split Pitlane</option>
                      </Select>
                    </FormLabel>
                  </Flex>
                  <FormLabel>
                    Does the track have any noise restrictions on that day?
                  </FormLabel>
                  <RadioGroup
                    defaultValue="0"
                    onChange={(e) => handleRadioChange(e)}
                  >
                    <Stack direction="row">
                      <Radio value="1">Yes</Radio>
                      <Radio value="0">No</Radio>
                      {hrz && (
                        <Input
                          variant={"filled"}
                          style={{
                            marginLeft: "1em",
                          }}
                          type={"number"}
                          placeholder="what is the limit in db? example: 80"
                          value={hrzLevel}
                          onChange={(e) => setHrzLevel(e.target.value)}
                        />
                      )}
                    </Stack>
                  </RadioGroup>
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
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter justifyContent="flex-start"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateRaceDay;
