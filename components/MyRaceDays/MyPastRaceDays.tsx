/** @format */

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { RaceDay } from "../../lib/types";
// accordion example component that uses chakra ui
interface props {
  myRaceDays: Array<any>;
  myRaceDaysAfterToday: Array<any>;
}

function MyPastRaceDays({ myRaceDays, myRaceDaysAfterToday }: props) {
  const MyPastRaceDays = myRaceDays.filter((raceDay: RaceDay) => {
    return myRaceDaysAfterToday.includes(raceDay) === false;
  });

  return (
    <Flex
      mt={10}
      flexDir="column"
      wrap="wrap"
      p={"2em 2em 2em 0em"}
      minW="100vw"
      maxH={"75vh"}
      overflowY={"scroll"}
      overflowX="hidden"
      fontSize={["md", "lg", "xl"]}
    >
      {myRaceDays.length > 0}
      <h2>Past Track Days</h2>

      <Accordion w={"100%"} allowMultiple>
        {MyPastRaceDays.length > 0 ? (
          MyPastRaceDays.map((raceDay: RaceDay) => {
            return (
              <AccordionItem key={raceDay.id}>
                <AccordionButton>
                  <Flex
                    overflow={"hidden"}
                    key={raceDay.id}
                    justifyContent={"space-between"}
                    flex={1}
                    pl={"2%"}
                    wrap="wrap"
                    minW={"100%"}
                    flexBasis={"auto"}
                    textAlign={"left"}
                    justifySelf={"flex-start"}
                    fontSize={["xs", "md", "lg"]}
                  >
                    <h3
                      style={{
                        fontWeight: "bold",
                        marginBottom: "0.5em",
                      }}
                    >
                      Track:{" "}
                      {raceDay.attributes.race_track.data.attributes.TrackName}
                    </h3>
                    <h3
                      style={{
                        fontWeight: "bold",
                        marginBottom: "0.5em",
                        textAlign: "left",
                      }}
                    >
                      Date: {raceDay.attributes.RaceDate}
                    </h3>

                    <AccordionItem />
                  </Flex>
                </AccordionButton>
              </AccordionItem>
            );
          })
        ) : (
          <h3></h3>
        )}
      </Accordion>
    </Flex>
  );
}

export default MyPastRaceDays;
