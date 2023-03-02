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
import { filterByClass, manageCombinedFilters } from "../lib/filterFunctions";
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
      filterType: "classFilters",
      value: TrackDaysByClass,
    };
    if (masterFilters.some((filter) => filter.filterType === "classFilters")) {
      const index = masterFilters.findIndex(
        (filter) => filter.filterType === "classFilters"
      );
      masterFilters.splice(index, 1);
    }
    masterFilters.push(classFilterHistory);
    const combinedFilters = manageCombinedFilters(masterFilters);
    combinedFilters.length > 1
      ? setListOfTrackDays(combinedFilters)
      : setListOfTrackDays(TrackDaysByClass);
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        colorScheme="blue"
        w={["6rem", "6rem", "8rem", "10rem"]}
        fontSize={["xs", "xs", "sm", "md"]}
        p={["0.5rem", "0.5rem", "0.5rem", "0.5rem"]}
      >
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
          <MenuItemOption
            onChange={() => handleClick}
            onClick={(e) => handleClick(e)}
            value="Touring"
          >
            Touring
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Formel">
            Formula
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Motorbikes">
            Motorbikes
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Prototypes">
            Prototypes
          </MenuItemOption>
          <MenuItemOption onClick={(e) => handleClick(e)} value="Others">
            Other
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default CarClassDropdown;
