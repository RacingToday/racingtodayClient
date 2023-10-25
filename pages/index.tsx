import RaceDayList from "../components/Trackdays/RaceDayList";
import FiltersToSort from "../components/Filters/Filters";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/Headers/Header";
import { useRef, useState } from "react";
import { RaceDay } from '../lib/types';

export default function Home() {
  const [laneType, setLaneType] = useState('');
  const [listOfTrackDays, setListOfTrackDays] = useState([]);
  const { loading, error, data } = useQuery(GET_RACEDAYS);
  const [allowedNoise, setAllowedNoise] = useState('');
  const fromAnTo = useRef<any[]>([]).current;
  const classFilters = useRef<any[]>([]).current;
  const trackFilters = useRef<string[]>([]).current;
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
  }
  const arrayOfRacedays =
    data?.racaDays.data || mockRacedaysData.racaDays.data;
  const props = {
    listOfTrackDays: listOfTrackDays,
    setListOfTrackDays: setListOfTrackDays,
    arrayOfRacedays: arrayOfRacedays,
    allowedNoise: allowedNoise,
    setAllowedNoise: setAllowedNoise,
    fromAnTo: fromAnTo,
    classFilters: classFilters,
    trackFilters: trackFilters,
    laneType: laneType,
    setLaneType: setLaneType,
  };

  return (
    <>
      <Head>
        <title>RacingToday </title>
        <meta
          name='RacingToday'
          content='A community by drivers, created for drivers'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header props={props} />
      <FiltersToSort props={props} />
      <RaceDayList props={props} />
    </>
  );
}
const mockRacedaysData = {
  racaDays: {
    data: [
      {
        id: '1',
        attributes: {
          EventDescription: 'Race 1',
          RaceDate: '2022-11-11',
          Price: 100,
          StartTime: '09:00',
          EndTime: '17:00',
          Capacity: 20,
          OpenPitLane: true,
          CarClass: 'A',
          NoiseRestriction: 80,
          race_track: {
            data: {
              attributes: {
                TrackDescription: 'Track 1',
                TrackName: 'Track 1',
                Location: 'Location 1',
              },
            },
          },
        },
      },
      {
        id: '2',
        attributes: {
          EventDescription: 'Race 2',
          RaceDate: '2022-11-11',
          Price: 100,
          StartTime: '09:00',
          EndTime: '17:00',
          Capacity: 20,
          OpenPitLane: true,
          CarClass: 'A',
          NoiseRestriction: 80,
          race_track: {
            data: {
              attributes: {
                TrackDescription: 'Track 2',
                TrackName: 'Track 2',
                Location: 'Location 2',
              },
            },
          },
        },
      },
      {
        id: '3',
        attributes: {
          EventDescription: 'Race 3',
          RaceDate: '2022-11-11',
          Price: 100,
          StartTime: '09:00',
          EndTime: '17:00',
          Capacity: 20,
          OpenPitLane: true,
          CarClass: 'A',
          NoiseRestriction: 80,
          race_track: {
            data: {
              attributes: {
                TrackDescription: 'Track 3',
                TrackName: 'Track 3',
                Location: 'Location 3',
              },
            },
          },
        },
      },
    ],
  },
};


const GET_RACEDAYS = gql`
  {
    racaDays(pagination: { start: 0, limit: 200 }) {
      data {
        id
        attributes {
          EventDescription
          RaceDate
          Price
          StartTime
          EndTime
          Capacity
          Price
          OpenPitLane
          CarClass
          NoiseRestriction
          race_track {
            data {
              attributes {
                TrackDescription
                TrackName
                Location
              }
            }
          }
        }
      }
    }
  }
`;
