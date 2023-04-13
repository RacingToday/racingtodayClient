/** @format */

import * as react from "@chakra-ui/react";
import React from "react";
<<<<<<<< HEAD:components/MyRaceDays/Messages.tsx
import { getMyUser, fetchMyMessages, host } from "../../lib/helperFunctions";
========
import { getMyUser, fetchMyMessages, host } from "../../lib/dataFetchHelpers";
>>>>>>>> 257b09d (major refactor, to simplify the code management):components/Message/Messages.tsx
import { useState } from "react";
import { Flex } from "@chakra-ui/react";

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
        setMyEmail(user.username);

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
      overflow={"hidden"}
      flexDir="row"
      wordBreak={"break-word"}
      flex={1}
      minH={"85vh"}
      maxH={"85vh"}
    >
      <Flex
        className="chatSelection"
        flex={1}
        flexDirection={["row", "column"]}
        flexWrap={"wrap"}
        maxH={["60vh", "85vh"]}
        fontSize={[12, 14, 16, 18]}
        overflow={"scroll"}
        w={"100%"}
        mr={1}
      >
        <h1
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            paddingBottom: "0.5em",
            borderBottom: "1px dotted black",
            marginBottom: "0.5em",
          }}
        >
          Messages
        </h1>

        {ListOfRaceDays.length > 0 ? (
          ListOfRaceDays.map((message: any) => {
            return (
              <react.Button
                mt={1}
                flex={1}
                w={"90%"}
                border={"none"}
                onClick={() => {
                  setArrayOfMessages(message.attributes.messages.data);
                  setMessageIndex(message.id);
                }}
                colorScheme={"blue"}
                mr={1}
                fontSize={[10, 14, 16]}
                flexDir={"column"}
                maxH={"7vh"}
                m={"0.5em"}
                key={message.id}
              >
                Date: {message.attributes.RaceDate}
                <br />
                Track: {message.attributes.race_track.data.attributes.TrackName}
              </react.Button>
            );
          })
        ) : (
          <p>No messages</p>
        )}
      </Flex>
      <Flex
        padding={2}
        minH={"70vh"}
        minW={["60vw", "70vw"]}
        maxH={"70vh"}
        flex={1}
        maxW={"75vw"}
        className="chat"
        border="none"
        borderRadius={"15px"}
        bgColor={"white"}
        wrap={"wrap"}
        flexDir={"column"}
        alignItems="flex-start"
        justifyContent={"space-between"}
      >
        <Flex
          className="chatMessages"
          overflow={"auto"}
          flex={1}
          w={"100%"}
          flexDir={"column-reverse"}
          borderBottom="1px dotted black"
        >
          {arrayOfMessages.length > 0 ? (
            arrayOfMessages.map((message: any, index) => {
              return (
                <react.Box
                  key={index}
                  m={2}
                  bgColor={"blue.400"}
                  borderRadius={"15px"}
                  p={2}
                  fontSize={[12, 14, 16, 18]}
                  wordBreak={"break-word"}
                  backgroundColor={
                    message.attributes.Sender === myEmail
                      ? "green.400"
                      : "blue.400"
                  }
                  alignContent={"flex-start"}
                  alignSelf={
                    message.attributes.Sender === myEmail
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {message.attributes.Sender}
                  </p>

                  <p
                    style={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {message.attributes.Text}
                  </p>
                </react.Box>
              );
            })
          ) : (
            <h1>No messages</h1>
          )}
        </Flex>

        <react.Input
          mt={5}
          placeholder="Type your message here"
          type={"text"}
          id={"message"}
          fontSize={[12, 14, 16, 18]}
          size={"lg"}
          position={"relative"}
          w={"90%"}
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
