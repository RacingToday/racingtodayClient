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
interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: any;
  arrayOfRacedays: any;
}

function CarClassDropdown({ props }: { props: Props }) {
  const { listOfTrackDays, setListOfTrackDays } = props;
  const classFilters: any[] = [];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.ariaChecked === "false") {
      classFilters.push(e.currentTarget.value);
    }
    if (e.currentTarget.ariaChecked === "true") {
      const index = classFilters.indexOf(e.currentTarget.value);
      classFilters.splice(index, 1);
    }
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
