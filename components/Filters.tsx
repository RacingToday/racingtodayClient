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
import React, { SetStateAction, useRef } from "react";
import { useState } from "react";
import RacetrackFilter from "./RacetrackFilter";
interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: SetStateAction<any>;
  arrayOfRacedays: any[];
}
import { filterByDate, filterByNoiseLevel } from "../lib/filterFunctions";
import CarClassDropdown from "./CarClassDropdown";

function FiltersToSort({ props }: { props: Props }) {
  const { setListOfTrackDays, listOfTrackDays, arrayOfRacedays } = props;
  const masterFilters = useRef<any[]>([]).current;
  const [allowedNoise, setAllowedNoise] = useState<string>("");
  const fromAnTo = useRef<any[]>([]).current;
  const classFilters = useRef<any[]>([]).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    const dateObject = {
      name,
      value,
    };
    // check if the name is already in the array
    const index = fromAnTo.findIndex((item) => item.name === name);
    // if it is, remove it
    if (index > -1) {
      fromAnTo.splice(index, 1);
    }
    fromAnTo.push(dateObject);
    const trackDaysByDate = filterByDate(fromAnTo, listOfTrackDays);

    const dateFilterHistory = {
      name: "dateFilters",
      value: trackDaysByDate,
    };
    if (masterFilters.length === 0) {
      setListOfTrackDays(trackDaysByDate);
      masterFilters.push(dateFilterHistory);
    }
    if (masterFilters.length > 0) {
      const index = masterFilters.findIndex(
        (filter) => filter.name === "dateFilters"
      );
      if (index === -1) {
        masterFilters.push(dateFilterHistory);
      }
      if (index > -1) {
        masterFilters.splice(index, 1, dateFilterHistory);
      }

      setListOfTrackDays(trackDaysByDate);
    }
    console.log(masterFilters);
  };
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
  const handleNoiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;
    setAllowedNoise(value);
    const trackDaysByNoise = filterByNoiseLevel(arrayOfRacedays, value);
    const noiseFilterHistory = {
      name: "noiseFilters",
      value: trackDaysByNoise,
    };

    if (masterFilters.length === 0) {
      setListOfTrackDays(trackDaysByNoise);
      masterFilters.push(noiseFilterHistory);
    }
    if (masterFilters.length > 0) {
      const index = masterFilters.findIndex(
        (filter) => filter.name === "noiseFilters"
      );
      if (index === -1) {
        masterFilters.push(noiseFilterHistory);
      }
      if (index > -1) {
        masterFilters.splice(index, 1, noiseFilterHistory);
      }
      setListOfTrackDays(trackDaysByNoise);
    }
    console.log(masterFilters);
  };

  return (
    <>
      <Button onClick={handleClick} colorScheme="blue" size="sm" m={2}>
        {ButtonText}
      </Button>
      {filters && (
        <Flex mt={"1em"} justifyContent={"space-around"} flexWrap={"wrap"}>
          <CarClassDropdown
            setListOfTrackDays={setListOfTrackDays}
            allTrackDays={arrayOfRacedays}
            classFilters={classFilters}
            masterFilters={masterFilters}
          />
          <RacetrackFilter
            setListOfTrackDays={setListOfTrackDays}
            arrayOfRacedays={arrayOfRacedays}
            masterFilters={masterFilters}
          />
          <label>
            From
            <Input
              w={"10rem"}
              variant={"filled"}
              name="fromDate"
              ml={"1em"}
              type="date"
              className="fromDate"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            To
            <Input
              w={"10rem"}
              onChange={(e) => handleChange(e)}
              type="date"
              name="toDate"
              className="toDate"
              variant={"filled"}
              ml={"1em"}
            />
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
              onChange={(e) => handleNoiseChange(e)}
            />
          </label>
        </Flex>
      )}
    </>
  );
}

export default FiltersToSort;
