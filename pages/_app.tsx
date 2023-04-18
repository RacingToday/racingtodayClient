import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { host } from "../lib/dataFetchHelpers";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import { createContext, useState } from "react";

interface loginContextType {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const loginContext = createContext({
  loggedIn: false,
  setLoggedIn: (value: boolean) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);

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
          <Component {...pageProps} />
        </loginContext.Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
