import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import CreateRaceDay from "../Trackdays/CreateRaceDay";
import React, { useEffect, useState } from "react";
import { getMyUser } from "../../lib/dataFetchHelpers";
import LoginModal from "../Modals/Loginmodal";
import AlertComponent from "../Alerts/Alert";

function Header(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileDrawer = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const checkForUser = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const user = await getMyUser(jwt);
          if (user.error) {
            localStorage.removeItem("jwt");
            if (window.location.pathname === "/myracedays") {
              window.location.href = "/";
            }
            return;
          }
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkForUser();
  }, [props]);

  const handleClick = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    setIsAuthenticated(false);
    return;
  };

  type NavLink = {
    label: string;
    href?: string;
    onClick?: () => void;
  };

  const createNavLinks = (): NavLink[] => {
    const navLinks: NavLink[] = [
      { label: "About Us", href: "/about" },
      { label: "Terms", href: "/terms" },
    ];

    if (isAuthenticated) {
      navLinks.splice(1, 0, { label: "My Racedays", href: "/myracedays" });
      navLinks.push({ label: "Logout", onClick: handleClick });
    } else {
      navLinks.push({ label: "Login or Register", onClick: onOpen });
    }

    return navLinks;
  };

  const navLinks = createNavLinks();

  return (
    <Flex
      h={"5rem"}
      justifyContent={"space-between"}
      flexDir="row-reverse"
      color={"#fff"}
      minW={"100%"}
      maxW={"100%"}
      bg={"#1a202c"}
    >
      {alert && isAuthenticated && (
        <AlertComponent
          type={"success"}
          message="You are now logged in!"
          setState={setAlert}
        />
      )}
      <Flex
        gap="5"
        alignItems={"center"}
        mr={"1rem"}
        justifyContent={"flex-end"}
        display={["none", "flex", "flex"]}
      >
        {isAuthenticated && <CreateRaceDay props={props} />}
        {navLinks.map((link: NavLink) => (
          <Link key={link.label} href={link.href} onClick={link.onClick}>
            <Button colorScheme="blue" size="sm">
              {link.label}
            </Button>
          </Link>
        ))}
      </Flex>
      <Flex
        justifyContent="center"
        align="center"
        mr={3}
        display={["flex", "none"]}
      >
        <Button
          onClick={mobileDrawer.onOpen}
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
        <Drawer
          isOpen={mobileDrawer.isOpen}
          placement="right"
          onClose={mobileDrawer.onClose}
        >
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
              {isAuthenticated && <CreateRaceDay props={props} />}
              {navLinks.map((link: NavLink) => (
                <Link key={link.label} href={link.href} onClick={link.onClick}>
                  <Button w="100%" colorScheme="blue" fontSize={"1.5rem"}>
                    {link.label}
                  </Button>
                </Link>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "1rem",
        }}
      >
        <Text
          left="30px"
          position={"absolute"}
          fontSize={["lg", "1xl", "1.2em", "2em"]}
        >
          RacingToday
        </Text>
      </Link>
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        setIsAuthenticated={setIsAuthenticated}
        setAlert={setAlert}
        isAuthenticated={isAuthenticated}
        alert={alert}
      />
    </Flex>
  );
}

export default Header;
