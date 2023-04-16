import React, { useState } from "react";
import Link from "next/link";
import { MyRaceDay } from "../../lib/types";

const RaceDaysAccordion = ({ MyRaceDays }: any) => {
  return (
    <div className="w-full flex flex-col">
      {MyRaceDays && (
        <p className="mb-5 font-bold text-center md:text-left">
          Please click on the specific track day to see details of the event
        </p>
      )}
      {MyRaceDays.length > 0 ? (
        MyRaceDays.map((raceDay: MyRaceDay) => (
          <details
            key={raceDay.id}
            className="border border-black rounded-2xl bg-blue-50 mt-3 shadow-md"
          >
            <summary className="w-full flex justify-center items-center ml-4 md:ml-10 p-4 focus:outline-none cursor-pointer">
              <div className="flex justify-between items-center w-full text-xs md:text-md lg:text-lg">
                <div className="w-1/5 md:w-1/5 font-semibold">
                  {raceDay.attributes.race_track.data.attributes.TrackName}
                </div>
                <div className="w-1/5 md:w-1/5 font-semibold uppercase text-center">
                  {raceDay.attributes.RaceDate}
                </div>
                <div className="w-1/5 md:w-1/5 font-semibold uppercase text-center">
                  {raceDay.attributes.StartTime.slice(0, 5)}
                </div>
                <div className="w-1/5 md:w-1/5 font-semibold uppercase text-center">
                  {raceDay.attributes.EndTime.slice(0, 5)}
                </div>
                <div className="w-1/5 md:w-1/5 flex justify-end items-center">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </summary>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-black p-5 pl-4 md:pl-10 pr-4 md:pr-10">
              <div className="col-span-1">
                <ul className="flex flex-col gap-2">
                  <li>
                    <strong>Capacity: </strong>
                    {raceDay.attributes.Capacity}
                  </li>
                  <li>
                    <strong>Organizer: </strong>
                    {raceDay.attributes.OrganizerEmail}
                  </li>
                  <li>
                    <strong>LaneStyle </strong>
                    {raceDay.attributes.OpenPitLane ? "Open" : "Closed"}
                  </li>
                  <li>
                    <strong>Location: </strong>
                    {raceDay.attributes.race_track.data.attributes.Location}
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <ul className="flex flex-col gap-2">
                  <li>
                    <strong>Start Time: </strong>
                    {raceDay.attributes.StartTime.slice(0, 5)}
                  </li>
                  <li>
                    <strong>End Time: </strong>
                    {raceDay.attributes.EndTime.slice(0, 5)}
                  </li>
                  <li>
                    <strong>Date: </strong>
                    {raceDay.attributes.RaceDate}
                  </li>
                  <li>
                    {raceDay.attributes.NoiseRestriction > 0 ? (
                      <span>
                        <strong>Noise Restrictions: </strong>
                        {raceDay.attributes.NoiseRestriction}
                      </span>
                    ) : (
                      <strong>Noise Restrictions: None</strong>
                    )}
                  </li>
                  <li>
                    <span>
                      <strong>Classes: </strong>
                      {raceDay.attributes.CarClass}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <iframe
                  className="rounded mt-2 mb-2 min-h-full w-full h-full border border-black"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69165.66109543998!2d6.846746647099172!3d50.309764250049184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bfad76fa472afd%3A0xffceaa08b3219545!2sBreidscheider%20Br%C3%BCcke%2C%20N%C3%BCrburgring%20Nordschleife!5e0!3m2!1sen!2ses!4v1677606925377!5m2!1sen!2ses"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </details>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-bold mt-8 mb-4">
            You have no Racedays, please add one, or join an existing one by
            going back to the main page
          </p>
          <Link href="/">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Go Back
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RaceDaysAccordion;
