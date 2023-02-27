/** @format */

import {
  Alert,
  AlertIcon,
  AlertTitle,
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
import React, { SetStateAction, useRef, useState } from "react";
import RacetrackFilter from "./RacetrackFilter";
interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: SetStateAction<any>;
  arrayOfRacedays: any[];
  allowedNoise: string;
  setAllowedNoise: SetStateAction<any>;
  fromAnTo: any[];
  classFilters: any[];
  trackFilters: string[];
}
import {
  filterByDate,
  filterByNoiseLevel,
  manageCombinedFilters,
} from "../lib/filterFunctions";
import CarClassDropdown from "./CarClassDropdown";

function FiltersToSort({ props }: { props: Props }) {
  const {
    setListOfTrackDays,
    listOfTrackDays,
    arrayOfRacedays,
    fromAnTo,
    allowedNoise,
    classFilters,
    trackFilters,
    setAllowedNoise,
  } = props;
  const masterFilters = useRef<any[]>([]).current;
  const [filterNotification, setFilterNotification] = useState(false);

  function handleSaveFilters(): void {
    const filterToSave = {
      allowedNoise: allowedNoise,
      fromAnTo: fromAnTo,
      classFilters: classFilters,
      trackFilters: trackFilters,
    };
    if (localStorage.getItem("filters")) {
      localStorage.removeItem("filters");
    }

    localStorage.setItem("filters", JSON.stringify(filterToSave));
    // if filtersToSave is empty, remove the filters from local storage
    if (
      filterToSave.allowedNoise === "" &&
      filterToSave.fromAnTo.length === 0 &&
      filterToSave.classFilters.length === 0 &&
      filterToSave.trackFilters.length === 0
    ) {
      localStorage.removeItem("filters");
    }

    setFilterNotification(true);
    setTimeout(() => {
      setFilterNotification(false);
    }, 8000);
  }

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
      <Button
        onClick={handleClick}
        colorScheme="blue"
        border={"none"}
        p={3}
        size="sm"
        m={5}
      >
        {ButtonText}
      </Button>

      {masterFilters.length > 0 &&
        filters &&
        !localStorage.getItem("filters") && (
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
        <Button onClick={handleSaveFilters} colorScheme="green" size="sm" m={2}>
          Save Filters
        </Button>
      )}
      {filterNotification && (
        <Alert status="success" color={"green.500"}>
          <AlertIcon />
          <AlertTitle>
            The filter has been saved and will automatically be applied when you
            load the page
          </AlertTitle>
        </Alert>
      )}
      {filters && (
        <Flex
          mt={"1em"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          p={2}
          bgColor={"red."}
          border={"1px solid #e2e8f0"}
          m={5}
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
            trackFilters={trackFilters}
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
