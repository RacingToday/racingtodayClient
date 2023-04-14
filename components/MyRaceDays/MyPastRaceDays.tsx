import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RaceDay } from "../../lib/types";

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
      minW="100%"
      maxH="75vh"
      p={0}
      overflowY="auto"
      fontSize={["md", "lg", "xl"]}
    >
      <Text as="h2" fontWeight="bold" mb={4}>
        Past Track Days
      </Text>

      <Accordion w="100%" allowMultiple p={0}>
        {MyPastRaceDays.length > 0 ? (
          MyPastRaceDays.map((raceDay: RaceDay) => {
            return (
              <AccordionItem key={raceDay.id}>
                <AccordionButton>
                  <Flex
                    overflow="hidden"
                    justifyContent="space-between"
                    flex={1}
                    pl={2}
                    wrap="wrap"
                    minW="100%"
                    fontSize={["xs", "md", "lg"]}
                  >
                    <Text as="h3" fontWeight="bold" mb={2}>
                      Track:{" "}
                      {raceDay.attributes.race_track.data.attributes.TrackName}
                    </Text>
                    <Text as="h3" fontWeight="bold" mb={2} textAlign="left">
                      Date: {raceDay.attributes.RaceDate}
                    </Text>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
              </AccordionItem>
            );
          })
        ) : (
          <Text as="h3"></Text>
        )}
      </Accordion>
    </Flex>
  );
}

export default MyPastRaceDays;
