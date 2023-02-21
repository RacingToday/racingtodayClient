/** @format */

import Header from "../components/Header";
import RaceDayList from "../components/RaceDayList";
/** @format */

import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

export default function Home() {
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

      <RaceDayList />
    </>
  );
}
