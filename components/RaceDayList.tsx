/** @format */

import { gql, useQuery } from "@apollo/client";
import { Box, Button, Flex, List, ListItem } from "@chakra-ui/react";
import React, { SetStateAction, useEffect } from "react";
import { RaceDay } from "../lib/types";
import RequestToJoin from "./RequestToJoin";
import {
  filterByClass,
  filterByDate,
  filterByNoiseLevel,
  filterByTrack,
  manageCombinedFilters,
} from "../lib/filterFunctions";

interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: any;
  arrayOfRacedays: any;
  allowedNoise: string;
  setAllowedNoise: SetStateAction<any>;
  fromAnTo: any[];
  classFilters: any[];
  trackFilters: string[];
}
// change yyyy-mm-dd to dd-mm-yyyy
function formatDate(date: string) {
  const dateArray = date.split("-");
  const newDate = `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`;
  return newDate;
}
/** @format */
function RaceDayList({ props }: { props: Props }) {
  const {
    listOfTrackDays,
    setListOfTrackDays,
    arrayOfRacedays,
    setAllowedNoise,
    fromAnTo,
    classFilters,
    trackFilters,
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
        masterFilterObject.push({ value: dateValue });
      }
      if (filters.classFilters.length > 0) {
        const classValue = filterByClass(filters.classFilters, arrayOfRacedays);
        masterFilterObject.push({ value: classValue });
      }
      if (filters.trackFilters.length > 0) {
        const trackValue = filterByTrack(filters.trackFilters, arrayOfRacedays);
        masterFilterObject.push({ value: trackValue });
      }
      const combinedFilters = manageCombinedFilters(masterFilterObject);

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
      <h1
        style={{
          margin: "1em 1.5em",
          fontSize: "1.5em",
        }}
      >
        RaceDays
      </h1>
      <Flex flexDir="column" className="mapOfRaceDays">
        {listOfTrackDays.length > 0 &&
          listOfTrackDays.map((raceday: RaceDay) => (
            <Flex
              borderRadius={"10px"}
              minH={"6em"}
              flexDir={"row"}
              p={"0em 2.2em"}
              justifyContent={"space-between"}
              backgroundColor={"#f5f5f5"}
              m={"0.7em 2em"}
              border={"1px dotted black"}
              key={raceday.id}
            >
              <Box textAlign={"center"} alignSelf="center">
                {formatDate(raceday.attributes.RaceDate)}
              </Box>
              <Box alignSelf={"center"}>
                {raceday.attributes.EventDescription}{" "}
              </Box>
              <Box alignSelf={"center"}>
                {raceday.attributes.RaceDayCapacity}
              </Box>
              <Box alignSelf={"center"} textAlign="center">
                Prices From €{raceday.attributes.Price}
              </Box>
              <Box alignSelf={"center"}>
                <RequestToJoin raceDay={raceday} />
              </Box>
            </Flex>
          ))}
        {listOfTrackDays.length === 0 && (
          <Box
            textAlign={"center"}
            alignSelf={"center"}
            m={"0.7em 2em"}
            p={"1em 2.2em"}
            border={"1px dotted black"}
            borderRadius={"10px"}
            fontStyle={"italic"}
            fontSize={"1.2em"}
            fontWeight={"bold"}
            backgroundColor={"#f5f5f5"}
          >
            No Trackdays matched your search, please try again
          </Box>
        )}
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
