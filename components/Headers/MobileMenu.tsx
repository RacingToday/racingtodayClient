/** @format */

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Text,
  Tabs,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function MobileHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" ml={"0.4em"} size="sm" onClick={onOpen}>
        Menu
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt={"3em"}>Select your next destination</DrawerHeader>

          <DrawerBody
            fontSize="2xl"
            mt={4}
            borderBottom="1px"
            borderColor="gray.200"
            border={1}
          >
            <Link href="/">
              <Text>Home</Text>
            </Link>
            <Link href="about">
              <Text>About Us</Text>
            </Link>
            <Link href="terms">
              <Text>Terms and Conditions</Text>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
