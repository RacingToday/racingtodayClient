/** @format */

import {
  Button,
  Flex,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import RacetrackFilter from "./RacetrackFilter";
interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: any;
  arrayOfRacedays: any;
}
import CarClassDropdown from "./CarClassDropdown";

function FiltersToSort({ props }: { props: Props }) {
  const { setListOfTrackDays, listOfTrackDays, arrayOfRacedays } = props;
  const [allowedNoise, setAllowedNoise] = useState<string>("");

  const [filters, setFilters] = React.useState(false);
  const [ButtonText, setButtonText] = useState("Filters");
  const handleClick = () => {
    setFilters(!filters);
    if (ButtonText === "Filters") {
      setButtonText("Hide Filters");
    } else {
      setButtonText("Filters");
    }
  };

  return (
    <>
      <Button onClick={handleClick} colorScheme="blue" size="sm" m={2}>
        {ButtonText}
      </Button>
      {filters && (
        <Flex mt={"1em"} justifyContent={"space-around"} flexWrap={"wrap"}>
          <CarClassDropdown props={props} />
          <RacetrackFilter props={props} />
          <label>
            From
            <Input w={"10rem"} variant={"filled"} ml={"1em"} type="date" />
          </label>
          <label>
            To
            <Input w={"10rem"} type="date" variant={"filled"} ml={"1em"} />
          </label>

          <label>
            DB Limit
            <Input
              variant={"filled"}
              w={"10rem"}
              style={{
                marginLeft: "1em",
              }}
              type={"number"}
              placeholder="input to filter"
              value={allowedNoise}
              onChange={(e) => setAllowedNoise(e.target.value)}
            />
          </label>
        </Flex>
      )}
    </>
  );
}

export default FiltersToSort;
