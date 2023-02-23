/** @format */

import { gql, useQuery } from "@apollo/client";
import { Box, Button, Flex, List, ListItem } from "@chakra-ui/react";
import React, { SetStateAction, useEffect } from "react";
import RequestToJoin from "./RequestToJoin";

interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: any;
  arrayOfRacedays: any;
}

/** @format */
function RaceDayList({ props }: { props: Props }) {
  const { loading, error, data } = useQuery(GET_RACEDAYS);
  const { listOfTrackDays, setListOfTrackDays, arrayOfRacedays } = props;
  useEffect(() => {
    setListOfTrackDays(arrayOfRacedays);
  }, [arrayOfRacedays, setListOfTrackDays]);

  return (
    <>
      <h1
        style={{
          margin: "1em 1.5em",
          fontSize: "1.5em",
        }}
      >
        RaceDays
      </h1>
      <Flex flexDir="column" className="mapOfRaceDays">
        {listOfTrackDays.map((raceday: any) => (
          <Flex
            borderRadius={"10px"}
            minH={"6em"}
            flexDir={"row"}
            p={"0em 2.2em"}
            justifyContent={"space-between"}
            backgroundColor={"#f5f5f5"}
            m={"0.7em 2em"}
            flex={1}
            border={"1px dotted black"}
            key={raceday.id}
          >
            <Box textAlign={"center"} alignSelf="center">
              {raceday.attributes.RaceDate}
            </Box>
            <Box alignSelf={"center"}>
              {raceday.attributes.EventDescription}{" "}
            </Box>
            <Box alignSelf={"center"}>{raceday.attributes.RaceDayCapacity}</Box>
            <Box alignSelf={"center"} textAlign="center">
              Prices From €{raceday.attributes.Price}
            </Box>
            <Box alignSelf={"center"}>
              <RequestToJoin raceDay={raceday} />
            </Box>
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export default RaceDayList;
const GET_RACEDAYS = gql`
  {
    racaDays(pagination: { start: 0, limit: 30 }) {
      data {
        id
        attributes {
          EventDescription
          RaceDate
          Price
          StartTime
          EndTime
          Capacity
          Price
          race_track {
            data {
              attributes {
                TrackDescription
                TrackName
                Location
              }
            }
          }
        }
      }
    }
  }
`;
