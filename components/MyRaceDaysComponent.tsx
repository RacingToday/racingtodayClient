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

  return (
    <Flex
      flex={1}
      p={"2em 2em 2em 0em"}
      wrap="wrap"
      minW="100vw"
      maxH={"75vh"}
      overflowY={"scroll"}
      fontSize={["md", "lg", "xl"]}
    >
      <h1
        style={{
          fontSize: "1em",
          display: "flex",
          fontWeight: "bold",
          flex: 1,
          marginBottom: "1em",
        }}
      >
        My Track Days
      </h1>
      <Accordion
        allowMultiple
        style={{
          width: "100%",
        }}
      >
        <Flex mb={3} display={["none", "flex", "flex"]}>
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
                    <Text pb={"1em"}>
                      <h2
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Event Description:
                      </h2>

                      {raceDay.attributes.EventDescription}
                    </Text>
                    <Flex
                      borderTop={"1px solid black"}
                      pt={"1em"}
                      flexDir={"row"}
                    >
                      <List display={"flex"} flexDir={"column"} gap={2}>
                        <ListItem>
                          <text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Capacity:{" "}
                          </text>
                          {raceDay.attributes.Capacity}
                        </ListItem>
                        <ListItem>
                          <text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Organizer:{" "}
                          </text>
                          {raceDay.attributes.OrganizerEmail}
                        </ListItem>
                        <ListItem>
                          <strong>LaneStyle </strong>
                          {raceDay.attributes.OpenPitLane ? "Open" : "Closed"}
                        </ListItem>
                        <ListItem>
                          <text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Location:{" "}
                          </text>
                          {
                            raceDay.attributes.race_track.data.attributes
                              .Location
                          }
                        </ListItem>
                        <ListItem>
                          <text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Start Time:{" "}
                          </text>
                          {raceDay.attributes.StartTime.slice(0, 5)}
                        </ListItem>
                        <ListItem>
                          <text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            End Time:{" "}
                          </text>

                          {raceDay.attributes.EndTime.slice(0, 5)}
                        </ListItem>
                        <ListItem>
                          <text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Date:{" "}
                          </text>

                          {raceDay.attributes.RaceDate}
                        </ListItem>
                        <ListItem>
                          {raceDay.attributes.NoiseRestriction > 0 ? (
                            <Text>
                              Noise Restrictions:{" "}
                              {raceDay.attributes.NoiseRestriction}
                            </Text>
                          ) : (
                            <text
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              Noise Restrictions: None
                            </text>
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
  );
}

export default MyRaceDayComponent;
