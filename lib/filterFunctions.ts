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
  name: string;
  value: string;
}
interface FromAndToDate {
  name: string;
  value: string;
}

// Add new type for year, month, and date
type DateComponents = {
  year: number;
  month: number;
  day: number;
};

export function filterByDate(
  FromAndToDate: FromAndToDate[],
  arrayOfAllTrackDays: RaceDay[]
): RaceDay[] {
  if (FromAndToDate.length === 0) {
    return arrayOfAllTrackDays;
  }

  const fromDate =
    FromAndToDate.find((date: FromAndToDate) => date.name === "fromDate")
      ?.value || "";
  const toDate =
    FromAndToDate.find((date: FromAndToDate) => date.name === "toDate")
      ?.value || "";

  if (!fromDate && !toDate) {
    return arrayOfAllTrackDays;
  }

  const parseDate = (date: string): DateComponents => {
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    const day = parseInt(date.slice(8, 10));
    return { year, month, day };
  };

  const isWithinRange = (date: string, fromDate: string, toDate: string) => {
    const { year, month, day } = parseDate(date);
    const {
      year: fromYear,
      month: fromMonth,
      day: fromDay,
    }: FromAndToDate | any = fromDate ? parseDate(fromDate) : {};
    const {
      year: toYear,
      month: toMonth,
      day: toDay,
    }: FromAndToDate | any = toDate ? parseDate(toDate) : {};

    return (
      (!fromDate ||
        year > fromYear ||
        (year === fromYear &&
          (month > fromMonth || (month === fromMonth && day >= fromDay)))) &&
      (!toDate ||
        year < toYear ||
        (year === toYear &&
          (month < toMonth || (month === toMonth && day <= toDay))))
    );
  };

  const resultsArray = arrayOfAllTrackDays.filter((trackDay: RaceDay) => {
    const raceDate = trackDay.attributes.RaceDate;
    return raceDate && isWithinRange(raceDate, fromDate, toDate);
  });

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
        parseInt(arrayOfAllTrackDays[i].attributes.NoiseRestriction) < 0 ||
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
