/** @format */

import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import React from "react";
import { GET_RACETRACKS } from "../lib/helperFunctions";
import { useQuery } from "@apollo/client";
interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: any;
  arrayOfRacedays: any;
}

function RacetrackFilter({ props }: { props: Props }) {
  const { listOfTrackDays, setListOfTrackDays } = props;
  const { data, loading, error } = useQuery(GET_RACETRACKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const uniqueRacetracks = data.raceTracks.data;

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        Filter By Track
      </MenuButton>
      <MenuList w={"fit-content"}>
        <MenuOptionGroup title="Track" type="checkbox">
          {uniqueRacetracks.map((track: any, index: number) => {
            return (
              <MenuItemOption key={index} value={track.attributes.TrackName}>
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
