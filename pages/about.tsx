/** @format */
import Header from "../components/Header";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function aboutus() {
  return (
    <>
      <Header />
      <Flex flex={1} p={"2em 5em"} minW="100vw" wrap={"wrap"} maxH={"75vh"}>
        <h1
          style={{
            fontSize: "2em",
            marginBottom: "1em",
          }}
        >
          About Us
        </h1>
        <p>
          RacingToday APS is a leading provider of innovative racing technology
          solutions. Our mission is to help racers, teams, and organizations
          optimize their performance and reach new levels of success.
        </p>
        <br />
        <br />
        <p>
          We are a team of experts who are passionate about racing and dedicated
          to delivering the best possible solutions to our customers. Our
          solutions are designed to help racers improve their performance,
          increase their safety, and achieve their goals.
        </p>
        <Text>
          With years of experience in the racing industry, we understand the
          unique challenges that racers face, and we are committed to providing
          them with the best possible solutions to help them succeed. Whether
          you're a professional racer or just starting out, we have the tools,
          resources, and expertise to help you achieve your goals.
        </Text>
        <p>
          At RacingToday APS, we believe that technology should make your life
          easier, not more complicated. That's why we strive to provide
          user-friendly solutions that are simple to use and deliver real
          results.
        </p>
        <p>
          We are constantly pushing the boundaries of what is possible in racing
          technology, and we are dedicated to making a positive impact on the
          racing industry. Join us on our journey and
        </p>
      </Flex>
    </>
  );
}

export default aboutus;
