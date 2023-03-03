/** @format */

import { Button, Flex, Link } from "@chakra-ui/react";
import CreateRaceDay from "../CreateRaceDay";
import MobileAuthHeader from "./AuthMobileHeader";

/** @format */
export default function AuthHeader(props: any) {
  const handleClick = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    return;
  };

  return (
    <Flex>
      <MobileAuthHeader props={props} />
      <Flex
        flex={1}
        flexWrap={"wrap"}
        flexDir={"column"}
        display={["none", "flex"]}
      >
        <Flex
          gap={"1em"}
          justifyContent={"flex-end"}
          flex={1}
          alignItems={"center"}
          pt={"0.5em"}
          display={["none", "flex", "flex"]}
          mr={"1rem"}
          fontSize={"0.5em"}
          flexWrap={"wrap"}
          flexDir={"row"}
        >
          <Link href="/">
            <Button
              size={"sm"}
              colorScheme={"blue"}
              display={["none", "none", "flex"]}
              h={["2rem", "2rem", "2.4rem"]}
              fontSize={["sm", "sm", "md", "md"]}
              w="fit-content"
            >
              Home
            </Button>
          </Link>
          <CreateRaceDay props={props} />

          <Link href="myracedays">
            <Button
              size={"sm"}
              colorScheme={"blue"}
              h={["2rem", "2rem", "2.5rem"]}
              fontSize={["sm", "sm", "md"]}
              w="fit-content"
            >
              My Racedays
            </Button>
          </Link>
          <Link href="about">
            <Button
              colorScheme="blue"
              h={["2rem", "2rem", "2.5rem"]}
              fontSize={["sm", "sm", "md"]}
              w="fit-content"
            >
              About Us
            </Button>
          </Link>
          <Link href="terms">
            <Button
              colorScheme="blue"
              size="sm"
              h={["2rem", "2rem", "2.5rem"]}
              fontSize={["sm", "sm", "md"]}
              w="fit-content"
            >
              Terms
            </Button>
          </Link>
          <Button
            onClick={handleClick}
            colorScheme={"blue"}
            display={["none", "none", "flex"]}
            h={["2rem", "2rem", "2.5rem"]}
            fontSize={["sm", "sm", "md"]}
            w="fit-content"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
