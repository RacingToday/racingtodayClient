/** @format */

import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { SetStateAction, useEffect } from "react";
import { RaceDay } from "../../lib/types";
import RequestToJoin from "./RequestToJoin";
import {
  filterByClass,
  filterByDate,
  filterByNoiseLevel,
  filterByTrack,
  manageCombinedFilters,
  filterByLaneType,
} from "../../lib/filterFunctions";
import { Text } from "@chakra-ui/react";

interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: any;
  arrayOfRacedays: any;
  allowedNoise: string;
  setAllowedNoise: SetStateAction<any>;
  fromAnTo: any[];
  classFilters: any[];
  trackFilters: string[];
  laneType: string;
  setLaneType: SetStateAction<any>;
}

// change yyyy-mm-dd to dd-mm-yyyy
function formatDate(date: string) {
  const dateArray = date.split("-");
  const newDate = `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`;
  return newDate;
}
function RaceDayList({ props }: { props: Props }) {
  const sizeConfig = useBreakpointValue({
    base: "md",
    sm: "md",
    md: "lg",
    lg: "xl",
  });

  const {
    listOfTrackDays,
    setListOfTrackDays,
    arrayOfRacedays,
    setAllowedNoise,
    fromAnTo,
    classFilters,
    trackFilters,
    laneType,
    setLaneType,
  } = props;
  useEffect(() => {
    if (localStorage.getItem("filters") !== null) {
      let masterFilterObject: any = [];
      const filters = JSON.parse(localStorage.getItem("filters")!);
      // check if filters are empty
      if (filters.allowedNoise !== "") {
        const noiseValue = filterByNoiseLevel(
          arrayOfRacedays,
          filters.allowedNoise
        );
        masterFilterObject.push({ value: noiseValue });
        setAllowedNoise(filters.allowedNoise);
      }
      if (filters.fromAnTo.length > 0) {
        const dateValue = filterByDate(filters.fromAnTo, arrayOfRacedays);
        console.log("dateValue", dateValue);
        masterFilterObject.push({ value: dateValue });
      }
      if (filters.classFilters.length > 0) {
        const classValue = filterByClass(filters.classFilters, arrayOfRacedays);
        console.log("classFilters", classValue);
        masterFilterObject.push({ value: classValue });
      }
      if (filters.trackFilters.length > 0) {
        const trackValue = filterByTrack(filters.trackFilters, arrayOfRacedays);
        console.log("trackValue", trackValue);
        masterFilterObject.push({ value: trackValue });
      }
      if (filters.laneType !== "") {
        const laneValue = filterByLaneType(filters.laneType, arrayOfRacedays);
        console.log("laneValue", laneValue);
        masterFilterObject.push({ value: laneValue });
      }
      const combinedFilters = manageCombinedFilters(masterFilterObject);
      console.log("combinedFilters", combinedFilters);
      setListOfTrackDays(combinedFilters);
    }
    if (!localStorage.getItem("filters")) {
      setListOfTrackDays(arrayOfRacedays);
    }
  }, [
    arrayOfRacedays,
    classFilters,
    fromAnTo,
    setAllowedNoise,
    setListOfTrackDays,
    trackFilters,
  ]);
  return (
    <>
      <Heading as="h1" m="1em 1.5em" fontSize="1.5em">
        Track Days
      </Heading>
      <Grid
        ml={4}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {listOfTrackDays.length > 0 &&
          listOfTrackDays.map((raceday: RaceDay) => (
            <Box
              key={raceday.id}
              borderRadius="10px"
              boxShadow="lg"
              p={4}
              bgGradient="linear(to-t, blue.100, blue.50)"
              overflow="hidden"
            >
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" color="blue.900">
                  Track:{" "}
                  {raceday.attributes.race_track.data.attributes.TrackName}
                </Text>
                <Text color="blue.800">
                  Date: {formatDate(raceday.attributes.RaceDate)}
                </Text>
                <Text color="blue.800">
                  Lane Style :{" "}
                  {raceday.attributes.OpenPitLane ? "Open" : "Split"}
                </Text>
                <Text color="blue.800">
                  Classes: {raceday.attributes.CarClass}
                </Text>
                <Text color="blue.800">From €{raceday.attributes.Price}</Text>
                <HStack mt="auto" alignSelf="end">
                  <RequestToJoin raceDay={raceday} />
                </HStack>
              </VStack>
            </Box>
          ))}
      </Grid>
      {listOfTrackDays.length === 0 && (
        <Box
          textAlign="center"
          alignSelf="center"
          m="0.7em 2em"
          p="1em 2.2em"
          borderRadius="10px"
          fontStyle="italic"
          fontSize="1.2em"
          fontWeight="bold"
          backgroundColor="#f5f5f5"
        >
          No Trackdays matched your search, please try again
        </Box>
      )}
    </>
  );
}

export default RaceDayList;
