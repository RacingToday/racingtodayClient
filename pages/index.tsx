/** @format */

import Header from "../components/Headers/Header";
import RaceDayList from "../components/RaceDayList";
import FiltersToSort from "../components/Filters/Filters";
import Head from "next/head";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { useRef, useState } from "react";

export default function Home() {
  const [listOfTrackDays, setListOfTrackDays] = useState([]);
  const { loading, error, data } = useQuery(GET_RACEDAYS);
  const [allowedNoise, setAllowedNoise] = useState("");
  const fromAnTo = useRef<any[]>([]).current;
  const classFilters = useRef<any[]>([]).current;
  const trackFilters = useRef<string[]>([]).current;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1> Error </h1>;
  const arrayOfRacedays = data.racaDays.data;

  const props = {
    listOfTrackDays: listOfTrackDays,
    setListOfTrackDays: setListOfTrackDays,
    arrayOfRacedays: arrayOfRacedays,
    allowedNoise: allowedNoise,
    setAllowedNoise: setAllowedNoise,
    fromAnTo: fromAnTo,
    classFilters: classFilters,
    trackFilters: trackFilters,
  };

  return (
    <>
      <Head>
        <title>RacingToday </title>
        <meta
          name="RacingToday"
          content="A community by drivers, created for drivers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <FiltersToSort props={props} />
      <RaceDayList props={props} />
    </>
  );
}

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
