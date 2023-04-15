/** @format */

import React, { SetStateAction, useEffect, useState } from "react";
import { MyRaceDay, RaceDay } from "../../lib/types";
import MyPastRaceDays from "./MyPastRaceDays";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { getMyRaceDays, getMyUser } from "../../lib/dataFetchHelpers";
import Link from "next/link";
import RaceDaysAccordion from "./myRaceDaysAcordion";

interface Props {
  props: {
    MyRaceDays: any;
    setMyRaceDays: SetStateAction<any>;
  };
}

function MyRaceDayComponent(props: Props) {
  const { MyRaceDays, setMyRaceDays } = props.props;
  useEffect(() => {
    const GetUser = async () => {
      try {
        if (localStorage.getItem("jwt") !== null) {
          const jwt = localStorage.getItem("jwt");
          if (typeof jwt === "string" && jwt.length > 0) {
            interface user {
              id: number;
            }
            const user: user = await getMyUser(jwt);
            const myDays = await getMyRaceDays(jwt, user.id);

            setMyRaceDays(
              myDays.data.usersPermissionsUser.data.attributes.race_days.data
            );
          }
        }
        return;
      } catch (error) {
        console.log(error);
      }
    };
    GetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap  p-3 min-w-full min-h-[80vh] overflow-hidden overflow-y-scroll text-gray-800 bg-gray-50 rounded-lg">
      <h1 className="font-bold text-2xl mb-2 w-screen mb-0">My Track Days</h1>
      <RaceDaysAccordion MyRaceDays={MyRaceDays} />
    </div>
  );
}

export default MyRaceDayComponent;
