// Header.tsx
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import MobileHeaderWithAuth from "./MobileHeader";
import CreateRaceDay from "../CreateRaceDay";
import React, { useEffect, useState } from "react";
import { getMyUser } from "../../lib/dataFetchHelpers";
import LoginModal from "../Modals/Loginmodal";
import { handleLogin, handleAccountCreation } from "../../lib/account";

function Header(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  }
  
  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Terms", href: "/terms" },
  ];

  if (isAuthenticated) {
    navLinks.splice(1, 0, { label: "My Racedays", href: "/myracedays" });
  } else {
    navLinks.push({ label: "Login or Register", onClick: onOpen });
  }
  


  return (
    <Flex
      h={"5rem"}
      justifyContent={"space-between"}
      flexDir="row-reverse"
      color={"#fff"}
      minW={"100%"}
      maxW={"100%"}
      bg={"#000"}
    >
      <Flex
        gap="5"
        alignItems={"center"}
        mr={"1rem"}
        justifyContent={"flex-end"}
        display={["none", "flex", "flex"]}
      >
        {navLinks.map((link: any) => (
          <Link key={link.label} href={link.href} onClick={link.onClick}>
            <Button colorScheme="blue" size="sm">
              {link.label}
            </Button>
          </Link>
        ))}
        {isAuthenticated && (
          <Button onClick={handleClick} colorScheme="blue" size="sm">
            Logout
          </Button>
        )}
        {isAuthenticated && <CreateRaceDay props={props} />}
      </Flex>
      <Flex
        justifyContent="center"
        align="center"
        mr={3}
        display={["flex", "none"]}
      >
        <MobileHeaderWithAuth props={props} />
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
        onSuccess={() => {
          setIsAuthenticated(true);
          onClose();
        }}
        handleLogin={handleLogin}
        handleAccountCreation={handleAccountCreation}
      />
    </Flex>
  );
}

export default Header;
         
