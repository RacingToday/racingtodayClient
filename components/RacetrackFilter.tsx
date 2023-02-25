/** @format */

import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { GET_RACETRACKS } from "../lib/helperFunctions";
import { useQuery } from "@apollo/client";
import { filterByTrack, manageCombinedFilters } from "../lib/filterFunctions";
interface Props {
  setListOfTrackDays: any;
  arrayOfRacedays: any;
  masterFilters: any[];
}

function RacetrackFilter({
  setListOfTrackDays,
  arrayOfRacedays,
  masterFilters,
}: Props) {
  const trackFilters = useRef<string[]>([]).current;
  const { data, loading, error } = useQuery(GET_RACETRACKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const uniqueRacetracks = data.raceTracks.data;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.ariaChecked === "false") {
      trackFilters.push(e.currentTarget.value);
    }
    if (e.currentTarget.ariaChecked === "true") {
      const index = trackFilters.indexOf(e.currentTarget.value);
      trackFilters.splice(index, 1);
    }
    const TrackDaysByTrack = filterByTrack(trackFilters, arrayOfRacedays);
    const trackFilterHistory = {
      name: "trackFilters",
      value: TrackDaysByTrack,
    };
    if (masterFilters.length === 0) {
      setListOfTrackDays(TrackDaysByTrack);
      masterFilters.push(trackFilterHistory);
      return;
    }
    if (masterFilters.length > 0) {
      const index = masterFilters.findIndex(
        (filter) => filter.name === "trackFilters"
      );
      if (index === -1) {
        masterFilters.push(trackFilterHistory);
      }
      if (index > -1) {
        masterFilters.splice(index, 1, trackFilterHistory);
      }
      const multipleFiltersApplied = manageCombinedFilters(masterFilters);
      console.log(multipleFiltersApplied);
      setListOfTrackDays(multipleFiltersApplied);
      return;
    }
    return;
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        Filter By Track
      </MenuButton>
      <MenuList w={"fit-content"}>
        <MenuOptionGroup title="Track" type="checkbox">
          {uniqueRacetracks.map((track: any, index: number) => {
            return (
              <MenuItemOption
                key={index}
                value={track.attributes.TrackName}
                onClick={(e) => handleClick(e)}
              >
                {track.attributes.TrackName}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default RacetrackFilter;
