import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import CreateRaceDay from "../CreateRaceDay";
import { SetStateAction } from "react";
import { RaceDay } from "../../lib/types";

export default function MobileHeaderWithAuth(props: any)
 {
  const handleClick = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    return;
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        ml={"0.4em"}
        size="md"
        mr={"1em"}
        alignContent={"center"}
        alignSelf={"center"}
        justifyContent={"center"}
      >
        Menu
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt={"3em"}>Select your next destination</DrawerHeader>

          <DrawerBody
            display={"flex"}
            flexDir={"column"}
            gap={"1em"}
            fontSize="2xl"
            m="0 auto"
            borderBottom="1px"
            border={1}
            w="max-content"
          >
            <Link href="/">
              <Button w="100%" colorScheme="blue" fontSize={"1.5rem"}>
                Home
              </Button>
            </Link>
            <Link href="about">
              <Button colorScheme={"blue"} fontSize={"1.5rem"} w="100%">
                About Us
              </Button>
            </Link>
            <Link href="terms">
              <Button colorScheme={"blue"} fontSize={"1.5rem"} w="100%">
                Terms
              </Button>
            </Link>
            <CreateRaceDay props={props} />

            <Link href="myracedays">
              <Button colorScheme={"blue"} fontSize={"1.5rem"} w="100%">
                My Racedays
              </Button>
            </Link>
            <Button
              onClick={handleClick}
              colorScheme={"blue"}
              fontSize={"1.5rem"}
            >
              Logout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
