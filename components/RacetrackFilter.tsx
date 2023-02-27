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
  trackFilters: any[];
}

function RacetrackFilter({
  setListOfTrackDays,
  arrayOfRacedays,
  masterFilters,
  trackFilters,
}: Props) {
  const { data, loading, error } = useQuery(GET_RACETRACKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const uniqueRacetracks = data.raceTracks.data;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (e.currentTarget.ariaChecked === "false") {
      trackFilters.push(e.currentTarget.value);
    }
    if (e.currentTarget.ariaChecked === "true") {
      const index = trackFilters.indexOf(e.currentTarget.value);
      trackFilters.splice(index, 1);
    }
    const TrackDaysByTrack = filterByTrack(trackFilters, arrayOfRacedays);
    const trackFilterHistory = {
      filterType: "track",
      value: TrackDaysByTrack,
    };

    // if there masterfilters contain trackHistory, remove it and add the new one
    if (masterFilters.some((filter) => filter.filterType === "track")) {
      const index = masterFilters.findIndex(
        (filter) => filter.filterType === "track"
      );
      masterFilters.splice(index, 1);
    }

    masterFilters.push(trackFilterHistory);
    const combinedFilters = manageCombinedFilters(masterFilters);
    combinedFilters.length > 1
      ? setListOfTrackDays(combinedFilters)
      : setListOfTrackDays(TrackDaysByTrack);
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
