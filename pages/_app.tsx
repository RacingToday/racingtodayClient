/** @format */

import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { host } from "../lib/dataFetchHelpers";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";

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
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
