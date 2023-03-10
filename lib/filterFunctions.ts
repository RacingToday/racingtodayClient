/** @format */
// empty export function to make it a module
import { RaceDay } from "./types";
export function filterByClass(
  arrayOfClassesToFilter: string[],
  arrayOfAllTrackDays: any[]
) {
  // if no classes are selected, return all track days
  if (arrayOfClassesToFilter.length === 0) {
    return arrayOfAllTrackDays;
  }
  let resultsArray = [];
  for (let i = 0; i < arrayOfClassesToFilter.length; i++) {
    for (let k = 0; k < arrayOfAllTrackDays.length; k++) {
      if (
        arrayOfAllTrackDays[k].attributes.CarClass !== null &&
        arrayOfAllTrackDays[k].attributes.CarClass.includes(
          arrayOfClassesToFilter[i]
        )
      ) {
        resultsArray.push(arrayOfAllTrackDays[k]);
      }
    }
  }

  resultsArray = resultsArray.filter(
    (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
  );

  return resultsArray;
}

export function filterByTrack(
  arrayOfTracksToFilter: string[],
  arrayOfAllTrackDays: RaceDay[]
) {
  // if no tracks are selected, return all track days
  if (arrayOfTracksToFilter.length < 1) {
    return arrayOfAllTrackDays;
  }
  let resultsArray: RaceDay[] = [];
  for (let i = 0; i < arrayOfTracksToFilter.length; i++) {
    for (let k = 0; k < arrayOfAllTrackDays.length; k++) {
      if (
        arrayOfAllTrackDays[k].attributes.race_track.data.attributes
          .TrackName !== null &&
        arrayOfAllTrackDays[
          k
        ].attributes.race_track.data.attributes.TrackName.includes(
          arrayOfTracksToFilter[i]
        )
      ) {
        resultsArray.push(arrayOfAllTrackDays[k]);
      }
    }
  }

  resultsArray = resultsArray.filter(
    (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
  );

  return resultsArray;
}

interface FromAndToDate {
  value: string;
  name: string;
}

export function filterByDate(
  FromAndToDate: FromAndToDate[],
  arrayOfAllTrackDays: any[]
): any[] {
  let resultsArray: RaceDay[] = [];

  if (
    FromAndToDate.length === 0 ||
    (FromAndToDate.length === 1 && FromAndToDate[0].value === "") ||
    (FromAndToDate[0].value === "" && FromAndToDate[1].value === "")
  ) {
    return arrayOfAllTrackDays;
  }

  for (let i = 0; i < arrayOfAllTrackDays.length; i++) {
    for (let k = 0; k < FromAndToDate.length; k++) {
      if (
        FromAndToDate.length === 1 ||
        FromAndToDate[0].value === "" ||
        FromAndToDate[1].value === ""
      ) {
        if (
          FromAndToDate[k].value.length !== null &&
          arrayOfAllTrackDays[i].attributes.RaceDate !== null &&
          FromAndToDate[k].name === "fromDate"
        ) {
          const year = FromAndToDate[k].value.slice(0, 4);
          const month = FromAndToDate[k].value.slice(5, 7);
          const day = FromAndToDate[k].value.slice(8, 10);

          const raceYear = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
            0,
            4
          );
          const raceMonth = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
            5,
            7
          );
          const raceDay = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
            8,
            10
          );

          // if there is a fromDate, check if the track day is after the fromDate
          if (
            FromAndToDate[k].name === "fromDate" &&
            year.length > 0 &&
            raceYear.length > 0
          ) {
            if (parseInt(raceYear) > parseInt(year)) {
              resultsArray.push(arrayOfAllTrackDays[i]);
            }
            if (
              parseInt(raceYear) === parseInt(year) &&
              parseInt(raceMonth) > parseInt(month)
            ) {
              resultsArray.push(arrayOfAllTrackDays[i]);
            }
            if (
              parseInt(raceYear) === parseInt(year) &&
              parseInt(raceMonth) === parseInt(month) &&
              parseInt(raceDay) >= parseInt(day)
            ) {
              resultsArray.push(arrayOfAllTrackDays[i]);
            }
          }
        }
        if (
          FromAndToDate[k].value.length !== null &&
          arrayOfAllTrackDays[i].attributes.RaceDate !== null &&
          FromAndToDate[k].name === "toDate"
        ) {
          const year = FromAndToDate[k].value.slice(0, 4);
          const month = FromAndToDate[k].value.slice(5, 7);
          const day = FromAndToDate[k].value.slice(8, 10);

          const raceYear = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
            0,
            4
          );
          const raceMonth = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
            5,
            7
          );
          const raceDay = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
            8,
            10
          );

          // if there is a toDate, check if the track day is before the toDate
          if (
            FromAndToDate[k].name === "toDate" &&
            year.length > 0 &&
            raceYear.length > 0
          ) {
            if (parseInt(raceYear) < parseInt(year)) {
              resultsArray.push(arrayOfAllTrackDays[i]);
            }
            if (
              parseInt(raceYear) === parseInt(year) &&
              parseInt(raceMonth) < parseInt(month)
            ) {
              resultsArray.push(arrayOfAllTrackDays[i]);
            }
            if (
              parseInt(raceYear) === parseInt(year) &&
              parseInt(raceMonth) === parseInt(month) &&
              parseInt(raceDay) <= parseInt(day)
            ) {
              resultsArray.push(arrayOfAllTrackDays[i]);
            }
          }
        }
      }
      // TODO if both fromDate and toDate?
      if (
        FromAndToDate.length > 1 &&
        FromAndToDate[1].value !== "" &&
        FromAndToDate[0].value !== "" &&
        arrayOfAllTrackDays[i].attributes.RaceDate !== null
      ) {
        const raceYear = arrayOfAllTrackDays[i].attributes.RaceDate.slice(0, 4);
        const raceMonth = arrayOfAllTrackDays[i].attributes.RaceDate.slice(
          5,
          7
        );
        const raceDay = arrayOfAllTrackDays[i].attributes.RaceDate.slice(8, 10);

        let fromDateYear =
          FromAndToDate[0].value <= FromAndToDate[1].value
            ? FromAndToDate[0].value.slice(0, 4)
            : FromAndToDate[1].value.slice(0, 4);
        let fromDateMonth =
          FromAndToDate[0].value <= FromAndToDate[1].value
            ? FromAndToDate[0].value.slice(5, 7)
            : FromAndToDate[1].value.slice(5, 7);
        let fromDateDay =
          FromAndToDate[0].value <= FromAndToDate[1].value
            ? FromAndToDate[0].value.slice(8, 10)
            : FromAndToDate[1].value.slice(8, 10);
        let toDateYear =
          FromAndToDate[0].value >= FromAndToDate[1].value
            ? FromAndToDate[0].value.slice(0, 4)
            : FromAndToDate[1].value.slice(0, 4);
        let toDateMonth =
          FromAndToDate[0].value >= FromAndToDate[1].value
            ? FromAndToDate[0].value.slice(5, 7)
            : FromAndToDate[1].value.slice(5, 7);
        let toDateDay =
          FromAndToDate[0].value >= FromAndToDate[1].value
            ? FromAndToDate[0].value.slice(8, 10)
            : FromAndToDate[1].value.slice(8, 10);

        if (
          parseInt(raceYear) > parseInt(fromDateYear) &&
          parseInt(raceYear) < parseInt(toDateYear)
        ) {
          resultsArray.push(arrayOfAllTrackDays[i]);
        }
        if (
          parseInt(raceYear) === parseInt(fromDateYear) &&
          parseInt(raceYear) < parseInt(toDateYear) &&
          parseInt(raceMonth) > parseInt(fromDateMonth)
        ) {
          resultsArray.push(arrayOfAllTrackDays[i]);
        }
        if (
          parseInt(raceYear) > parseInt(fromDateYear) &&
          parseInt(raceYear) === parseInt(toDateYear) &&
          parseInt(raceMonth) < parseInt(toDateMonth)
        ) {
          resultsArray.push(arrayOfAllTrackDays[i]);
        }
        if (
          parseInt(raceYear) === parseInt(fromDateYear) &&
          parseInt(raceYear) === parseInt(toDateYear) &&
          parseInt(raceMonth) > parseInt(fromDateMonth) &&
          parseInt(raceMonth) < parseInt(toDateMonth)
        ) {
          resultsArray.push(arrayOfAllTrackDays[i]);
        }
        if (
          (parseInt(raceYear) === parseInt(fromDateYear) &&
            parseInt(raceMonth) >= parseInt(fromDateMonth) &&
            parseInt(raceDay) >= parseInt(fromDateDay) &&
            parseInt(raceDay) <= parseInt(toDateDay) &&
            parseInt(raceYear) === parseInt(toDateYear) &&
            parseInt(raceMonth) <= parseInt(toDateMonth)) ||
          (parseInt(raceYear) === parseInt(fromDateYear) &&
            parseInt(raceMonth) === parseInt(fromDateMonth) &&
            parseInt(raceDay) >= parseInt(fromDateDay) &&
            parseInt(raceYear) === parseInt(toDateYear) &&
            parseInt(raceMonth) < parseInt(toDateMonth)) ||
          (parseInt(raceYear) === parseInt(toDateYear) &&
            parseInt(raceMonth) === parseInt(toDateMonth) &&
            parseInt(raceDay) <= parseInt(toDateDay) &&
            parseInt(raceYear) === parseInt(fromDateYear) &&
            parseInt(raceMonth) > parseInt(fromDateMonth))
        ) {
          resultsArray.push(arrayOfAllTrackDays[i]);
        }
      }
    }
  }
  // filter out duplicates
  if (resultsArray.length > 0) {
    resultsArray = resultsArray.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );
  }

  return resultsArray;
}

