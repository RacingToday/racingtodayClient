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
import { getMyUser } from "../lib/dataFetchHelpers";
import MyRaceDayComponent from "../components/MyRaceDays/MyRaceDaysComponent";
import Messages from "../components/Message/Messages";

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
      <Flex overflow="hidden">
        <Tabs
          flex={1}
          display="flex"
          overflow={"hidden"}
          flexDirection="column"
          alignItems="stretch"
          bg="gray.50"
          color="gray.800"
        >
          <TabList borderBottom="1px solid" borderColor="gray.200">
            <Tab
              _selected={{
                color: "blue.600",
                borderBottom: "2px solid",
                borderColor: "blue.600",
              }}
            >
              My RaceDays
            </Tab>
            <Tab
              _selected={{
                color: "blue.600",
                borderBottom: "2px solid",
                borderColor: "blue.600",
              }}
            >
              Messages
            </Tab>
          </TabList>
          <TabPanels flexGrow={1} overflowY="hidden">
            <TabPanel overflow={"hidden"} p={0}>
              <MyRaceDayComponent props={props} />
            </TabPanel>
            <TabPanel
              overflow={"hidden"}
              flexWrap="wrap"
              bgColor={"gray.100"}
              p={0}
              m={0}
            >
              <Messages />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

export default MyRaceDays;
