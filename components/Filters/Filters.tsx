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
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, {
  HTMLInputTypeAttribute,
  SetStateAction,
  useRef,
  useState,
} from "react";
import RacetrackFilter from "../RacetrackFilter";
interface Props {
  listOfTrackDays: any;
  setListOfTrackDays: SetStateAction<any>;
  arrayOfRacedays: any[];
  allowedNoise: string;
  setAllowedNoise: SetStateAction<any>;
  fromAnTo: any[];
  classFilters: any[];
  trackFilters: string[];
  laneType: string;
  setLaneType: SetStateAction<any>;
}
import {
  filterByDate,
  filterByLaneType,
  filterByNoiseLevel,
  manageCombinedFilters,
} from "../../lib/filterFunctions";
import CarClassDropdown from "./CarClassDropdown";

function FiltersToSort({ props }: { props: Props }) {
  const sizeConfig = ["xs", "sm", "md", "lg"];
  const {
    setListOfTrackDays,
    listOfTrackDays,
    arrayOfRacedays,
    fromAnTo,
    allowedNoise,
    classFilters,
    trackFilters,
    setAllowedNoise,
    laneType,
    setLaneType,
  } = props;
  const masterFilters = useRef<any[]>([]).current;
  const [filterNotification, setFilterNotification] = useState(false);

  function handleLaneTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const trackDaysByLaneType = filterByLaneType(
      e.target.value,
      arrayOfRacedays
    );
    const laneTypeFilterHistory = {
      filterType: "laneType",
      value: trackDaysByLaneType,
    };
    if (masterFilters.some((filter) => filter.filterType === "laneType")) {
      masterFilters.splice(
        masterFilters.findIndex((filter) => filter.filterType === "laneType"),
        1
      );
    }
    masterFilters.push(laneTypeFilterHistory);
    const combinedFilters = manageCombinedFilters(masterFilters);

    setListOfTrackDays(combinedFilters);
  }

  function handleSaveFilters(): void {
    const filterToSave = {
      allowedNoise: allowedNoise,
      fromAnTo: fromAnTo,
      classFilters: classFilters,
      trackFilters: trackFilters,
      laneType: laneType,
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
      filterToSave.trackFilters.length === 0 &&
      filterToSave.laneType === ""
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

    const index = fromAnTo.findIndex((item) => item.name === name);
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

  let filterText;
  const checkForActiveFilters =
    JSON.parse(localStorage.getItem("filters")!) || masterFilters.length > 0
      ? true
      : false;
  if (localStorage.getItem("filters") && masterFilters.length === 0) {
    const parsedFilters = JSON.parse(localStorage.getItem("filters")!);
    if (
      parsedFilters.allowedNoise.length !== "" ||
      parsedFilters.fromAnTo.length > 0 ||
      parsedFilters.classFilters.length > 0 ||
      parsedFilters.trackFilters.length > 0 ||
      parsedFilters.laneType.length > 0 ||
      parsedFilters.laneType.length > 0
    ) {
      filterText = `filtered by : 
      ${parsedFilters.trackFilters.length > 0 ? "Track, " : ""}
      ${parsedFilters.fromAnTo.length > 0 ? "Date, " : ""}
      ${parsedFilters.classFilters.length > 0 ? "Class, " : ""}
      ${parsedFilters.allowedNoise.length > 0 ? "Level of noise, " : ""}
      ${parsedFilters.laneType.length > 0 ? "Lane Type, " : ""}
      `;
    }
  } else {
    filterText = "with no filters applied";
  }

  if (masterFilters.length > 0) {
    filterText = `filtered by : 
    ${
      masterFilters.some(
        (filter) =>
          filter.filterType === "track" &&
          filter.value.length > 0 &&
          filter.value.length !== arrayOfRacedays.length
      )
        ? "Track, "
        : ""
    }
    ${
      masterFilters.some(
        (filter) =>
          filter.filterType === "laneType" &&
          filter.value.length > 0 &&
          filter.value.length !== arrayOfRacedays.length
      )
        ? "Lane Type, "
        : ""
    }
    ${
      masterFilters.some(
        (filter) =>
          filter.filterType === "dateFilters" &&
          filter.value.length > 0 &&
          filter.value.length !== arrayOfRacedays.length
      )
        ? "Date, "
        : ""
    }
    ${
      masterFilters.some(
        (filter) =>
          filter.filterType === "classFilters" &&
          filter.value.length > 0 &&
          filter.value.length !== arrayOfRacedays.length
      )
        ? "Class, "
        : ""
    }
    ${
      masterFilters.some(
        (filter) =>
          filter.filterType === "noiseFilters" &&
          filter.value.length > 0 &&
          filter.value.length !== arrayOfRacedays.length
      )
        ? "Level of noise, "
        : ""
    } `;

    if (
      masterFilters.every(
        (filter) => filter.value.length === arrayOfRacedays.length
      )
    ) {
      filterText = "with no filters applied";
    }
  }
  return (
    <>
      <Button
        onClick={handleClick}
        colorScheme="blue"
        border={"none"}
        h={["2rem", "2rem", "2.4rem"]}
        fontSize={["sm", "sm", "md", "md"]}
        w="fit-content"
        m={5}
      >
        {ButtonText}
      </Button>
      <Text
        flex={1}
        m={"0.2rem 2rem"}
        fontSize={[14, 16, 18, 20]}
        position={"relative"}
      >
        You are currently looking at <b>{listOfTrackDays.length}</b> track days{" "}
        <b>{filterText}</b>
      </Text>
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
          flexWrap={"wrap"}
          gap={6}
          p={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          alignContent={"center"}
          border={"1px solid #e2e8f0"}
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
          <label
            style={{
              fontSize: "1rem",
            }}
          >
            From
            <Input
              w={"10rem"}
              variant={"filled"}
              name="fromDate"
              borderRadius={"md"}
              ml={"1em"}
              type="date"
              size={sizeConfig}
              className="fromDate"
              border={"black" + " 1px solid"}
              fontSize={"1rem"}
              style={{
                fontSize: "1rem",
              }}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label
            style={{
              fontSize: "1rem",
            }}
          >
            To
            <Input
              w={"10rem"}
              onChange={(e) => handleChange(e)}
              type="date"
              name="toDate"
              size={sizeConfig}
              className="toDate"
              variant={"filled"}
              style={{
                fontSize: "1rem",
              }}
              ml={"1em"}
            />
          </label>

          <label
            style={{
              fontSize: "1rem",
            }}
          >
            DB Limit
            <Input
              variant={"filled"}
              w={"10rem"}
              size={sizeConfig}
              h={"2.5rem"}
              style={{
                marginLeft: "1em",
                fontSize: "1rem",
              }}
              type={"number"}
              placeholder="enter a number"
              value={allowedNoise}
              onChange={(e) => handleNoiseChange(e)}
            />
          </label>
          <Select
            variant={"filled"}
            w={"auto"}
            value={laneType}
            onChange={(e) => {
              setLaneType(e.target.value);
              handleLaneTypeChange(e);
            }}
          >
            <option value="all">All</option>
            <option value="Open">Open Pit Lane</option>
            <option value="Split">Split Pit Lane</option>
          </Select>
          <Flex w="80%" justifyContent="left">
            {checkForActiveFilters && filters && (
              <Button
                onClick={() => {
                  setAllowedNoise("");

                  masterFilters.splice(0, masterFilters.length);
                  fromAnTo.splice(0, fromAnTo.length);
                  classFilters.splice(0, classFilters.length);
                  trackFilters.splice(0, trackFilters.length);
                  localStorage.removeItem("filters");
                  // update the date values to default

                  const fromDate: any = document.querySelector(".fromDate");
                  const toDate: any = document.querySelector(".toDate");
                  if (fromDate && toDate) {
                    fromDate.value = "";
                    toDate.value = "";
                  }

                  setListOfTrackDays(arrayOfRacedays);
                }}
                colorScheme="red"
                size="sm"
                m={2}
              >
                Clear Filters
              </Button>
            )}
            {checkForActiveFilters && filters && (
              <Button
                onClick={handleSaveFilters}
                colorScheme="green"
                size="sm"
                m={2}
              >
                Save Filters
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default FiltersToSort;