export function filterByNoiseLevel(
  arrayOfAllTrackDays: Array<RaceDay>,
  noiseLevel: string
): Array<RaceDay> {
  let resultsArray = [];
  if (noiseLevel === "" || noiseLevel === "None") {
    return arrayOfAllTrackDays;
  }
  for (let i = 0; i < arrayOfAllTrackDays.length; i++) {
    if (
      arrayOfAllTrackDays[i].attributes.NoiseRestriction !== null &&
      noiseLevel.length > 0
    ) {
      if (
        arrayOfAllTrackDays[i].attributes.NoiseRestriction < noiseLevel ||
        arrayOfAllTrackDays[i].attributes.NoiseRestriction < 0 ||
        arrayOfAllTrackDays[i].attributes.NoiseRestriction === "None"
      ) {
        resultsArray.push(arrayOfAllTrackDays[i]);
      }
    }
  }
  // remove duplicates
  if (resultsArray.length > 0) {
    resultsArray = resultsArray.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );
  }

  return resultsArray;
}

interface masterfilterObject {
  filterType: string;
  value: RaceDay[];
}

export function manageCombinedFilters(
  masterFilters: Array<masterfilterObject>
): Array<RaceDay> {
  // if there is only one filter, return the results of that filter
  if (masterFilters.length === 1) {
    return masterFilters[0].value;
  }

  // if there are multiple filters, return the intersection of all the filters
  let resultsArray: any[] = [];
  for (let i = 0; i < masterFilters.length; i++) {
    if (i === 0) {
      resultsArray = masterFilters[i].value;
    } else {
      resultsArray = resultsArray.filter((item) =>
        masterFilters[i].value.includes(item)
      );
    }
  }

  // check if there the results are unique
  resultsArray = resultsArray.filter(
    (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
  );

  return resultsArray;
}

export function filterByLaneType(
  laneType: string | boolean,
  arrayOfAllTrackDays: Array<RaceDay>
): Array<RaceDay> {
  if (laneType !== "Open" && laneType !== "Split") {
    return arrayOfAllTrackDays;
  }
  let resultsArray = [];
  laneType = laneType === "Open" ? true : false;
  for (let i = 0; i < arrayOfAllTrackDays.length; i++) {
    if (arrayOfAllTrackDays[i].attributes.OpenPitLane === laneType) {
      resultsArray.push(arrayOfAllTrackDays[i]);
    }
  }
  // remove duplicates
  if (resultsArray.length > 0) {
    resultsArray = resultsArray.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );
  }

  return resultsArray;
}
