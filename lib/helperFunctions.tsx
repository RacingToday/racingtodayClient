/** @format */

import { gql } from "@apollo/client";

export async function createNewUser(
  email: string,
  password: string
): Promise<object> {
  const newUser = await fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    body: JSON.stringify({
      username: email,
      email: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => data);
  return newUser;
}

interface User {
  error: any;
  id: number;
  jwt: string;
  username: string;
}
export async function getMyUser(jwt: string): Promise<User> {
  try {
    const user = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<object> {
  const user = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => data);
  return user;
}

export async function getMyRaceDays(jwt: string, userID: number): Promise<any> {
  const myRaceDays = await fetch("http://localhost:1337/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      query: `{
    usersPermissionsUser(id: ${userID}) {
      data {
        id
        attributes {
          email
          race_days {
            data {
              id
              attributes {
                RaceDate
                StartTime
                EndTime
                OrganizerEmail
                Capacity
                EventDescription
                race_track {
                  data {
                    attributes {
                      TrackName
                      Location
                      TrackDescription
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
            `,
    }),
  }).then((res) => res.json());

  return myRaceDays;
}

export const GET_RACETRACKS = gql`
  {
    raceTracks {
      data {
        id
        attributes {
          TrackName
        }
      }
    }
  }
`;

export async function fetchMyMessages(
  jwt: string,
  userID: number
): Promise<any> {
  const myMessages: any = await fetch("http://localhost:1337/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      query: `{
                usersPermissionsUser(id: ${userID}) {
      data {
        id
        attributes {
          email
          race_days {
            data {
              id
              attributes {
                RaceDate
                race_track {
                  data {
                    attributes {
                      TrackName
                    }
                  }
                }
                messages {
                  data {
                    attributes {
                      Text
                      Sender
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
            `,
    }),
  }).then((res) => res.json());

  return myMessages;
}
