import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { host } from "../lib/dataFetchHelpers";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import { LoginProvider } from "../contexts/LoginContext";
import { UserProvider } from "../contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
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
        <LoginProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </LoginProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
