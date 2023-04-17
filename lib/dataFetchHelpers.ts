import { gql } from "@apollo/client";

export let host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337/"
    : "https://seahorse-app-2j58f.ondigitalocean.app/";

export async function createNewUser(
  email: string,
  password: string
): Promise<object> {
  const newUser = await fetch(`${host}api/auth/local/register`, {
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
export async function getMyUser(jwt: string): Promise<User | any> {
  try {
    const user = await fetch(`${host}api/users/me`, {
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
): Promise<object | void> {
  try {
    const user = await fetch(`${host}api/auth/local`, {
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
  } catch (error) {
    console.log(error);
  }
}

export async function getMyRaceDays(jwt: string, userID: number): Promise<any> {
  try {
    const myRaceDays = await fetch(`${host}graphql`, {
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
                NoiseRestriction
                CarClass
                Capacity
                OpenPitLane
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
  } catch (error) {
    console.log(error);
  }
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
  const myMessages: any = await fetch(`${host}graphql`, {
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
