/** @format */

import React, { SetStateAction, useEffect, useState } from "react";
import { MyRaceDay } from "../lib/types";
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
import { getMyUser, getMyRaceDays } from "../lib/helperFunctions";
import Link from "next/link";

interface Props {
  props: {
    MyRaceDays: any;
    setMyRaceDays: SetStateAction<any>;
  };
}

// create state props for MyRaceDays and setMyRaceDays

function MyRaceDayComponent(props: Props) {
  const { MyRaceDays, setMyRaceDays } = props.props;
  useEffect(() => {
    const GetUser = async () => {
      if (localStorage.getItem("jwt") !== null) {
        const jwt = localStorage.getItem("jwt");
        if (typeof jwt === "string" && jwt.length > 0) {
          interface user {
            id: number;
          }
          const user: user = await getMyUser(jwt);
          const myDays = await getMyRaceDays(jwt, user.id);
          console.log(myDays);

          setMyRaceDays(
            myDays.data.usersPermissionsUser.data.attributes.race_days.data
          );
        }
      }
      return;
    };
    GetUser();
  }, [MyRaceDays, setMyRaceDays]);

  return (
    <>
      <Flex flex={1} p={"2em 5em"} minW="100vw" wrap={"wrap"} maxH={"75vh"}>
        <h1
          style={{
            fontSize: "2em",
            marginBottom: "1em",
          }}
        >
          My Track Days
        </h1>
        <Accordion ml={4} minW="90%" allowMultiple>
          <Flex mb={3} pl="2%">
            <h3
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                width: "22%",
              }}
            >
              Track
            </h3>
            <h3
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                width: "22%",
              }}
            >
              Date
            </h3>
            <h3
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                width: "22%",
              }}
            >
              Start Time
            </h3>
            <h3
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                width: "22%",
              }}
            >
              End Time
            </h3>
          </Flex>
          {MyRaceDays.length > 0 ? (
            MyRaceDays.map((raceDay: MyRaceDay) => (
              <AccordionItem
                border={"1px dotted black"}
                borderRadius="2xl"
                key={raceDay.id}
                backgroundColor={"#f5f5f5"}
                mt={3}
              >
                <AccordionButton p={"1em 0em"}>
                  <Flex
                    flex={1}
                    pl={"2%"}
                    minW={"100%"}
                    flexBasis={"auto"}
                    textAlign={"left"}
                    justifySelf={"flex-start"}
                  >
                    <h3
                      style={{
                        textTransform: "uppercase",
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
                <AccordionPanel minH={"20em"} minW={"100%"}>
                  <Flex flex={1} minW={"100%"}>
                    <Flex
                      flexDir={"column"}
                      borderRight="1px solid black"
                      minH={"25em"}
                      p={"1em 2em"}
                    >
                      <h2>Track Info</h2>
                      <br />
                      image goes here
                      <br />
                      <Text>
                        {
                          raceDay.attributes.race_track.data.attributes
                            .TrackDescription
                        }
                      </Text>
                    </Flex>
                    <Flex p={"1em 2em"} flexDir={"column"}>
                      <Text pb={"1em"}>
                        <h2>Event Description:</h2>
                        <br />
                        {raceDay.attributes.EventDescription}
                      </Text>
                      <Flex
                        borderTop={"1px solid black"}
                        pt={"1em"}
                        flexDir={"row"}
                      >
                        <List>
                          <ListItem>
                            Capacity: {raceDay.attributes.Capacity}
                          </ListItem>
                          <ListItem>
                            Organizer: {raceDay.attributes.OrganizerEmail}
                          </ListItem>
                          <ListItem>
                            Location:{" "}
                            {
                              raceDay.attributes.race_track.data.attributes
                                .Location
                            }
                          </ListItem>
                          <ListItem>
                            Start Time:{" "}
                            {raceDay.attributes.StartTime.slice(0, 5)}
                          </ListItem>
                          <ListItem>
                            End Time: {raceDay.attributes.EndTime.slice(0, 5)}
                          </ListItem>
                          <ListItem>
                            Date: {raceDay.attributes.RaceDate}
                          </ListItem>
                        </List>
                        <iframe
                          style={{
                            marginLeft: "5em",
                            borderRadius: "10px",
                          }}
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11966.87110823999!2d2.1310633420944307!3d41.42364469188054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a497f0b2911c6f%3A0x2c79835d843d7146!2sCamp%20de%20Futbol%20Sant%20Gen%C3%ADs!5e0!3m2!1sen!2ses!4v1674063222656!5m2!1sen!2ses"
                          width="350em"
                          height="350em"
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
              flexDir={"column"}
              flex={1}
              minW={"100%"}
              justify={"center"}
              align={"center"}
            >
              <text
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  marginTop: "2em",
                  marginBottom: "1em",
                }}
              >
                You have no Racedays, please add one, or join an existing one by
                going back to the main page
              </text>
              <Link href={"/"}>
                <Button mt={4} colorScheme={"teal"}>
                  Go Back
                </Button>
              </Link>
            </Flex>
          )}
        </Accordion>
      </Flex>
    </>
  );
}

export default MyRaceDayComponent;
