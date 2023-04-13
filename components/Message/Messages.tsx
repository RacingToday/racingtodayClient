/** @format */

import * as react from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { host, getMyUser, fetchMyMessages } from "../../lib/dataFetchHelpers";
function Messages() {
  const [ListOfRaceDays, setListOfRaceDays] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [arrayOfMessages, setArrayOfMessages] = useState<any[]>([]);
  const [myEmail, setMyEmail] = useState("");
  const [messageIndex, setMessageIndex] = useState<number>(0);

  const sendNewMessage = async (
    messageIndex: number,
    currentMessage: string,
    myEmail: string
  ) => {
    console.log(currentMessage);
    interface newMessage {
      data: {
        createMessage: {
          data: {
            id: number;
            attributes: {
              Text: string;
              Sender: string;
            };
          };
        };
      };
    }
    const newMessage: newMessage = await fetch(`${host}graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        query: `mutation {
          createMessage(data: {
            Text: "${currentMessage}",
            Sender: "${myEmail}",
            race_days: ${messageIndex}
          }) {
            data {
              id
              attributes {
                Text
                Sender
              }
            }
          }
        }`,
      }),
    }).then((res) => res.json());

    setArrayOfMessages([
      ...arrayOfMessages,
      newMessage.data.createMessage.data,
    ]);
    GetMyMessages();
    setCurrentMessage("");

    // scroll to bottom of the chat without using scrollHeight
    const chat = document.querySelector(".chatMessages");
    if (chat !== null) {
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight;
      }, 100);
    }

    return;
  };

  const GetMyMessages = async () => {
    if (localStorage.getItem("jwt") !== null) {
      const jwt = localStorage.getItem("jwt");
      if (typeof jwt === "string" && jwt.length > 0) {
        interface user {
          id: number;
          username: string;
        }

        const user = await getMyUser(jwt);
        setMyEmail(user.email);

        console.log(user);
        const MyMessages = await fetchMyMessages(jwt, user.id);

        setListOfRaceDays(
          MyMessages.data.usersPermissionsUser.data.attributes.race_days.data
        );
      }
    }
    return;
  };

  React.useEffect(() => {
    GetMyMessages();
  }, []);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="85vh"
      maxH="85vh"
      width="100%"
      overflow="hidden"
    >
      <react.VStack
        spacing={2}
        p={4}
        w={{ base: "100%", md: "30%" }}
        h="100%"
        overflowY="auto"
        bg="blue.50"
      >
        <Text fontSize="xl" fontWeight="bold">
          Messages
        </Text>
        {ListOfRaceDays.length > 0 ? (
          ListOfRaceDays.map((message: any) => (
            <react.Button
              key={message.id}
              onClick={() => {
                setArrayOfMessages(message.attributes.messages?.data || []);
                setMessageIndex(message.id);
              }}
              colorScheme="blue"
              w="100%"
              textAlign="left"
            >
              Date: {message.attributes.RaceDate}
              <br />
              Track:{" "}
              {message.attributes.race_track?.data?.attributes?.TrackName ||
                "Unknown"}
            </react.Button>
          ))
        ) : (
          <Text>No messages</Text>
        )}
      </react.VStack>
      <Flex
        direction="column"
        p={4}
        flex="1"
        h="100%"
        bg="white"
        justifyContent="space-between"
      >
        <react.VStack
          spacing={4}
          alignItems="flex-start"
          w="100%"
          h="100%"
          overflowY="auto"
          flex="1"
          direction="column-reverse"
        >
          {arrayOfMessages.length > 0 ? (
            arrayOfMessages.map((message: any, index) => (
              <react.HStack
                key={index}
                spacing={4}
                alignItems="flex-start"
                justifyContent={
                  message.attributes.Sender === myEmail
                    ? "flex-end"
                    : "flex-start"
                }
              >
                <react.Box
                  p={4}
                  borderRadius="lg"
                  bg={
                    message.attributes.Sender === myEmail
                      ? "green.400"
                      : "blue.400"
                  }
                  color="white"
                >
                  <Text fontWeight="bold">{message.attributes.Sender}</Text>
                  <Text fontWeight="bold">{message.attributes.Text}</Text>
                </react.Box>
              </react.HStack>
            ))
          ) : (
            <Text fontSize="xl">No messages</Text>
          )}
        </react.VStack>
        <Input
          mt={4}
          placeholder="Type your message here"
          type="text"
          id="message"
          size="lg"
          w="100%"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentMessage.length > 0) {
              sendNewMessage(messageIndex, currentMessage, myEmail);
            }
          }}
        />
      </Flex>
    </Flex>
  );
}

export default Messages;
