import * as react from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Badge, Box, Flex, Input, Text } from "@chakra-ui/react";
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
    <Flex w="100%" h="100%" p={0} overflow="hidden">
      <react.VStack
        spacing={2}
        p={4}
        w={{ base: "30%", md: "30%" }}
        maxW={"30%"}
        h="83vh"
        overflow="hidden"
        bg="blue.50"
      >
        <Text fontSize="xl" fontWeight="bold">
          Messages
        </Text>
        <Box
          maxH="calc(83vh - 50px)"
          overflowY="auto"
          bg="blue.100"
          borderRadius="md"
          p={2}
        >
          {" "}
          {ListOfRaceDays.length > 0 ? (
            ListOfRaceDays.map((message: any) => (
              <react.Button
                mt={5}
                key={message.id}
                onClick={() => {
                  setArrayOfMessages(message.attributes.messages?.data || []);
                  setMessageIndex(message.id);
                }}
                colorScheme="blue"
                textAlign="left"
                h={"3rem"}
                borderRadius="md"
                p={4}
                my={1}
                w="100%"
              >
                <Box fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}>
                  <Badge colorScheme="blue" mr={1}>
                    Date:
                  </Badge>
                  {message.attributes.RaceDate}
                  <br />
                  <Badge colorScheme="blue" mr={2}>
                    Track
                  </Badge>{" "}
                  {message.attributes.race_track?.data?.attributes?.TrackName ||
                    "Unknown"}
                </Box>
              </react.Button>
            ))
          ) : (
            <Text>No messages</Text>
          )}
        </Box>
      </react.VStack>
      <Flex
        direction="column"
        p={0}
        flex="1"
        h="90%"
        minH={"82vh"}
        bg="white"
        justifyContent="space-between"
      >
        <Box
          w="100%"
          h="calc(83vh - 100px)"
          overflowY="auto"
          mb={4}
          bg="gray.50"
          borderRadius="md"
          p={2}
        >
          {" "}
          {arrayOfMessages.length > 0 ? (
            arrayOfMessages.map((message: any, index) => (
              <react.HStack
                key={index}
                spacing={4}
                mt={4}
                w="100%"
                pr={4}
                h="auto"
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
        </Box>

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
