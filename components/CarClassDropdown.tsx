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
import { filterByClass } from "../lib/filterFunctions";
interface Props {
  setListOfTrackDays: any;
  allTrackDays: any;
  classFilters: any[];
  masterFilters: any[];
}

function CarClassDropdown({
  setListOfTrackDays,
  allTrackDays,
  classFilters,
  masterFilters,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.ariaChecked === "false") {
      classFilters.push(e.currentTarget.value);
    }
    if (e.currentTarget.ariaChecked === "true") {
      const index = classFilters.indexOf(e.currentTarget.value);
      classFilters.splice(index, 1);
    }
    const TrackDaysByClass = filterByClass(classFilters, allTrackDays);
    const classFilterHistory = {
      name: "classFilters",
      value: TrackDaysByClass,
    };

    if (masterFilters.length === 0) {
      setListOfTrackDays(TrackDaysByClass);
      masterFilters.push(classFilterHistory);
    }
    if (masterFilters.length > 0) {
      const index = masterFilters.findIndex(
        (filter) => filter.name === "classFilters"
      );
      if (index === -1) {
        masterFilters.push(classFilterHistory);
      }
      if (index > -1) {
        masterFilters.splice(index, 1, classFilterHistory);
      }
      setListOfTrackDays(TrackDaysByClass);
    }
    console.log(masterFilters);
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        Filter By Class
      </MenuButton>
      <MenuList w={"fit-content"}>
        <MenuOptionGroup type="checkbox">
          <MenuItemOption
            id="GT"
            name="GT"
            onClick={(e) => handleClick(e)}
            value="GT"
          >
            GT
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Touring">
            Touring
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Formula">
            Formula
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Motorbikes">
            Motorbikes
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Prototypes">
            Prototypes
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Other">
            Other
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default CarClassDropdown;
