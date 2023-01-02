import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "./utils";
import { Sort } from "./__generated__/globalTypes";
const token = getToken();
export const isLoggedIn = makeVar(Boolean(token));
export const authtoken = makeVar(token);
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    connectionParams: {
      token: authtoken() || "",
    },
  })
);
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = setContext(() => {
  return {
    headers: {
      token: authtoken() || "",
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {},
  }),
});

export { client };
