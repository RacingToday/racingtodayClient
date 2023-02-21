/** @format */

import { Button, Flex, Link } from "@chakra-ui/react";
import CreateRaceDay from "./CreateRaceDay";

/** @format */
export default function AuthHeader(props: any) {
  const handleClick = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    return;
  };

  return (
    <Flex p={"0.5em 2em"} flex={1} flexWrap={"wrap"} flexDir={"row"}>
      {" "}
      <Flex
        gap={"1em"}
        justifySelf={"flex-end"}
        justifyContent={"flex-end"}
        flex={1}
        pt={"0.5em"}
        flexWrap={"wrap"}
        flexDir={"row"}
      >
        <Link href="/">
          <Button size={"sm"} colorScheme={"blue"}>
            Home
          </Button>
        </Link>
        <CreateRaceDay props={props} />

        <Link href="myracedays">
          <Button size={"sm"} colorScheme={"blue"}>
            My Racedays
          </Button>
        </Link>
        <Link href="about">
          <Button colorScheme="blue" size="sm">
            About Us
          </Button>
        </Link>
        <Link href="terms">
          <Button colorScheme="blue" size="sm">
            Terms & Conditions
          </Button>
        </Link>
        <Button onClick={handleClick} size={"sm"} colorScheme={"blue"}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
