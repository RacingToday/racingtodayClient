import {
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
import Link from "next/link";
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
    href: string;
    onClick?: () => void;
  };

  const createNavLinks = (authenticated: boolean): NavLink[] => {
    const navLinks: NavLink[] = [
      { label: "About Us", href: "/about" },
      { label: "Terms", href: "/terms" },
    ];

    if (authenticated) {
      navLinks.splice(1, 0, { label: "My Racedays", href: "/myracedays" });
      navLinks.push({ label: "Logout", href: "/logout", onClick: handleClick });
    } else {
      navLinks.push({
        label: "Login or Register",
        href: "/login",
        onClick: onOpen,
      });
    }

    return navLinks;
  };

  const navLinks = createNavLinks(isAuthenticated);

  return (
    <div className="flex justify-between items-center w-full h-20 bg-gray-800 text-white">
      {alert && isAuthenticated && (
        <AlertComponent
          type={"success"}
          message="You are now logged in!"
          setState={setAlert}
        />
      )}
      <div className="flex items-center w-full justify-end  gap-6 mr-7 hidden sm:flex">
        {isAuthenticated && (
          <>
            <CreateRaceDay props={props} />
            <Link href="/myracedays" className="hover:text-blue-600">
              <p className="cursor-pointer">My Racedays</p>
            </Link>
          </>
        )}
        {navLinks.map((link: NavLink) => (
          <Link
            className="hover:text-blue-600"
            key={link.label}
            href={link.href}
            onClick={link.onClick}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center ml-auto mr-3 sm:hidden">
        <button
          onClick={mobileDrawer.onOpen}
          className="bg-sky-600 ml-1 text-white py-2 px-4 rounded mr-4"
        >
          Menu
        </button>
        <Drawer
          isOpen={mobileDrawer.isOpen}
          placement="right"
          onClose={mobileDrawer.onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mt={"3em"}>Select your next destination</DrawerHeader>
            <DrawerBody className="flex flex-col gap-4 text-2xl m-auto border-b w-max">
              {isAuthenticated && <CreateRaceDay props={props} />}
              {navLinks.map((link: NavLink) => (
                <Link key={link.label} href={link.href} onClick={link.onClick}>
                  <button className="w-full bg-sky-00 text-white text-3xl py-2 px-4 rounded">
                    {link.label}
                  </button>
                </Link>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <Link
        href="/"
        className="flex items-center justify-center ml-4 text-white no-underline"
      >
        <p className="absolute left-7 text-lg sm:text-xl md:text-2xl lg:text-4xl">
          RacingToday
        </p>
      </Link>
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        setIsAuthenticated={setIsAuthenticated}
        setAlert={setAlert}
        isAuthenticated={isAuthenticated}
        alert={alert}
      />
    </div>
  );
}

export default Header;
