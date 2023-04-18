import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { host } from "../lib/dataFetchHelpers";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import { createContext, useEffect, useState } from "react";

export const loginContext = createContext({
  loggedIn: false,
  setLoggedIn: (value: boolean) => {},
});

export const userContext = createContext({
  userDetails: null,
  setUserDetails: (value: any) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const client = new ApolloClient({
    uri: `${host}graphql`,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "cache-first",
        variables: {
          limit: 200,
        },
      },
    },
  });
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
          <userContext.Provider value={{ userDetails, setUserDetails }}>
            <Component {...pageProps} />
          </userContext.Provider>
        </loginContext.Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
