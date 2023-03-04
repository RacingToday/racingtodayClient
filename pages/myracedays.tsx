/** @format */

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../components/Headers/Header";
import { getMyUser } from "../lib/helperFunctions";
import MyRaceDayComponent from "../components/MyRaceDaysComponent";
import Messages from "../components/Messages";

function MyRaceDays() {
  const [MyRaceDays, setMyRaceDays] = useState([]);
  React.useEffect(() => {
    const userCheck = async () => {
      if (localStorage.getItem("jwt") !== null) {
        const jwt = localStorage.getItem("jwt");
        if (typeof jwt === "string" && jwt.length > 0) {
          const user = await getMyUser(jwt);
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
      return;
    };
    userCheck();
  }, []);

  const props = {
    MyRaceDays: MyRaceDays,
    setMyRaceDays: setMyRaceDays,
  };

  return (
    <>
      <Header props={props} />
      <Tabs>
        <TabList>
          <Tab>My RaceDays</Tab>
          <Tab>Messages</Tab>
        </TabList>
        <TabPanels>
          <TabPanel overflow={"hidden"}>
            <MyRaceDayComponent props={props} />
          </TabPanel>
          <TabPanel flexWrap="wrap" bgColor={"gray.100"}>
            <Messages />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default MyRaceDays;
