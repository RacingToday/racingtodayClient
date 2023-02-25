/** @format */

export interface MyRaceDay {
  id: number;
  attributes: {
    RaceDate: string;
    StartTime: string;
    EndTime: string;
    EventDescription: string;
    OrganizerEmail: string;
    NoiseRestriction: number;
    CarClass: string;
    Capacity: number;
    race_track: {
      data: {
        attributes: {
          TrackName: string;
          TrackDescription: string;
          Location: string;
        };
      };
    };
  };
}

export interface RaceDay {
  id: number;
  attributes: {
    RaceDayCapacity: string;
    EventDescription: string;
    RaceDate: string;
    StartTime: string;
    EndTime: string;
    Capacity: number;
    NoiseRestriction: number | string;
    Price: number;
    race_track: {
      data: {
        attributes: {
          TrackDescription: string;
          TrackName: string;
          Location: string;
        };
      };
    };
  };
}
