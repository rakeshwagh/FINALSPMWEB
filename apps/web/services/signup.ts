import { GraphQLClient, gql } from "graphql-request";

const endpoint = "http://localhost:3001/graphql";

export const graphQLClient = new GraphQLClient(endpoint);

export const mutation = gql`
  mutation register($createUser: CreateUserInput!) {
    register(createUser: $createUser) {
      id
      email
    }
  }
`;

export const meQuery = gql`
  query {
    me {
      name
      email
      uid
      email_verified
      phone_number
    }
  }
`;
