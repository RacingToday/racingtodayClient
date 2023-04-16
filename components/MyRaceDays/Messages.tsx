/** @format */

import React from "react";

import { getMyUser, fetchMyMessages, host } from "../../lib/dataFetchHelpers";
import { useState } from "react";

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
    <div className="flex flex-row flex-1 min-h-screen max-h-screen break-words overflow-hidden">
      <div className="flex flex-col flex-wrap overflow-scroll w-full max-h-screen font-medium chatSelection">
        <h1 className="text-2xl font-bold pb-2 mb-2 border-b border-dotted border-black">
          Messages
        </h1>

        {ListOfRaceDays.length > 0 ? (
          ListOfRaceDays.map((message: any) => {
            return (
              <button
                className="mt-1 flex-1 w-11/12 focus:outline-none text-sm md:text-base lg:text-lg xl:text-xl my-2"
                onClick={() => {
                  setArrayOfMessages(message.attributes.messages.data);
                  setMessageIndex(message.id);
                }}
                key={message.id}
              >
                Date: {message.attributes.RaceDate}
                <br />
                Track: {message.attributes.race_track.data.attributes.TrackName}
              </button>
            );
          })
        ) : (
          <p>No messages</p>
        )}
      </div>
      <div className="flex flex-col justify-between items-start p-2 min-h-[70vh] min-w-[60vw] md:min-w-[70vw] max-h-[70vh] max-w-[75vw] chat rounded-lg bg-white">
        <div className="flex flex-col-reverse w-full overflow-auto break-words chatMessages">
          {arrayOfMessages.length > 0 ? (
            arrayOfMessages.map((message: any, index) => {
              return (
                <div
                  className={`m-2 p-2 rounded-lg text-white break-words ${
                    message.attributes.Sender === myEmail
                      ? "bg-green-400 self-end"
                      : "bg-blue-400 self-start"
                  }`}
                  key={index}
                >
                  <p className="font-bold">{message.attributes.Sender}</p>

                  <p className="font-bold">{message.attributes.Text}</p>
                </div>
              );
            })
          ) : (
            <h1>No messages</h1>
          )}
        </div>

        <input
          className="mt-5 border border-gray-300 w-11/12 focus:outline-none focus:border-blue-400 text-sm md:text-base lg:text-lg xl:text-xl"
          placeholder="Type your message here"
          type="text"
          id="message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentMessage.length > 0) {
              sendNewMessage(messageIndex, currentMessage, myEmail);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Messages;
