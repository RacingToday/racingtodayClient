/** @format */

import React, { SetStateAction, useEffect, useState } from "react";
import { MyRaceDay, RaceDay } from "../../lib/types";
import MyPastRaceDays from "./MyPastRaceDays";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { getMyRaceDays, getMyUser } from "../../lib/dataFetchHelpers";
import Link from "next/link";

interface Props {
  props: {
    MyRaceDays: any;
    setMyRaceDays: SetStateAction<any>;
  };
}

function MyRaceDayComponent(props: Props) {
  const { MyRaceDays, setMyRaceDays } = props.props;
  useEffect(() => {
    const GetUser = async () => {
      try {
        if (localStorage.getItem("jwt") !== null) {
          const jwt = localStorage.getItem("jwt");
          if (typeof jwt === "string" && jwt.length > 0) {
            interface user {
              id: number;
            }
            const user: user = await getMyUser(jwt);
            const myDays = await getMyRaceDays(jwt, user.id);

            setMyRaceDays(
              myDays.data.usersPermissionsUser.data.attributes.race_days.data
            );
          }
        }
        return;
      } catch (error) {
        console.log(error);
      }
    };
    GetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get todays date yyyy-mm-dd
  const myRaceDaysAfterToday = MyRaceDays.filter((raceDay: RaceDay) => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const raceDate = parseInt(raceDay.attributes.RaceDate.split("-")[2]);
    const raceMonth = parseInt(raceDay.attributes.RaceDate.split("-")[1]);
    const raceYear = parseInt(raceDay.attributes.RaceDate.split("-")[0]);

    if (raceYear >= yyyy && raceMonth >= mm) {
      if (mm === raceMonth && raceYear === yyyy) {
        if (raceDate < dd) {
          return;
        }
      }

      return raceDay;
    }
  });
  return (
    <Flex
      flex={1}
      p={3}
      wrap="wrap"
      minW="90%"
      minH="80vh"
      overflowY="scroll"
      fontSize={["md", "lg", "xl"]}
      bgColor="gray.50"
      color="gray.800"
      overflow={"hidden"}
      borderRadius={4}
    >
      <Text as="h1" fontWeight="bold" flex={1} mb={4}>
        My Track Days
      </Text>

      <Accordion allowMultiple w="100%">
        {myRaceDaysAfterToday && (
          <Text mb={2}>
            <b>
              Please click on the specific track day to see details of the event
            </b>
          </Text>
        )}
        {myRaceDaysAfterToday.length > 0 ? (
          myRaceDaysAfterToday.map((raceDay: MyRaceDay) => (
            <AccordionItem
              border={"1px dotted black"}
              borderRadius="2xl"
              key={raceDay.id}
              backgroundColor="gray.100"
              mt={3}
            >
              <AccordionButton p={"1em 0em"}>
                <Flex
                  flex={1}
                  pl={"2%"}
                  wrap="wrap"
                  minW={"100%"}
                  flexBasis={"auto"}
                  textAlign={"left"}
                  justifySelf={"flex-start"}
                  fontSize={["xs", "md", "lg"]}
                >
                  <h3
                    style={{
                      width: "22%",
                    }}
                  >
                    {raceDay.attributes.race_track.data.attributes.TrackName}
                  </h3>
                  <h3
                    style={{
                      textTransform: "uppercase",

                      width: "22%",
                    }}
                  >
                    {raceDay.attributes.RaceDate}
                  </h3>
                  <h3
                    style={{
                      textTransform: "uppercase",

                      width: "22%",
                    }}
                  >
                    {raceDay.attributes.StartTime.slice(0, 5)}
                  </h3>
                  <h3
                    style={{
                      textTransform: "uppercase",

                      width: "22%",
                    }}
                  >
                    {raceDay.attributes.EndTime.slice(0, 5)}
                  </h3>
                  <AccordionIcon />
                </Flex>
              </AccordionButton>
              <AccordionPanel
                style={{
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Flex flex={1} wrap="wrap">
                  <Flex p={"1em 1em"} flexDir={"column"} wrap="wrap" w={"100%"}>
                    {/* ... (existing code) */}
                    <Flex
                      borderTop={"1px solid black"}
                      pt={"1em"}
                      flexDir={["column", "column", "row"]}
                      alignItems="center"
                    >
                      <List display={"flex"} flexDir={"column"} gap={2}>
                        <ListItem>
                          <strong>Capacity: </strong>
                          {raceDay.attributes.Capacity}
                        </ListItem>
                        <ListItem>
                          <strong>Organizer: </strong>
                          {raceDay.attributes.OrganizerEmail}
                        </ListItem>
                        <ListItem>
                          <strong>LaneStyle </strong>
                          {raceDay.attributes.OpenPitLane ? "Open" : "Closed"}
                        </ListItem>
                        <ListItem>
                          <strong>Location: </strong>
                          {
                            raceDay.attributes.race_track.data.attributes
                              .Location
                          }
                        </ListItem>
                        <ListItem>
                          <strong>Start Time: </strong>
                          {raceDay.attributes.StartTime.slice(0, 5)}
                        </ListItem>
                        <ListItem>
                          <strong>End Time: </strong>
                          {raceDay.attributes.EndTime.slice(0, 5)}
                        </ListItem>
                        <ListItem>
                          <strong>Date: </strong>
                          {raceDay.attributes.RaceDate}
                        </ListItem>
                        <ListItem>
                          {raceDay.attributes.NoiseRestriction > 0 ? (
                            <Text>
                              <strong>Noise Restrictions: </strong>
                              {raceDay.attributes.NoiseRestriction}
                            </Text>
                          ) : (
                            <strong>Noise Restrictions: None</strong>
                          )}
                        </ListItem>
                        <ListItem>
                          <Text>
                            <strong>Classes: </strong>
                            {raceDay.attributes.CarClass}
                          </Text>
                        </ListItem>
                      </List>

                      <iframe
                        style={{
                          marginLeft: "4em",
                          borderRadius: "10px",
                          width: "50%",
                          height: "100%",
                          border: "1px solid black",
                        }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69165.66109543998!2d6.846746647099172!3d50.309764250049184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bfad76fa472afd%3A0xffceaa08b3219545!2sBreidscheider%20Br%C3%BCcke%2C%20N%C3%BCrburgring%20Nordschleife!5e0!3m2!1sen!2ses!4v1677606925377!5m2!1sen!2ses"
                        width="max-content"
                        loading="lazy"
                      ></iframe>
                    </Flex>
                  </Flex>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <Flex
            flexDir="column"
            flex={1}
            minW="100%"
            justify="center"
            align="center"
          >
            <Text fontSize="1.5em" fontWeight="bold" mt={8} mb={4}>
              You have no Racedays, please add one, or join an existing one by
              going back to the main page
            </Text>
            <Link href="/">
              <Button mt={4} colorScheme="blue">
                Go Back
              </Button>
            </Link>
          </Flex>
        )}
      </Accordion>
      <MyPastRaceDays
        myRaceDays={MyRaceDays}
        myRaceDaysAfterToday={myRaceDaysAfterToday}
      />
    </Flex>
  );
}

export default MyRaceDayComponent;
