/** @format */
import Header from "../components/Headers/Header";
import React from "react";
import { Flex } from "@chakra-ui/react";

function Terms() {
  return (
    <>
      <Header />
      <Flex flex={1} p={"2em 2em"} minW="100vw" wrap={"wrap"} maxH={"75vh"}>
        <h1
          style={{
            fontSize: "2em",
            marginBottom: "1em",
          }}
        >
          Terms and Conditions
        </h1>
        <p>
          RacingToday is a community by drivers, created for drivers. We are
          dedicated to providing a platform for drivers to connect with other
          drivers, and to provide a place for drivers to share their experiences
          and knowledge with other drivers. We are a community of drivers, for
          drivers.
        </p>
        <br />
        <br />
        <p>
          We are committed to providing a safe and secure environment for our
          members. We will not tolerate any form of harassment or abuse, and we
          will take appropriate action to protect our members from harm.
        </p>
      </Flex>
    </>
  );
}

export default Terms;
