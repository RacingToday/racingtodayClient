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
import {
  filterByDate,
  filterByNoiseLevel,
  manageCombinedFilters,
} from "../lib/filterFunctions";
import CarClassDropdown from "./CarClassDropdown";

function FiltersToSort({ props }: { props: Props }) {
  const { setListOfTrackDays, listOfTrackDays, arrayOfRacedays } = props;
  const masterFilters = useRef<any[]>([]).current;
  const [allowedNoise, setAllowedNoise] = useState("");
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
    const trackDaysByDate = filterByDate(fromAnTo, arrayOfRacedays);

    const dateFilterHistory = {
      filterType: "dateFilters",
      value: trackDaysByDate,
    };

    if (masterFilters.some((filter) => filter.filterType === "dateFilters")) {
      const index = masterFilters.findIndex(
        (filter) => filter.filterType === "dateFilters"
      );
      masterFilters.splice(index, 1);
    }
    masterFilters.push(dateFilterHistory);
    const combinedFilters = manageCombinedFilters(masterFilters);
    masterFilters.length > 1
      ? setListOfTrackDays(combinedFilters)
      : setListOfTrackDays(trackDaysByDate);
  };
  const [filters, setFilters] = React.useState(false);
  const [ButtonText, setButtonText] = useState("Show Filters");
  const handleClick = () => {
    setFilters(!filters);
    if (ButtonText === "Show Filters") {
      setButtonText("Hide Filters");
    } else {
      setButtonText("Show Filters");
    }
  };
  const handleNoiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;
    setAllowedNoise(e.target.value);
    const trackDaysByNoise = filterByNoiseLevel(arrayOfRacedays, value);
    const noiseFilterHistory = {
      filterType: "noiseFilters",
      value: trackDaysByNoise,
    };

    if (masterFilters.some((filter) => filter.filterType === "noiseFilters")) {
      const index = masterFilters.findIndex(
        (filter) => filter.filterType === "noiseFilters"
      );
      masterFilters.splice(index, 1);
    }
    masterFilters.push(noiseFilterHistory);
    const combinedFilters = manageCombinedFilters(masterFilters);
    masterFilters.length > 1
      ? setListOfTrackDays(combinedFilters)
      : setListOfTrackDays(trackDaysByNoise);
  };

  return (
    <>
      <Button onClick={handleClick} colorScheme="blue" size="sm" m={2}>
        {ButtonText}
      </Button>

      {masterFilters.length > 0 && filters && (
        <Button
          onClick={() => {
            setListOfTrackDays(arrayOfRacedays);
            setAllowedNoise("");
            masterFilters.splice(0, masterFilters.length);
          }}
          colorScheme="red"
          size="sm"
          m={2}
        >
          Clear Filters
        </Button>
      )}
      {masterFilters.length > 0 && filters && (
        <Button
          onClick={() => {
            // write masterFilters to local storage
            localStorage.setItem("filters", JSON.stringify(masterFilters));
          }}
          colorScheme="green"
          size="sm"
          m={2}
        >
          Save Filters
        </Button>
      )}
      {filters && (
        <Flex
          mt={"1em"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          p={2}
          m={2}
          borderRadius={"md"}
        >
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
