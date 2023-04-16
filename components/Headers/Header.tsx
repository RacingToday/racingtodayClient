import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import PopoverMenu from "./PopoverHeader";
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

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);

    return;
  };

  const loginButton = isAuthenticated ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button className="blue-button responsive-button" onClick={onOpen}>
      Login or register
    </button>
  );

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
        <PopoverMenu title="Race Section">
          <Link href="/racedays" className="mt-1">
            <p className="mt-1 hover:text-blue-600 cursor-pointer">
              Marketplace
            </p>
          </Link>
          <Link href="/trackdays " className="mt-1">
            <p className="mt-1 hover:text-blue-600 cursor-pointer ">
              Trackdays
            </p>
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/myracedays" className="mt-1 hover:text-blue-600">
                <p className="mt-1 hover:text-blue-600 cursor-pointer">
                  My Racedays
                </p>
              </Link>
            </>
          )}
        </PopoverMenu>
        {isAuthenticated && <CreateRaceDay props={props} />}

        {isAuthenticated && (
          <button className="responsive-button blue-button">
            List on Marketplace
          </button>
        )}

        <Link href="/about" className="hover:text-blue-600">
          <p className="cursor-pointer">About Us</p>
        </Link>
        <Link href="/contact">
          <p className="hover:text-blue-600 cursor-pointer">Contact</p>
        </Link>
        <Link href="/terms" className="hover:text-blue-600">
          <p className="cursor-pointer">Terms</p>
        </Link>
        {loginButton}
      </div>
      <div className="flex justify-center  items-center ml-auto mr-3 sm:hidden">
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
            <DrawerBody className="flex flex-col gap-4 text-2xl m-auto border-b w-max"></DrawerBody>
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
