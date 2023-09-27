// import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          // ... keyArgs, merge ...
          keyArgs: false,
          merge(existing = [], incoming) {
            let prev = existing.results ? existing.results : [];
            return {
              ...incoming,
              results: [...prev, ...incoming.results],
            };
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://wpe-hiring.tokopedia.net/graphql",
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "ignore",
    },
    query: {
      // fetchPolicy: "cache-first",
    },
  },
});

export default client;
