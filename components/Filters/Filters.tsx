import React, {
  HTMLInputTypeAttribute,
  SetStateAction,
  useRef,
  useState,
} from "react";
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
    filterText = "with no filters applied.";
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
      filterText = "with no filters applied.";
    }

    if (filterText.includes(",")) {
      // get the index of the last comma in the string
      const lastCommaIndex = filterText.lastIndexOf(",");
      // replace the last comma with an "and"
      filterText =
        filterText.substring(0, lastCommaIndex) +
        "." +
        filterText.substring(lastCommaIndex + 1);
    }
  }
  //#296ad2, #2e4bee
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-left gap-10 items-center w-full my-4">
        <button
          className="responsive-button blue-button ml-10 "
          onClick={handleClick}
        >
          {ButtonText}
        </button>

        <p className="text-md md:text-lg relative ml-7">
          You are currently looking at <b>{listOfTrackDays.length}</b> track
          days <b>{filterText}</b>
        </p>
      </div>
      {filterNotification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">
            The filter has been saved and will automatically be applied when you
            load the page
          </strong>
        </div>
      )}
      {filters && (
        <div className="flex flex-wrap gap-6 p-4 m-4 justify-around items-start align-center border border-black bg-gray-100 rounded-md">
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
          <label className="text-lg">
            From
            <input
              className="w-40 bg-white text-center border py-1 border-black rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              type="date"
              name="fromDate"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label className="text-lg">
            To
            <input
              className="w-40 bg-white border text-center py-1 border-black rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              type="date"
              name="toDate"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label className="text-lg">
            DB Limit
            <input
              className="w-40 bg-white text-center border border-black rounded-md ml-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              type="number"
              placeholder="enter a number"
              value={allowedNoise}
              onChange={(e) => handleNoiseChange(e)}
            />
          </label>

          <label className="text-lg flex items-center">
            Lane Type
            <select
              className="w-40 bg-white text-center border border-black rounded-md ml-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              value={laneType}
              onChange={(e) => {
                setLaneType(e.target.value);
                handleLaneTypeChange(e);
              }}
            >
              <option value="all">All</option>
              <option value="Open">Open Pit Lane</option>
              <option value="Split">Split Pit Lane</option>
            </select>
          </label>

          <div className="flex w-80 justify-start">
            {checkForActiveFilters && filters && (
              <button
                onClick={() => {
                  setAllowedNoise("");

                  masterFilters.splice(0, masterFilters.length);
                  fromAnTo.splice(0, fromAnTo.length);
                  classFilters.splice(0, classFilters.length);
                  trackFilters.splice(0, trackFilters.length);
                  localStorage.removeItem("filters");
                  // update the date values to default

                  const fromDate = document.querySelector(
                    ".fromDate"
                  ) as HTMLInputElement;
                  const toDate = document.querySelector(
                    ".toDate"
                  ) as HTMLInputElement;
                  if (fromDate && toDate) {
                    fromDate.value = "";
                    toDate.value = "";
                  }

                  setListOfTrackDays(arrayOfRacedays);
                }}
                className="bg-gradient-to-r  from-red-500 to-red-700 hover:bg-red-500 shadow-lg text-white px-6 py-2 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 m-2"
              >
                Clear Filters
              </button>
            )}
            {checkForActiveFilters && filters && (
              <button
                onClick={handleSaveFilters}
                className=" shadow-lg bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 font-bold rounded focus:outline-none focus:ring-2 focus:ring-green-300 m-2"
              >
                Save Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersToSort;
